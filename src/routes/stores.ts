import { Router } from 'express';
import { addStore, getAllStores } from '../controllers/stores';

const storesRouter = Router();

storesRouter.route('/').get(getAllStores);
storesRouter.route('/').post(addStore);

export default storesRouter;
