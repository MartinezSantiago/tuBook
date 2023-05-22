const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); 

router.post("/", upload.single('image'), async (req, res) => {
    const image = req.file; 
    try {
      const link=await req.uploadImageToS3("tubookv1", req.file.filename+"_+"+datetimeToString()+".jpg", image.buffer);
      res.json(link);
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json("Error uploading image");
    }
  });

function datetimeToString() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
module.exports=router