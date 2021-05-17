const mongoose = require('mongoose');
const Teacher = require('./teacher')
const { Schema } = mongoose;



const StudentSchema = new Schema({
    name: String,
    age: Number,
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ]
})


const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;