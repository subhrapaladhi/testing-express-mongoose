const mongoose  = require('mongoose');
const keys      = require('../keys')
const DB_uri    = keys.mongoURI;
console.log(DB_uri);

function dbconnect() {
    mongoose.connect(DB_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    return mongoose.connection
  }
  
  function dbclose() {
    return mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};