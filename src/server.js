import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// routers
import userRouter from './routes/register.route';
import articleRouter from './routes/article.route';
import gifRouter from './routes/gif.route';

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
