import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const mongoClient = require('../controllers/mongocontrol').mongoDB;

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

router.post('/img', upload.array('img', 5), (req: Request, res: Response) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  res.send(JSON.stringify(req.files));
});

router.post('/article', async (req: Request, res: Response) => {
  const data = {
    articleId: (Date.now() + Math.random()).toFixed(13),
    userId: req.body.userId,
    userName: req.body.userName,
    title: req.body.title,
    content: req.body.content,
    contact: req.body.contact,
    createdAt: new Date().toLocaleString(),
    address: req.body.address,
    price: req.body.price,
    openingHours: req.body.openingHours,
    openingPeriod: req.body.openingPeriod,
    openingDays: req.body.openingDays,
  };
  const result = await mongoClient.insertArticle(data);
  res.send(JSON.stringify(result));
});

router.put('/article', async (req: Request, res: Response) => {
  const data = {
    articleId: req.body.articleId,
    userId: req.body.userId,
    userName: req.body.userName,
    title: req.body.title,
    content: req.body.content,
    contact: req.body.contact,
    createdAt: new Date().toLocaleString(),
    address: req.body.address,
    price: req.body.price,
    openingHours: req.body.openingHours,
    openingPeriod: req.body.openingPeriod,
    openingDays: req.body.openingDays,
  };
  const result = await mongoClient.updateArticle(data);
  res.send(JSON.stringify(result));
});

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
    createdAt: new Date().toLocaleString(),
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
    createdAt: new Date().toLocaleString(),
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
    createdAt: new Date().toLocaleString(),
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
    createdAt: new Date().toLocaleString(),
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
  console.log(req.body);
  const data = {
    articleId: req.body.articleId,
    commentId: req.body.commentId,
    replyId: (Date.now() + Math.random()).toFixed(13),
    indentLevel: req.body.indentLevel,
    to:req.body.to,
    userId: req.body.userId,
    userName: req.body.userName,
    createdAt: new Date().toLocaleString(),
    contents: req.body.contents,
    isCreater: false,
    replys: req.body.replys,
  };
  const result = await mongoClient.addInsertComment(data);
  console.log(result);
  res.send(JSON.stringify(result));
});

module.exports = router;
