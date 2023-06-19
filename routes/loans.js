const router = require('express').Router();

router.post('/create', async (req, res) => {
  try {
    const { idBook, idUser, dueDate, price, loanDate, quantity } = req.body;
    const connection = req.dbConnection;

    // Check available quantity of the book
    const queryCheckQuantity = `SELECT availableQuantity FROM books WHERE id = ?`;
    const [rows] = await connection.query(queryCheckQuantity, [idBook]);

    const availableQuantity = rows[0].availableQuantity;

    if (quantity > availableQuantity) {
      // Insufficient quantity
      return res.status(400).json({ message: "Insufficient quantity available" });
    }

    // Insert the loan
    const queryCreateLoan = `INSERT INTO loans (userId, bookId, dueDate, price, loanDate, returnDate, surcharge, quantity) VALUES (?, ?, ?, ?, ?, null, null, ?)`;
    const result = await connection.query(queryCreateLoan, [idUser, idBook, dueDate, price, loanDate, quantity]);

    console.log('Inserted a new loan into the database');

    const loan = {
      id: result.insertId,
      userId: idUser,
      bookId: idBook,
      dueDate: dueDate,
      price: price,
      loanDate: loanDate,
      returnDate: null,
      surcharge: null,
      quantity: quantity
    };

    // Update the quantity
    const updatedQuantity = availableQuantity - quantity;
    const queryUpdateQuantity = `UPDATE books SET availableQuantity = ? WHERE id = ?`;
    await connection.query(queryUpdateQuantity, [updatedQuantity, idBook]);

    console.log('Updated the quantity in the books table');

    res.status(200).json(loan);
  } catch (err) {
  console.error('Error executing MySQL query:', err);
  res.status(500).json({ error: 'Failed to create loan in the database', requestBody: req.body });
}
});

router.get('/getUserLoans/:idUser', async (req, res) => {
  try {
    const connection = req.dbConnection;
    const userId = req.params.idUser;
    const query = `SELECT * FROM loans WHERE userId = ?`;

    const [results] = await connection.query(query, [userId]);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Failed to retrieve user loans from the database' });
  }
});

router.get('/getLoan/:loanId', async (req, res) => {
  try {
    const connection = req.dbConnection;
    const loanId = req.params.loanId;
    const query = `SELECT * FROM loans WHERE loanId = ?`;

    const [results] = await connection.query(query, [loanId]);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Failed to retrieve loan from the database' });
  }
});

module.exports = router;
