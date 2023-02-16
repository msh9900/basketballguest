const mongoClient = require('../routes/mongoconnet');
const _user = mongoClient.connect();
import crypto from 'crypto';
import loginDataType from '../type/loginDataType';

// 해시 암호화
const createHashPassword = (password: string) => {
  const salt: any = crypto.randomBytes(64).toString('base64')!;
  const hashedPasssword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  return { hashedPasssword, salt };
};

// 해시 복호화
const verfiyPassword = (
  password: string,
  salt: string,
  userPassword: string
) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  if (hashed === userPassword) return true;
  else return false;
};

const mongoDB = {
  // 회원가입
  incId: async (id: string, pw: string, email: string, userName: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const duplicated = await db.findOne({ id, email });
    const hashPw = createHashPassword(pw);
    if (duplicated === null) {
      await db.insertOne({
        id,
        pw: hashPw.hashedPasssword,
        email,
        userName,
        userImg: '',
        salt: hashPw.salt,
      });
      return { msg: '회원가입 완료' };
    }
    if (duplicated) {
      return {
        msg: '중복 회원 존재',
      };
    } else {
      throw new Error('통신 이상');
    }
  },
  // 로그인
  setId: async (id: string, pw: string) => {
    const user = await _user;
    const col = user.db('basket').collection('login');
    const result = await col.findOne({ id });
    if (result == null) {
      return { msg: '해당 아이디를 찾을 수 없습니다.' };
    }
    const decodePw = verfiyPassword(pw, result.salt, result.pw);

    if (decodePw && result) {
      return {
        id: result.id,
        email: result.email,
        userName: result.userName,
        userImg: result.userImg,
      };
    }
    if (!decodePw) {
      return { msg: '비밀번호 확인 필요' };
    }
  },
  //이메일로 부합 확인
  foundId: async (userInput: string, AuthNumber: Number) => {
    const user = await _user;
    const loginCol = user.db('basket').collection('login');
    const authCol = user.db('basket').collection('authBook');
    const foundId = await loginCol.findOne({ email: userInput });
    const id = foundId.id;
    const idBook = { id, userInput, AuthNumber };
    await authCol.insertOne({ idBook });
    const result = await loginCol.findOne({ email: userInput });
    if (result) {
      return {
        msg: '이메일 확인 완료',
      };
    } else {
      return { msg: '이메일 확인 불가' };
    }
  },
  //이메일을 통해 인증 번호 확인
  AuthMatchEmail: async (number: number) => {
    const user = await _user;
    const col = user.db('basket').collection('authBook');
    const foundId = await col.findOne({ 'idBook.AuthNumber': number });

    if (foundId) {
      setTimeout(() => {
        col.deleteOne({
          'idBook.AuthNumber': number,
        });
      }, 1000 * 180);

      return { id: foundId.idBook.id, msg: '이메일 인증 완료' };
    } else {
      return { msg: '인증번호 틀림' };
    }
  },
  //비밀번호를 찾기 위해 ID를 통해 해당 이메일 찾기
  findEmail: async (id: string) => {
    const user = await _user;
    const col = user.db('basket').collection('login');
    const foundEmail = await col.findOne({ id });
    const email = foundEmail.email;
    if (foundEmail) {
      return email;
    } else {
      return { msg: '해당 아이디를 찾을 수 없음' };
    }
  },

  //새로운 패스워드 갱신
  updatePw: async (pw: string, certificationNumber: number) => {
    const user = await _user;
    const authCol = user.db('basket').collection('authBook');
    const loginCol = user.db('basket').collection('login');
    const extractId = await authCol.findOne({
      'idBook.AuthNumber': certificationNumber,
    });
    const foundId = await loginCol.findOne({ id: extractId.idBook.id });
    const hashPw = createHashPassword(pw);
    if (foundId) {
      await loginCol.updateOne(
        {
          id: foundId.id,
        },
        {
          $set: {
            pw: hashPw.hashedPasssword,
            salt: hashPw.salt,
          },
        }
      );
      setTimeout(() => {
        authCol.deleteOne({
          'idBook.AuthNumber': certificationNumber,
        });
      }, 1000 * 180);
      return { msg: '새로운 비밀번호 설정 완료' };
    }
  },

  userData: async (logindata: loginDataType) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const data = await db.findOne({ id: logindata.id });
    const hashPw = createHashPassword(logindata.pw);
    if (data) {
      await db.updateOne(
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
