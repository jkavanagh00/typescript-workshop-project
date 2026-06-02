import express from 'express';
import { showAccount, updateAccountInfo } from '#controllers/accounts';
import { authenticate } from '../middleware/authenticate';

const accountsRouter = express.Router();

accountsRouter.get('/', authenticate, showAccount);
accountsRouter.put('/', authenticate, updateAccountInfo);

export default accountsRouter;