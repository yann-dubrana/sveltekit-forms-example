import { z } from 'zod';

export interface Todo {
	id?: string;
	description: string;
	checked: number;
}

export const todoCreateSchema = z.object({
	description: z.string().min(3).max(50),
	checked: z.boolean()
});

export const todoUpdateSchema = z.object({
	id: z.string(),
	checked: z.boolean()
});

export const todoDeleteSchema = z.object({
	id: z.string()
});
