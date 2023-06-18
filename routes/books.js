const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const connection = req.dbConnection;
  const query = "SELECT * FROM books";
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Failed to retrieve books from the database' });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const bookId = req.params.id;
  const connection = req.dbConnection;
  const query = "SELECT * FROM books WHERE id = ?";
  
  connection.query(query, [bookId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Failed to retrieve book from the database' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const connection = req.dbConnection;
  const { title, author, rating, publication_year, genre, price, bookCover, quantity } = req.body;
  const query = `INSERT INTO books (title, author, rating, publication_year, genre, price, bookCover, availableQuantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [title, author, rating, publication_year, genre, price, bookCover, quantity];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Failed to create book in the database' });
    }
    res.json("The book was created successfully");
  });
});

router.put('/:id', (req, res) => {
  const bookId = req.params.id;
  const connection = req.dbConnection;
  const { title, author, rating, publication_year, genre, price, bookCover, quantity } = req.body;
  const query = `UPDATE books SET title = ?, author = ?, rating = ?, publication_year = ?, genre = ?, price = ?, bookCover = ?, availableQuantity = ? WHERE id = ?`;
  const values = [title, author, rating, publication_year, genre, price, bookCover, quantity, bookId];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Failed to update book in the database' });
    }
    res.json("The book was updated successfully");
  });
});

router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  const connection = req.dbConnection;
  const query = `DELETE FROM books WHERE id = ?`;

  connection.query(query, [bookId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Failed to delete book from the database' });
    }
    res.json("The book was deleted successfully");
  });
});

module.exports = router;
