const express = require('express')
const pg = require('pg')
const app = express()

const dbconfig = {
  user: 'postgres',
  password: 'idiomtest',
  host: 'demo-node-database.ctr0gifkhako.us-east-1.rds.amazonaws.com',
  port: 5432
}

// Default route
app.get('/', (req, res) => {
  res.send('Hello ' + req.query.name)
})

// Route for creating a user
app.post('/createuser', (req, res) => {
  console.log(req.query)
    if (req.query.uid && req.query.first_name && req.query.last_name && req.query.phone) {
      console.log('Request received');
      const pool = new pg.Pool(dbconfig)
      pool.connect(function(err) {
        pool.query(`INSERT INTO users (uid, first_name, last_name, phone) VALUES
          ('${req.query.uid}', '${req.query.first_name}', '${req.query.last_name}',
          '${req.query.phone}')`, function(err, result, fields) {
          if (err) res.send(err);
          if (result) res.send({
            uid: req.query.uid,
            first_name: req.query.first_name,
            last_name: req.query.last_name,
            phone: req.query.phone});
          if (fields) console.log(fields);
          pool.end()
        });
      });
    } else {
      console.log('Missing a parameter');
  }
});

// Route for getting all users
app.get('/allusers', (req, res) => {
  const pool = new pg.Pool(dbconfig)
  pool.connect(function(err) {
    pool.query(`SELECT * FROM users`, function(err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
      if (fields) console.log(fields);
      pool.end()
    });
  });
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})

