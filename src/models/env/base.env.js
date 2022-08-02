import 'dotenv/config';
import { classIterator } from '../_.loader.js';

/**
 * `for ~ of` 문법에서 사용 가능한 `@iterable` 클래스입니다.
 * 
 * @property { string } MODE
 * @property { number } PORT
 * @property { Symbol.iterator } [Symbol.iterator]
 */
class BaseEnv {

    /** @type { string } */
    MODE;

    /** @type { number } */
    PORT;

    /** @type { Symbol.iterator } */
    [Symbol.iterator];

    /**
     * 
     * @param { string } MODE 
     */
    constructor() {
        this.MODE = process.env.NODE_ENV;
        this.PORT = +process.env.PORT;
        this[Symbol.iterator] = classIterator;
    }
    
}

export default BaseEnv;