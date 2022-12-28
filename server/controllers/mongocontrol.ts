const mongoClient = require('../routes/mongoconnect').client;
const _user = mongoClient.connect();
const mongoDB = {
  setId: async (id: any, pw: any) => {},
};

module.exports = { mongoDB };
