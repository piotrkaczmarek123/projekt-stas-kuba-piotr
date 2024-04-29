import React, { useState } from 'react';
import './UserForm.css';
function UserForm({ addUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    addUser({ username, password });
    setUsername('');
    setPassword('');
  };

  const handleAddUserClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <button className="add-user-trigger" onClick={handleAddUserClick}>Add User</button>
      {showForm && (
        <form className="user-form" onSubmit={handleSubmit}>
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
          <button type="submit">Add User</button>
        </form>
      )}
    </div>
  );
}

export default UserForm;
