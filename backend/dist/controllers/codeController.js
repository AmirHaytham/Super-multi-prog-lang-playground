"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const CodeExecutor_1 = require("../services/CodeExecutor");
const codeExecutor = new CodeExecutor_1.CodeExecutor();
const executeCode = async (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code || !language) {
            return res.status(400).json({ error: 'Code and language are required' });
        }
        const result = await codeExecutor.executeCode(code, language);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error'
        });
    }
};
exports.executeCode = executeCode;
