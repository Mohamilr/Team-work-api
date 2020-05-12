import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// connect to database
const connection = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
};

// pool
const pool = new pg.Pool(connection);

pool.on('connect', () => {})

// user table
const userTable = async () => {
    const userTableQuery = `CREATE TABLE IF NOT EXISTS
    employee(
        authorId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(200) NOT NULL,
        gender VARCHAR(20) NOT NULL,
        jobRole VARCHAR(50) NOT NULL,
        department VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL
    )`;

    try {
        await pool.query(userTableQuery);
        console.log('employee table created')
    }
    catch (e) {
        console.log(e)
    }
};

// article table
const articleTable = async () => {
    const articleTableQuery = `CREATE TABLE IF NOT EXISTS
    articles(
        articleId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        title VARCHAR(100) NOT NULL,
        article VARCHAR(5000) NOT NULL,
        authorId INT NOT NULL,
        createdOn VARCHAR(50) NOT NULL,
        FOREIGN KEY(authorId) REFERENCES employee(authorId)  ON DELETE CASCADE ON UPDATE CASCADE
    )`;

    try{
        await pool.query(articleTableQuery);
        console.log('article table created');
    }
    catch(e) {
        console.log(e)
    }
};

// article comment table
const articleCommentTable = async () => {
    const articleCommentTableQuery = `CREATE TABLE IF NOT EXISTS
    article_comments(
        commentId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        comment VARCHAR(300) NOT NULL,
        createdOn VARCHAR(50) NOT NULL,
        authorId INT NOT NULL,
        articleId INT NOT NULL,
        FOREIGN KEY(articleId) REFERENCES articles(articleId),
        FOREIGN KEY(authorId) REFERENCES employee(authorId)
    )`;

    try{
        await pool.query(articleCommentTableQuery);
        console.log('article comment table created')
    }
    catch(e) {
        console.log(e)
    }
};

// gif table
const gifTable = async () => {
    const gifTableQuery = `CREATE TABLE IF NOT EXISTS
    gifs(
        gifId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        image VARCHAR(500) NOT NULL,
        gifTitle VARCHAR(50) NOT NULL,
        gifAuthorId INT NOT NULL,
        gifCreatedOn VARCHAR(50) NOT NULL,
        FOREIGN KEY(gifAuthorId) REFERENCES employee(authorId) ON DELETE CASCADE ON UPDATE CASCADE
    )`;

    try{
        await pool.query(gifTableQuery)
        console.log('gif table created');
    }
    catch(e) {
        console.log(e)
    }
};

// gif comment table
const gifCommentTable = async () => {
    const gifCommentTableQuery = `CREATE TABLE IF NOT EXISTS
    gif_comments(
        commentId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        comment VARCHAR(300) NOT NULL,
        createdOn VARCHAR(50) NOT NULL,
        authorId INT NOT NULL,
        gifId INT NOT NULL,
        FOREIGN KEY(gifId) REFERENCES gifs(gifId),
        FOREIGN KEY(authorId) REFERENCES employee(authorId) 
    )`

    try{
        await pool.query(gifCommentTableQuery);
        console.log('gif comment table created')
    }
    catch(e) {
        console.log(e)
    }
};

// drop table
// const dropTable = async () => {
//     const dropTableQuery = `DROP TABLE IF EXISTS gifs`
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
// article
articleTable();
// gif
gifTable();
// article comment
articleCommentTable();
// gif comment
gifCommentTable();
// dropTable
// dropTable();

// export pool to controllers
export default pool;