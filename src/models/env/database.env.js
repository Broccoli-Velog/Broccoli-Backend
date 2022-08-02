import 'dotenv/config';
import { classIterator } from '../_.loader.js';

/**
 * `for ~ of` 문법에서 사용 가능한 `@iterable` 클래스입니다.
 * 
 * @property { string } HOST
 * @property { string } ID
 * @property { string } NAME
 * @property { string } PW
 * @property { string } WAIT_FOR_CONNECTION
 * @property { string } CONNECTION_LIMIT
 * @property { Symbol.iterator } [Symbol.iterator]
 */
class DatabaseEnv {

    /** @type { string } */
    HOST;
    
    /** @type { string } */
    ID;
    
    /** @type { string } */
    NAME;
    
    /** @type { string } */
    PW;

    /** @type { string } */
    WAIT_FOR_CONNECTION;

    /** @type { string } */
    CONNECTION_LIMIT;

    /** @type { Symbol.iterator } */
    [Symbol.iterator]

    constructor() {

        this.HOST = process.env.DB_HOST;
        this.ID = process.env.DB_ID;
        this.NAME = process.env.DB_NAME;
        this.PW = process.env.DB_PW;
        this.WAIT_FOR_CONNECTION = process.env.DB_WAIT_FOR_CONNECTION;
        this.CONNECTION_LIMIT = process.env.DB_CONNECTION_LIMIT;

        this[Symbol.iterator] = classIterator;
        
    }

}

export default DatabaseEnv;