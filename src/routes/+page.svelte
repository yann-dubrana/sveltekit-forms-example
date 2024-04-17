<script lang="ts">
	import '../app.pcss';
	import type { PageData } from './$types';
	import FormTodosCreate from '$lib/components/forms/Todos/Create.svelte';
	import FormTodosUpdate from '$lib/components/forms/Todos/Update.svelte';
	import FormTodosDelete from '$lib/components/forms/Todos/Delete.svelte';

	export let data: PageData;

</script>

<main class="p-4 flex-grow max-w-lg mx-auto">
	<FormTodosCreate bind:data={data.forms.create} />

	<ul class="divide-y divide-gray-200 px-4">

		{#each data.todos as todo}
			<li class="py-4 flex items-center justify-between space-x-4">
				<FormTodosUpdate bind:todo bind:data={data.forms.update} />
				<span class="text-lg font-medium flex-grow">{todo.description}</span>
				<FormTodosDelete bind:todo bind:data={data.forms.delete} />
			</li>
		{/each}
	</ul>
</main>
