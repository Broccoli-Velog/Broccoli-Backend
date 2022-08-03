import Joi from "joi";

class CommentJoi {

    /** @type { Joi.NumberSchema } */
    static userId = Joi.number();
    
    /** @type { Joi.NumberSchema } */
    static noteId = Joi.number();
    
    /** @type { Joi.NumberSchema } */
    static commentId = Joi.number();

    /** @type { Joi.StrictSchema } */
    static content = Joi.string().min(1).max(100);

};


export default CommentJoi;