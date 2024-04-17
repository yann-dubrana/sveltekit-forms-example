import type { PageServerLoad } from './$types';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { todoCreateSchema, todoDeleteSchema, todoUpdateSchema } from '$lib/schemas';
import { todoService } from '$lib/server/db';


export const load: PageServerLoad = (async () => {
	const forms = {
		create: await superValidate(zod(todoCreateSchema)),
		update: await superValidate(zod(todoUpdateSchema)),
		delete: await superValidate(zod(todoDeleteSchema))
	};

	const todos = await todoService.get();
	return {
		forms,
		todos
	};

});


export const actions = {
	create: async ({ request }) => {

		const form = await superValidate(request, zod(todoCreateSchema));
		if (!form.valid)
			return fail(400, { form });

		todoService.add(form.data);

		return message(form, `${form.data.description} as been added.`);

	},

	update: async ({ request }) => {
		const form = await superValidate(request, zod(todoUpdateSchema));
		if (!form.valid) return fail(400, { form });
		todoService.update(form.data.id, form.data);
		return message(form, 'Updated');
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, zod(todoDeleteSchema));

		if (!form.valid) return fail(400, { form });
		todoService.remove(form.data.id);
		return message(form, 'Deleted');
	}
};