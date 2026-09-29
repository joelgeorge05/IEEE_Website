import express from 'express';
import cors from 'cors';
import { apiRouter } from './apiRouter.js';

export const apiApp = express();

apiApp.use(cors());
apiApp.use(express.json({ limit: '20mb' }));
apiApp.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Mount the apiRouter at /api
apiApp.use('/api', apiRouter);
