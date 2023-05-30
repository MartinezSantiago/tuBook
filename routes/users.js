const express = require('express');
const router = express.Router();
const bcrypt=require("bcrypt")
router.post('/register', async (req, res) => {
    const connection = req.dbConnection;
    const { email, password } =  req.body;
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
  
    const query = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}');`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to create user' });
        return;
      }
      res.status(200).json("User created");
    });
  });


  router.post('/login', async (req, res) => {
    const connection = req.dbConnection;
    const { email, password } = req.body;
  
    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      connection.query(query, [email], async (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).json({ error: 'Failed to query the database' });
          return;
        }
  
        if (results.length === 0) {
          res.status(400).json({ error: 'Failed to login user' });
          return;
        }
  
        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          res.status(400).json({ error: 'Invalid password' });
          return;
        }
  
        delete user.password;
        res.status(200).json(user);
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to process login' });
    }
  });
  router.get("/:id",(req,res)=>{
    const connection = req.dbConnection;
    const id=req.params.id;
    const query=`SELECT idUser,email FROM users where idUser=${id}`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to create user' });
        return;
      }
      res.status(200).json(results);
    });
  })
  module.exports=router