import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

// dotenv
require('dotenv').config();

//Router
const loginRouter = require('./routes/login');

server.use('/login', loginRouter);

// ERROR 처리
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});
server.listen(4000, () => {
  console.log('4000으로 연결완료');
});
