import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const mongoClient = require('../controllers/guestMongoControl').mongoDB;

const dir = './guest';
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // 로직 찾기
    let newFileName = new Date().valueOf() + file.originalname;
    // let newFileName = new Date().valueOf() + path.extname(file.originalname);

    cb(null, newFileName);
  },
});
const limits = {
  fileSize: 2048 * 2048 * 2,
};
const upload = multer({ storage, limits });

router.get('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.guestfindArticle();
  res.send(JSON.stringify(result));
});
router.post(
  '/article',
  upload.array('img', 10),
  async (req: Request, res: Response) => {
    console.log('들어오는파일', req.files);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const resultFiles = req.files as any;

    let fileNameArray: any = [];
    resultFiles.map((ele: any) => {
      const eachFilename = 'http://localhost:4000/guest/' + ele.filename;
      fileNameArray.push(eachFilename);
    });
    const data = {
      contentidx: (Date.now() + Math.random()).toFixed(13),
      id: req.body.userId,
      title: req.body.title,
      userImg: req.body.userImg,
      content: req.body.content,
      date: new Date().toLocaleString('ko-kr'),
      imgSrc: fileNameArray,
      comment: [],
    };

    const result = await mongoClient.guestInsertArticle(data);
    return result;
  }
);
router.put('/article', async (req: Request, res: Response) => {
  const resultFiles = req.files as any;

  let fileNameArray: any = [];
  resultFiles.map((ele: any) => {
    const eachFilename = 'http://localhost:4000/guest/' + ele.filename;
    fileNameArray.push(eachFilename);
  });
  let data = {
    contentidx: req.body.contentidx,
    id: req.body.userId,
    title: req.body.title,
    userImg: req.body.userImg,
    content: req.body.content,
    // date: new Date().toLocaleString('ko-kr'),
    imgSrc: fileNameArray,
    comment: [],
  };

  if (req.files?.length === 0) {
    data.imgSrc = JSON.parse(req.body.imgSrc);
  }
  const result = await mongoClient.guestUpdateArticle(data);
  return result;
});
router.delete('/article', async (req: Request, res: Response) => {
  console.log(req.body.contentidx);
  const result = await mongoClient.guestDeleteArticle(req.body.contentidx);
  return result;
});

router.post('/comment', async (req: Request, res: Response) => {
  const data = {
    contentidx: req.body.contentidx,
    commentidx: (Date.now() + Math.random()).toFixed(13),
    id: req.body.id,
    userImg: req.body.userImg,
    content: req.body.content,
    date: new Date().toLocaleString('ko-kr'),
  };
  const result = await mongoClient.insertComment(data);
  console.log('commentresult', result);
  res.send(JSON.stringify(result));
});
router.put('/comment', async (req: Request, res: Response) => {});
router.delete('/comment', async (req: Request, res: Response) => {});

module.exports = router;
