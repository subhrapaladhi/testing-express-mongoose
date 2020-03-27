/* READ - GET ; CREATE - POST ; UPDATE - PUT ; DELETE - DELETE */

const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongooseConnect = require('./helpers/dbConnect');
mongooseConnect.dbconnect()
                .then(()=>{
                    console.log("connected to db")
                })
                .catch(()=>{
                    console.log("connection to db failed")
                })
// mongoose.connect("mongodb://localhost:27017/studentList",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
// mongoose.connection
//         .once('open', ()=>console.log("connected to database"))
//         .on('error', (err)=>console.log(err))

const Student = require('./models/student')

// CRUD op - ROUTES

// create  - post
app.post('/save', (req, res)=>{
    console.log(req.body)   
    new Student(req.body)
        .save() 
        .then((data)=>{
            res.json({
                id: data._id,
                save: true
            })
        })
        .catch((err)=>{
            console.log(err)
            res.json({
                id: null,
                save: false
            })
        })
})

// read    - get
app.get('/:id', (req, res)=>{
    Student .findById(req.params.id)
            .then((data)=>{
                if(data){
                    res.json({
                        data: data,
                        res: "data found"
                    })
                }else{      // query returned null
                    res.json({
                        data: null,
                        res: "no data for the id"
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
                res.json({
                    data: null,
                    res: "error occured"
                })
            })
})

// update  - put
app.put('/:id', (req, res)=>{
    Student .findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then((data)=>{
                if(data){
                    res.json({data: data, update: "success"})
                }else{
                    res.json({data: null, update: "no entry found"})
                }
            })
            .catch((err)=>{
                res.json({data: null, update: "failed"})
            })
})

// delete  - delete
app.delete('/:id', (req, res)=>{
    Student .findByIdAndDelete(req.params.id)
            .then((data)=>{
                if(data){
                    res.json({data: data, delete: "success"})
                }else{
                    res.json({data: null, delete: "data not found"})
                }
                
            })
            .catch((err)=>{
                res.json({data: null, delete: "failed"})
            })
})

app.listen(3000, ()=>console.log("server started at port 3000"))

module.exports = app;