export interface ExecutionResult {
  output?: string;
  error?: string;
}

export interface CodeExecutionRequest {
  code: string;
  language: string;
}

export interface LanguageConfig {
  fileExtension: string;
  compileCommand?: string[];
  runCommand: string[];
  prepareCode?: (code: string) => string;
} 