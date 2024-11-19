import { Router, Request, Response } from 'express';
import { executeCode } from '../controllers/codeController';
import { CodeExecutionRequest } from '../types';

const router = Router();

router.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

router.post('/execute', async (req: Request<{}, {}, CodeExecutionRequest>, res: Response) => {
  await executeCode(req, res);
});

export default router; 