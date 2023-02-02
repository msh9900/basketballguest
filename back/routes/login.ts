import express, { Request, Response, NextFunction } from 'express';
const mongoClient = require('../controllers/mongocontrol').mongoDB;
const SignController = require('../controllers/signController').signController;
const router = express.Router();

//아이디 찾기
router.post(
  '/foundid',
  // SignController.emailAuthentication,
  async (req: Request, res: Response) => {
    console.log('진입 데이터', req.body);
  }
);

//비밀번호 찾기

//로그인
router.get('/', async (req: Request, res: Response) => {
  res.send(JSON.stringify(res));
});
router.post('/', async (req: Request, res: Response) => {
  const result = await mongoClient.setId(req.body.id, req.body.pw);
  res.send(JSON.stringify(result));
});

module.exports = router;
