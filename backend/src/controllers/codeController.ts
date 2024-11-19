import { Request, Response } from 'express';
import { CodeExecutor } from '../services/CodeExecutor';
import { CodeExecutionRequest } from '../types';

const codeExecutor = new CodeExecutor();

export const executeCode = async (
  req: Request<{}, {}, CodeExecutionRequest>,
  res: Response
) => {
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
  } catch (error) {
    console.error('Error in executeCode:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}; 