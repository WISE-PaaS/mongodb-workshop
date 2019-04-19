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

async function removeBook(id) {
  // Use deleteMany() to remove multiple documents

  /* Delete the first match if you pass in a more general filter object */
  // const result = await Book.deleteOne({ _id: id });
  // console.log(result);

  /* Get the document that is to be deleted */
  const book = await Book.findByIdAndDelete(id);
  console.log(book);
}

removeBook('5c8d2090c8cbb3ce4b36073a');
