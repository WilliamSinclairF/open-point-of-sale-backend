import express from 'express';
import { decodeIDToken } from './middleware/auth';
import salesRouter from './routes/sales';
import storesRouter from './routes/stores';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(decodeIDToken);

app.use('/sales', salesRouter);
app.use('/stores', storesRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
