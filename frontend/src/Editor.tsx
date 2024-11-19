import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  language: string;
  code: string;
  onCodeChange: (newCode: string) => void;
}

const Editor: React.FC<EditorProps> = ({ language, code, onCodeChange }) => {
  return (
    <div className="editor-container w-full max-w-4xl border border-gray-700 rounded overflow-hidden shadow-lg">
      <MonacoEditor
        height="500px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value: string | undefined) => onCodeChange(value || '')}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default Editor;
