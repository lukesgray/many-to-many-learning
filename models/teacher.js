const mongoose = require('mongoose');
const Student = require('./student')
const { Schema } = mongoose;



const TeacherSchema = new Schema({
    name: String,
    age: Number,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
})


const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;

