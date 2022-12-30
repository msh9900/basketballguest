const mongoClient = require('../routes/mongoconnet')!;
const _user = mongoClient.connect();
const mongoDB = {
  //로그인
  setId: async (id: string, pw: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const result = await db.findOne({ id });
    if (result) {
      return {
        id: result.id,
        pw: result.pw,
      };
    } else {
      const errormessage = { msg: '로그인 실패' };
      return errormessage;
    }
  },
  //회원가입
  incId: async (
    id: string,
    pw: string,
    email: string,
    userName: string,
    userImg: string
  ) => {
    const user = await _user;
    const db = user.db('project').collection('user');
    const duplicated = await db.findOne({ id });
    if (duplicated === null) {
      const result = await db.insertOne({
        id,
        pw,
        email,
        userName,
        userImg,
      });
      if (result.acknowledged) {
        return { duplicated: false, msg: '회원가입 완료' };
      }
    }
    if (duplicated) {
      return {
        duplicated: true,
        msg: '중복 회원 존재',
      };
    } else {
      throw new Error('통신 이상');
    }
  },
};

module.exports = { mongoDB };
