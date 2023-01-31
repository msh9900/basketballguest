import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const mongoClient = require('../controllers/guestmongocontrol').mongoDB;

const dir = './guest';
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
  fileSize: 1024 * 1024 * 2,
};
const upload = multer({ storage, limits });

router.get('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.guestfindArticle();
  console.log(result);
  res.send(JSON.stringify(result));
});
router.post(
  '/article',
  upload.array('articleImg', 10),
  async (req: Request, res: Response) => {
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
      imgsrc: fileNameArray,
      comment: [],
    };
    const result = await mongoClient.guestInsertArticle(data);
    return result;
  }
);
router.put('/article', async (req: Request, res: Response) => {
  const data = {};
  const result = await mongoClient.guestInsertArticle(data);
  return result;
});
router.delete('/article', async (req: Request, res: Response) => {});

router.post('/comment', async (req: Request, res: Response) => {
  console.log('comment', req.body);
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
