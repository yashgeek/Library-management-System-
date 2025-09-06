import React from 'react';
import { useBookContext } from '../context/BookContext';
import './Header.css';

function Header() {
  const { user, logout } = useBookContext();

  return (
    <header className="app-header">
      <h1>Library Management System</h1>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={logout} className="auth-button">Logout</button>
          </>
        ) : (
          // You might not need a login button here if the AuthForm is always shown when not logged in
          // Or you can have it toggle a modal/route to a login page
          <p>Please log in</p>
        )}
      </nav>
    </header>
  );
}

export default Header;