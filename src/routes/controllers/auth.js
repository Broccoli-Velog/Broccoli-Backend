import Joi from "joi";

import { JwtProvider, BcryptProvider, DatabaseProvider } from "../../modules/_.loader.js";
import { UserJoi, UserModel } from "../../models/_.loader.js";

import * as utils from "../../modules/utils.js";

/** @param { Request } req @param { Response } res @param { NestFunction } next */
const register = async (req, res, next) => {

    const { email, nickname, password } = req.body;

    try {

        const userModel = await Joi.object({
            email: UserJoi.email.required(),
            nickname: UserJoi.nickname.required(),
            password: UserJoi.password.required()
        }).validateAsync({ email, nickname, password });
        
        const bcryptProvider = new BcryptProvider();

        const hashedPassword = await bcryptProvider.hashPassword(userModel.password)

        const IS_EXISTS = `SELECT
                                (CASE
                                    WHEN count(user_id) = 0 THEN false
                                    ELSE true
                                END) as is_exists
                            FROM broccoli.user
                            WHERE email = "${email}" OR nickname = "${nickname}";`;

        const connection = await new DatabaseProvider().getConnection();

        const [ [ { is_exists } ] ] = await connection.query(IS_EXISTS);
        if (Boolean(is_exists)) {

            return res.status(403).json(utils.createJson(false, "이메일 및 닉네임이 중복된 사용자가 존재합니다.", {}));

        } else {

            const INSERT = `INSERT INTO user (email, nickname, password) VALUES ("${email}", "${nickname}", "${hashedPassword}");`;

            const [ ResultSetHeader ] = await connection.query(INSERT);
            return res.status(201).json(utils.createJson(true, "회원가입에 성공하였습니다.", {
                email: userModel.email,
                nickname: userModel.nickname
            }));

        }

    } catch(err) {

        return res.status(400).json(utils.createJson(false, `${err.name} : ${err.message}`));

    }

};

/** @param { Request } req @param { Response } res @param { NestFunction } next */
const login = async (req, res, next) => {
    
    const { email, password } = req.body;

    try {

        const userModel = await Joi.object({

            email: UserJoi.email.required(),
            password: UserJoi.password.required()

        }).validateAsync({ email, password });

        const FIND = `SELECT user_id as userId, nickname, password FROM user WHERE email = "${email}" LIMIT 1;`;
        
        const connection = await new DatabaseProvider().getConnection();

        const [ [ Result ] ] = await connection.query(FIND);
        if (!Result)
            return res.status(404).json(utils.createJson(false, "존재하지 않는 사용자입니다.", { email }));

        const bcryptProvider = new BcryptProvider();
        const isCorrectPassword = await bcryptProvider.isCorrectPassword(password, Result.password);
        if (!isCorrectPassword)
            return res.status(400).json(utils.createJson(false, "비밀번호가 일치하지 않습니다.", { email }));
        
        const jwtProvider = new JwtProvider();
        const token = jwtProvider.sign({ userId: Result.userId, nickname: Result.nickname });

        return res.status(201).json(utils.createJson(true, "로그인에 성공하셨습니다.", { email, nickname: Result.nickname }, token ));

    } catch(err) {

        return res.status(400).json(utils.createJson(false, `${err.name} : ${err.message}`));
    }


};

export {

    register,
    login
    
}