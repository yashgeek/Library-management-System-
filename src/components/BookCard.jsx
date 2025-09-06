import React from 'react';
import './BookCard.css'; // For basic styling

function BookCard({ book, onBorrowReturn }) {
  return (
    <div className={`book-card ${book.isBorrowed ? 'borrowed' : ''}`}>
      <h3>{book.title}</h3>
      <p>By: {book.author}</p>
      <button onClick={() => onBorrowReturn(book.id, book.isBorrowed)}>
        {book.isBorrowed ? 'Return' : 'Borrow'}
      </button>
      <span className="status">{book.isBorrowed ? 'Borrowed' : 'Available'}</span>
    </div>
  );
}

export default BookCard;