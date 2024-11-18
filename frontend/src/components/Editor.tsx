import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

type CodeEditorProps = {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
};

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export default function CodeEditor({ language, code, onChange }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!editorRef.current || !containerRef.current) return;

    const resizeObserver = new ResizeObserver(
      debounce(() => {
        if (editorRef.current?.layout) {
          editorRef.current.layout();
        }
      }, 100)
    );

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative h-full w-full rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e]"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        </div>
      )}
      <Editor
        height="100%"
        defaultLanguage={language.toLowerCase()}
        defaultValue={code}
        theme="vs-dark"
        onChange={onChange}
        loading={null}
        beforeMount={() => setIsLoading(true)}
        onMount={(editor) => {
          editorRef.current = editor;
          setIsLoading(false);
          requestAnimationFrame(() => {
            editor.layout();
          });
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          renderWhitespace: 'selection',
          contextmenu: true,
          folding: true,
          lineHeight: 1.5,
          suggestOnTriggerCharacters: true,
          fixedOverflowWidgets: true
        }}
      />
    </div>
  );
}