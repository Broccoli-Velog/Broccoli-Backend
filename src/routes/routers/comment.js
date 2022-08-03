import { Router } from "express";

import { tokenGuard } from "../../modules/_.loader.js";
import * as commentController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.route('')
    .post(tokenGuard, commentController.createComment);

commentRouter.route('/:commentId')
    .put(tokenGuard, commentController.putComment)
    .delete(tokenGuard, commentController.deleteComment);

// commentRouter.route('/create/:noteId')
//     .post(tokenGuard, commentController.commentCreate);

// commentRouter.route("/delete/:commentId")
//     .delete(tokenGuard, commentController.commentDelete);

// commentRouter.route("/update/:commentId")
//     .put(tokenGuard, commentController.commentUpdate);

export default commentRouter;