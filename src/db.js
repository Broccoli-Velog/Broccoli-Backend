import mysql from 'mysql';

const getPoolInstance = (MODE, DB_HOST, DB_ID, DB_NAME, DB_PW) => {

    return mysql.createPool({
        host: "localhost",
        user: process.env.DB_ID,
        database: process.env.DB,
        password: process.env.DB_PW,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

}

/**
 * 연결 성공 시 true, 실패시 false
 * @param {*} pool 
 * @returns boolean
 */
const validatePoolConnection = async (pool) => {
    
    try {

        await pool.getConnection();

        return true;

    } catch (err) {

        console.log(err);

        return false;

    }

}

export {

    getPoolInstance,
    validatePoolConnection
    
}