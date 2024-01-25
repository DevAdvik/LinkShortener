const express = require("express");
const path = require("path");
const db = require("../helpers/database");
const router = express.Router();

const queries = {
    getZipLinks: 'SELECT id, redirect_url, created_at, ziplink, count FROM public.shortlinks WHERE  created_by = $1'
}

router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        return res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
    } else {
        return res.status(303).redirect("/login");
    }
})

router.post("/", async (req, res) => {
    if (req.session.loggedIn) {
        // return res.json({ success: true, message: "You're logged in!" });
        const username = req.session.username;
        const getZipLinks = await db.query(queries.getZipLinks, [username]);
        res.json(getZipLinks['rows']);
    } else {
        return res.status(401).json({ success: false, message: "Please login first!", errorType: "AuthorizationFailed" });
    }
})

module.exports = router;