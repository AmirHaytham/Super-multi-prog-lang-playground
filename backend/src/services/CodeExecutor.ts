import { exec } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { LANGUAGE_CONFIGS } from '../config/languages';
import { ExecutionResult } from '../types';

interface CommandResult {
  stdout: string;
  stderr: string;
}

interface TempFileResult {
  tempDir: string;
  filename: string;
  executable?: string;
}

export class CodeExecutor {
  private readonly TEMP_DIR = 'temp_code';
  private readonly EXECUTION_TIMEOUT = 10000; // 10 seconds

  constructor() {
    this.ensureTempDir();
  }

  private async ensureTempDir(): Promise<void> {
    try {
      await fs.mkdir(this.TEMP_DIR, { recursive: true });
    } catch (error) {
      console.error('Failed to create temp directory:', error);
    }
  }

  private async createTempFile(
    code: string,
    language: string
  ): Promise<TempFileResult> {
    const config = LANGUAGE_CONFIGS[language];
    if (!config) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const executionId = uuidv4();
    const tempDir = path.join(this.TEMP_DIR, executionId);
    await fs.mkdir(tempDir, { recursive: true });

    const filename = `main${config.fileExtension}`;
    const filepath = path.join(tempDir, filename);

    const preparedCode = config.prepareCode ? config.prepareCode(code) : code;
    await fs.writeFile(filepath, preparedCode);

    return {
      tempDir,
      filename,
      executable: config.compileCommand ? `program_${executionId}` : undefined
    };
  }

  private executeCommand(
    command: string[],
    cwd: string
  ): Promise<CommandResult> {
    return new Promise((resolve, reject) => {
      console.log('Executing command:', command.join(' '));
      console.log('Working directory:', cwd);

      const timeout = setTimeout(() => {
        reject(new Error('Execution timed out'));
      }, this.EXECUTION_TIMEOUT);

      exec(
        command.join(' '),
        { cwd },
        (error, stdout, stderr) => {
          clearTimeout(timeout);
          console.log('Command output:', { stdout, stderr, error });
          
          if (error && !stderr) {
            reject(error);
          } else {
            resolve({ stdout, stderr });
          }
        }
      );
    });
  }

  public async executeCode(code: string, language: string): Promise<ExecutionResult> {
    console.log(`Starting code execution for ${language}`);
    const config = LANGUAGE_CONFIGS[language];
    if (!config) {
      return { error: `Unsupported language: ${language}` };
    }

    let tempFiles: TempFileResult;
    
    try {
      tempFiles = await this.createTempFile(code, language);
      console.log('Created temp files:', tempFiles);

      // Compilation phase (if needed)
      if (config.compileCommand) {
        const compileCommand = config.compileCommand.map(arg =>
          arg
            .replace('{filename}', tempFiles.filename)
            .replace('{executable}', tempFiles.executable || '')
        );

        const { stderr: compileError } = await this.executeCommand(
          compileCommand,
          tempFiles.tempDir
        );

        if (compileError) {
          return { error: `Compilation error: ${compileError}` };
        }
      }

      // Execution phase
      const runCommand = config.runCommand.map(arg =>
        arg
          .replace('{filename}', tempFiles.filename)
          .replace('{executable}', tempFiles.executable || '')
      );

      const { stdout, stderr } = await this.executeCommand(
        runCommand,
        tempFiles.tempDir
      );

      if (stderr) {
        return { error: stderr };
      }
      return { output: stdout };

    } catch (error) {
      console.error('Error executing code:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      if (tempFiles!) {
        try {
          await fs.rm(tempFiles.tempDir, { recursive: true, force: true });
        } catch (error) {
          console.error('Failed to cleanup:', error);
        }
      }
    }
  }
} 