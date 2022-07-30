import * as noteQuery from "../../database/note.js";
import * as utils from "../../modules/utils.js";

const noteCreate = async (req, res, next) => {

    const { title, content } = req.body;

    try {
        const note = await noteQuery.createNoteQuery(title, content);
        console.log(note);
    }
    catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

const noteView = async (req, res, next) => {
    return res.json("이건 아직 안함");
}





export {

    noteCreate,
    noteView

}