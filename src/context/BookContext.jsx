import React, { createContext, useState, useEffect, useContext } from 'react';

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null); // For authentication
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowReturn = async (id, isBorrowed) => {
    try {
      await fetch(`http://localhost:3001/books/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isBorrowed: !isBorrowed }),
      });
      fetchBooks(); // Re-fetch books to update the state
    } catch (error) {
      console.error('Error updating book status:', error);
    }
  };

  // Basic Authentication Functions
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      const authenticatedUser = users.find(u => u.username === username && u.password === password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        console.log('Logged in successfully!');
        return true;
      } else {
        console.log('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    console.log('Logged out');
  };

  const contextValue = {
    books,
    loading,
    user,
    login,
    logout,
    fetchBooks,
    handleBorrowReturn,
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};