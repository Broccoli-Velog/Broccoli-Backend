import { JwtProvider } from "../_.loader.js";
import * as util from "../utils.js";

/**
 * req.headers.authorization 에 담긴 토큰이 유효하면,
 * req.body.userId 을 채워넣습니다.
 * 
 * @param { Request } req
 * @param { Response } res 
 * @param { NextFunction } next
 */
const tokenGuard = (req, res, next) => {

    const authorization = req?.headers?.authorization;

    if (!authorization)
        return res.status(401).json(
            util.createJson(false, "token 이 누락되었습니다."));

    const jwtProvider = new JwtProvider();
    const token = jwtProvider.extract(authorization);

    try {

        const payload = jwtProvider.verifyToken(token);

        // console.log(payload);
        req.body.userId = +payload?.userId ?? undefined;

        return next();

    } catch (err) {

        return res.status(401).json(
            util.createJson(false, `${err.name} : ${err.message}`));

    }

}

export default tokenGuard;