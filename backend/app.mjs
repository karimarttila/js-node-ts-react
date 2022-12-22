import express from 'express';
import router from './src/routing/router.mjs';

const application = express();

application.use(router);

export default application;
