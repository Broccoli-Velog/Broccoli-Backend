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
            userId : Joi.number().required()    //요청할 때 jwt토큰 넣어서보낸걸 토큰가드에서 해석해서 바디에 넣음.
        }).validateAsync({ ...req.body });

        const db = await new DatabaseProvider().getConnection();
        const note = await db.query(`
            INSERT INTO note
                (title, content, fk_user_id)
                VALUES
                ("${noteDto.title}", "${noteDto.content}", ${noteDto.userId} );
        `);
        return res.status(201).json(
            utils.createJson(true, '게시글 작성 요청이 성공하였습니다', note));
    
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
            utils.createJson(true, '게시글 목록 보기 요청이 성공하였습니다.', note[0]));

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByNoteId = async (req, res, next) => {

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

        const comment = await db.query(`
            SELECT * FROM comment C
            WHERE C.fk_note_id = ${noteDto.noteId}  
        `);

        if (note[0].length)
            return res.status(200).json(
                utils.createJson(true, '게시글 상세 보기 요청이 성공하였습니다.', { note : note[0], comment : comment[0]} ));
        else  
            return res.status(404).json(
                utils.createJson(false, '존재하지 않는 게시글입니다.', { noteId : noteDto.noteId }));


    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const putNoteByNoteId = async (req, res, next) => {

        try {
        const noteDto = await Joi.object({
            noteId : Joi.number().required(),
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required(),
            userId : Joi.number().required()
        }).validateAsync({ ...req.params, ...req.body });

        const db = await new DatabaseProvider().getConnection();

        const IS_NOTE_EXIST = await db.query(`
            SELECT * FROM note N
            WHERE N.note_id = ${noteDto.noteId}  
            LIMIT 1 
        `);
        if (!IS_NOTE_EXIST[0].length)
            return res.status(404).json(
                utils.createJson(false, '존재하지 않는 게시글입니다.', { noteId : noteDto.noteId }));          

        const note = await db.query(`
            UPDATE note N
            SET N.title = "${noteDto.title}", N.content = "${noteDto.content}"
            WHERE N.note_id = ${noteDto.noteId}
            LIMIT 1 
        `);

        if (note[0].affectedRows === 1)
            return res.status(200).json(
                utils.createJson(true, '게시글 수정이 성공하였습니다.', note[0]));
        else  
            return res.status(400).json(
                utils.createJson(false, '게시글 수정이 실패하였습니다.', { noteId : noteDto.noteId }));


    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }
}

const deleteNoteByNoteId = async (req, res, next) => {

    try {
        const noteDto = await Joi.object({
            noteId : Joi.number().required(),
            userId : Joi.number().required()
        }).validateAsync({ ...req.params, ...req.body });

        const db = await new DatabaseProvider().getConnection();

        const IS_NOTE_EXIST = await db.query(`
            SELECT * FROM note N
            WHERE N.note_id = ${noteDto.noteId}  
            LIMIT 1 
        `);
        if (!IS_NOTE_EXIST[0].length)
            return res.status(404).json(
                utils.createJson(false, '존재하지 않는 게시글입니다.', { noteId : noteDto.noteId }));          

        const note = await db.query(`
            DELETE FROM note N
            WHERE N.note_id = ${noteDto.noteId}
            LIMIT 1 
        `);

        console.log(note);

        if (note[0].affectedRows === 1)
            return res.status(200).json(
                utils.createJson(true, '게시글 삭제가 성공하였습니다.', note[0]));
        else  
            return res.status(400).json(
                utils.createJson(false, '게시글 삭제가 실패하였습니다.', { noteId : noteDto.noteId }));


    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }
}



export {

    postNote,
    getNote,
    getNoteByNoteId,
    putNoteByNoteId,
    deleteNoteByNoteId

}