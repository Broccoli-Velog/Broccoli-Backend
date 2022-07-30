import db from "./index.js";

const searchUserQuery = async (nickname) => {
    const [ sql ] = await db.query(`
        SELECT nickname FROM user U
        WHERE U.nickname = "${nickname}"
    `);
    return sql;
};

const createCommentQuery = async (content, fk_post_id, fk_user_id) => {
    const [ sql ] = await db.query(`
        INSERT INTO comment
            (content, fk_post_id, fk_user_id)
            VALUES
            ("${content}", ${fk_post_id}, ${fk_user_id})
    `);
    return sql;
}

const searchCommentQuery = async (comment_id) => {
    const [ sql ] = await db.query(`
        SELECT fk_user_id FROM comment C
        WHERE C.comment_id = ${comment_id}
    `);
    return sql;
}

const deleteCommentQuery = async (comment_id) => {
    const [ sql ] = await db.query(`
        DELETE FROM comment C
        WHERE C.comment_id = ${comment_id}
    `);
    return sql;
}

const updateCommentQuery = async (comment_id, content) => {
    const [ sql ] = await db.query(`
        UPDATE comment
        SET content = "${content}"
        WHERE comment_id = ${comment_id}
    `);
    return sql;
}

const query = async () => {
    const [ sql ] = await db.query(`
    SELECT 
        U.user_id,
        C.comment_id
    FROM user U
    JOIN note N
    ON U.user_id = N.fk_user_id
    RIGHT OUTER JOIN comment C
	ON U.user_id = C.fk_user_id;
    `);
    return sql;
}

export {
    searchUserQuery,
    createCommentQuery,
    searchCommentQuery,
    updateCommentQuery,
    deleteCommentQuery,
    query,
}