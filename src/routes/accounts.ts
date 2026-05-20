import express from 'express';
import { showAccount, updateAccountInfo } from '#controllers/accounts';

const accountsRouter = express.Router();

accountsRouter.get('/', showAccount);
accountsRouter.put('/', updateAccountInfo);

export default accountsRouter;