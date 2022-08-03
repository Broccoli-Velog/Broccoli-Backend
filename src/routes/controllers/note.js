import Joi from "joi";
import Express from 'express';

import { JwtProvider, BcryptProvider, DatabaseProvider } from "../../modules/_.loader.js";
import * as utils from "../../modules/utils.js";

const postNote = async (req, res, next) => {
    
    try {

        const noteDto = await Joi.object({
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required()
        }).validateAsync({ ...req.body });

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            INSERT INTO note
                (title, content, image, fk_user_id)
                VALUES
                ("${noteDto.title}", "${noteDto.content}", ${image}, "${userId}" );
        `);
        return res.status(201).json(
            utils.createJson(true, 'note 작성이 완료되었습니다', note));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

};

const getNote = async (req, res, next) => {

    try {

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            SELECT * FROM note
        `);
        return note;

    } catch {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByNoteId = async (req, res, next) => {

    const { noteId } = req.params;

    try {

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            SELECT * FROM note N
            WHERE N.note_id = ${note_id}
        `);

        if (note.length)
            return res.status(200).json(
                utils.createJson(true, '노트 보기 요청이 성공하였습니다.', note));
        else  
            return res.status(404).json(
                utils.createJson(false, '존해하지 않는 글입니다.', { noteId }));


    } catch {

        console.error(err);
        return res.json(err.message);

    }

}





export {

    postNote,
    getNote,
    getNoteByNoteId

}