import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ loginUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const response = await loginUser({ username, password });
      if (response.error) {
        setLoginError(response.error);
      } else {
        setShowLoginForm(false); // Jeśli zalogowano pomyślnie, ukrywamy formularz logowania
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setLoginError(null); // Resetujemy stan błędu przed pokazaniem formularza logowania
  };

  return (
    <div>
      <button className="login-trigger" onClick={handleLoginClick}>Login</button>
      {showLoginForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {loginError && <p className="error-message">{loginError}</p>} {/* Wyświetlamy komunikat błędu, jeśli istnieje */}
        </form>
      )}
    </div>
  );
}

export default LoginForm;
