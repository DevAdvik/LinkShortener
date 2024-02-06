const express = require("express");
const db = require("../helpers/database");

const router = express.Router();

const deleteQuery = 'DELETE FROM public.shortlinks WHERE id = $1 AND created_by = $2 RETURNING ziplink';
const editQuery = 'UPDATE public.shortlinks SET ziplink = $1 WHERE id = $2 AND created_by = $3';
const redirectQuery = 'UPDATE public.shortlinks SET redirect_url = $1 WHERE id = $2 AND created_by = $3';

router.post("/", async (req, res) => {
    if (req.session.loggedIn) {
        const { id, data, action } = req.body; // Here id is Ziplink's id in the db
        const username = req.session.username;
        if (!id || !action) {
            return res.status(400).json({ success: false, message: "Invalid Data! Specify ziplink id and action" });
        }

        switch (action) {
            case "edit":
                // res.status(200).json({ success: true, message: `Received: ${data}, ${id} and ${action}. Let's gooo` });

                const editDbResponse = await db.query(editQuery, [data, id, username]);
                if (editDbResponse.rowCount === 1) {
                    return res.status(200).json({ success: true, message: `New Ziplink: ${data}` });
                }
                console.log(editDbResponse);
                return res.status(400).json({ success: false, message: "Error Occured!" });
            // break;

            case "redirectChange":
                const redirectDbQuery = await db.query(redirectQuery, [data, id, username]);
                if (redirectDbQuery.rowCount === 1) {
                    return res.status(200).json({ success: true, message: 'Redirect url changed successfully!' });
                }
                console.log(redirectDbQuery);
                return res.status(400).json({ success: false, message: "Error occured!" })
                // break;

            case "delete":
                const dbResponse = await db.query(deleteQuery, [id, username]);
                if (dbResponse.rowCount === 1) {
                    return res.json({ success: true, message: `Ziplink id: ${id} deleted successfully!` });
                } else {
                    return res.status(404).json({ success: false, message: 'Unauthorized access or ziplink doesn\'t exists!', errorType: 'NotFound' });
                }
                break;
            default:
                return res.status(400).json({ success: false, message: "This shouldn't be happening. What did you do!?", errorType: 'InvalidAction' });
                break;
        }
    } else {
        return res.status(401).json({ success: false, message: "Please login first!" });
    }
})

module.exports = router;