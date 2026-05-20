import { listToys, findToyById, createToy, updateToy as updateToyModel, deleteToy } from '../model/toys';
import { ToyIdParam, ToyInputData, ToyUpdateData } from '../schemas/toys';
import { Request, Response } from 'express';

export async function getToys(request: Request, response: Response) {
  try {
    const toys = await listToys();
    return response.json(toys);
  } catch (error) {
    console.error('Error listing toys:', error);
    return response.status(500).json({ error: 'Failed to list toys' });
  }
}

export async function getToyById(request: Request, response: Response) {
  try {
    const idParam = ToyIdParam.safeParse(request.params);

    if (!idParam.success) {
      return response.status(400).json({ error: idParam.error.issues });
    }

    const toy = await findToyById(idParam.data.id);
    if (!toy) {
      return response.status(404).json({ error: 'Toy not found' });
    }

    return response.json(toy);
  } catch (error) {
    console.error('Error fetching toy by id:', error);
    return response.status(500).json({ error: 'Failed to fetch toy' });
  }
}

export async function addToy(request: Request, response: Response) {
  try {
    const toyInput = ToyInputData.safeParse(request.body);

    if (!toyInput.success) {
      return response.status(400).json({ error: toyInput.error.issues });
    }

    const newToy = await createToy(toyInput.data);
    return response.status(201).json(newToy);
  } catch (error) {
    console.error('Error creating toy:', error);
    return response.status(500).json({ error: 'Failed to create toy' });
  }
}

export async function editToy(request: Request, response: Response) {
  try {
    const idParam = ToyIdParam.safeParse(request.params);

    if (!idParam.success) {
      return response.status(400).json({ error: idParam.error.issues });
    }

    const toyUpdate = ToyUpdateData.safeParse(request.body);

    if (!toyUpdate.success) {
      return response.status(400).json({ error: toyUpdate.error.issues });
    }

    const updatedToy = await updateToyModel(idParam.data.id, toyUpdate.data);

    if (!updatedToy) {
      return response.status(404).json({ error: 'Toy not found' });
    }

    return response.json(updatedToy);
  } catch (error) {
    console.error('Error updating toy:', error);
    return response.status(500).json({ error: 'Failed to update toy' });
  }
}

export async function removeToy(request: Request, response: Response) {
  try {
    const idParam = ToyIdParam.safeParse(request.params);

    if (!idParam.success) {
      return response.status(400).json({ error: idParam.error.issues });
    }

    const deletedToy = await deleteToy(idParam.data.id);

    if (!deletedToy) {
      return response.status(404).json({ error: 'Toy not found' });
    }

    return response.json(deletedToy);
  } catch (error) {
    console.error('Error deleting toy:', error);
    return response.status(500).json({ error: 'Failed to delete toy' });
  }
}
