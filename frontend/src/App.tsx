import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend
      const result = await axios.post('http://localhost:5000/api/message', { message });
      setResponse(result.data);
    } catch (error) {
      console.error("Error sending message to backend:", error);
      setResponse("Error occurred while sending message.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <button type="submit">Send</button>
        </form>
        <div>
          <p>Backend Response: {response}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
