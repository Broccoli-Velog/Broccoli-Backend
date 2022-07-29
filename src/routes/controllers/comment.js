import * as commentQuery from "../../database/comment.js";

import * as utils from "../../modules/utils.js";

const commentCreate = async (req, res, next) => {
    // userId => token decode
    const noteId = req.params.noteId;
    const { content } = req.body;
    try {
        if (!userId || !noteId || content.length === 0) return res.status(404).json(utils.createJson(false, 'Request userId or body is not found'));
        const user = await commentQuery.searchUserQuery(userId);
        if (user.length <= 0) return res.status(404).json(false, 'User is not found');
        const comment = await commentQuery.createCommentQuery(content, noteId, 2);
        return res.status(201).json(utils.createJson(true, 'Comment is create', comment));
    } catch (err) { 
        console.error(err);
        return res.json(err.message);
    }
};

const commentDelete = async (req, res, next) => {
    try {
        // userId => token decode
        const commentId = req.params.commentId;
    } catch (err) {
        console.error(err);
        return res.json(err.message);
    }
}

export {
    commentCreate,
    commentDelete,
}