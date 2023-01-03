import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const mongoDB = require('../controllers/mongocontrol').mongoDB;
const router = express.Router();

const dir = '/';

router.get('/', async (req: Request, res: Response) => {
  const result = await mongoDB.findUserData(
    req.body.id,
    req.body.pw,
    req.body.userName,
    req.body.email,
    req.body.userImg
  );
});

router.post('/', async (req: Request, res: Response) => {
  const result = await mongoDB.UserData(
    req.body.id,
    req.body.pw,
    req.body.userName,
    req.body.email
  );
  res.send(JSON.stringify(result));
});

module.exports = router;
