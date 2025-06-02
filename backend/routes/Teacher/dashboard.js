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

router.get('/profile', authenticate, async(req, res)=>{
    const id = req.user.id;
    try {
        const result = await pool.query('select * from teacher where id = $1', [id]);
        
        const teacher = result.rows[0];
        teacher.password = "";
        res.status(201).send({teacher:teacher});
    } catch (error) {
        res.status(501).send({error: "Problem in DB"});
    }
});

router.put('/editProfile', authenticate, upload.single('thumbnail'), async (req, res) => {
    const data = req.body;
    const image = req.file;
    const id = req.user.id;
    const email = req.user.email;
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
  
    try {
      // Fetch existing teacher data
      let teacherDataResult = await pool.query(`SELECT * FROM teacher WHERE id = $1 OR email = $2`, [id, email]);
      let teacherData = teacherDataResult.rows[0];
  
      // Validate image size
      if (image) {
        if (image.size > MAX_SIZE) {
          return res.status(400).json({ error: 'File size exceeds 1MB limit' });
        }
  
        // Delete old image from Cloudinary if exists
        if (teacherData && teacherData.public_id) {
          await cloudinary.uploader.destroy(teacherData.public_id);
        }
  
        // Upload new image to Cloudinary
        const result = await uploadToCloudinary(image.buffer);
  
        data.public_id = result.public_id;
        data.image_url = result.secure_url; // fixed typo: publid_id -> secure_url
      }
  
      // Build dynamic SET clause for update query
      const allowedFields = ['name', 'dob', 'yoe', 'description', 'email', 'phone', 'public_id', 'image_url', 'education'];
      const keys = [];
      const values = [];
  
      let index = 1;
      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          keys.push(`${field} = $${index}`);
          values.push(data[field]);
          index++;
        }
      }
  
      if (keys.length === 0) {
        return res.status(400).json({ error: 'No valid fields provided for update' });
      }
  
      // Add condition parameter (id)
      values.push(id);
  
      const query = `UPDATE teacher SET ${keys.join(', ')} WHERE id = $${index}`;
      await pool.query(query, values);
  
      return res.status(200).json({ message: 'Profile updated successfully' });
  
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


router.post('/addcourse',authenticate, upload.single('thumbnail'), async(req, res)=>{

      const data = req.body;
      const image = req.file;
      const id = req.user.id;
      const MAX_SIZE = 1 * 1024 * 1024;
     
     


      try {

        if (data.price !== undefined) {
          const parsedPrice = parseFloat(data.price);
          if (isNaN(parsedPrice)) {
            return res.status(400).json({ error: 'Invalid price format' });
          }
          data.price = parsedPrice;
        }

        if (image) {
          if (image.size > MAX_SIZE) {
            return res.status(400).json({ error: 'File size exceeds 1MB limit' });
          }
    
          // Upload new image to Cloudinary
          const result = await uploadToCloudinary(image.buffer);
    
          data.public_id = result.public_id;
          data.thumbnail_url = result.secure_url; // fixed typo: publid_id -> secure_url
        }
         
        const allowedFields = ['title', 'description', 'price', 'duration', 'stream', 'thumbnail_url', 'public_id'];
        const keys = [];
        const values = [];
        const placeholders = [];
        
        let index = 1;
        
        // Build fields from input data
        for (const field of allowedFields) {
          if (data[field] !== undefined) {
            keys.push(field);
            values.push(data[field]);
            placeholders.push(`$${index}`);
            index++;
          }
        }

        console.log(keys);
        
        
        // Ensure at least one field is being added
        if (keys.length === 0) {
          return res.status(400).json({ error: 'No valid fields provided for course creation' });
        }
        
        // Add teacher_id
        keys.push('teacher_id');
        values.push(id);  // Assuming this is the teacher's ID
        placeholders.push(`$${index}`);
        
        // Build and execute insert query
        const query = `INSERT INTO courses (${keys.join(', ')}) VALUES (${placeholders.join(', ')})`;
        
       
          await pool.query(query, values);
          return res.status(200).json({ message: 'Course added successfully' });
    
        
      } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
  })
  


module.exports = router