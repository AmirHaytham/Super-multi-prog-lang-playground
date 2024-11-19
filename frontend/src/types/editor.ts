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

export type EditorTheme = 'vs-dark' | 'vs' | 'hc-black';

export interface ThemeOption {
  id: EditorTheme;
  label: string;
  icon: string;
}

export interface KeybindingOption {
  id: 'default' | 'vim' | 'emacs';
  label: string;
  description: string;
} 