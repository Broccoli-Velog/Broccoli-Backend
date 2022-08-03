import { Router } from "express";

import { tokenGuard } from "../../modules/_.loader.js";
import { CommentController } from "../controllers/_.export.js";

const commentRouter = Router();

commentRouter.route('')
    .post(tokenGuard, CommentController.createComment);

commentRouter.route('/:commentId')
    .put(tokenGuard, CommentController.putComment)
    .delete(tokenGuard, CommentController.deleteComment);


export default commentRouter;