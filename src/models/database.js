import pg from 'pg';

const connection = {
    database : process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT
}

const pool = new pg.Pool(connection);

pool.on('connect', () => {
    console.log("working")
})

