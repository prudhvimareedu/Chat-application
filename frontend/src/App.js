import React, { useState } from 'react';
import ChatRoom from './ChatRoom';
import Login from './Login';

function App() {
  const [username, setUsername] = useState('');
  return (
    <div className="App">
      {username ? (
        <ChatRoom username={username} />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;
