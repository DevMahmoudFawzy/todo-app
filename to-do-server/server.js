const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

app.get('/todo', (req, res) => {
    const database = fs.readFileSync('database.json');
    const todoList = JSON.parse(database).data;
    const nowDate = new Date();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    res.status(200).send({
        todos: todoList,
        date: {
            dayNumber: nowDate.getDate(),
            month: nowDate.toLocaleString('default', { month: 'short' }),
            year: nowDate.getFullYear(),
            dayName: days[nowDate.getDay()]
        }
    });
});

app.post('/todo', (req, res) => {
    const data = req.body;
    let uniqueID = 0;
    const database = fs.readFileSync('database.json');
    const todoList = JSON.parse(database).data;

    if (todoList.length > 0) {
        uniqueID = todoList[todoList.length - 1].id + 1;
    }
    data.id = uniqueID;
    todoList.push(data);
    let dataToWrite = { data: todoList };

    fs.writeFile('database.json', JSON.stringify(dataToWrite, null, 2), () => {
        console.log('data added');
    });

    res.status(200).send({ status: true, message: 'todo added successfully!!' });
});

app.put('/todo/:id', (req, res) => {
    const id = req.params.id;
    const database = fs.readFileSync('database.json');
    const todoList = JSON.parse(database).data;
    const todoIndex = todoList.findIndex(a => a.id == id);
    todoList[todoIndex].content = req.body.content;
    todoList[todoIndex].checked = req.body.checked;

    let dataToWrite = { data: todoList };

    fs.writeFile('database.json', JSON.stringify(dataToWrite, null, 2), () => {
        console.log('data updated');
    });

    res.status(200).send({ status: true, message: 'todo updated successfully!!' });
});

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    const database = fs.readFileSync('database.json');
    const todoList = JSON.parse(database).data;
    const todoIndex = todoList.findIndex(a => a.id == id);
    todoList.splice(todoIndex, 1);
    let dataToWrite = { data: todoList };

    fs.writeFile('database.json', JSON.stringify(dataToWrite, null, 2), () => {
        console.log('data deleted');
    });

    res.status(200).send({ status: true, message: 'todo Deleted successfully!!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}`); });