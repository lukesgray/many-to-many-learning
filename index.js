const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
// const methodOverride = require('method-override');

const Teacher = require('./models/teacher');
const Student = require('./models/student');

mongoose.connect('mongodb://localhost:27017/college', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!");
        console.log(err);
    })


// app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

//--------Home--------//

app.get('/home', async (req, res) => {
    res.render('home');
})

//--------Teachers--------//

// GETS

app.get('/teachers', async (req, res) => {
    const teachers = await Teacher.find({});
    res.render('teachers/index', { teachers })
})

app.get('/teachers/new', async (req, res) => {
    res.render('teachers/new');
})

app.get('/teachers/:id', async (req, res) => {
    const teacher = await Teacher.findById(req.params.id).populate('students');
    const students = await Student.find({});
    res.render('teachers/show', { teacher, students })
})

// POSTS

app.post('/teachers', async (req, res) => {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.redirect('/teachers');
})

// MAKE AS TEACHER

app.post('/teachers/:id/students', async (req, res) => {
    // find the student with this id
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    const student = await Student.findById(req.body.student)
    // console.log(student)

    student.teachers.push(teacher);
    await student.save();
    teacher.students.push(student);
    await teacher.save();
    res.redirect(`/teachers/${id}`)

})


//--------Students--------//

// GETS

app.get('/students', async (req, res) => {
    const students = await Student.find({});
    res.render('students/index', { students })
})

app.get('/students/new', async (req, res) => {
    res.render('students/new');
})

app.get('/students/:id', async (req, res) => {
    const student = await Student.findById(req.params.id).populate('teachers');
    const teachers = await Teacher.find({});

    res.render('students/show', { student, teachers })
})

// POSTS

app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.redirect('/students');
})

// MAKE AS STUDENT

app.post('/students/:id/teachers', async (req, res) => {
    // find the student with this id
    const { id } = req.params;
    const student = await Student.findById(id);
    const teacher = await Teacher.findById(req.body.teacher)
    // console.log(teacher)

    teacher.students.push(student);
    await teacher.save();
    student.teachers.push(teacher);
    await student.save();
    res.redirect(`/students/${id}`)

})



app.listen(1000, () => {
    console.log("App is listening on port 1000");
})

