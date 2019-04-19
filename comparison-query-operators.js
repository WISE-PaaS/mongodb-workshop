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

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)
// $ indicates it's an operator
// Replace the value in the key-value pair with an object to express a concept of comparison

async function getBooks() {
  const book = await Book
    // .find({ author: 'Dave', isPublished: true })
    // .find({ price: 10 }) // Get all the books that are 10 dollars
    // .find({ price: { $gt: 10 } }) // Get all the books that cost more than 10 dollars
    // .find({ price: { $gte: 10, $lte: 20 } }) // 10 <= price <= 20
    .find({ price: { $in: [10, 15, 20] } }) // Get the books with prices that are 10, 15, or 20
    .limit(10)
    .sort({ titile: 1 })
    .select({ title: 1, author: 1 });

  console.log(book);
}

getBooks();
