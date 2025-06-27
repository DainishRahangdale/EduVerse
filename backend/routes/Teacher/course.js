const express = require("express");
const authenticate = require("../../middlewares/authentication");
const router = express.Router();
const multer = require("multer");
const pool = require("../../db/db");
const cloudinary = require("../../utils/cloudinary");
const streamifier = require("streamifier");

const upload = multer();

const uploadToCloudinary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "uploads" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(imageBuffer).pipe(stream);
  });
};

router.post("/addchapter", authenticate, async (req, res) => {
  const { course_id, title, description } = req.body;

  try {
    await pool.query(
      "INSERT INTO chapters (course_id, title, description) VALUES ($1, $2, $3)",
      [course_id, title, description]
    );

    res.status(201).json({ message: "Successfully added chapter" });
  } catch (error) {
    res.status(500).json({ error: "Error in server" });
  }
});

router.put("/editchapter", authenticate, async (req, res) => {
  const { chapter_id, title, description } = req.body;

  if (!chapter_id || !title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE chapters SET title = $1, description = $2 WHERE chapter_id = $3 RETURNING *",
      [title, description, chapter_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res
      .status(200)
      .json({
        message: "Chapter successfully updated",
        chapter: result.rows[0],
      });
  } catch (error) {
    console.error("Edit chapter error:", error);
    res.status(500).json({ error: "Error in server" });
  }
});

router.post(
  "/addTopic",
  authenticate,
  upload.single("resource"),
  async (req, res) => {
    const { title, type, chapter_id } = req.body;

    if (!title || !type || !chapter_id || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const result = await uploadToCloudinary(req.file.buffer);

      // Insert topic into the database
      const insertQuery = `
        INSERT INTO topics (title, type, public_id, url, chapter_id)
        VALUES ($1, $2, $3, $4, $5)
      `;

      await pool.query(insertQuery, [
        title,
        type,
        result.public_id,
        result.secure_url,
        chapter_id,
      ]);

      res.status(201).json({ message: "Topic added successfully" });
    } catch (error) {
      console.error("Error adding topic:", error);
      res.status(500).json({ error: "Server error while adding topic" });
    }
  }
);

router.get("/allchapter/:course_id", authenticate, async (req, res) => {
  const { course_id } = req.params;
   
   
  if (!course_id) {
    return res.status(400).json({ error: "Invalid course_id" });
  }

  try {
    const data = await pool.query(
      `select * from chapters where course_id = $1`,
      [course_id]
    );
  
    res.status(200).json({ data: data.rows });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "there is error in server" });
  }
});

router.get("/alltopics/:chapter_id", authenticate, async (req, res) => {
  const { chapter_id } = req.params;
   
   
  if (!chapter_id) {
    return res.status(400).json({ error: "Invalid chapter_id" });
  }

  try {
    const data = await pool.query(
      `select * from topics where chapter_id = $1`,
      [chapter_id]
    );
    res.status(200).json({ data: data.rows });
  } catch (error) {
   
    res.status(500).json({ error: "there is error in server" });
  }
});

// deleteTopic
router.delete('/deleteTopic', authenticate, async (req, res)=>{
       
       
        const {topic} = req.body;

       
        

        if (!topic.topic_id) {
    return res.status(400).json({ error: "Invalid request"});
  }

        try {
    // 1. Delete from Cloudinary
    await cloudinary.uploader.destroy(topic.public_id, {
      resource_type: "raw", // use "video" or "image" if that's the type
    });

    // 2. Delete from DB
    await pool.query('DELETE FROM topics WHERE topic_id = $1', [topic.topic_id]);

    res.status(200).json({ message: "Topic and file deleted successfully" });

  } catch (error) {
    
    res.status(500).json({ error: "There is an error in the server" });
  }
        
});

router.delete('/deleteChapter/:id', authenticate, async (req, res) => {
 

  const chapterId = parseInt(req.params.id, 10);


if (isNaN(chapterId)) {
  return res.status(400).json({ error: "Invalid chapter ID" });
}

try {
  await pool.query('DELETE FROM chapters WHERE chapter_id = $1', [chapterId]);
  res.status(200).json({ message: "Chapter deleted successfully" });
} catch (error) {
  console.error("Error deleting chapter:", error);
  res.status(500).json({ error: "There is an error in the server" });
}

});


module.exports = router;
