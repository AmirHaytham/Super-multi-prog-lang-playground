import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  code: string;
  onCodeChange: (value: string) => void;
  language: string;
  theme?: string;
}

const Editor: React.FC<EditorProps> = ({ code, onCodeChange, language, theme = 'vs-dark' }) => {
  const handleChange = (value: string | undefined) => {
    onCodeChange(value || '');
  };

  return (
    <MonacoEditor
      height="100%"
      language={language}
      theme={theme}
      value={code}
      onChange={handleChange}
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
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
    />
  );
};

export default Editor;