const express = require("express");
const pool = require("../helpers/database");
const hashIt = require("../helpers/hashing");

const router = express.Router();

router.get("/", (req, res) => {
    console.log(req);
    const { long_url, short_url_pref } = req.body;

    res.status(200).json({ long_url: long_url });
})


module.exports = router;