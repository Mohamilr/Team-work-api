import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT
};

const pool = new pg.Pool(connection);

pool.on('connect', () => {})

// user table
const userTable = async () => {
    const userTableQuery = `CREATE TABLE IF NOT EXISTS
    users(
        user_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        gender VARCHAR(20) NOT NULL,
        job_role VARCHAR(50) NOT NULL,
        department VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL
    )`;

    try {
        await pool.query(userTableQuery);
        console.log('user table created')
    }
    catch (e) {
        console.log(e)
    }
};

// gif table
const gifTable = async () => {
    const gifTableQuery = `CREATE TABLE IF NOT EXISTS
    gifs(
        gif_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        image IMAGE NOT NULL,
        title VARCHAR(50) NOT NULL,
        user_id INTEGER NOT NULL,
        created_on DATE NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`;

    try{
        await pool.query(gifTableQuery)
        console.log('gif table created');
    }
    catch(e) {
        console.log(e)
    }
}

// article table
const articleTable = async () => {
    const articleTableQuery = `CREATE TABLE IF NOT EXISTS
    articles(
        articles_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        title VARCHAR(100) NOT NULL,
        article (500) NOT NULL,
        user_id INTEGER NOT NULL,
        created_on DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`

    try{
        await pool.query(articleTableQuery);
        console.log('article table created')
    }
    catch(e) {
        console.log(e)
    }
};


const articleCommentTable = () => {
    const articleCommentTableQuery = `CREATE TABLE IF NOT EXISTS
    article_comments(
        comment_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        comment VARCHAR(200) NOT NULL,
        created_on DATE NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`

    try{
        await pool.query(articleCommentTableQuery);
        console.log('comment table created')
    }
    catch(e) {
        console.log(e)
    }
}


const gifCommentTable = () => {
    const gifCommentTableQuery = `CREATE TABLE IF NOT EXISTS
    gif_comments(
        comment_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        comment VARCHAR(200) NOT NULL,
        created_on DATE NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(user_id) 
    )`

    try{
        await pool.query(gifCommentTableQuery);
        console.log('comment table created')
    }
    catch(e) {
        console.log(e)
    }
}

// const dropTable = async () => {
//     const dropTableQuery = `DROP TABLE IF EXISTS`
//     try{
//         await pool.query(dropTableQuery)
//         console.log('table dropped')
//     }
//     catch(e) {
//         console.log(e)
//     }
// }

// user
userTable();
// gif
gifTable();
// article
articleTable();
// article comment
articleCommentTable();
// gif comment
gifCommentTable();
// dropTable();
// dropTable();


export default pool;