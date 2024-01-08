const express = require("express");
const hashIt = require("../hashing");
const router = express.Router();

router.get("/", (req, res) => {
    let shortUrl = req.baseUrl.slice(1,);
    const hashedUrl = hashIt(shortUrl);
    res.json({hash: String(hashedUrl), shortUrl: shortUrl});
    console.log(hashedUrl);
})


module.exports = router;
