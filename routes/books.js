const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const connection = req.dbConnection;
  const query = "SELECT * FROM books";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve books from the database' });
      return;
    }

    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const bookId = req.params.id;
  res.send(`Book ID: ${bookId}`);
});

router.post('/', (req, res) => {
  // Logic for creating a new book
  res.send('Create a new book');
});

router.put('/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic for updating a book with the specified ID
  res.send(`Update book with ID: ${bookId}`);
});

router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic for deleting a book with the specified ID
  res.send(`Delete book with ID: ${bookId}`);
});

module.exports = router;
