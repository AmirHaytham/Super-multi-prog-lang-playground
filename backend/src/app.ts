import express from 'express';
import cors from 'cors';
import codeRoutes from './routes/codeRoutes';

const app = express();

// Configure CORS to allow all origins in development
app.use(cors({
  origin: '*',  // Allow all origins in development
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/api', codeRoutes);

// Add a health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

export default app; 