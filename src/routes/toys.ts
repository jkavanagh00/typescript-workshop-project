import express from 'express';
import { getToys, getToyById, addToy, editToy, removeToy } from '#controllers/toys';

const toysRouter = express.Router();

toysRouter.get('/', getToys);
toysRouter.get('/:id', getToyById);
toysRouter.post('/', addToy);
toysRouter.put('/:id', editToy);
toysRouter.delete('/:id', removeToy);

export default toysRouter;