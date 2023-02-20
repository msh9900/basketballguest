import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

//env config
require('dotenv').config();

const mongoClient = require('../controllers/authControl').mongoDB;
const router = express.Router();

router.use('/userImages', express.static('userImages'));

const dir = './userImages';
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    let newFileName = new Date().valueOf() + file.originalname;
    cb(null, newFileName);
  },
});

const limits = {
  fileSize: 2048 * 2048 * 2,
};
const upload = multer({ storage, limits });

// 이미지 가져오기
router.get('/', (req: Request, res: Response) => {
  res.send(req.file);
});

router.post(
  '/userdata',
  upload.single('img'),
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    let imgpath = req.file?.filename;

    let logindata = {
      id: req.body.id.replaceAll('"', ''),
      userName: req.body.userName.replaceAll('"', ''),
      email: req.body.email.replaceAll('"', ''),
      userImg: `${process.env.SERVER_URL}/userImages/${imgpath}`,
    };
    let dbData = await mongoClient.userData(logindata);
    let result;
    if (req.file !== undefined) {
      const foundImg = dbData[1];
      const willDeleteImg = foundImg.slice(32, foundImg.length);

      fs.unlink(`${dir}${willDeleteImg}`, (err) => {
        if (err) console.log('이전 사진 없음');
      });
      dbData.pop(1);
      result = dbData[0];
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify(dbData));
    }
  },
  router.post('/pw', async (req: Request, res: Response) => {
    const result = await mongoClient.userPw(req.body.userId, req.body.userPw);
    res.send(JSON.stringify(result));
  })
);

module.exports = router;
