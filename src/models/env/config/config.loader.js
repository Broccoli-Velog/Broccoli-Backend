import dotenv from 'dotenv';

const MODE = process.env.NODE_ENV;

const parsed = dotenv.config({
    path: MODE === 'dev' ? '.env.dev' : '.env.prod'
}).parsed;

parsed.NODE_ENV = MODE;

export default parsed;