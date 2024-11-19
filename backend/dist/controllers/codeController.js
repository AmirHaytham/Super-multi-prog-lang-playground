"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const CodeExecutor_1 = require("../services/CodeExecutor");
const codeExecutor = new CodeExecutor_1.CodeExecutor();
const executeCode = async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const { code, language } = req.body;
        if (!code || !language) {
            console.log('Missing code or language');
            return res.status(400).json({ error: 'Code and language are required' });
        }
        console.log('Executing code for language:', language);
        const result = await codeExecutor.executeCode(code, language);
        console.log('Execution result:', result);
        return res.json(result);
    }
    catch (error) {
        console.error('Error in executeCode:', error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error'
        });
    }
};
exports.executeCode = executeCode;
