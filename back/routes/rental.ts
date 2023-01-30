import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
// import puppeteer from 'puppeteer';

const router = express.Router();
const mongoClient = require('../controllers/mongocontrol').mongoDB;
const crawlingTest = require('../module/crawler').crawler;

//multer
const dir = './rental';
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

// 게시판 특정 db 찾기
router.post('/search', async (req: Request, res: Response) => {
  console.log('original data', req.body);
  // console.log(MinPeriod, MaxPeriod);
  let data = {
    activeAreas: req.body.filter.activeAreas,
    MinPrice: req.body.filter.priceRange[0],
    MaxPrice: req.body.filter.priceRange[1],
    MinPeriod: req.body.filter.periodRange[0],
    MaxPeriod: req.body.filter.periodRange[1],
    keyWord: req.body.keyWord,
  };

  if (req.body.filter.priceRange[0] === '0') {
    data.MinPrice = 0;
  }
  if (req.body.filter.priceRange[0] === '0') {
    data.MaxPrice = 999999999999999;
  }
  if (req.body.filter.periodRange[0] === undefined) {
    data.MinPeriod = '0000-00-00';
  }
  if (req.body.filter.periodRange[1] === undefined) {
    data.MaxPeriod = '3000-00-00';
  }
  data.MinPeriod = new Date(data.MinPeriod).toISOString();
  data.MaxPeriod = new Date(data.MaxPeriod).toISOString();
  console.log('data', data);

  const result = await mongoClient.searchArticles(data);
  // res.send(JSON.stringify(result));
});

// 게시판 db 글 하나만 가져오기
router.get('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.findArticle(req.query.pid);
  res.send(JSON.stringify(result));
});

// 게시판 db 전체 가져오기
router.get('/articles', async (req: Request, res: Response) => {
  const result = await mongoClient.findArticles();
  res.send(JSON.stringify(result));
});

//게시판 만들기
router.post(
  '/article',
  upload.array('img', 10),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const resultFiles = req.files as any;
    let fileNameArray: any = [];
    resultFiles.map((ele: any) => {
      const eachFilename = 'http://localhost:4000/rental/' + ele.filename;
      fileNameArray.push(eachFilename);
    });

    // crawling
    const roadAddress = JSON.parse(req.body.address)[1].val;
    const coordinates = await crawlingTest(roadAddress);
    console.log(coordinates);
    let trimmed = await coordinates.replace(/ /g, '');
    const v = await trimmed.split(',');
    const [offsetX, offsetY] = [v[0].slice(2), v[1].slice(2)];
    console.log('offsetX, offsetY', offsetX, offsetY);

    // 지역 태그
    const areaTag = roadAddress.split(' ')[0];
    // console.log(roadAddress);
    // console.log(roadAddress.split(' '));
    // console.log(roadAddress.split(' ')[0]);
    // console.log('areaTag', areaTag);

    const data = {
      articleId: (Date.now() + Math.random()).toFixed(13),
      userId: req.body.userId,
      userName: req.body.userName,
      title: req.body.title,
      content: req.body.content,
      contact: req.body.contact,
      createdAt: new Date().toLocaleString('ko-kr'),
      address: JSON.parse(req.body.address),
      offsetX: parseInt(offsetX),
      offsetY: parseInt(offsetY),
      areaTag: areaTag,
      price: parseInt(req.body.price),
      openingHours: req.body.openingHours,
      openingPeriod: JSON.parse(req.body.openingPeriod),
      openingDays: JSON.parse(req.body.openingDays),
      gymImg: fileNameArray,
    };
    const result = await mongoClient.insertArticle(data);
    res.send(JSON.stringify(result));
  }
);

