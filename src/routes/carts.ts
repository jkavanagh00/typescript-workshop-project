import express from 'express';
import { getOwnCart, addCart, addItemToCart, removeItemFromCart } from '#controllers/carts';
import { requireAuth } from '#middleware/auth';

const cartsRouter = express.Router();

cartsRouter.get('/', requireAuth, getOwnCart);
cartsRouter.post('/', requireAuth, addCart);
cartsRouter.post('/items', requireAuth, addItemToCart);
cartsRouter.delete('/items/:id', requireAuth, removeItemFromCart);

export default cartsRouter;
