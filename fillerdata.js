const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/todo-list-data', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true // Add validation to ensure 'item' is always provided
  }
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Create a new Todo item
let newItem = new Todo({
  item: 'Sample todo item'
});

// Define an async function to save and then delete all Todo items
async function saveDelete() {
  try {
    // Save the new item
    await newItem.save();
    console.log('Item saved:', newItem);

    // Delete all items in the Todo collection
    await Todo.deleteMany({});
    console.log('All items deleted');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the connection to the database
    mongoose.connection.close();
  }
}

// Call the saveDelete function
saveDelete();

// Export the Todo model for use in other files
module.exports = Todo;
