const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to the MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

// Define the shape of the document in the MongoDB database
// Available types: String, Number, Date, Buffer, Boolean, ObjectID, Array
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  tags: [String],
  isPublished: Boolean
});

// Create a class of Book
const Book = mongoose.model('Book', bookSchema);

// Create an object/instance based on the Book class
const book1 = new Book({
  title: 'WISE-PaaS Introduction',
  author: 'Dave',
  tags: ['iot', 'cloud'],
  isPublished: true
});

const book2 = new Book({
  title: 'Web Development',
  author: 'Stanley',
  tags: ['frontend', 'backend'],
  isPublished: true
});

// Saving the document
async function saveCourse(book) {
  const result = await book.save();
  console.log(result);
}

saveCourse(book1);
saveCourse(book2);
