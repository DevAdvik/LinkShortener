const { Pool } = require('pg');
const dotenv = require("dotenv");

dotenv.config("/.env");

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
}

const pool = new Pool(credentials);

pool.connect();

module.exports = pool;