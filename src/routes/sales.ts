import { Router } from 'express';
import { addSale, getAllSales } from '../controllers/sales';

const salesRouter = Router();

salesRouter.route('/').get(getAllSales);
salesRouter.route('/').post(addSale);

salesRouter.post('/hello', (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    console.log('authenticated!', auth);
    return res.send('Hi, from within the phones router POST');
  }
  return res.status(403).send('Not authorized');
});

export default salesRouter;
