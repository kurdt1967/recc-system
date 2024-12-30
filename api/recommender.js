const natural = require('natural');
const tfidf = new natural.TfIdf();

// Example book dataset
const bookDataset = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" },
  { title: "1984", author: "George Orwell", genre: "Dystopian" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic" },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
  { title: "Moby Dick", author: "Herman Melville", genre: "Adventure" },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian" },
  { title: "Jane Eyre", author: "Charlotte Brontë", genre: "Romance" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Classic" },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", genre: "Fantasy" }
];

// Add books to the TF-IDF model
bookDataset.forEach(book => {
  tfidf.addDocument(`${book.title} ${book.author} ${book.genre}`);
});

module.exports = (req, res) => {
  const inputTitle = req.query.title.toLowerCase();
  const foundBook = bookDataset.find(book => book.title.toLowerCase() === inputTitle);

  if (!foundBook) {
    return res.status(404).json({ error: 'Book not found in the dataset.' });
  }

  const scores = [];
  tfidf.tfidfs(`${foundBook.title} ${foundBook.author} ${foundBook.genre}`, (i, score) => {
    if (i !== bookDataset.findIndex(book => book.title.toLowerCase() === inputTitle)) {
      scores.push({ index: i, score });
    }
  });

  // Sort by relevance
  scores.sort((a, b) => b.score - a.score);
  const recommendations = scores.slice(0, 5).map(score => bookDataset[score.index]);

  res.status(200).json({
    foundBook,
    recommendations
  });
};

