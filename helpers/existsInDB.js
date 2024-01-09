const pool = require("./database");

async function checkAliasInDB(hashed_url) {
    const query = 'SELECT id from urlinfo WHERE short_url=?';
    const dbResponse = pool.query(query, hashed_url);
    return dbResponse.length;
}

module.exports = checkAliasInDB;