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

// 이미지 가져오기

router.post(
  '/userdata',
  upload.single('img'),
  async (req: Request, res: Response) => {
    const logindata = {
      id: req.body.id.replaceAll('"', ''),
      pw: req.body.pw.replaceAll('"', ''),
      userName: req.body.userName.replaceAll('"', ''),
      email: req.body.email.replaceAll('"', ''),
      userImg: `http://localhost:4000/images/${req.body.userImg.replaceAll(
        '"',
        ''
      )}`,
    };
    const result = await mongoDB.userData(logindata);
    console.log(result);
    res.send(JSON.stringify(result));
  }
);

module.exports = router;
