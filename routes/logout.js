const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
    req.session.destroy();
    res.status(303).redirect("/login");
})

module.exports = router;