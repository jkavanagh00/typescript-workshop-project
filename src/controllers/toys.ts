import { listToys, findToyById, createToy, updateToy as updateToyModel, deleteToy } from '../model/toys';
import { ToyIdParam, ToyInputData, ToyUpdateData } from '../schemas/toys';
import { Request, Response } from 'express';

export async function getToys(request: Request, response: Response) {
  const toys = await listToys();
  return response.json(toys);
}

export async function getToyById(request: Request, response: Response) {
  const idParam = ToyIdParam.safeParse(request.params.id);

  if (!idParam.success) {
    return response.status(400).json({ error: idParam.error.issues });
  }

  const toy = await findToyById(idParam.data.id);
  if (!toy) {
    return response.status(404).json({ error: 'Toy not found' });
  }

  response.json(toy);
}

export async function addToy(request: Request, response: Response) {
  const toyInput = ToyInputData.safeParse(request.body);

  if (!toyInput.success) {
    return response.status(400).json({ error: toyInput.error.issues });
  }

  const newToy = await createToy(toyInput.data);
  response.status(201).json(newToy);
}

export async function editToy(request: Request, response: Response) {
  const idParam = ToyIdParam.safeParse(request.params.id);

  if (!idParam.success) {
    return response.status(400).json({ error: idParam.error.issues });
  }

  const toyUpdate = ToyUpdateData.safeParse(request.body);

  if (!toyUpdate.success) {
    return response.status(400).json({ error: toyUpdate.error.issues });
  }

  const updatedToy = await updateToyModel(idParam.data, toyUpdate.data);

  if (!updatedToy) {
    return response.status(404).json({ error: 'Toy not found' });
  }

  response.json(updatedToy);
}

export async function removeToy(request: Request, response: Response) {
  const idParam = ToyIdParam.safeParse(request.params.id);

  if (!idParam.success) {
    return response.status(400).json({ error: idParam.error.issues });
  }

  const deletedToy = await deleteToy(idParam.data);

  if (!deletedToy) {
    return response.status(404).json({ error: 'Toy not found' });
  }

  response.json(deletedToy);
}
