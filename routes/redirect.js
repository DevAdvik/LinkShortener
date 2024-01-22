const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();

// BigInt.prototype.toJSON = function () {
//     return this.toString();
// };

router.get("/", async (req, res) => {
    let ziplink = req.baseUrl.slice(1,);
    try {
        const sqlQuery = "SELECT redirect_url, id FROM public.shortlinks WHERE ziplink=$1";
        const updateCount = "UPDATE public.shortlinks SET count = count + 1 WHERE id=$1";
        const dbResponse = await pool.query(sqlQuery, [ziplink]);
        if (dbResponse.rowCount === 1) {
            const { redirect_url, id } = dbResponse.rows[0];
            const updateResponse = await pool.query(updateCount, [id]);
            console.log(updateResponse);
            return res.status(302).redirect(redirect_url);
        } else {
            res.status(302).redirect("https://error.advik.dev");
        }
    } catch (error) {
        res.status(400).send("Error: Something happened, I dunno what\n"+error);
        console.log(error);
    }
})


module.exports = router;
