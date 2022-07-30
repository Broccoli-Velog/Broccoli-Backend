import { Router } from "express";

import * as noteController from "../controllers/note.js";

const noteRouter = Router();

noteRouter.route('/')
    .post(noteController.noteCreate)
    .get(noteController.noteView);

export default noteRouter;