import 'dotenv/config';
import Express from 'express';
import Cors from 'cors';
import Morgan from 'morgan';

import authRouter from './routes/routers/auth.js';
import noteRouter from './routes/routers/note.js';
import commentRouter from "./routes/routers/comment.js";
import { JwtProvider } from './modules/_.loader.js';
import BcryptProvider from './modules/providers/bcrpyt.provider.js';

const app = Express();

const MODE = process.env.NODE_ENV;
const PORT = MODE === 'dev' ? 3000 : 4000;

const DB_HOST = process.env.DB_HOST;
const DB_ID = process.env.DB_ID;
const DB_NAME = process.env.DB_NAME;
const DB_PW = process.env.DB_PW;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
const BCRYPT_SALT = process.env.BCRYPT_SALT;

JwtProvider.initialize(JWT_SECRET, JWT_ALGORITHM);
BcryptProvider.initialize(BCRYPT_SALT);

app.use(Morgan('dev'));
app.use(Cors());

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/note', noteRouter);
app.use('/comment', commentRouter);

app.get('*', (req, res) => {
    return res.json('hello')
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// @deprecated
// try {
//     const isConnected = await validatePoolConnection(pool);
//     if (isConnected) {
//         app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
//     }
// } catch(err) {
//     console.log(err);
// }