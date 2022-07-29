import Joi from 'joi';

import { JwtProvider } from '../../modules/_.loader.js';
import { UserJoi, UserModel } from '../../models/_.loader.js';

const register = async (req, res, next) => {

    const { email, nickname, password } = req.body;

    try {

        const userModel = await Joi.object({

            email: UserJoi.email.required(),
            nickname: UserJoi.nickname.required(),
            password: UserJoi.password.required()

        }).validateAsync({ email, nickname, password });

        return res.json(userModel);

    } catch(err) {

        return res.json(err.message);

    }

};

const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const userModel = await Joi.object({

            email: UserJoi.email.required(),
            password: UserJoi.password.required()

        }).validateAsync({ email, password });

        return res.json(userModel);

    } catch(err) {

        return res.json(err.message);

    }


};

export {

    register,
    login
    
}