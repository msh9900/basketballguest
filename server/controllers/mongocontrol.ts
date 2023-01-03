const mongoClient = require('../routes/mongoconnet')!;
const _user = mongoClient.connect();
const mongoDB = {
  //로그인
  setId: async (id: string, pw: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const result = await db.findOne({ id, pw });
    if (result) {
      return {
        id: result.id,
        pw: result.pw,
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
    if (duplicated === null) {
      const result = await db.insertOne({
        id,
        pw,
        email,
        userName,
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
  findUserData: async (
    id: string,
    pw: string,
    email: string,
    userName: string
  ) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const userdata = await db.find({}).toArray();
    console.log(userdata);
  },

  UserData: async (id: string, pw: string, email: string, userName: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
  },
};

module.exports = { mongoDB };
