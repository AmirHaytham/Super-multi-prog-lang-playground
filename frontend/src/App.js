import React from 'react';
import Editor from "@monaco-editor/react";
import './App.css';

const LANGUAGE_CONFIGS = {
  javascript: { 
    monaco: 'javascript', 
    label: 'JavaScript',
    icon: '📜',
    sample: 'console.log("Hello, World!");'
  },
  cpp: { 
    monaco: 'cpp', 
    label: 'C++',
    icon: '⚡',
    sample: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
  },
  ruby: { 
    monaco: 'ruby', 
    label: 'Ruby',
    icon: '💎',
    sample: 'puts "Hello, World!"'
  },
  go: { 
    monaco: 'go', 
    label: 'Go',
    icon: '🔵',
    sample: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}'
  }
};

function App() {
  const [code, setCode] = React.useState(LANGUAGE_CONFIGS.cpp.sample);
  const [language, setLanguage] = React.useState('cpp');
  const [output, setOutput] = React.useState('Output will appear here...');
  const [loading, setLoading] = React.useState(false);
  const [editorMounted, setEditorMounted] = React.useState(false);

  const handleEditorDidMount = () => {
    setEditorMounted(true);
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(LANGUAGE_CONFIGS[newLanguage].sample);
  };

  const handleSubmit = React.useCallback(async () => {
    try {
      setLoading(true);
      setOutput('Executing...');

      const apiUrl = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5002`;
      const response = await fetch(`${apiUrl}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await response.json();
      setOutput(data.output || data.error || 'No output');
    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">Code Playground</h1>
          <div className="relative">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="appearance-none bg-[#21262d] text-white pl-8 pr-8 py-1.5 rounded-md border border-[#30363d] hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              disabled={loading}
            >
              {Object.entries(LANGUAGE_CONFIGS).map(([key, { label, icon }]) => (
                <option key={key} value={key}>
                  {icon} {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !editorMounted}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-md transition-all ${
            loading || !editorMounted
              ? 'bg-[#21262d] cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Running...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Run Code</span>
            </>
          )}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-0">
        {/* Editor Panel */}
        <div className="border-r border-[#30363d]">
          <Editor
            height="calc(100vh - 57px)"
            defaultLanguage="cpp"
            language={LANGUAGE_CONFIGS[language].monaco}
            value={code}
            onChange={setCode}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              padding: { top: 16 },
              suggestOnTriggerCharacters: true,
              lineNumbers: "on",
              renderLineHighlight: "all",
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
              }
            }}
            loading={<div className="text-center p-4">Loading editor...</div>}
          />
        </div>

        {/* Output Panel */}
        <div className="bg-[#0d1117] flex flex-col">
          <div className="p-4 border-b border-[#30363d] bg-[#161b22]">
            <h2 className="text-sm font-medium text-gray-400">Output</h2>
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 