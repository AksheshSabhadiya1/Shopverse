const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'Akshu@$1212$!',
    database: 'shopverse'
})

module.exports = pool.promise()