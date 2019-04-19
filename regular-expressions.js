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

/*
Use forward slashes to enclose your regular expressions
RE: /pattern/
*/
async function getBooks() {
  const book = await Book
    // .find({ author: 'Dave', isPublished: true })

    // Author's name that starts with 'Dave'
    .find({ author: /^Dave/ })

    // Ends with 'Lee' -- the letter "i" makes case insensitive
    .find({ author: /Lee$/i })

    // Contains 'Dave'
    .find({ author: /.*Dave.*/ }) // .* means it can have zero or more characters 

    .limit(10)
    .sort({ titile: 1 })
    .select({ title: 1, author: 1 });

  console.log(book);
}

getBooks();
