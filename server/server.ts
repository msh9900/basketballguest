const express = require('express');
const cors = require('cors');
const multer = require('multer');
const server = express();
const fs = require('fs');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
// dotenv
require('dotenv').config();

//Router
const loginRouter = require('./routes/login');

server.use('/login', loginRouter);

// ERROR 처리
server.use((err: any, req: any, res: any, next: any) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});
server.listen(4000, (req: any, res: any) => {
  console.log('4000으로 연결완료');
});
