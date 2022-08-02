import { JwtEnv, BaseEnv, BcryptEnv, DatabaseEnv, classIterator } from "../_.loader.js";

/**
 * `for ~ of` 문법에서 사용 가능한 `@iterable` 클래스입니다.
 * 
 * @property { JwtEnv } jwtEnv
 * @property { BaseEnv } baseEnv
 * @property { BcryptEnv } bcryptEnv
 * @property { DatabaseEnv } databaseEnv
 * @property { Symbol.iterator } [Symbol.iterator]
 */
class Env {

    /** @type { JwtEnv } */
    jwtEnv;

    /** @type { BaseEnv } */
    baseEnv;

    /** @type { BcryptEnv } */
    bcryptEnv;

    /** @type { DatabaseEnv } */
    databaseEnv;

    [Symbol.iterator];

    constructor() {

        this.jwtEnv = new JwtEnv();
        this.baseEnv = new BaseEnv();
        this.bcryptEnv = new BcryptEnv();
        this.databaseEnv = new DatabaseEnv();
        this[Symbol.iterator] = classIterator;

    }

    // 클래스가 클래스를 포함할때, 가장 강한 결합방식인 '참조' 의 방식

}

export default Env;