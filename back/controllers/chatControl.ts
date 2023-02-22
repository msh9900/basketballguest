const MongoClient = require('../routes/mongoConnet');
const _chat = MongoClient.connect();

const mongoDB = {
  insertChatting: async (userId: string, message: string) => {
    const chat = await _chat;
    const col = chat.db('basket').collection('chatting');
    const insertChatting = await col.insertOne({ userId, message });
    if (insertChatting) {
      return { msg: '채팅 데이터 삽입 완료' };
    }
  },
};

module.exports = { mongoDB };
