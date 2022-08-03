import mysql from "mysql2/promise";
import { DatabaseEnv } from "../../models/_.loader.js";

/**
 * `데이터 베이스` 공급자 클래스입니다.
 * 
 * @property { mysql.Pool } pool
 * @property { function } initialize
 * @property { function } validateConnection
 * @method getConnection
 */
class DatabaseProvider {

    /** @type { mysql.Pool } */
    static pool;

    /** @param { DatabaseEnv } databaseEnv @returns */
    static initialize(databaseEnv) {

        if (this.pool) return this.pool;

        this.pool = mysql.createPool({
            host: databaseEnv.HOST,
            user: databaseEnv.ID,
            database: databaseEnv.NAME,
            password: databaseEnv.PW,
            waitForConnections: databaseEnv.WAIT_FOR_CONNECTION,
            connectionLimit: databaseEnv.CONNECTION_LIMIT
        });

        return this.pool;

    }

    /** @returns { Promise<void> } @throws { BadDatabaseConnection } */
    static async validateConnection() {

        try {

            const conn = await DatabaseProvider.pool.getConnection();
            conn.release();

        } catch(err) {
            
            throw err;

        }

    }

    /** @returns { Promise<mysql.PoolConnection> } @throws { BadDatabaseConnection } */
    async getConnection() {
        try {

            const connection = await DatabaseProvider.pool.getConnection();
            return connection;

        } catch(err) {

            throw err;

        }
    }

}


export default DatabaseProvider;