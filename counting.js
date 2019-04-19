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

// skip() method works with limit()
// Get the documents in a given page

async function getBooks() {
  const pageNumner = 2;
  const pageSize = 10;
  // If not hard coded --> /api/books?pageNumber=2&pageSize=10

  const book = await Book
    .find({ isPublished: true })
    .skip((pageNumner - 1) * pageSize)
    .limit(pageSize)
    .sort({ titile: 1 })
    .select({ title: 1, author: 1 });

  console.log(book);
}

getBooks();
