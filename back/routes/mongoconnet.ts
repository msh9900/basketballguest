import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_URI_ATLAS!;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
} as MongoClientOptions;

const client = new MongoClient(uri, options);

module.exports = client;
