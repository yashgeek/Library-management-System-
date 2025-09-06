import React from 'react';
import BookCard from './BookCard';
import './BookList.css'; // For basic styling

function BookList({ books, onBorrowReturn }) {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map(book => (
          <BookCard key={book.id} book={book} onBorrowReturn={onBorrowReturn} />
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default BookList;