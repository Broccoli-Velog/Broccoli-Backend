import jwt from "jsonwebtoken";

class JwtProvider {

    static SECRET;

    constructor() {}

    static initialize(JWT_SECRET) {

        this.SECRET = JWT_SECRET;
        
    }
    

}

export default JwtProvider;