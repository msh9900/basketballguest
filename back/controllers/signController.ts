import { Request, Response } from 'express';
import { smtpTransport } from '../routes/emailAuth';
export const sendAuthNumber = (email: string, res: Response) => {
  // 6자리 난수 생성
  const authNumber = Math.floor(Math.random() * 888888) + 111111;

  const mailOptions = {
    from: 'ScratchNow Team', // 발송 주체
    to: email, // 인증을 요청한 이메일 주소
    subject: '[ScratchNow] 이메일 확인 인증번호 안내', // 이메일 제목
    text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
      연락처 이메일 👉 ${email}\n
      인증번호 6자리 👉 ${authNumber}`, // 이메일 내용
  };

  smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      res.status(500).json({
        message: `Failed to send authentication email to ${email}`,
      });
    } else {
      res.status(200).json({
        authNumber,
        message: `Authentication mail is sent to ${email}`,
      });
    }
    smtpTransport.close();
  });
};
const signController = {
  emailAuthentication: async (req: Request, res: Response) => {
    const { email } = req.body;

    await sendAuthNumber(email, res);
  },
};
module.exports = { signController };
