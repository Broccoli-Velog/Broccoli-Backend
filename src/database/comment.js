import db from "./index.js";

const searchUserQuery = async (userId) => {
    const [ sql ] = await db.query(`
        SELECT user_id FROM user U
        WHERE U.user_id = ${userId}
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

const query = async () => {
    const [ sql ] = await db.query(`
    SELECT 
        U.user_id,
        N.post_id,
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
    query,
}