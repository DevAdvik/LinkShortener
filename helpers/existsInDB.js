const pool = require("./database");

async function checkAliasInDB(alias) {
    const query = 'SELECT * FROM public.shortlinks WHERE ziplink=$1';
    const dbResponse = await pool.query(query, [alias]);
    return dbResponse.rowCount === 1;
}

module.exports = checkAliasInDB;