import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// routers
import userRouter from './routes/register.route';
import articleRouter from './routes/article.route';
import gifRouter from './routes/gif.route';
import getRouter from './routes/get.route';
import commentRouter from './routes/comment.route';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// configure bodyparser
app.use(bodyParser.json({ extended : true }));

// configure file-upload
app.use(fileUpload({
    useTempFiles: true
}))

// app router
app.use('/api/v1/', userRouter);
app.use('/api/v1/', articleRouter);
app.use('/api/v1', gifRouter);
app.use('/api/v1', getRouter);
app.use('/api/v1/', commentRouter);

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

// export app for test
export default app;