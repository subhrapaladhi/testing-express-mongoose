const mongooseConnect = require('../../helpers/dbConnect');
const mongoose = require('mongoose');

let basicSetup = () => {
    before((done)=>{
        mongooseConnect.dbconnect()
                .once('open', ()=>done())
                .on('error',(error) => done(error))
    })
    beforeEach((done)=>{
        mongoose.connection.db.listCollections({name: "studentlists"})
            .next((error,collection)=>{
                if(collection){
                    mongoose.connection.db.dropCollection("studentlists")
                    .then(() => done())
                    .catch((err) => done(err))
                }
                else{
                    done(error)
                }
            })
        
        
    })

    after((done)=>{
        mongooseConnect.dbclose()
                .then(()=>done())
                .catch((err)=>done(err))
    })
}

module.exports = basicSetup;