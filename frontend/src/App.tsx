import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './App.css';

const App: React.FC = () => {
  // State to manage the code written by the user
  const [userCode, setUserCode] = useState<string>('// Start coding here...');
  const [language, setLanguage] = useState<string>('javascript');

  // Handler for code changes in Monaco Editor
  const handleEditorChange = (value: string | undefined) => {
    setUserCode(value || '');
  };

  // Handler for language change
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  // Function to execute code (just logs for now, you can extend this)
  const runCode = () => {
    console.log('Code to execute:', userCode);
    // Code to send the user's code to the backend for execution
    // fetch('/execute', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     code: userCode,
    //     language: language,
    //   }),
    // }).then((response) => response.json())
    // .then((data) => console.log('Execution output:', data.output));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Language Code Playground</h1>

        {/* Language Selection */}
        <div className="language-selector">
          <label htmlFor="language">Choose Language: </label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="ruby">Ruby</option>
          </select>
        </div>

        {/* Monaco Editor */}
        <div className="editor-container">
          <MonacoEditor
            height="500px"
            language={language}
            theme="vs-dark"
            value={userCode}
            onChange={handleEditorChange}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
        </div>

        {/* Run Code Button */}
        <button onClick={runCode} className="run-button">
          Run Code
        </button>
      </header>
    </div>
  );
};

export default App;
