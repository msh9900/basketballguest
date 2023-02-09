import express, { Request, Response, NextFunction } from 'express';
const mongoClient = require('../controllers/authControl').mongoDB;
const router = express.Router();

//로그인
router.get('/', async (req: Request, res: Response) => {
  res.send(JSON.stringify(res));
});
router.post('/', async (req: Request, res: Response) => {
  const result = await mongoClient.setId(req.body.id, req.body.pw);
  console.log('나가기전 로그인 데이터', result);
  res.send(JSON.stringify(result));
});

module.exports = router;
