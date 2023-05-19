const mysql = require('mysql');

function createConnection() {
  const connection = mysql.createConnection({
    host: 'tubook.cfsglt85tvze.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'tuBook',
    port: 3306
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
