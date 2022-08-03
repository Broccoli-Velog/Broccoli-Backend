import Joi from "joi";

import { JwtProvider, DatabaseProvider } from "../../modules/_.loader.js";
import { CommentJoi } from "../../models/_.loader.js";

import * as commentQuery from "../../database/comment.js";
import * as utils from "../../modules/utils.js";


const nickname = "관리자";

const createComment = async (req, res, next) => {

    const { userId, noteId, content } = req.body;

    try {

        await Joi.object({
            userId: CommentJoi.userId.required(),
            noteId: CommentJoi.noteId.required(),
            content: CommentJoi.content.required()
        }).validateAsync({ userId, noteId, content });

        const IS_EXISTS = `SELECT
                                (CASE
                                    WHEN count(user_id) = 0 THEN false
                                    ELSE true
                                END) as is_exists
                            FROM broccoli.user
                            WHERE user_id = ${userId};`;

        const connection = await new DatabaseProvider().getConnection();
    
        const [ [ { is_exists } ] ] = await connection.query(IS_EXISTS);

        if (Boolean(!is_exists)) {

            return res.status(404).json(
                utils.createJson(false, "존재하지 않는 사용자입니다."));

        } else {

            const INSERT_QUERY = `INSERT INTO comment (content, fk_note_id, fk_user_id) VALUES ('${content}', ${noteId}, ${userId});`;

            const [ ResultSetHeader ] = await connection.query(INSERT_QUERY);
            return res.status(201).json(
                utils.createJson(true, '게시글 작성에 성공하셨습니다.', { userId, noteId, content, commentId: ResultSetHeader.insertId }));

        }

    } catch (err) { 

        return res.status(400).json(utils.createJson(false, `${err.name} : ${err.message}`));

    }
};

const deleteComment = async (req, res, next) => {

    const {
        body: { userId },
        params: { commentId }
    } = req;

    try {
        
        await Joi.object({
            userId: CommentJoi.userId.required(),
            commentId: CommentJoi.commentId.required()
        }).validateAsync({ userId, commentId });

        const connection = await new DatabaseProvider().getConnection();


        const IS_EXISTS = `SELECT
                        (CASE
                            WHEN count(user_id) = 0 THEN false
                            ELSE true
                        END) as is_exists
                    FROM broccoli.user
                    WHERE user_id = ${userId};`;

        const [ [ { is_exists } ] ] = await connection.query(IS_EXISTS);

        if (Boolean(!is_exists))
            return res.status(404).json(
                utils.createJson(false, "존재하지 않는 사용자입니다."));

        const SELECT_COMMENT_BY_COMMENTID = `SELECT fk_user_id as fkUserId FROM comment WHERE comment_id = ${commentId};`;
        
        const [ Result ] = await connection.query(SELECT_COMMENT_BY_COMMENTID);
        if (Result.length === 0)
            return res.status(404).json(
                utils.createJson(false, '존재하지 않는 댓글입니다.'));
                
        if (Result[0].fkUserId !== userId)
            return res.status(401).json(
                utils.createJson(false, '해당 댓글의 삭제 권한이 없는 사용자입니다.'));

        const DELETE_COMMENT_BY_COMMENTID_AND_USERID = `DELETE FROM comment WHERE comment_id = ${commentId} AND fk_user_id = ${userId};`;
        const [ ResultSetHeader ] = await connection.query(DELETE_COMMENT_BY_COMMENTID_AND_USERID);
        if (ResultSetHeader.affectedRows > 0)
            return res.status(200).json(
                utils.createJson(true, "댓글이 삭제가 완료되었습니다."));

    } catch (err) {

        return res.status(400).json(utils.createJson(false, `${err.name} : ${err.message}`));
    }
}

const putComment = async (req, res, next) => {

    const {
        body: { userId, content },
        params: { commentId }
    } = req;

    try {
        await Joi.object({
            userId: CommentJoi.userId.required(),
            content: CommentJoi.content.required(),
            commentId: CommentJoi.commentId.required()
        }).validateAsync({ userId, content, commentId });

        const connection = await new DatabaseProvider().getConnection();

        const IS_EXISTS = `SELECT
                        (CASE
                            WHEN count(user_id) = 0 THEN false
                            ELSE true
                        END) as is_exists
                    FROM broccoli.user
                    WHERE user_id = ${userId};`;

        const [ [ { is_exists } ] ] = await connection.query(IS_EXISTS);

        if (Boolean(!is_exists))
            return res.status(403).json(
                utils.createJson(false, "존재하지 않는 사용자입니다."));

        const SELECT_COMMENT_BY_COMMENTID = `SELECT fk_user_id as fkUserId FROM comment WHERE comment_id = ${commentId};`;
        
        const [ Result ] = await connection.query(SELECT_COMMENT_BY_COMMENTID);
        if (Result.length === 0)
            return res.status(404).json(
                utils.createJson(false, '존재하지 않는 댓글입니다.'));
                
        if (Result[0].fkUserId !== userId)
            return res.status(403).json(
                utils.createJson(false, '해당 댓글의 수정 권한이 없는 사용자입니다.'));
        
        const UPDATE_COMMENT = `UPDATE comment SET content = "${content}" WHERE comment_id = ${commentId};`;

        const [ ResultSetHeaderOfPut ] = await connection.query(UPDATE_COMMENT);

        if (ResultSetHeaderOfPut !== 0)
                return res.status(200).json(
                    utils.createJson(true, '댓글이 수정되었습니다.', { userId, commentId, content }));

        // if (!commentId || content.length <= 0) return res.status(404).json(utils.createJson(false, "CommentId is not found"));
        // const [ comment ] = await commentQuery.searchCommentQuery(commentId); // comment 작성자 { fk_user_id:  }
        // if (userId !== comment.fk_user_id) return res.status(404).json(utils.createJson(false, "Not your comment"));
        // const update = await commentQuery.updateCommentQuery(commentId, content);
        return res.status(200).json(utils.createJson(true, "Comment update success", update));

    } catch (err) {

        return res.status(400).json(utils.createJson(false, `${err.name} : ${err.message}`));

    }
}

export {

    createComment,
    deleteComment,
    putComment

}