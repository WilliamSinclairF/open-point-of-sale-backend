import { Router } from 'express';
import { addSale, getAllSales } from '../controllers/sales';

const salesRouter = Router();

salesRouter.route('/').get(getAllSales);
salesRouter.route('/').post(addSale);

export default salesRouter;
