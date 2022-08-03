import { Router } from "express";

import * as noteController from "../controllers/note.js";
import {tokenGuard} from "../../modules/_.loader.js"

const noteRouter = Router();

noteRouter.route('')
    .get(noteController.getNote)
    .post(tokenGuard, noteController.postNote);
noteRouter.route('/:noteId')
    .get(noteController.getNoteByNoteId)

export default noteRouter;