export interface LanguageConfig {
  fileExtension: string;
  runCommand: (filename: string, executable?: string) => string[];
  compileCommand?: (filename: string, executable: string) => string[];
  prepareCode?: (code: string) => string;
}

export interface CodeExecutionRequest {
  code: string;
  language: string;
}

export interface ExecutionResult {
  output?: string;
  error?: string;
}

export interface TempFileResult {
  tempDir: string;
  filename: string;
  executable?: string;
}

export interface CommandResult {
  stdout: string;
  stderr: string;
}
