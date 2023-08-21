import express, { Request, Response } from 'express';
import  {transporter}  from "../routeModel/emailConfig";
import { createIdEmail, createPwEmail } from '../routeModel/emailTemplates';

const mongoDB = require('../controllers/guestMongoControl').mongoDatabase;
const router = express.Router();

router.post('/findid', async (req: Request, res: Response) => {
  const AuthNumber = parseInt(Math.random().toString().slice(2, 8));
  const emailOptions = createIdEmail(req.body.userInput, AuthNumber);
  const result = await mongoDB.foundId(
    req.body.userInput,
    parseInt(AuthNumber.toString())
  );

  if (result.msg === '이메일 확인 불가') {
    res.send(JSON.stringify(result));
  } else {
    transporter.sendMail(emailOptions);
    res.send(JSON.stringify(result));
  }
});

router.post('/matchid', async (req: Request, res: Response) => {
  const certificationNumber = parseInt(req.body.certificationNumber);
  const result = await mongoDB.AuthMatchEmail(certificationNumber);
  res.send(JSON.stringify(result));
});

router.post('/findpw', async (req: Request, res: Response) => {
  const AuthNumber = parseInt(Math.random().toString().slice(2, 8));
  const foundemail = await mongoDB.findEmail(req.body.userInput);

  if (foundemail.msg === "해당 아이디를 찾을 수 없음'") {
    res.send(JSON.stringify(foundemail));
  } else {
    const emailOptions = createPwEmail(foundemail, AuthNumber);

    const userInput = foundemail;
    const result = await mongoDB.foundId(userInput, parseInt(AuthNumber.toString()));

    if (result.msg === '이메일 확인 불가') {
      res.send(JSON.stringify(result));
    } else {
      transporter.sendMail(emailOptions);
      res.send(JSON.stringify(result));
    }
  }
});

router.post('/matchpw', async (req: Request, res: Response) => {
  const certificationNumber = parseInt(req.body.certificationNumber);
  const result = await mongoDB.AuthMatchEmail(certificationNumber);
  res.send(JSON.stringify(result));
});

router.post('/setpw', async (req: Request, res: Response) => {
  const certificationNumber = parseInt(req.body.resetPwBody.certificationNumber);
  const pw = req.body.resetPwBody.newPassword;
  const result = await mongoDB.updatePw(pw, certificationNumber);
  res.send(JSON.stringify(result));
});

export default router;
