const mongoose  = require('mongoose');
const DB_uri    = "mongodb://localhost:27017/studentList";

function dbconnect() {
    mongoose.connect(DB_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    return mongoose.connection
  }
  
  function dbclose() {
    return mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};