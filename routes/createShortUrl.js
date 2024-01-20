const express = require("express");
const pool = require("../helpers/database");
const hashIt = require("../helpers/hashing");
const generateAlias = require("../helpers/generateShortAlias");
const checkInDB = require("../helpers/existsInDB")

const router = express.Router();

router.post("/", async (req, res) => {
    let { long_url, short_url_pref } = req.body;
    let hashed_url;
    console.log("Request received!");
    console.log(req.body);
    // Below code checks if user has given his desired alias for shorturl or not. If they have, check if it exists in the db and return an error message if applicable
    // Otherwise generate a random 5-letter alias, hash it and check if it exists in the db. If it does, repeat the process until it doesn't :)
    if (!long_url) {
        return res.status(400).send('Bad Request');
    }
    if (!short_url_pref) {
        do {
            short_url_pref = generateAlias();
            hashed_url = hashIt(short_url_pref);
        } while (!checkInDB(hashed_url));
    } else {
        hashed_url = hashIt(short_url_pref);
        const dbResult = await checkInDB(hashed_url);
        if (dbResult) {
            return res.status(200).json({ success: false, reason: "Shortlink with this alias already exists!" });
        }
    }

    // After all the verification, insert the hashed shorturl and longurl in the db.

    try {
        if (!(long_url.startsWith("https://")) && !(long_url.startsWith("http://")) && !(long_url.startsWith("mailto:"))) {
            long_url = "http://" + long_url;
        }
        const create_url_query = `INSERT INTO Shortlinks.urlinfo (redirect_url, short_url) VALUES(?, ?)`;
        const dbCreateResponse = await pool.query(create_url_query, [long_url, hashed_url]);
        console.log(typeof dbCreateResponse, dbCreateResponse);
        res.status(200).json({ success: true, long_url: long_url, redirect_link: `https://link.advik.dev/${short_url_pref}` });
        console.log(`New ziplink!`);
    } catch (error) {
        res.status(500).json({ success: false, reason: error });
        console.error("Error occured!\n", error);
    }
})


module.exports = router;