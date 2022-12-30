import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
const router = express.Router();

const dir = './images';
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, dir);
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

//회원가입
router.post(
  '/img',
  upload.single('img'),
  async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      if (!fs.existsSync) {
        fs.mkdirSync('images');
      }
    } catch (error) {
      if (!fs.existsSync)
        console.log('images 폴더가 없어 images 폴더를 생성합니다.');
      fs.mkdirSync('images');
    }
    res.send(JSON.stringify(req.file?.filename));
  }
);
router.post('/', async (req: Request, res: Response) => {
  const result = await mongoDB.incId(
    req.body.id,
    req.body.pw,
    req.body.userName,
    req.body.email,
    `http://localhost:4000/images/${req.body.userImg}`
  );
  res.send(JSON.stringify(result.msg));
});

module.exports = router;
