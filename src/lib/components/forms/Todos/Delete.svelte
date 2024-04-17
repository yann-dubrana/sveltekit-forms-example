<script lang="ts">
	import { Button, Toast } from 'flowbite-svelte';
	import { InfoCircleOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { todoUpdateSchema } from '$lib/schemas';

	export let todo;
	export let data: SuperValidated<Infer<todoUpdateSchema>>;
	let showMessage = false;
	const { enhance, message } = superForm(data, {
		delayMs: 300,
		resetForm: true,
		multipleSubmits: 'allow',
		warnings: {
			duplicateId: false
		}
	});

	message.subscribe(() => {
		showMessage=true
		setTimeout(() => {
			showMessage = false
		}, 2000);
	})

</script>

{#if $message && showMessage}
	<Toast color="red" position="bottom-right">
		<svelte:fragment slot="icon">
			<InfoCircleOutline class="w-5 h-5" />
			<span class="sr-only">Error icon</span>
		</svelte:fragment>
		{$message}
	</Toast>
{/if}


<form method="POST" action="?/delete" use:enhance>
	<input type="hidden" name="id" bind:value={todo.id} />
	<Button color="red" type="submit">
		<TrashBinOutline />
	</Button>
</form>