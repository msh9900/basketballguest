import express, { Request, Response } from 'express';

const mongoClient = require('../controllers/authControl').mongoDB;
const nodemailer = require('nodemailer');
const router = express.Router();

//env config
require('dotenv').config();

//아이디를 찾기 위한 이메일 입력
router.post('/findid', async (req: Request, res: Response) => {
  //인증 번호 구현
  const randomNum = Math.random().toString();
  const AuthNumber = randomNum.slice(2, 8);

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE, //gmail service 사용
    port: 465, //465 port를 통해 요청 전송
    secure: true, //보안모드 사용
    auth: {
      //gmail ID 및 password
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    // 비밀번호 초기화를 보내는 이메일의 Option
    from: process.env.GMAIL_ID, // 관리자 Email
    to: req.body.userInput, // 비밀번호 초기화 요청 유저 Email
    subject: 'BPT 아이디 초기화 메일', //보내는 메일의 제목
    // 보내는 메일의 내용
    html: `
      <p>아이디를 찾기 위해 아래 url로 이동하여 다음 인증번호를 입력해주세요.</p> 
      ${AuthNumber} <br/> 
      <a href="${process.env.CLIENT_URL}/auth/lostId">여기를 클릭해주세요</a>`,
  };

  const result = await mongoClient.foundId(
    req.body.userInput,
    parseInt(AuthNumber)
  );
  if (result.msg === '이메일 확인 불가') {
    res.send(JSON.stringify(result));
  } else {
    transporter.sendMail(emailOptions); //요청 전송
    res.send(JSON.stringify(result));
  }
});
//해당 아이디와 인증번호가 부합하는지 확인
router.post('/matchid', async (req: Request, res: Response) => {
  const certificationNumber = parseInt(req.body.certificationNumber);
  const result = await mongoClient.AuthMatchEmail(certificationNumber);
  res.send(JSON.stringify(result));
});

//비밀번호 찾기

router.post(
  '/findpw',
  async (req: Request, res: Response) => {
    //인증 번호 구현
    const randomNum = Math.random().toString();
    const AuthNumber = randomNum.slice(2, 8);
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE, //gmail service 사용
      port: 465, //465 port를 통해 요청 전송
      secure: true, //보안모드 사용
      auth: {
        //gmail ID 및 password
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    //아이디를 통해 이메일 먼저 추출
    const foundemail = await mongoClient.findEmail(req.body.userInput);
    if (foundemail.msg === "해당 아이디를 찾을 수 없음'") {
      res.send(JSON.stringify(foundemail));
    } else {
      const emailOptions = {
        // 비밀번호 초기화를 보내는 이메일의 Option
        from: process.env.GMAIL_ID, // 관리자 Email
        to: foundemail, // 비밀번호 초기화 요청 유저 Email
        subject: 'BPT 아이디 초기화 메일', //보내는 메일의 제목
        // 보내는 메일의 내용
        html: `
        <p>비밀번호를 찾기 위해 아래 url로 이동하여 다음 인증번호를 입력해주세요.</p> 
        ${AuthNumber} <br/> 
        <a href="${process.env.CLIENT_URL}/auth/lostPw">여기를 클릭해주세요</a>`,
      };
      //추출된 이메일을 통해 인증번호 보낸 값 부합 확인
      const userInput = foundemail;
      const result = await mongoClient.foundId(userInput, parseInt(AuthNumber));
      if (result.msg === '이메일 확인 불가') {
        res.send(JSON.stringify(result));
      } else {
        transporter.sendMail(emailOptions); //요청 전송
        res.send(JSON.stringify(result));
      }
    }
  },

  //비밀번호를 찾기 위해 인증번호가 부합하는지 확인
  router.post('/matchpw', async (req: Request, res: Response) => {
    const certificationNumber = parseInt(req.body.certificationNumber);
    const result = await mongoClient.AuthMatchEmail(certificationNumber);
    res.send(JSON.stringify(result));
  }),

  //새로운 비밀번호 입력
  router.post('/setpw', async (req: Request, res: Response) => {
    const certificationNumber = parseInt(
      req.body.resetPwBody.certificationNumber
    );
    const pw = req.body.resetPwBody.newPassword;
    const result = await mongoClient.updatePw(pw, certificationNumber);
    res.send(JSON.stringify(result));
  })
);

module.exports = router;
