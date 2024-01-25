const express = require("express");
const db = require("../helpers/database");
const router = express.Router();

const queries = {
    changeUsername: `UPDATE public.users SET username = $1 WHERE username = $2`
}

router.post("/", (req, res) => {

})

module.exports = router;