import { Router } from "express";

import * as authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.route('')
    .get(authController.sample)
    .post(authController.sample);

export default authRouter;