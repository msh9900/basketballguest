import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';

const mongoDB = require('../controllers/mongocontrol').mongoDB;
const router = express.Router();

const dir = './images';
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};
const upload = multer({ storage, limits });

//이미지 가져오기
router.post(
  '/img',
  upload.single('img'),
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    res.send(JSON.stringify(req.file?.filename));
  }
);

// router.get('/', async (req: Request, res: Response) => {
//   const result = await mongoDB.findUserData(
//     req.body.id,
//     req.body.pw,
//     req.body.userName,
//     req.body.email,
//     req.body.userImg
//   );
// });

router.post('/userdata', async (req: Request, res: Response) => {
  console.log(req.body);
  const logindata = {
    id: req.body.id,
    pw: req.body.pw,
    userName: req.body.userName,
    email: req.body.email,
    userImg: req.body.userImg,
  };
  const result = await mongoDB.userData(logindata);
  res.send(JSON.stringify(result));
});

module.exports = router;
