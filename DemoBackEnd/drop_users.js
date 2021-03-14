const pg = require('pg')

const dbconfig = {
    user: 'postgres',
    password: 'idiomtest',
    host: 'demo-node-database.ctr0gifkhako.us-east-1.rds.amazonaws.com',
    port: 5432
}

const pool = new pg.Pool(dbconfig)
const create_server_db_query = `DELETE FROM users`

pool.query(create_server_db_query, (err, res) => {
    console.log(err, res)
    pool.end()
})