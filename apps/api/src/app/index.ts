import * as express from 'express';
import { exceptionHandler } from './exceptionHandler';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import TodoRouter from './todo-router';
import AuthRouter from './auth-route';
import { todosMiddleware } from '../todos/todos-middleware';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/todos', todosMiddleware, TodoRouter);
app.use('/api/auth', AuthRouter);
app.get('/api', (req, res) => {
  res.send('Welcome!');
});

app.use(exceptionHandler);

export default app;
