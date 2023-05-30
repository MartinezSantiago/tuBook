const router=require("express").Router();
router.post("/create", (req, res) => {
    const idBook = req.body.idBook;
    const idUser = req.body.idUser;
    const dueDate = req.body.dueDate;
    const price = req.body.price;
    const loanDate = req.body.loanDate;
    const quantity = req.body.quantity;
  
    const connection = req.dbConnection;
  
    // Check available quantity of the book
    const queryCheckQuantity = `SELECT availableQuantity FROM books WHERE id = ${idBook}`;

    connection.query(queryCheckQuantity, (err, rows) => {
      if (err) throw err;
    
      const availableQuantity = rows[0].availableQuantity;
    
      if (quantity > availableQuantity) {
        // Insufficient quantity
        res.status(400).json({ message: "Insufficient quantity available" });
        return;
      }
    
      // Insert the loan
      const queryCreateLoan = `INSERT INTO loans (userId, bookId, dueDate, price, loanDate, returnDate, surcharge, quantity) VALUES (${idUser}, ${idBook}, '${dueDate}', ${price}, '${loanDate}', null, null, ${quantity})`;
    
      connection.query(queryCreateLoan, (err, result) => {
        if (err) throw err;
        console.log('Inserted a new loan into the database');
    
        // Update the quantity
        const updatedQuantity = availableQuantity - quantity;
        const queryUpdateQuantity = `UPDATE books SET availableQuantity = ${updatedQuantity} WHERE id = ${idBook}`;
    
        connection.query(queryUpdateQuantity, (err, result) => {
          if (err) throw err;
          console.log('Updated the quantity in the books table');
    
          res.sendStatus(200);
        });
      });
    });})
    
  router.get("/getUserLoans/:idUser", (req, res) => {
    const connection = req.dbConnection;
    const userId = req.params.idUser;
    const query = `SELECT * FROM loans WHERE userId = ${userId}`;
  
    connection.query(query, (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results);
    });
  });
  
  router.get("/getLoan/:loanId", (req, res) => {
    const connection = req.dbConnection;
    const loanId = req.params.loanId;
    const query = `SELECT * FROM loans WHERE loanId = ${loanId}`;
  
    connection.query(query, (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results);
    });
  });

module.exports=router
