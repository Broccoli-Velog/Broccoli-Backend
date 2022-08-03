import { Router } from "express";

import * as userController from "../controllers/user.js";

const userRouter = Router();

userRouter.route("/:nickname")
    .get(userController.getUserNotes);

export default userRouter;