import Bcrypt from "bcrypt";
import { BcryptEnv } from "../../models/_.loader.js";

/**
 * `암호화` 공급자 클래스 입니다.
 * 
 * @property { number } SALT
 * @property { function } initialize
 * @method hashPassword
 * @method isCorrectPassword
 */
class BcryptProvider {

    /** @type { number } */
    static SALT;
    
    constructor() {}

    /** @param { BcryptEnv } bcryptEnv */
    static initialize(bcryptEnv) {
        this.SALT = bcryptEnv.SALT;
    }

    /**
     * 입력 받은 비밀 번호를 `암호화` 가 완료된 비밀 번호로 변경하여 리턴합니다.
     * 
     * @param { string } password 비밀번호
     * @returns { string }
     */
    async hashPassword(password) {

        return await Bcrypt.hash(password, BcryptProvider.SALT);

    }

    /**
     * 입력 받은 비밀 번호와 DB 상의 비밀 번호를 비교하여 ture / false 를 반환합니다.
     * 
     * @param { string } password 비밀번호
     * @param { string } hashedPassword 암호화된 비밀번호
     * @returns { boolean }
     */
    async isCorrectPassword(password, hashedPassword) {

        return await Bcrypt.compare(password, hashedPassword);

    }

}


export default BcryptProvider;