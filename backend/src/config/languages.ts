import { LanguageConfig } from '../types';

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  javascript: {
    fileExtension: '.js',
    runCommand: ['node', '{filename}'],
    prepareCode: (code: string) => `
      let output = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        output.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '));
      };

      try {
        ${code}
      } catch (error) {
        console.error(error.message);
      }

      process.stdout.write(output.join('\\n'));
    `
  },
  cpp: {
    fileExtension: '.cpp',
    compileCommand: ['g++', '{filename}', '-o', '{executable}'],
    runCommand: ['./{executable}']
  },
  ruby: {
    fileExtension: '.rb',
    runCommand: ['ruby', '{filename}']
  },
  go: {
    fileExtension: '.go',
    compileCommand: ['go', 'build', '-o', '{executable}', '{filename}'],
    runCommand: ['./{executable}']
  }
}; 