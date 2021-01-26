const Pool = require('pg').Pool
const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'csv',
  password: 'password',
  port: 5432,
})

module.exports= pool;