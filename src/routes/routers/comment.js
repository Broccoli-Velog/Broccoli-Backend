import { Router } from "express";

import * as commentController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.route('/create/:noteId')
    .post(commentController.commentCreate);
commentRouter.route("/delete/:commentId")
    .delete(commentController.commentDelete);

export default commentRouter;