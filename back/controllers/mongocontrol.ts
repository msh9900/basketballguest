const mongoClient = require('../routes/mongoconnet')!;
const _user = mongoClient.connect();
import crypto from 'crypto';

//해시 암호화
const createHashPassword = (password: string) => {
  const salt: any = crypto.randomBytes(64).toString('base64')!;
  const hashedPasssword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  return { hashedPasssword, salt };
};

//해시 복호화
const verfiyPassword = (password: string, salt: any, userPassword: any) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  if (hashed === userPassword) return true;
  return false;
};

const mongoDB = {
  //로그인
  setId: async (id: string, pw: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const result = await db.findOne({ id });
    const decodePw = verfiyPassword(pw, result.salt, result.pw);
    if (decodePw && result) {
      return {
        id: result.id,
        email: result.email,
        userName: result.userName,
        userImg: result.userImg,
      };
    } else {
      return { msg: '로그인 실패' };
    }
  },
  //회원가입
  incId: async (id: string, pw: string, email: string, userName: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const duplicated = await db.findOne({ id, email });
    const hashPw = createHashPassword(pw);
    if (duplicated === null) {
      const result = await db.insertOne({
        id,
        pw: hashPw.hashedPasssword,
        email,
        userName,
        userImg: '',
        salt: hashPw.salt,
      });
      if (result) {
        return { msg: '회원가입 완료' };
      }
    }
    if (duplicated) {
      return {
        msg: '중복 회원 존재',
      };
    } else {
      throw new Error('통신 이상');
    }
  },
  //프로필 페이지
  userData: async (logindata: any) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const data = await db.findOne({ id: logindata.id });
    const hashPw = createHashPassword(logindata.pw);
    if (data) {
      const result = await db.updateOne(
        { id: logindata.id },
        {
          $set: {
            pw: hashPw.hashedPasssword,
            email: logindata.email,
            userName: logindata.userName,
            userImg: logindata.userImg,
            salt: hashPw.salt,
          },
        }
      );
      const updateData = await db.findOne({
        id: logindata.id,
        email: logindata.email,
        userName: logindata.userName,
        userImg: logindata.userImg,
      });

      return updateData;
    }
  },
};

module.exports = { mongoDB };
