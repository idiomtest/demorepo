const pg = require('pg')

const dbconfig = {
    user: 'postgres',
    password: 'idiomtest',
    host: 'demo-node-database.ctr0gifkhako.us-east-1.rds.amazonaws.com',
    port: 5432
}

const pool = new pg.Pool(dbconfig)
const create_users_table_query = `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    uid VARCHAR NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL
);`

pool.query(create_users_table_query, (err, res) => {
    console.log(err, res)
    pool.end()
})