import { useState, useCallback } from 'react';
import Editor from "@monaco-editor/react";
import { Play, Settings } from 'lucide-react';
import axios from 'axios';
import type { LanguageConfig, LanguageKey, EditorSettings } from './types/editor';
import SettingsModal from './components/SettingsModal';
import './App.css';

const LANGUAGE_CONFIGS: Record<LanguageKey, LanguageConfig> = {
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

const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  theme: 'vs-dark',
  fontSize: 14,
  keybinding: 'default',
  minimap: false,
  wordWrap: 'on',
  lineNumbers: 'on'
};

const App = () => {
  const [code, setCode] = useState<string>(LANGUAGE_CONFIGS.cpp.sample);
  const [language, setLanguage] = useState<LanguageKey>('cpp');
  const [output, setOutput] = useState<string>('Output will appear here...');
  const [loading, setLoading] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [editorSettings, setEditorSettings] = useState<EditorSettings>(DEFAULT_EDITOR_SETTINGS);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LanguageKey;
    setLanguage(newLanguage);
    setCode(LANGUAGE_CONFIGS[newLanguage].sample);
  };

  const handleSettingsChange = (newSettings: Partial<EditorSettings>) => {
    setEditorSettings((prev: EditorSettings) => ({ ...prev, ...newSettings }));
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setOutput('Executing...');

      const apiUrl = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5005`;
      const { data } = await axios.post(`${apiUrl}/api/execute`, {
        code,
        language
      });
      
      setOutput(data.output || data.error || 'No output');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col">
      <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">Code Playground</h1>
          <div className="relative">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-600"
            >
              {Object.entries(LANGUAGE_CONFIGS).map(([key, { label, icon }]) => (
                <option key={key} value={key}>
                  {icon} {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-[#30363d]"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-[#30363d]"
            title="Run"
          >
            <Play className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-0">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={LANGUAGE_CONFIGS[language].monaco}
          value={code}
          onChange={handleCodeChange}
          theme={editorSettings.theme}
          options={{
            fontSize: editorSettings.fontSize,
            minimap: { enabled: editorSettings.minimap },
            wordWrap: editorSettings.wordWrap,
            lineNumbers: editorSettings.lineNumbers,
            automaticLayout: true,
            tabSize: 2,
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            suggestOnTriggerCharacters: true,
            renderLineHighlight: "all",
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            }
          }}
        />
        <div className="bg-[#1e1e1e] p-4 rounded-r-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Output</h2>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={editorSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
};

export default App; 