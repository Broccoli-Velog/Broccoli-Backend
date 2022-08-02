import 'dotenv/config';
import { classIterator } from '../_.loader.js';

/**
 * `for ~ of` 문법에서 사용 가능한 `@iterable` 클래스입니다.
 * 
 * @property { number } SALT
 * @property { Symbol.iterator } [Symbol.iterator]
 */
class BcryptEnv {

    /** @type { number } */
    SALT;

    /** @type { Symbol.iterator } */
    [Symbol.iterator];

    constructor() {
        this.SALT = +process.env.BCRYPT_SALT;
        this[Symbol.iterator] = classIterator;
    }

}

export default BcryptEnv;