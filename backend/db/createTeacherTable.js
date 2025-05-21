const pool = require('./db');

const createTeacherTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS teacher (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      mobile VARCHAR(15),
      password TEXT NOT NULL,
      image_url TEXT,
      dob DATE,
      yoe INTEGER CHECK (yoe >= 0),
      created_at TIMESTAMP DEFAULT now()
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Teacher table created successfully.");
  } catch (err) {
    console.error("❌ Error creating teacher table:", err);
  } finally {
    await pool.end();
  }
};

createTeacherTable();
