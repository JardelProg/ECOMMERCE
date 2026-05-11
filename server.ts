import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'SMB Máquinas API' });
  });

  // Mock Payment Intent (could be Stripe)
  app.post('/api/create-payment-intent', async (req, res) => {
    const { amount, currency = 'brl' } = req.body;
    // In a real app: const intent = await stripe.paymentIntents.create({ amount, currency });
    res.json({ clientSecret: 'mock_secret_' + Math.random().toString(36).substring(7) });
  });

  // Webhook listener for payments (mock)
  app.post('/api/webhooks/payments', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send('Webhook processed');
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
