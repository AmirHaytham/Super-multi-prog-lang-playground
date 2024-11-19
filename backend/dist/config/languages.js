"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGE_CONFIGS = void 0;
exports.LANGUAGE_CONFIGS = {
    javascript: {
        fileExtension: '.js',
        runCommand: ['node', '{filename}'],
        prepareCode: (code) => `
      const originalConsoleLog = console.log;
      let output = [];
      console.log = (...args) => {
        output.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '));
        originalConsoleLog(...args);
      };

      try {
        ${code}
      } catch (error) {
        console.error(error.message);
      }

      if (output.length > 0) {
        console.log(output.join('\\n'));
      }
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
