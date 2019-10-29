import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// router
import userRouter from './routes/route';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// configure bodyparser
app.use(bodyParser.json({ extended : true }));

// app router
app.use('/api/v1/', userRouter);

// wronge routes
app.use('*', () => {
    resizeBy.status(404).json({
        status: 'error',
        error: 'incorrect route'
    })
})

app.listen(port,() => {
    console.log(`app is running on ${port}`)
})
