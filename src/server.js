import Express from "express";
import Cors from "cors";
import Morgan from "morgan";

import authRouter from "./routes/routers/auth.js";
import noteRouter from "./routes/routers/note.js";
import commentRouter from "./routes/routers/comment.js";
import { BaseEnv } from "./models/_.loader.js";

class App {

    /** @type { Express } */
    static app;

    constructor() {

    }

    /**
     * @param { BaseEnv } baseEnv 
     * @returns { Express }
     */
    static getExpressInstance(baseEnv) {

        if (this.app) return this.app;

        this.app = Express();

        this.app.use(Morgan("dev"));
        this.app.use(Cors());

        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: true }));

        this.app.use('/auth', authRouter);
        this.app.use('/note', noteRouter);
        this.app.use('/comment', commentRouter);

        this.app.get('*', (req, res) => {
            return res.json('hello')
        });

        this.app.listen(baseEnv.PORT, () => console.log(`Server is running on ${baseEnv.PORT}, ${baseEnv.MODE}`));

        return this.app;

    }

}


export default App;