import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pg;


export const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

// Connect to the database
async function connectDB() {
    try {
        await client.connect();
        console.log('Database connected!');
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

connectDB();

export default client;
