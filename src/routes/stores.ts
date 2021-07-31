import { Router } from 'express';
import { getAllStores, getStoreSales, addStore } from '../controllers/stores';

const storesRouter = Router();

// GET
storesRouter.route('/').get(getAllStores);
storesRouter.route('/:storeId/sales').get(getStoreSales);

// POST
storesRouter.route('/').post(addStore);

export default storesRouter;
