import { config } from 'dotenv'; config();
import './database/database.js';
import express from 'express';
import usersRouter from './routes/user-router.js';
import postsRouter from './routes/post-router.js';
import commentsRouter from './routes/comment-router.js';

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res)=> {
    res.send('Welcome to the Blog API')
});

app.listen(PORT, (req, res)=>{
    console.log(`Server is listening on PORT: ${PORT}`)
});