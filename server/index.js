import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './apiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API endpoints mounted at /api
app.use('/api', apiRouter);

// Serve built frontend if dist exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[IEEE CS MBITS Backend] Server running on port ${PORT}`);
  console.log(`[API Ready] http://localhost:${PORT}/api/stats`);
  console.log(`[Admin Portal] http://localhost:5173/admin`);
});
