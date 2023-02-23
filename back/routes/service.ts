import express, { Request, Response } from 'express';

const MongoClient = require('../controllers/chatControl').mongoDB;
const router = express.Router();

router.post('/chat', async (req: Request, res: Response) => {
  const result = await MongoClient.insertChatting(
    req.body.userId,
    req.body.message
  );
  res.send(JSON.stringify(result));
});

module.exports = router;
