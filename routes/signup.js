const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const database = require("../helpers/database");

const router = express.Router();
const queries = {
    doesUserExists: "SELECT * FROM public.users WHERE username = $1",
    addNewUser: "INSERT INTO public.users (username, hashed_password) VALUES($1, $2)"
}

router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        return res.status(200).json({success: false, message: "User is already logged in!"})
    }
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
})

router.post('/', async (req, res) => {
    if (req.session.loggedIn) {
        return res.status(200).json({ success: false, message: "User is already logged in!", errorType: "LoggedIn", username: req.session.username });
    }
    const username = req.body.username;
    const password = req.body.password;
    const result = await database.query(queries.doesUserExists, [username]);

    if (result.rowCount == 1) {
        return res.status(200).json({ success: false, message: "User already exists!", errorType: "UsernameConflict" });
    }

    const hash = await bcrypt.hash(password, 10);
    if (hash) {
        try {
            database.query(queries.addNewUser, [username, hash]);
            req.session.loggedIn = true;
            req.session.username = username;
            return res.status(200).json({ success: true, message: "User signed up successfully!" });
        } catch (err) {
            console.log("Unexpected error occured!" + err);
        }
    }
})

module.exports = router;