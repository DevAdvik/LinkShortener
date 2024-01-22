const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const database = require("../helpers/database");
const router = express.Router();

const queries = {
    doesUserExists: "SELECT * FROM public.users WHERE username = $1",
}

router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        return res.status(303).json({ success: false, message: "User already logged in!" });
    }
    res.sendFile(path.join(__dirname, "..", "public", "login.html"));
})

router.post('/', async (req, res) => {
    if (req.session.loggedIn) {
        console.log("Logged in user request");
        return res.status(303).json({ success: true, message: "User already logged in!", username: req.session.username });
    }

    const [username, password] = [req.body.username, req.body.password];
    const checkUser = await database.query(queries.doesUserExists, [username]);

    if (checkUser.rowCount == 1) {
        const hashed_password = checkUser.rows[0].hashed_password;
        const result = await bcrypt.compare(password, hashed_password);

        if (result) {
            req.session.username = username;
            req.session.loggedIn = true;
            console.log("User logged in successfully!");
            res.status(200).json({ success: true, message: "User logged in successfully!" });
        } else {
            console.log("Invalid password!");
            res.status(401).json({ success: false, message: "Invalid password!", errorType: "InvalidPassword" });
        }
    } else {
        res.status(401).json({ success: false, message: "User doesn't exists!", erorType: "InvalidUser" });
    }
})

module.exports = router;