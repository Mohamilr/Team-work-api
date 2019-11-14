import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

// routers
import userRouter from './routes/register.route';
import articleRouter from './routes/article.route';
import gifRouter from './routes/gif.route';
import getRouter from './routes/get.route';
import commentRouter from './routes/comment.route';

// swagger documentation
import apiDocs from '../swagger.json'
 
dotenv.config();

// instantiate express
const app = express();

// configure cors
app.use(cors());

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
    next();
})

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


// welcome route
app.get('/', (req, res) => {
    res.status(200).json(({
        status: 'success',
        message: 'welcome to the team work api'
    }))
})

// app router
app.use('/api/v1/', userRouter);
app.use('/api/v1/', articleRouter);
app.use('/api/v1', gifRouter);
app.use('/api/v1', getRouter);
app.use('/api/v1/', commentRouter);

// swagger route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(apiDocs))

// wronge routes
app.use((req, res) => {
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