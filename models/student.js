const mongoose = require('mongoose')

let studentSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    branch: String
})

let student = mongoose.model('studentList', studentSchema);

module.exports = student;