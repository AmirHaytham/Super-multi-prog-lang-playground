export type LanguageKey = 'javascript' | 'cpp' | 'ruby' | 'go';

export interface LanguageConfig {
  monaco: string;
  label: string;
  icon: string;
  sample: string;
}

export interface EditorSettings {
  theme: string;
  fontSize: number;
  keybinding: string;
  minimap: boolean;
  wordWrap: string;
  lineNumbers: string;
}
 