const express = require("express");
const hashIt = require("../helpers/hashing");
const pool = require("../helpers/database");
const router = express.Router();

BigInt.prototype.toJSON = function () {
    return this.toString();
};


router.get("/", async (req, res) => {
    let shortUrl = req.baseUrl.slice(1,);
    const hashedUrl = hashIt(shortUrl);
    try {
        const sqlQuery = "SELECT redirect_url, id FROM urlinfo WHERE short_url=?";
        const updateCount = "UPDATE urlinfo SET count = count + 1 WHERE id=?";
        const rows = await pool.query(sqlQuery, hashedUrl);
        if (rows.length) {
            const { redirect_url, id } = rows[0];
            const updateResponse = await pool.query(updateCount, id);
            console.log(updateResponse);
            return res.status(302).redirect(redirect_url);
        } else {
            res.status(200).send("This shorturl doesn't exists!");
        }
    } catch (error) {
        res.status(400).send("Error: Can't find shit now");
        console.log(error);
    }
})


module.exports = router;
