import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
const router = express.Router();

const dir = './images';
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, dir);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

//회원가입
router.post('/', upload.single('img'), async (req: Request, res: Response) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  // res.send(JSON.stringify(req.file?.filename));
});

module.exports = router;
