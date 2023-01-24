import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const mongoClient = require('../controllers/mongocontrol').mongoDB;

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

//게시판 db 글 하나만 가져오기
router.get('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.findArticle(req.query.pid);
  res.send(JSON.stringify(result));
});

//게시판 db 전체 가져오기
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
    userId: req.body.stateId,
    title: req.body.title,
    content: req.body.content,
    contact: req.body.contact,
    address: req.body.address,
    price: req.body.price,
    openingHours: req.body.openingHours,
    openingPeriod: req.body.openingPeriod,
    openingDays: req.body.openingDays,
  };
  const result = await mongoClient.article(data);
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
    id: req.body.id,
    userName: req.body.userName,
    title: req.body.title,
    content: req.body.content,
    rating: req.body.rating,
  };
  const result = await mongoClient.insertReview(data);
  res.send(JSON.stringify(result));
});

module.exports = router;
