// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  port: 3306,
  password: process.env.DB_PASSWORD || '@Naruto-12"',
  database: process.env.DB_NAME || 'api',
  waitForConnections: true,
  connectionLimit: 10, // Vous pouvez ajuster cela en fonction de vos besoins
  queueLimit: 0,
});

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connecté à la base de données MySQL');
        connection.release();
        resolve();
      }
    });
  });
};

module.exports = { pool, connectToDatabase };
