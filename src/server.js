import Express from "express";
import Cors from "cors";
import Morgan from "morgan";

import { BaseEnv } from "./models/_.loader.js";
import { AuthRouter, NoteRouter, CommentRouter, UserRouter } from "./routes/routers/_.export.js";

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

        this.app.use("/auth", AuthRouter);
        this.app.use("/user", UserRouter);
        this.app.use("/note", NoteRouter);
        this.app.use("/comment",CommentRouter );

        this.app.get("*", (req, res) => {
            return res.json("hello")
        });

        this.app.listen(baseEnv.PORT, () => console.log(`Server is running on ${baseEnv.PORT}, ${baseEnv.MODE}`));

        return this.app;

    }

}


export default App;