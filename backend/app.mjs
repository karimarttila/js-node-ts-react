import express from 'express';
import cors from 'cors';
import router from './src/routing/router.mjs';
import { errorHandler } from './src/util/middleware.mjs';

// Note:
// backend port: 6600
// frontend port: 6610

const corsOptions = {
  origin: 'http://localhost:6610',
};

const port = 6600;
const app = express();
app.use(cors(corsOptions));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
