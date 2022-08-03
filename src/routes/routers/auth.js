import { Router } from "express";

import { tokenGuard } from "../../modules/_.loader.js";
import { AuthController } from "../controllers/_.export.js";

const authRouter = Router();

authRouter.route("")
    .get(tokenGuard, AuthController.getProfile)
    .patch(tokenGuard, AuthController.patchAuth)
    .delete(tokenGuard, AuthController.deleteAuth);
    
authRouter.route("/register")
    .post(AuthController.register);

authRouter.route("/login")
    .post(AuthController.login);

export default authRouter;