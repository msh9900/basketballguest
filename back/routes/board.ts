import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const mongoClient = require('../controllers/mongocontrol').mongoDB;

router.get('/article', async (req: Request, res: Response) => {
  const result = await mongoClient.guestfindArticle();
  console.log(result);
  res.send(JSON.stringify(result));
});
router.post('/article', async (req: Request, res: Response) => {});
router.put('/article', async (req: Request, res: Response) => {});
router.delete('/article', async (req: Request, res: Response) => {});

module.exports = router;
