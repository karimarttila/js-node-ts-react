import express from 'express';
import { router } from './src/routing/router.js';

const app = express();

app.use(router);

export { app };

