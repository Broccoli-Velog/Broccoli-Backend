import Joi from "joi";

class UserJoi {

    static email = Joi.string().min(1).max(40)
    static nickname = Joi.string().min(1).max(10)
    static password = Joi.string().min(1).max(30)
    
}


export default UserJoi;