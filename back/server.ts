import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import https from 'https';
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use('/userImages', express.static('userImages'));
server.use('/rental', express.static('rental'));
server.use('/guest', express.static('guest'));

// dotenv
require('dotenv').config();

const PORT = process.env.PORT;

//Router
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const boardRouter = require('./routes/board');
const profileRouter = require('./routes/profile');
const rentalRouter = require('./routes/rental');
const authRouter = require('./routes/auth');
const serviceRouter = require('./routes/service');

server.use('/login', loginRouter);
server.use('/register', registerRouter);
server.use('/board', boardRouter);
server.use('/profile', profileRouter);
server.use('/rental', rentalRouter);
server.use('/auth', authRouter);
server.use('/service', serviceRouter);

// ERROR 처리
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});
server.listen(PORT, () => {
  console.log('서버 연결 완료');
});
