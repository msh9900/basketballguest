import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
const router = express.Router();

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

router.post('/img', upload.array('img', 5), (req: Request, res: Response) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  res.send(JSON.stringify(req.files));
});

router.post('/data', (req: Request, res: Response) => {
  console.log(req.body);
});

module.exports = router;
