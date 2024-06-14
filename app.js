const express = require('express');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Home = require('./routes/home');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/todo-list-data', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('The database for the todo list is connected!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', Home);


const port = 3000;

app.listen(port, () => {
    console.log(`The website is working and live on port ${port}`);
});