const nodemailer = require('nodemailer');

require('dotenv').config();
const userEmail = require('./login').email;

const emailAuth = async () => {
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
  console.log(userEmail);
  const emailOptions = {
    //비밀번호 초기화를 보내는 이메일의 Option
    from: process.env.GMAIL_ID, //관리자 Email
    to: userEmail, //비밀번호 초기화 요청 유저 Email
    subject: 'BPT 비밀번호 초기화 메일', //보내는 메일의 제목
    //보내는 메일의 내용
    html:
      '<p>비밀번호 초기화를 위해 아래의 URL을 클릭하여 주세요.</p>' +
      // <a href="http://localhost:3000/user/findUserInfo">
      '<p>비밀번호 재설정 링크</p>',
    // </a>
  };
  // transporter.sendMail(emailOptions); //요청 전송
  return res.send({ success: true });
};
module.exports = { emailAuth };
