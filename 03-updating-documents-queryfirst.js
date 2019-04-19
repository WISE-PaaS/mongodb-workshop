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

/* Updateing approaches:
1. Query first - it's useful when you want to validate an update before really executing it
- findById()
- Modify its properties
- save()

2. Update first
- Update directly
- Optionally: get the updated document
*/

async function updateBook(id) {
  const book = await Book.findById(id);
  if (!book) return;

  // method 1
  // book.isPublished = true;
  // book.author = 'Another Author';

  // method 2 -- use set()
  book.set({
    isPublished: false,
    author: 'Another Author'
  });

  const result = await book.save();
  console.log(result);
}

updateBook('5c8d2090c8cbb3ce4b36073a');
