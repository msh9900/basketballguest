import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';

import { rentalArticleFileDataType } from '../type/rentalDataType';

//env config
require('dotenv').config();

const router = express.Router();
const mongoClient = require('../controllers/mongoControl').mongoDB;
const crawlingTest = require('../module/crawler').crawler;

const dir = './rental';
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

// 게시판 특정 db 찾기
router.post('/search', async (req: Request, res: Response) => {
  let filter = {
    activeAreas: req.body.filter.activeAreas,
    MinPrice: req.body.filter.priceRange[0],
    MaxPrice: req.body.filter.priceRange[1],
    MinPeriod: req.body.filter.periodRange[0],
    MaxPeriod: req.body.filter.periodRange[1],
    keyWord: req.body.keyWord,
  };
  const keyWord = req.body.keyWord;

  if (filter.MinPrice === '0' || isNaN(filter.MinPrice)) {
    filter.MinPrice = 0;
  }
  if (filter.MaxPrice === '0' || isNaN(filter.MaxPrice)) {
    filter.MaxPrice = 10000000;
  }
  if (filter.MinPeriod === undefined) filter.MinPeriod = '2023-01-01';
  if (filter.MaxPeriod === undefined) filter.MaxPeriod = '2050-12-31';

  filter.MinPrice = parseInt(filter.MinPrice);
  filter.MaxPrice = parseInt(filter.MaxPrice);

  filter.MinPeriod = new Date(new Date(filter.MinPeriod).toISOString());
  filter.MaxPeriod = new Date(new Date(filter.MaxPeriod).toISOString());

  const order = {
    isPriceOrderOn: req.body.order.isPriceOrderOn,
    isAsc: req.body.order.isAsc,
    isDistanceOrderOn: req.body.order.isDistanceOrderOn,
    lat: req.body.order.lat,
    lng: req.body.order.lng,
  };

  const result = await mongoClient.searchArticles(filter, order, keyWord);
  res.send(JSON.stringify(result));
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
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const resultFiles = req.files as any;
    let fileNameArray: string[] = [];

    resultFiles.map((ele: rentalArticleFileDataType) => {
      const eachFilename = `${process.env.SERVER_URL}/rental/` + ele.filename;
      fileNameArray.push(eachFilename);
    });

    // crawling
    const roadAddress = JSON.parse(req.body.address)[1].val;
    const coordinates = await crawlingTest(roadAddress);
    let trimmed = await coordinates.replace(/ /g, '');
    const v = await trimmed.split(',');
    const [offsetX, offsetY] = [v[0].slice(2), v[1].slice(2)];

    // 지역 태그
    console.log('roadAddress', roadAddress);

    const splitted = roadAddress.split(' ')[0];
    const areaTag = splitted.slice(0, 2);

    let data = {
      articleId: (Date.now() + Math.random()).toFixed(13),
      articleUserId: req.body.userId,
      userId: req.body.userId,
      userName: req.body.userName,
      title: req.body.title,
      content: req.body.content,
      contact: req.body.contact,
      createdAt: new Date().toLocaleString('ko-kr'),
      address: JSON.parse(req.body.address),
      offsetX: parseFloat(offsetX),
      offsetY: parseFloat(offsetY),
      areaTag: areaTag,
      price: parseInt(req.body.price),
      openingHours: req.body.openingHours,
      openingPeriod: JSON.parse(req.body.openingPeriod), // => 출력
      openingDays: JSON.parse(req.body.openingDays),
      gymImg: fileNameArray,
    };
    data.openingPeriod[0] = new Date(
      new Date(data.openingPeriod[0]).toISOString()
    );
    data.openingPeriod[1] = new Date(
      new Date(data.openingPeriod[1]).toISOString()
    );

    const result = await mongoClient.insertArticle(data);
    res.send(JSON.stringify(result));
  }
);

router.put(
  '/article',
  upload.array('img', 10),
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const resultFiles = req.files as any;
    let fileNameArray: string[] = [];
    resultFiles.map((ele: rentalArticleFileDataType) => {
      const eachFilename = `${process.env.SERVER_URL}/rental/` + ele.filename;
      fileNameArray.push(eachFilename);
    });
    let data = {
      articleId: req.body.articleId,
      userId: req.body.userId,
      userName: req.body.userName,
      title: req.body.title,
      content: req.body.content,
      contact: req.body.contact,
      createdAt: new Date().toLocaleString('ko-kr'),
      address: JSON.parse(req.body.address),
      price: parseInt(req.body.price),
      openingHours: req.body.openingHours,
      openingPeriod: JSON.parse(req.body.openingPeriod),
      openingDays: JSON.parse(req.body.openingDays),
      gymImg: fileNameArray,
    };

    if (req.files?.length === 0) {
      data.gymImg = JSON.parse(req.body.gymImg);
    }

    data.openingPeriod[0] = new Date(
      new Date(data.openingPeriod[0]).toISOString()
    );
    data.openingPeriod[1] = new Date(
      new Date(data.openingPeriod[1]).toISOString()
    );

    const dbData = await mongoClient.updateArticle(data);

    let result;
    if (req.files?.length !== 0) {
      let foundImg = dbData[1];
      let imgLength = foundImg.img.length;

      for (let i = 0; i < imgLength; i++) {
        let filterImg = foundImg.img[i].slice(28, foundImg.img[i].length);
        fs.unlink(`${dir}${filterImg}`, (err) => {
          if (err) console.log('이전 사진 없음');
        });
      }
      dbData.pop(1);
      result = dbData[0];
      res.send(JSON.stringify(result));
    } else {
      dbData.pop(1);
      res.send(JSON.stringify(dbData));
    }
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
  };
  const result = await mongoClient.addInsertReply(data);
  res.send(JSON.stringify(result));
});

router.put('/reply', async (req: Request, res: Response) => {
  const data = {
    replyId: req.query.replyId,
    commentId: req.query.commentId,
    createdAt: new Date().toLocaleString('ko-kr'),
    contents: req.body.contents,
  };
  const result = await mongoClient.updateReply(data);
  res.send(JSON.stringify(result));
});
router.delete('/reply', async (req: Request, res: Response) => {
  const data = {
    replyId: req.query.replyId,
    commentId: req.query.commentId,
  };
  const result = await mongoClient.deleteReply(data);
  res.send(JSON.stringify(result));
});

module.exports = router;
