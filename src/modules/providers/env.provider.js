import { Env } from "../../models/_.loader.js";

/**
 * `환경변수` 공급자 클래스입니다.
 * 
 * @property { Env } env
 * @property { function } getEnvInstance
 * @property { function } validateEnvInstance
 */
class EnvProvider {

    /** @type { Env } */
    static env;

    constructor() {}

    /** @returns { Env } */
    static getEnvInstance() {
        if (this.env) return this.env;

        const env = new Env();
        this.validateEnvInstance(env);

        this.env = env;
        return this.env;
    }

    /** @param { Env } env */
    static validateEnvInstance(env) {

        for (const val of env) {

            if (typeof val === 'object')
                for (const v of val) {
                    if (v === '' || v === undefined)
                        throw new Error('Empty Environment Values');

                }

            else if (val === '' || val === undefined)
                throw new Error('Empty Environment Values');

        }

    }

}

export default EnvProvider;