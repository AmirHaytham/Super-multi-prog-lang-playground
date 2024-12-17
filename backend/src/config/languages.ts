import { LanguageConfig } from '../types';

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  javascript: {
    fileExtension: '.js',
    runCommand: (filename) => ['node', filename],
    prepareCode: (code) => {
      // Capture all output and prevent it from going to stdout
      return `
        let output = '';
        const originalConsole = console;
        console = {
          ...console,
          log: (...args) => {
            output += args.join(' ') + '\\n';
          }
        };
        
        // Capture process.stdout.write
        const originalStdoutWrite = process.stdout.write;
        process.stdout.write = (chunk) => {
          output += chunk;
          return true;
        };
        
        try {
          ${code}
        } finally {
          // Write the captured output only once
          originalStdoutWrite.call(process.stdout, output);
          // Restore original stdout
          process.stdout.write = originalStdoutWrite;
          console = originalConsole;
        }
      `;
    }
  },
  cpp: {
    fileExtension: '.cpp',
    compileCommand: (filename, executable) => ['g++', filename, '-o', executable],
    runCommand: (_, executable) => ['./' + executable]
  },
  ruby: {
    fileExtension: '.rb',
    runCommand: (filename) => ['ruby', filename]
  },
  go: {
    fileExtension: '.go',
    compileCommand: (filename, executable) => ['go', 'build', '-o', executable, filename],
    runCommand: (_, executable) => ['./' + executable]
  }
}; 