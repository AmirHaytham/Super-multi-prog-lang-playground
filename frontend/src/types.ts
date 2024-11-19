export type Language = {
  id: string;
  name: string;
  icon: string;
};

export type CodeSnippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  created: Date;
};

export type LanguageConfig = {
  monaco: string;
  label: string;
  icon: string;
  sample: string;
};

export type LanguageKey = 'javascript' | 'cpp' | 'ruby' | 'go';

export type EditorTheme = 'vs-dark' | 'vs-light' | 'hc-black';

export interface EditorSettings {
  theme: EditorTheme;
  fontSize: number;
  keybinding: string;
  minimap: boolean;
  wordWrap: string;
  lineNumbers: string;
}