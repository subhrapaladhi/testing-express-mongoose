/* READ - GET ; CREATE - POST ; UPDATE - PUT ; DELETE - DELETE */

const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongooseConnect = require('./helpers/dbConnect');
mongooseConnect.dbconnect()
                .on('error', (err) => console.log("connection to db failed"))

const Student = require('./models/student')

// CRUD op - ROUTES

// create  - post
app.post('/save', (req, res)=>{
    new Student(req.body)
        .save() 
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
})

// read    - get
app.get('/:id', (req, res)=>{
    Student .findById(req.params.id)
            .then((data)=>{
                if(data){
                    res.status(200).send(data)
                }else{      // query returned null
                    res.status(404).send({err:"data not found"})
                }
            })
            .catch((err) => res.status(500).send(err))
})

// update  - put
app.put('/:id', (req, res)=>{
    Student .findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then((data)=>{
                if(data){
                    res.status(200).send(data);
                }else{
                    res.status(404).send({err: "no data found"})
                }
            })
            .catch((err) => res.status(500).send(err))
})

// delete  - delete
app.delete('/:id', (req, res)=>{
    Student .findByIdAndDelete(req.params.id)
            .then((data)=>{
                if(data){
                    res.status(200).send(data)
                }else{
                    res.status(404).send({err: "data not found"})
                }
            })
            .catch((err) => res.status(500).send(err))
})

app.listen(3000, () => console.log("server started at port 3000"))

module.exports = app;