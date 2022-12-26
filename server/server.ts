import express, { Request, Response } from 'express';

const server = express();

type Data = {
  name: string;
  age: number;
  url: string;
};

const sendData: Data = {
  name: 'name',
  age: 3,
  url: 'tistory.com',
};

server.get('/get', (req: Request, res: Response) => {
  res.send(sendData);
});

server.listen(8080);
