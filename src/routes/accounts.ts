import express from 'express';
import { showAccount, updateAccountInfo } from '#controllers/accounts';
import { requireAuth } from '#middleware/auth';

const accountsRouter = express.Router();

accountsRouter.get('/', requireAuth, showAccount);
accountsRouter.put('/', requireAuth, updateAccountInfo);

export default accountsRouter;