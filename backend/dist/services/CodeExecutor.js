"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExecutor = void 0;
const child_process_1 = require("child_process");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const languages_1 = require("../config/languages");
class CodeExecutor {
    constructor() {
        this.TEMP_DIR = 'temp_code';
        this.EXECUTION_TIMEOUT = 10000; // 10 seconds
        this.ensureTempDir();
    }
    async ensureTempDir() {
        try {
            await fs.mkdir(this.TEMP_DIR, { recursive: true, mode: 0o777 });
        }
        catch (error) {
            console.error('Failed to create temp directory:', error);
        }
    }
    async createTempFile(code, language) {
        const config = languages_1.LANGUAGE_CONFIGS[language];
        if (!config) {
            throw new Error(`Unsupported language: ${language}`);
        }
        const executionId = (0, uuid_1.v4)();
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
    executeCommand(command, cwd) {
        return new Promise((resolve, reject) => {
            console.log('Executing command:', command.join(' '));
            console.log('Working directory:', cwd);
            const timeout = setTimeout(() => {
                reject(new Error('Execution timed out'));
            }, this.EXECUTION_TIMEOUT);
            (0, child_process_1.exec)(command.join(' '), { cwd }, (error, stdout, stderr) => {
                clearTimeout(timeout);
                console.log('Command output:', { stdout, stderr, error });
                if (error && !stderr) {
                    reject(error);
                }
                else {
                    resolve({ stdout, stderr });
                }
            });
        });
    }
    async executeCode(code, language) {
        console.log(`Starting code execution for ${language}`);
        const config = languages_1.LANGUAGE_CONFIGS[language];
        if (!config) {
            return { error: `Unsupported language: ${language}` };
        }
        let tempFiles;
        try {
            tempFiles = await this.createTempFile(code, language);
            console.log('Created temp files:', tempFiles);
            // Compilation phase (if needed)
            if (config.compileCommand) {
                const compileCommand = config.compileCommand.map(arg => arg
                    .replace('{filename}', tempFiles.filename)
                    .replace('{executable}', tempFiles.executable || ''));
                const { stderr: compileError } = await this.executeCommand(compileCommand, tempFiles.tempDir);
                if (compileError) {
                    return { error: `Compilation error: ${compileError}` };
                }
            }
            // Execution phase
            const runCommand = config.runCommand.map(arg => arg
                .replace('{filename}', tempFiles.filename)
                .replace('{executable}', tempFiles.executable || ''));
            const { stdout, stderr } = await this.executeCommand(runCommand, tempFiles.tempDir);
            if (stderr) {
                return { error: stderr };
            }
            return { output: stdout };
        }
        catch (error) {
            console.error('Error executing code:', error);
            return { error: error instanceof Error ? error.message : 'Unknown error' };
        }
        finally {
            if (tempFiles) {
                try {
                    await fs.rm(tempFiles.tempDir, { recursive: true, force: true });
                }
                catch (error) {
                    console.error('Failed to cleanup:', error);
                }
            }
        }
    }
}
exports.CodeExecutor = CodeExecutor;
