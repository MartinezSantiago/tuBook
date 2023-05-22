const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); 

router.post("/", upload.single('image'), async (req, res) => {
    const image = req.file; 
    try {
      await req.uploadImageToS3("tubookv1", "test2.jpg", image.buffer);
      res.json("Image uploaded successfully");
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json("Error uploading image");
    }
  });
module.exports=router