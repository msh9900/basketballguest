import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer from 'multer';

const router = express.Router();

const dir = './rental';
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};
const upload = multer({ storage, limits });

router.post(
  '/img',
  upload.array('img'),
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    res.send(JSON.stringify(req.file?.filename));
  }
);

module.exports = router;