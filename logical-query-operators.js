const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to the MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  tags: [String],
  isPublished: Boolean
});

const Book = mongoose.model('Book', bookSchema);

// Logical query operators
// or
// and

async function getBooks() {
  const book = await Book
    .find()
    // Get books that are written by Dave or that are published
    .or([{ author: 'Dave' }, { isPublished: true }]) // Use "or" operator to collect different filters
    .limit(10)
    .sort({ titile: 1 })
    .select({ title: 1, author: 1 });

  console.log(book);
}

getBooks();
