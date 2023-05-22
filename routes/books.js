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

router.post('/',upload.single('image'), async (req, res) => {
  // Logic for creating a new book
  const connection = req.dbConnection;
  const { title, author, rating, publication_year, genre, price } = req.body;
  const bookCover=await req.uploadImageToS3("tubookv1",req.file.originalname+"_1"+".jpg",req.file.buffer);
  const query = `INSERT INTO books (title, author, rating, publication_year, genre, price,bookCover) VALUES ('${title}', '${author}', ${rating}, '${publication_year}', '${genre}', ${price},'${bookCover.Location}');`;
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
  res.send(`Update book with ID: ${bookId}`);
});

router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  // Logic for deleting a book with the specified ID
  res.send(`Delete book with ID: ${bookId}`);
});

module.exports = router;
