import { editor } from 'monaco-editor';

declare module '@monaco-editor/react' {
  export interface EditorProps {
    height?: string | number;
    defaultLanguage?: string;
    language?: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
    onMount?: (editor: editor.IStandaloneCodeEditor) => void;
    theme?: string;
    options?: editor.IStandaloneEditorConstructionOptions;
  }

  export type OnMount = (editor: editor.IStandaloneCodeEditor) => void;
  export type OnChange = (value: string | undefined) => void;

  export default function Editor(props: EditorProps): JSX.Element;
} 