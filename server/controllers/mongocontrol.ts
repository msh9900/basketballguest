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
        userImg: '',
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
    if (data) {
      const data = await db.updateOne(
        { id: logindata.id },
        {
          $set: {
            pw: logindata.pw,
            email: logindata.email,
            userName: logindata.userName,
            userImg: logindata.userImg,
          },
        }
      );
      const upDateData = await db.findOne({
        id: logindata.id,
        pw: logindata.pw,
        email: logindata.email,
        userName: logindata.userName,
        userImg: logindata.userImg,
      });

      return upDateData;
    }
  },
};

module.exports = { mongoDB };
