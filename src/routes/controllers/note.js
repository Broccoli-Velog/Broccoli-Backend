import Joi from "joi";
import Express from 'express';

import { JwtProvider, BcryptProvider, DatabaseProvider } from "../../modules/_.loader.js";
import * as utils from "../../modules/utils.js";


/** @param { Request } req @param { Response } res @param { NestFunction } next */
const postNote = async (req, res, next) => {
    
    try {

        const noteDto = await Joi.object({
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required(),
            userId : Joi.number().required()
        }).validateAsync({ ...req.body });

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            INSERT INTO note
                (title, content, fk_user_id)
                VALUES
                ("${noteDto.title}", "${noteDto.content}", ${noteDto.userId} );
        `);
        return res.status(201).json(
            utils.createJson(true, 'note 작성이 완료되었습니다', note));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

};


/** @param { Request } req @param { Response } res @param { NestFunction } next */
const getNote = async (req, res, next) => {

    try {

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            SELECT * FROM note
            LIMIT 12
        `);
        return res.status(200).json(
            utils.createJson(true, 'note 목록 보기가 완료되었습니다', note[0]));

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByNoteId = async (req, res, next) => {

    //const { noteId } = req.params;

    try {
        const noteDto = await Joi.object({
            noteId : Joi.number().required()
        }).validateAsync({ ...req.params });

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            SELECT * FROM note N
            WHERE N.note_id = ${noteDto.noteId}  
            LIMIT 1 
        `);
        if (note[0].length)
            return res.status(200).json(
                utils.createJson(true, '노트 보기 요청이 성공하였습니다.', note[0]));
        else  
            return res.status(404).json(
                utils.createJson(false, '존재하지 않는 글입니다.', { noteId }));


    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}





export {

    postNote,
    getNote,
    getNoteByNoteId

}