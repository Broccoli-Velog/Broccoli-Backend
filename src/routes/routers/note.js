import { Router } from "express";

import { tokenGuard } from "../../modules/_.loader.js"
import { NoteController } from "../controllers/_.export.js";

const noteRouter = Router();

noteRouter.route('')
    .get(NoteController.getNote)
    .post(tokenGuard, NoteController.postNote); 
noteRouter.route('/:noteId')
    .get(NoteController.getNoteByNoteId)
    .put(tokenGuard, NoteController.putNoteByNoteId)
    .delete(tokenGuard, NoteController.deleteNoteByNoteId)

export default noteRouter;