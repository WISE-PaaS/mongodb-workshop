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

// ---- Get all documents
// async function getBooks() {
//   const books = await Book.find();
//   console.log(books);
// }

async function getBooks() {
  const book = await Book
    .find({ author: 'Dave', isPublished: true })
    .limit(10) // Specify the maximum number of documents the query will return
    .sort({ titile: 1 }) // Sort the returned documents by their title in an ascending order
    .select({ title: 1, author: 1 }); // Specify which document fileds to include or exclude

  console.log(book);
}

getBooks();
