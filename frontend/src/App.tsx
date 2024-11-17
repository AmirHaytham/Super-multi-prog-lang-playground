import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [language, setLanguage] = useState<string>('python');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend
      const result = await axios.post('http://localhost:5000/api/execute', { language, code });
      setResponse(result.data);
    } catch (error) {
      console.error("Error executing code:", error);
      setResponse("Error occurred while executing the code.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
          </select>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here"
            rows={10}
            cols={50}
          />
          <button type="submit">Execute Code</button>
        </form>
        <div>
          <p>Execution Response: {response}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
