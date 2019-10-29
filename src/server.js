import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();

const port = process.env.PORT || 3000;

dotenv.config();

// configure bodyparser
app.use(bodyParser.json({ extended : true }));

app.listen(port,() => {
    console.log(`app is running on ${port}`)
})
