import jwt from "jsonwebtoken";
import { JwtEnv } from "../../models/_.loader.js";


/**
 * `JWT` 공급자 클래스입니다.
 * 
 * @property { string } SECRET
 * @property { string } ALGORITHM
 * @property { function } initialize
 * @method sign
 * @method verifyToken
 * @method decodeToken
 */
class JwtProvider {

    /** @type { string } */
    static SECRET;
    
    /** @type { string } */
    static ALGORITHM;

    constructor() {}

    /** @param { JwtEnv } jwtEnv */
    static initialize(jwtEnv) {

        this.SECRET = jwtEnv.SECRET;
        this.ALGORITHM = jwtEnv.ALGORITHM;
        
    }

    /**
     * 전달 받은 `문자열` 혹은 `객체` 를 기반으로 JWT 를 반환합니다. 
     * 
     * @param { string | object } payload 
     * @returns { string }
     */
    sign(payload) {

        return jwt.sign(payload, JwtProvider.SECRET, {
            algorithm: JwtProvider.ALGORITHM
        });

    }

    /**
     * JWT 를 분해합니다.
     * 
     * 유효한 토큰인지는 확인하며, 유효하지 않을 시 에러가 발생됩니다.
     * 
     * @param {*} token 
     * @returns payload: Object
     * @throws `JsonWebTokenError`: invalid signature
     */
    verifyToken(token) {

        return jwt.verify(token, JwtProvider.SECRET);

    }

    /**
     * JWT 를 분해합니다.
     * 
     * 유효한 토큰인지는 확인하지 않습니다.
     * 
     * @param {*} token 
     * @returns payload: Object
     */
    decodeToken(token) {

        return jwt.decode(token);

    }


    

}


export default JwtProvider;