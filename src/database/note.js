import db from "./index.js";


/**
 * 
 * @param {{ title: string, content: string }} noteDto 
 * @returns {Promise<*>}
 */
const postNoteQuery = async (noteDto) => {
    const image = null;
    const userId = 2;
    const [ sql ] = await db.query(`
        INSERT INTO note
            (title, content, image, fk_user_id)
            VALUES
            ("${noteDto.title}", "${noteDto.content}", ${image}, "${userId}" );
    `);
    return sql;
}

const getNoteQuery = async () => {
    const [ sql ] = await db.query(`
        SELECT * FROM note
    `);
    return sql;
}

const getNoteByNoteIdQuery = async (note_id) => {
    const [ sql ] = await db.query(`
        SELECT * FROM note N
        WHERE N.note_id = ${note_id}
    `);
    return sql;
}

const putNoteByNoteIdQuery = async (note_id, title, content) => {
    const [ sql ] = await db.query(`
        
    `);
    return ;
}

const deleteNoteByNoteIdQuery = async (note_id) => {
    const [ sql ] = await db.query(`
        
    `);
    return ;
}

export {
    postNoteQuery,
    getNoteQuery,
    getNoteByNoteIdQuery,
    putNoteByNoteIdQuery,
    deleteNoteByNoteIdQuery
}
