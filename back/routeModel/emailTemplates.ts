require('dotenv').config();

interface EmailOptions {
    from: any;
    to: string;
    subject: string;
    html: string;
  }
  
  const createIdEmail = (userInput: string, AuthNumber: number): EmailOptions => ({
    from: process.env.GMAIL_ID,
    to: userInput,
    subject: 'BPT 아이디 초기화 메일',
    html: `
      <p>아이디를 찾기 위해 아래 URL로 이동하여 다음 인증번호를 입력해주세요.</p>
      ${AuthNumber} <br/>
      <a href="${process.env.CLIENT_URL}/auth/lostId">여기를 클릭해주세요</a>`,
  });
  
  const createPwEmail = (toEmail: string, AuthNumber: number): EmailOptions => ({
    from: process.env.GMAIL_ID,
    to: toEmail,
    subject: 'BPT 아이디 초기화 메일',
    html: `
      <p>비밀번호를 찾기 위해 아래 URL로 이동하여 다음 인증번호를 입력해주세요.</p>
      ${AuthNumber} <br/>
      <a href="${process.env.CLIENT_URL}/auth/lostPw">여기를 클릭해주세요</a>`,
  });
  
  // const createEmail = (toEmail: string, AuthNumber: number, emailType: string): EmailOptions => ({
  //   from: process.env.GMAIL_ID,
  //   to: toEmail,
  //   subject: `BPT ${emailType} 초기화 메일`,
  //   html: `
  //     <p>${emailType === 'id' ? '아이디' : '비밀번호'}를 찾기 위해 아래 URL로 이동하여 다음 인증번호를 입력해주세요.</p>
  //     ${AuthNumber} <br/>
  //     <a href="${process.env.CLIENT_URL}/auth/lost${emailType === 'id' ? 'Id' : 'Pw'}">여기를 클릭해주세요</a>`,
  // });
  
  // // 사용 예시:
  // const idEmail = createEmail('user@example.com', 123456, 'id');
  // const pwEmail = createEmail('user@example.com', 789012, 'pw');
  
  export { createIdEmail, createPwEmail };
  
  