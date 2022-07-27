import { Router } from "express";

import * as authController from "../controllers/auth.js";

const authRotuer = Router();

authRotuer.route('')
    .get(authController.sample)
    .post(authController.sample);

export default authRotuer;