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

// update(filter object, update object)
// Update operators: https://docs.mongodb.com/manual/reference/operator/update/

// With a more general filter, you can update multiple documents in one go
// Book.update({ isPublished: false }, {...})

async function updateBook(id) {
  // Update the document directly in the database without retrieving it first

  /* Update directly and return the update result, not the document */
  // const result = await Book.updateOne({ _id: id }, {
  //   $set: {
  //     author: 'Dave',
  //     isPublished: false
  //   }
  // });
  // console.log(result);

  /* Use findOneAndUpdate() if you want to get the original document that is to be updated */
  // const book = await Book.findOneAndUpdate(id, {
  //   $set: {
  //     author: 'Dave',
  //     isPublished: false
  //   }
  // });
  // console.log(book); // The original document

  /* If you want to get the updated document, you need to pass an option */
  const book = await Book.findOneAndUpdate(id, {
    $set: {
      author: 'Jack',
      isPublished: true
    }
  }, { new: true });
  console.log(book); // The updated document
}

updateBook('5c8d2090c8cbb3ce4b36073a');
