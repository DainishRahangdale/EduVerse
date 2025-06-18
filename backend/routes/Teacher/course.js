const express = require('express');
const authenticate = require('../../middlewares/authentication');
const router = express.Router();
const multer = require('multer');
const pool = require('../../db/db');
const cloudinary = require('../../utils/cloudinary');
const streamifier = require('streamifier');

const upload = multer();


const uploadToCloudinary = (imageBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'uploads',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
  
      streamifier.createReadStream(imageBuffer).pipe(stream);
    });
  };


  router.post('/addchapter', authenticate, async (req, res) => {
    const { course_id, title, description } = req.body;
  
    try {
      await pool.query(
        'INSERT INTO chapters (course_id, title, description) VALUES ($1, $2, $3)',
        [course_id, title, description]
      );
  
      res.status(201).json({ message: "Successfully added chapter" });
    } catch (error) {
      res.status(500).json({ error: "Error in server" });
    }
  });

  router.put('/editchapter', authenticate, async (req, res) => {
    const { chapter_id, title, description } = req.body;
  
    if (!chapter_id || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const result = await pool.query(
        'UPDATE chapters SET title = $1, description = $2 WHERE chapter_id = $3 RETURNING *',
        [title, description, chapter_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Chapter not found" });
      }
  
      res.status(200).json({ message: "Chapter successfully updated", chapter: result.rows[0] });
    } catch (error) {
      console.error("Edit chapter error:", error);
      res.status(500).json({ error: "Error in server" });
    }
  });
  
  




  module.exports = router;