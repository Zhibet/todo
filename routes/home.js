const express = require('express');
const mongoose = require('mongoose');
const Database = require('../modal/inputData'); 
const Home = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/todo-list-data', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('The database for the todo list is connected!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  // Handle item creation
Home.post('/', async (req, res) => {
  try {
    const newItem = new Database({ item: req.body.item });
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle item deletion
Home.post('/delete/:id', async (req, res) => {
  try {
    await Database.findByIdAndDelete(req.params.id);
    console.log(`${req.params.id} has been deleted`)
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send('Internal Server Error');
  }
});


Home.get('/', async (req, res) => {
  try {
    const items = await Database.find({});
    res.render('index', { items });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = Home;
