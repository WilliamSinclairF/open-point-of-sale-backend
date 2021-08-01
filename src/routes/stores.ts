import { Router } from 'express';
import { getAllStores, getStoreSales, addStore, createStoreSettings } from '../controllers/stores';

const storesRouter = Router();

// GET
storesRouter.route('/').get(getAllStores);
storesRouter.route('/:storeId/sales').get(getStoreSales);

// POST
storesRouter.route('/').post(addStore);
storesRouter.route('/:storeId/settings').post(createStoreSettings);

export default storesRouter;
