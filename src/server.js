import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routers
import userRouter from './routes/register.route';
import articleRouter from './routes/article.route';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// configure bodyparser
app.use(bodyParser.json({ extended : true }));

// app router
app.use('/api/v1/', userRouter);
app.use('/api/v1/', articleRouter);

// wronge routes
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        error: 'wrong route'
    })
})

app.listen(port,() => {
    console.log(`app is running on ${port}`)
})
