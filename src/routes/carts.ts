import express from "express";
import { getOwnCart, addCart, addItemToCart, removeItemFromCart } from "#controllers/carts";
import { authenticate } from "../middleware/authenticate";

const cartsRouter = express.Router();

cartsRouter.get('/', authenticate, getOwnCart);
cartsRouter.post('/', authenticate, addCart);
cartsRouter.post('/items', authenticate, addItemToCart);
cartsRouter.delete('/items/:id', authenticate, removeItemFromCart);

export default cartsRouter;