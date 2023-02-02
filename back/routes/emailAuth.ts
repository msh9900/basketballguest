import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env'
  ),
});

export const smtpTransport = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE, // mail 서비스명 ex) 'Naver', 'gmail' 등
  auth: {
    user: process.env.SMTP_USER, // mail 발송 이메일 주소
    pass: process.env.SMTP_PASSWORD, // 해당 이메일 비밀번호
  },
  tls: {
    rejectUnauthorized: false,
  },
});
