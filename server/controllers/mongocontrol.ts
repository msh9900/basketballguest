const mongoClient = require('../routes/mongoconnect');
const _user = mongoClient.connect();
const mongoDB = {
  setId: async (id: string, pw: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const result = await db.findOne({ id });
  },
  IncId: async (id: any, pw: any, email: any, userName: any, userImg: any) => {
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
        return '회원가입 완료';
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
