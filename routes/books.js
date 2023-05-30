const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); 

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
  const connection = req.dbConnection;
  const query = "SELECT * FROM books where id="+bookId;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve books from the database' });
      return;
    }
    res.json(results);
  });
});

router.post('/', async (req, res) => {
  // Logic for creating a new book
  const connection = req.dbConnection;
  const { title, author, rating, publication_year, genre, price,bookCover,quantity } = req.body;
  const query = `INSERT INTO books (title, author, rating, publication_year, genre, price,bookCover,availableQuantity) VALUES ('${title}', '${author}', ${rating}, '${publication_year}', '${genre}', ${price},'${bookCover}',${quantity});`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve books from the database' });
      return;
    }
    res.json("Se creo el libro correctamente");
  });
});
router.put('/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic for updating a book with the specified ID
  const {title, author, rating, publication_year, genre, price, bookCover,quantity}= req.body
  const query= `UPDATE books SET title='${title}', author='${author}', rating=${rating}, publication_year='${publication_year}', genre= '${genre}', price=${price}, bookCover='${bookCover}',quantity=${quantity} WHERE id=${bookId}; `;
  const connection = req.dbConnection; 

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve books from the database' });
      return;
    }
    res.json("Se actualiza el libro");
  });
});


router.delete('/:id', (req, res) => {
  const bookId = req.params.id;

  // Consulta DELETE
  const query = `DELETE FROM books WHERE id = ${bookId}`;

  const connection = req.dbConnection;  

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve books from the database' });
      return;
    }
    res.json("Se elimino el libro correctamente");
  });
});

module.exports = router;