router.put(
  '/article',
  upload.array('img', 10),
  async (req: Request, res: Response) => {
    console.log(req.body);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const resultFiles = req.files as any;
    let fileNameArray: any = [];
    resultFiles.map((ele: any) => {
      const eachFilename = 'http://localhost:4000/rental/' + ele.filename;
      fileNameArray.push(eachFilename);
    });

    const data = {
      articleId: req.body.articleId,
      userId: req.body.userId,
      userName: req.body.userName,
      title: req.body.title,
      content: req.body.content,
      contact: req.body.contact,
      createdAt: new Date().toLocaleString('ko-kr'),
      address: req.body.address,
      price: parseInt(req.body.price),
      openingHours: req.body.openingHours,
      openingPeriod: req.body.openingPeriod,
      openingDays: req.body.openingDays,
      gymImg: fileNameArray,
    };
    const result = await mongoClient.updateArticle(data);
    res.send(JSON.stringify(result));
  }
);
//게시글 삭제
router.delete('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.deleteArticle(req.query.pid);
  res.send(JSON.stringify(result));
});

//리뷰
router.get('/review', async (req: Request, res: Response) => {
  const result = await mongoClient.findReview(req.query.pid);
  res.send(JSON.stringify(result));
});

router.post('/review', async (req: Request, res: Response) => {
  const data = {
    articleId: req.body.articleId,
    reviewId: req.body.reviewId,
    createdAt: new Date().toLocaleString('ko-kr'),
    userId: req.body.userId,
    userName: req.body.userName,
    title: req.body.title,
    content: req.body.content,
    rating: req.body.rating,
  };
  const result = await mongoClient.insertReview(data);
  res.send(JSON.stringify(result));
});
router.put('/review', async (req: Request, res: Response) => {
  const data = {
    articleId: req.body.articleId,
    reviewId: req.body.reviewId,
    createdAt: new Date().toLocaleString('ko-kr'),
    userId: req.body.userId,
    userName: req.body.userName,
    title: req.body.title,
    content: req.body.content,
    rating: req.body.rating,
  };
  const result = await mongoClient.updateReview(data);
  res.send(JSON.stringify(result));
});

router.delete('/review', async (req: Request, res: Response) => {
  const result = await mongoClient.deleteReview(req.query.reviewId);
  res.send(JSON.stringify(result));
});

//댓글
router.get('/comment', async (req: Request, res: Response) => {
  const result = await mongoClient.findComment(req.query.pid);
  res.send(JSON.stringify(result));
});

router.post('/comment', async (req: Request, res: Response) => {
  const data = {
    articleId: req.body.articleId,
    commentId: (Date.now() + Math.random()).toFixed(13),
    userId: req.body.userId,
    userName: req.body.userName,
    createdAt: new Date().toLocaleString('ko-kr'),
    contents: req.body.contents,
    isCreater: false,
    replys: req.body.replys,
  };
  const result = await mongoClient.insertComment(data);
  res.send(JSON.stringify(result));
});

router.put('/comment', async (req: Request, res: Response) => {
  const data = {
    articleId: req.body.articleId,
    commentId: req.body.commentId,
    userId: req.body.userId,
    userName: req.body.userName,
    createdAt: new Date().toLocaleString('ko-kr'),
    contents: req.body.contents,
    isCreater: false,
    replys: req.body.replys,
  };
  const result = await mongoClient.updateComment(data);
  res.send(JSON.stringify(result));
});

router.delete('/comment', async (req: Request, res: Response) => {
  const result = await mongoClient.deleteComment(req.query.commentId);
  res.send(JSON.stringify(result));
});

//답글
router.post('/reply', async (req: Request, res: Response) => {
  const data = {
    articleId: req.body.articleId,
    commentId: req.body.commentId,
    replyId: (Date.now() + Math.random()).toFixed(13),
    indentLevel: req.body.indentLevel,
    to: req.body.to,
    userId: req.body.userId,
    userName: req.body.userName,
    createdAt: new Date().toLocaleString('ko-kr'),
    contents: req.body.contents,
    isCreater: false,
    replys: req.body.replys,
  };
  const result = await mongoClient.addInsertComment(data);
  res.send(JSON.stringify(result));
});

module.exports = router;
