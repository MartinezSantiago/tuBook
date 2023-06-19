const express = require('express');
const app = express();
const createConnection = require('./db');
const bodyParser = require('body-parser');
const uploadImage = require('./helper/imageHelper');
const cors = require('cors');
// Create the database connection
const connection = createConnection();
app.use(cors());
app.use(bodyParser.json());

// Custom middleware to attach the connection object and uploadImage function to the request
app.use((req, res, next) => {
  req.dbConnection = connection;
  req.uploadImageToS3 = uploadImage;

  // Check if the request is coming from AWS
  const isAWSRequest = req.get('host').includes('.execute-api.');

  if (isAWSRequest) {
    // Handle AWS request
    // Perform any necessary validations or additional logic specific to AWS
    next();
  } else {
    // Return an error response for non-AWS requests
    res.status(403).json({ error: 'Forbidden' });
  }
});


// Import the routes
const booksRouter = require('./routes/books');
const imagesRouter = require('./routes/images');
const usersRouter = require('./routes/users');
const loansRouter = require('./routes/loans');

// Register routes
app.use('/books', booksRouter);
app.use('/images', imagesRouter);
app.use('/users', usersRouter);
app.use('/loans', loansRouter);
// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
