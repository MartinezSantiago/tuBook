const express = require('express');
const app = express();
const createConnection = require('./db');

// Create the database connection
const connection = createConnection();

// Middleware to attach the connection object to the request
app.use((req, res, next) => {
  req.dbConnection = connection;
  next();
});

// Import the books router
const booksRouter = require('./routes/books');

// Register routes
app.use('/books', booksRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
