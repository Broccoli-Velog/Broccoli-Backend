import { Router } from "express";

import * as userController from "../controllers/user.js";
import { UserController } from "../controllers/_.export.js";


const userRouter = Router();

userRouter.route("/:nickname")
    .get(UserController.getUserNotes);

export default userRouter;