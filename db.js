const mysql = require('mysql');

function createConnection() {
  const connection = mysql.createConnection({
    host: 'tubook.cfsglt85tvze.us-east-1.rds.amazonaws.com',
    user: '****',
    password: '***',
    database: '***',
    port: ***
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database!');
  });

  return connection;
}

module.exports = createConnection;
