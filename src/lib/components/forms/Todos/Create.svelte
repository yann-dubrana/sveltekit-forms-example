<script lang="ts">

	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';

	import { Alert, Button, Checkbox, Helper, Input, Label } from 'flowbite-svelte';
	import { DownloadOutline } from 'flowbite-svelte-icons';
	import { todoCreateSchema } from '$lib/schemas';

	let showMessage = false
	export let data: SuperValidated<Infer<todoCreateSchema>>;

	const { form, errors, enhance, constraints, message } = superForm(data, {
		resetForm: true,
		clearOnSubmit: 'message'
	});

	message.subscribe(() => {
		showMessage=true
		setTimeout(() => {
			showMessage = false
		}, 2000);
	})
</script>

<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new todos</h2>
<form method="POST" action="?/create" use:enhance>

	{#if $message && showMessage}
		<div class="my-2">
			<Alert color="green">{$message}</Alert>
		</div>
	{/if}

	<div class="flex items-center space-x-4">
		<Label for="description" class="flex-grow">
			<Input type="text" name="description" bind:value={$form.description} {...$constraints.description} />
			{#if $errors.description}
				<Helper class="mt-2" color="red">
					<span class="font-medium">{$errors.description}</span>
				</Helper>
			{/if}
		</Label>
		<Checkbox type="hidden" name="checked" value={false} />
		<Button type="submit">
			<DownloadOutline />
		</Button>
	</div>

</form>
