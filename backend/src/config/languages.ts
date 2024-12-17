import { LanguageConfig } from '../types';

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  javascript: {
    fileExtension: '.js',
    runCommand: (filename) => ['node', filename],
    prepareCode: (code) => {
      // Capture console.log output instead of letting it go to stdout
      return `
        let output = '';
        console.log = (...args) => {
          output += args.join(' ') + '\\n';
        };
        
        ${code}
        
        process.stdout.write(output);
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