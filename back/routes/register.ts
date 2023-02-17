import express, { Request, Response } from 'express';
const mongoDB = require('../controllers/authControl').mongoDB;
const router = express.Router();

// 회원가입
router.post('/', async (req: Request, res: Response) => {
  const result = await mongoDB.incId(
    req.body.id,
    req.body.pw,
    req.body.email,
    req.body.userName
  );
  res.send(JSON.stringify(result));
});

module.exports = router;
