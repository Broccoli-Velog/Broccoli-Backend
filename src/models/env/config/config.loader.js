import dotenv from 'dotenv';

const parsed = dotenv.config({
    path: '.env.dev'
}).parsed;
parsed.NODE_ENV = process.env.NODE_ENV;

export default parsed;