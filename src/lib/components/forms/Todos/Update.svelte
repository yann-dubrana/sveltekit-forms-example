<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { type Todo, todoUpdateSchema } from '$lib/schemas';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	export let todo: Todo = {};
	export let data: SuperValidated<Infer<todoUpdateSchema>>;
	const { enhance, submit } = superForm(data, {
		resetForm: true,
		warnings: {
			duplicateId: false
		}
	});
</script>

<form method="POST" action="?/update" use:enhance>
	<input type="hidden" name="id" bind:value={todo.id} />
	<input name="checked" bind:checked={todo.checked} type="checkbox"
				 class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" on:change={submit}>
</form>