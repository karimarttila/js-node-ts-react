import express from 'express';
import router from './src/routing/router';

const application = express();

application.use(router);

export default application;
