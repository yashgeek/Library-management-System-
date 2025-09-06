import React, { useState } from 'react';
import { useBookContext } from './context/BookContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import AuthForm from './components/AuthForm'; // New component
import './App.css';

function App() {
  const { books, loading, user, handleBorrowReturn } = useBookContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header onAuthClick={() => setShowAuth(!showAuth)} />
      <main>
        {user ? (
          <>
            <SearchBar onSearch={setSearchTerm} />
            {loading ? <p>Loading books...</p> : (
              <BookList books={filteredBooks} onBorrowReturn={handleBorrowReturn} />
            )}
          </>
        ) : (
          <AuthForm onLoginSuccess={() => setShowAuth(false)} />
        )}
      </main>
    </div>
  );
}

export default App;