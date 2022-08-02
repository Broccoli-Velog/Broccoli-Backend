import jwt from "jsonwebtoken";
import { JwtEnv } from "../../models/_.loader.js";

class JwtProvider {

    static SECRET;
    static ALGORITHM;

    constructor() {}

    /** @param { JwtEnv } jwtEnv */
    static initialize(jwtEnv) {

        this.SECRET = jwtEnv.SECRET;
        this.ALGORITHM = jwtEnv.ALGORITHM;
        
    }

    sign(payload) {

        return jwt.sign(payload, JwtProvider.SECRET, {
            algorithm: JwtProvider.ALGORITHM
        });

    }

    /**
     * JWT 를 분해합니다..
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