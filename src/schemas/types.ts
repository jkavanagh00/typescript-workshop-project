import { z } from 'zod';
import { ToyIdParam, ToyInputData, ToyUpdateData } from './toys';

export type ToyInput = z.infer<typeof ToyInputData>;
export type ToyUpdate = z.infer<typeof ToyUpdateData>;
export type ToyId = z.infer<typeof ToyIdParam>;