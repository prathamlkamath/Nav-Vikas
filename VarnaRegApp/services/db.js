const { Client } = require('pg');

// Create a new PostgreSQL client
const dbClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'varnotsavadb',
  password: 'admin',
  port: 5432
});
// Connect to the database
dbClient.connect();




module.exports=dbClient;




