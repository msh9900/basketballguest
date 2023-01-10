import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use('/images', express.static('/images'));

server.use('/images', express.static('images'));

// dotenv
require('dotenv').config();

//Router
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const boardRouter = require('./routes/board');
const profileRouter = require('./routes/profile');
const rentalRouter = require('./routes/rental');

server.use('/rental', express.static('rental'));
server.use('/login', loginRouter);
server.use('/register', registerRouter);
server.use('/board', boardRouter);
server.use('/profile', profileRouter);
server.use('/rental', rentalRouter);
// ERROR 처리
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});
server.listen(4000, () => {
  console.log('4000으로 연결완료');
});
