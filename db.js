const { Pool, Client } = require('pg');
const config = require('./config.js');

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
  })

module.exports = pool;
