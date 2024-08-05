const express = require('express');
const bodyParser = require('body-parser');

const app = express();
/*Setting the port number as 3000*/
const port = 3000;

/*To access the index.ejs we need to store it first in the views folder*/
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*Setting tasks array */
let tasks = [];

/*Getting user input for tasks */
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

/*Displaying tasks*/
app.post('/addtask', (req, res) => {
    /*Requesting the user's input and storing it in the newTask variable tentatively until user enters another task*/
    const newTask = req.body.newtask;
        /*Adding task to the array */
        tasks.push(newTask);
        console.log("new task added is", newTask);
        res.redirect('/');
        /*To check if the tasks array contains the new task*/
        console.log(tasks);
});

app.post('/removetask', (req, res) => {
    const removeTask = req.body.task;
    /*Deleting the specific task user clicks the remove button for with the filter function*/
    tasks = tasks.filter(task => task !== removeTask);
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server is running");
});
