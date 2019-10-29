import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// configure bodyparser
app.use(bodyParser.json({ extended : true }));

app.listen(port,() => {
    console.log(`app is running on ${port}`)
})
