import * as commentQuery from '../../database/comment.js';

import * as utils from '../../models/utils.js';

const nickname = '관리자';

const commentCreate = async (req, res, next) => {
    const userId = 2; // token decoded
    const noteId = req.params.noteId;
    const { content } = req.body;
    try {
        if (!nickname || !noteId || content.length === 0) return res.status(404).json(utils.createJson(false, 'Request userId or body is not found'));
        const user = await commentQuery.searchUserQuery(nickname);
        if (user.length <= 0) return res.status(404).json(false, 'User is not found');
        const comment = await commentQuery.createCommentQuery(content, noteId, user.id);
        return res.status(201).json(utils.createJson(true, 'Comment is create', comment));
    } catch (err) { 
        console.error(err);
        return res.json(err.message);
    }
};

const commentDelete = async (req, res, next) => {
    const userId = 2; // token decoded
    const commentId = req.params.commentId;
    try {
        if (!commentId) return res.status(404).json(utils.createJson(false, 'CommentId is not found'));
        const [ comment ] = await commentQuery.searchCommentQuery(commentId); // comment 작성자 { fk_user_id:  }
        if (userId !== comment.fk_user_id) return res.status(404).json(utils.createJson(false, 'Not your comment'));
        const remove = await commentQuery.deleteCommentQuery(commentId);
        return res.status(200).json(utils.createJson(true, 'Comment delete success', remove));
    } catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

const commentUpdate = async (req, res, next) => {
    const userId = 2; // token decoded
    const commentId = req.params.commentId;
    const { content } = req.body;
    try {
        if (!commentId || content.length <= 0) return res.status(404).json(utils.createJson(false, 'CommentId is not found'));
        const [ comment ] = await commentQuery.searchCommentQuery(commentId); // comment 작성자 { fk_user_id:  }
        if (userId !== comment.fk_user_id) return res.status(404).json(utils.createJson(false, 'Not your comment'));
        const update = await commentQuery.updateCommentQuery(commentId, content);
        return res.status(200).json(utils.createJson(true, 'Comment update success', update));
    } catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

export {
    commentCreate,
    commentDelete,
    commentUpdate,
};