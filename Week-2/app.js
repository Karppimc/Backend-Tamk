const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

let students = [
    { id: 1, name: "Jani", age: 21, creditPoints: 100, campus: "Kauppi"},
    { id: 2, name: "Tuomas", age: 23, creditPoints: 140, campus: "Center"},
    { id: 3, name: "Kalle", age: 22, creditPoints: 150, campus: "Hervanta"},
    { id: 4, name: "Oskari", age: 25, creditPoints: 180, campus: "Center"},
];

app.get('/', (req, res) => {
    const studentList = students.map(student => `<li>${student.name} ${student.age} ${student.creditPoints} ${student.campus}</li>`).join('');
    res.send(`<ul>${studentList}</ul>`);
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const { name, age, creditPoints, campus } = req.body;
    const newStudent = { id: students.length + 1, name, age, creditPoints, campus };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send({ error: 'Student not found' });
    }
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const { name, age, creditPoints, campus } = req.body;
    const student = students.find(s => s.id === studentId);

    if (student) {
        student.name = name !== undefined ? name : student.name;
        student.age = age !== undefined ? age : student.age;
        student.creditPoints = creditPoints !== undefined ? creditPoints : student.creditPoints;
        student.campus = campus !== undefined ? campus : student.campus;
        res.json(student);
    } else {
        res.status(404).send({ error: 'Student not found' });
    }
});

// DELETE method to delete student
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        res.json(deletedStudent);
    } else {
        res.status(404).send({ error: 'Student not found' });
    }
});

app.delete('/students/campus/:campus', (req, res) => {
    const campus = req.params.campus;

    const initialLength = students.length;
    students = students.filter(student => student.campus !== campus);

    if (students.length < initialLength) {
        res.json({ message: `Students from campus ${campus} deleted` });
    } else {
        res.status(404).send({ error: `No students found from campus ${campus}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
