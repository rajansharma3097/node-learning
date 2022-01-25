const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("{{mongoUrl}}", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected!!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
