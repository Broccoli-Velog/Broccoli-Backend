import { Router } from "express";

import * as noteController from "../controllers/note.js";

const noteRouter = Router();

authRotuer.route('')
    .get(noteController.sample)
    .post(noteController.sample);

export default noteRouter;