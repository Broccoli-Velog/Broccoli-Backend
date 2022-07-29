import jwt from "jsonwebtoken";


class JwtProvider {

    static SECRET;
    static JWT_ALGORITHM;

    constructor() {}

    static initialize(JWT_SECRET, JWT_ALGORITHM) {

        this.SECRET = JWT_SECRET;
        this.JWT_ALGORITHM = JWT_ALGORITHM;
        
    }

    sign(payload) {

        return jwt.sign(payload, JwtProvider.SECRET, {
            algorithm: JwtProvider.JWT_ALGORITHM
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