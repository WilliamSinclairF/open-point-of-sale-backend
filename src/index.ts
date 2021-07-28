import express from 'express';
import salesRouter from './routes/sales';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/sales', salesRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
