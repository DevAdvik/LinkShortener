const express = require("express");
const pool = require("../helpers/database");
const hashIt = require("../helpers/hashing");
const generateAlias = require("../helpers/generateShortAlias");
const checkInDB = require("../helpers/existsInDB")

const router = express.Router();

router.get("/", async (req, res) => {
    let { long_url, short_url_pref } = req.body;
    let hashed_url;
    // Below code checks if user has given his desired alias for shorturl or not. If they have, check if it exists in the db and return an error message if applicable
    // Otherwise generate a random 5-letter alias, hash it and check if it exists in the db. If it does, repeat the process until it doesn't :)
    if (!short_url_pref) {
        do {
            short_url_pref = generateAlias();
            hashed_url = hashIt(short_url_pref);
        } while (!checkInDB(hashed_url));
    } else {
        hashed_url = hashIt(short_url_pref);
        if (checkInDB(hashed_url)) {
            return res.status(400).json({ success: false, reason: "Shortlink with this alias already exists!" });
        }
    }
    // After all the verification, insert the hashed shorturl and longurl in the db.
    try {
        const create_url_query = `INSERT INTO Shortlinks.urlinfo (redirect_url, short_url) VALUES(?, ?)`;
        const dbCreateResponse = await pool.query(create_url_query, [long_url, hashed_url]);
        console.log(typeof dbCreateResponse, dbCreateResponse);
        res.status(200).json({ success: true, long_url: long_url, redirect_link: `http://localhost:5000/${short_url_pref}` });
    } catch (error) {
        res.status(500).send(`Error occured while creating short url! Please copy and report this message:\n ${error}`);
        console.error("Error occured!\n", error);
    }
})


module.exports = router;