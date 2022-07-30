import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: "3.35.123.192",
    user: "root",
    database: "broccoli",
    password: "broccoli",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection(async (err, conn) => {
    try {
        conn.release();
    } catch (err) {
        err ? console.error(err) : console.log("db connect");
    }
});

export default pool.promise();