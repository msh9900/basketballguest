import express from 'express';
import multer from 'multer';
import fs from 'fs';
// const mongoClient = require('../controllers/mongocontrol').mongoDB;
const router = express.Router();

const dir = './images';
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, dir);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

//로그인
router.get('/', async (req, res) => {
  console.log(req.body);
  // const result = await mongoClient.setId(req.body.id, req.body.pw);
  res.send(JSON.stringify(res));
});
router.post('/', async (req, res) => {
  console.log(req.body);
});

//회원가입
router.post('/incimg', upload.single('img'), async (req, res) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  res.send(JSON.stringify(req.file?.filename));
});

module.exports = router;
