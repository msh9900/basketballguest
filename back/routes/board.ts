import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
const mongoClient = require('../controllers/guestMongoControl').mongoDatabase;
const router = express.Router();

//env config
require('dotenv').config();

const dir = './guest';
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
//게시판 특정 db 찾기
router.post('/search', async (req: Request, res: Response) => {
  const result = await mongoClient.guestSerachArticle(req.body.keyWord);
  res.send(JSON.stringify(result));
});

// 게시판 db 가져오기
router.get('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.guestfindArticle();
  res.send(JSON.stringify(result));
});
router.post(
  '/article',
  upload.array('img', 6),
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const resultFiles = req.files as any;

    let fileNameArray: any = [];
    resultFiles.map((ele: any) => {
      const eachFilename = `${process.env.SERVER_URL}/guest/` + ele.filename;
      fileNameArray.push(eachFilename);
    });
    let data = {
      contentIdx: (Date.now() + Math.random()).toFixed(13),
      id: req.body.userId,
      title: req.body.title,
      userImg: req.body.userImg,
      content: req.body.content,
      date: new Date(),
      imgSrc: fileNameArray,
      comment: [],
    };
    const result = await mongoClient.guestInsertArticle(data);
    return result;
  }
);
router.put(
  '/article',
  upload.array('img', 6),
  async (req: Request, res: Response) => {
    console.log('img', req.body.imgSrc);
    const resultFiles = req.files as any;

    let fileNameArray: any = [];
    resultFiles.map((ele: any) => {
      const eachFilename = `${process.env.SERVER_URL}/guest/` + ele.filename;
      fileNameArray.push(eachFilename);
    });
    let data = {
      contentIdx: req.body.contentIdx,
      id: req.body.userId,
      title: req.body.title,
      userImg: req.body.userImg,
      content: req.body.content,
      date: new Date(),
      imgSrc: fileNameArray,
      comment: [],
    };

    if (req.files?.length === 0) {
      data.imgSrc = JSON.parse(req.body.imgSrc);
    }
    const result = await mongoClient.guestUpdateArticle(data);
    res.send(JSON.stringify(result));
  }
);
router.delete('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.guestDeleteArticle(req.body.contentIdx);
  res.send(JSON.stringify(result));
});
router.get('/comment', async (req: Request, res: Response) => {
  const result = await mongoClient.findComment(req.query.contentIdx);
  res.send(JSON.stringify(result));
});

router.post('/comment', async (req: Request, res: Response) => {
  const data = {
    contentIdx: req.body.contentIdx,
    commentIdx: (Date.now() + Math.random()).toFixed(13),
    id: req.body.id,
    userImg: req.body.userImg,
    content: req.body.content,
    date: new Date().toLocaleString('ko-kr'),
    replys: [],
  };
  const result = await mongoClient.insertComment(data);
  res.send(JSON.stringify(result));
});
router.put('/comment', async (req: Request, res: Response) => {
  const data = {
    commentIdx: req.body.commentIdx,
    content: req.body.content,
  };
  const result = await mongoClient.updateComment(data);
  res.send(JSON.stringify(result));
});
router.delete('/comment', async (req: Request, res: Response) => {
  const result = await mongoClient.deleteComment(req.query.commentIdx);
  res.send(JSON.stringify(result));
});

router.post('/reply', async (req: Request, res: Response) => {
  const data = {
    replyIdx: (Date.now() + Math.random()).toFixed(13),
    content: req.body.content,
    date: new Date().toLocaleString('ko-kr'),
    userId: req.body.userId,
    userImg: req.body.userImg,
  };
  const result = await mongoClient.insertReply(data, req.body.commentIdx);
  res.send(JSON.stringify(result));
});
router.put('/reply', async (req: Request, res: Response) => {
  const data = {
    commentIdx: req.body.commentIdx,
    replyIdx: req.body.replyIdx,
    content: req.body.content,
  };
  const result = await mongoClient.updateReply(data);
  res.send(JSON.stringify(result));
});
router.delete('/reply', async (req: Request, res: Response) => {
  const result = await mongoClient.deleteReply(
    req.query.commentIdx,
    req.query.replyIdx
  );
  res.send(JSON.stringify(result));
});

module.exports = router;
