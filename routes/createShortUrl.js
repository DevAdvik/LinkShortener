const express = require("express");
const pool = require("../helpers/database");
const generateAlias = require("../helpers/generateShortAlias");
const checkInDB = require("../helpers/existsInDB")

const router = express.Router();

const create_url_query = `INSERT INTO public.shortlinks (redirect_url, ziplink, created_by) VALUES($1, $2, $3)`;

router.post("/", async (req, res) => {
    let { long_url, alias } = req.body;
    console.log("Request received!");
    console.log(req.body);

    // Below code checks if user has given his desired alias for shorturl or not. 
    // If they have, check if it exists in the db and return an error message if applicable
    // Otherwise generate a random 5-letter alias and check if it exists in the db. If it does, repeat the process until it doesn't :)
    if (!long_url) {
        return res.status(400).send('Bad Request');
    }
    if (!alias) {
        do {
            alias = generateAlias();
        } while (!checkInDB(alias));
    } else {
        const dbResult = await checkInDB(alias);
        if (dbResult) {
            return res.status(200).json({ success: false, reason: "Shortlink with this alias already exists!", errorType: "AliasConflict" });
        }
    }
    // Add the longurl and ziplink to db
    try {
        if (!(long_url.startsWith("https://")) && !(long_url.startsWith("http://")) && !(long_url.startsWith("mailto:"))) {
            long_url = "http://" + long_url;
        }
        
        const username = req.session.username || 'guest';
        const dbCreateResponse = await pool.query(create_url_query, [long_url, alias, username]);
        if (dbCreateResponse.rowCount === 1) {
            console.log(`New ziplink!`);
            return res.status(200).json({ success: true, long_url: long_url, redirect_link: `https://link.advik.dev/${alias}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, reason: error });
        console.error("Error occured!\n", error);
    }
})


module.exports = router;