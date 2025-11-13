import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name);
  };

  return (
    <div className="login-container">
      <h2>Enter your name to join chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Login;
