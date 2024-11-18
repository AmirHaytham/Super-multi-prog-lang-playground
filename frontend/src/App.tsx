import { useState } from 'react';
import { Play, Save, Layout, Settings } from 'lucide-react';
import CodeEditor from './components/Editor';
import LanguageSelector from './components/LanguageSelector';

export default function App() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Start coding here\n');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    setOutput('Running code...\nThis is a frontend demo. Backend integration required for actual code execution.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Layout className="w-6 h-6 text-indigo-500" />
              <h1 className="text-xl font-bold">Code Playground</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4 h-[calc(100vh-8rem)]">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LanguageSelector selected={language} onSelect={setLanguage} />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                <Play className="w-4 h-4" />
                Run
              </button>
            </div>
          </div>

          {/* Editor and Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
            <div className="h-full">
              <CodeEditor
                language={language}
                code={code}
                onChange={(value) => setCode(value || '')}
              />
            </div>
            <div className="h-full">
              <div className="h-full w-full rounded-lg bg-gray-800 p-4 font-mono text-sm overflow-auto">
                <pre>{output || 'Output will appear here...'}</pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}