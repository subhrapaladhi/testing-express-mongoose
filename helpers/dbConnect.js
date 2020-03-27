const mongoose  = require('mongoose');
const DB_uri    = "mongodb://localhost:27017/studentList";

function dbconnect(){
    return new Promise((resolve, reject)=>{
        if(process.env.NODE_ENV === 'test'){
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage()
                .then(()=>{
                    mongoose.connect(DB_uri,{useNewUrlParser: true, 
                    useUnifiedTopology: true, useFindAndModify: false}
                    ).then((res, err)=>{
                        if(err)
                            return reject(err)
                        resolve();
                    })
                })
        }else{
            mongoose.connect(DB_uri,{useNewUrlParser: true, 
            useUnifiedTopology: true, useFindAndModify: false})
            .then((res, err)=>{
                if(err)
                    return reject(err);
                resolve();
            })
        }
    })
}

function dbclose(){
    return mongoose.disconnect();
}

module.exports = {dbconnect, dbclose};