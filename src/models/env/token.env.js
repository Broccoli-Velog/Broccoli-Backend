import 'dotenv/config';
import { classIterator } from '../_.loader.js';

/**
 * `for ~ of` 문법에서 사용 가능한 `@iterable` 클래스입니다.
 * 
 * @property { string } SECRET
 * @property { string } ALGORITHM
 * @property { Symbol.iterator } [Symbol.iterator]
 */
class JwtEnv {

    /** @type { string } */
    SECRET;
    
    /** @type { string } */
    ALGORITHM;

    /** @type { Symbol.iterator } */
    [Symbol.iterator];

    constructor() {

        this.SECRET = process.env.JWT_SECRET;
        this.ALGORITHM = process.env.JWT_ALGORITHM;

        this[Symbol.iterator] = classIterator;
        
    }

}

export default JwtEnv;