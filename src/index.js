import 'dotenv/config';
import Express from 'express';
import Morgan from 'morgan';

import authRouter from './routes/routers/auth.js';
import noteRouter from './routes/routers/note.js';
import JwtProvider from './modules/jwt.provider.js';

import { getPoolInstance, validatePoolConnection } from './db.js';

const app = Express();

const MODE = process.env.NODE_ENV;
const PORT = MODE === 'dev' ? 3000 : 4000;

const DB_HOST = process.env.DB_HOST;
const DB_ID = process.env.DB_ID;
const DB_NAME = process.env.DB_NAME;
const DB_PW = process.env.DB_PW;

const JWT_SECRET = process.env.JWT_SECRET;
JwtProvider.initialize(JWT_SECRET);

const pool = getPoolInstance(MODE, DB_HOST, DB_ID, DB_NAME, DB_PW);

app.use(Morgan('dev'));

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/note', noteRouter);

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