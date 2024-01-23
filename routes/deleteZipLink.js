const express = require("express");
const db = require("../helpers/database");

const router = express.Router();

const deleteQuery = 'DELETE FROM public.shortlinks WHERE ziplink = $1 AND created_by = $2 RETURNING ziplink';

router.post("/", async (req, res) => {
    if (req.session.loggedIn) {
        const { ziplink } = req.body;
        const username = req.session.username;
        if (!ziplink) {
            return res.status(400).json({ success: false, message: "Please specify a ziplink" });
        }
        const dbResponse = await db.query(deleteQuery, [ziplink, username]);
        if (dbResponse.rowCount === 1) {
            res.json({ success: true, message: `Ziplink ${ziplink} deleted successfully!` });
        } else {
            res.status(404).json({ success: false, message: 'Unauthorized access or ziplink doesn\'t exists!', errorType: 'NotFound' })
        }
    } else {
        return res.status(401).json({ success: false, message: "Please login first!" });
    }
})

module.exports = router;