import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const mongoDB = require('../controllers/mongocontrol').mongoDB;
const router = express.Router();

router.use('/images', express.static('images'));

const dir = './images';
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    let newFileName = new Date().valueOf() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const limits = {
  fileSize: 2048 * 2048 * 2,
};
const upload = multer({ storage, limits });
// 헤더에서 이미지 가져오기

// 이미지 가져오기
router.get('/', (req: Request, res: Response) => {
  res.send(req.file);
});

router.post(
  '/userdata',
  upload.single('img'),
  async (req: Request, res: Response) => {
    let imgpath = req.file?.filename;
    const logindata = {
      id: req.body.id.replaceAll('"', ''),
      pw: req.body.pw.replaceAll('"', ''),
      userName: req.body.userName.replaceAll('"', ''),
      email: req.body.email.replaceAll('"', ''),
      userImg: `http://localhost:4000/images/${imgpath}`,
    };
    const result = await mongoDB.userData(logindata);

    res.send(JSON.stringify(result));
  }
);

module.exports = router;
