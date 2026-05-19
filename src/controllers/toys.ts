import { listToys } from '../model/toys';
import { ToyIdParam } from '../schemas/toys';
import express, { request, response } from 'express';
import z from 'zod';

export async function getToyById(request, response) {
  const idParam = ToyIdParam.parse(request.params.id);
}
