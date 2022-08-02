import { DatabaseProvider, EnvProvider, JwtProvider } from './modules/_.loader.js';
import BcryptProvider from './modules/providers/bcrypt.provider.js';
import App from './server.js';


export default (() => {

    const env = EnvProvider.getEnvInstance();

    JwtProvider.initialize(env.jwtEnv);
    BcryptProvider.initialize(env.bcryptEnv);
    DatabaseProvider.initialize(env.databaseEnv);
    
    DatabaseProvider.validateConnection();

    return App.getExpressInstance(env.baseEnv);
    
})();