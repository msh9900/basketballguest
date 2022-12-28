import express from 'express';

const mongoDB = require('./mongoconnet');
const router = express.Router();

//로그인
router.get('/', async (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(res));
});

router.post('/', async (req, res) => {
  console.log(req.body);
});

module.exports = router;
