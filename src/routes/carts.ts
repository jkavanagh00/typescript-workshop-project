import express from "express";
import { getOwnCart, addCart, addItemToCart, removeItemFromCart } from "#controllers/carts";
import toysRouter from "./toys";

const cartsRouter = express.Router();

cartsRouter.get('/', getOwnCart);
cartsRouter.post('/', addCart);
cartsRouter.post('/items', addItemToCart);
cartsRouter.delete('/items/:id', removeItemFromCart);

export default cartsRouter;