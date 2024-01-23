<script>
	import AdminsWindowAllAdmin      from './TagsWindowAllTags.svelte';
	import AdminsWindowAddAdmin      from './TagsWindowAddTags.svelte';

	let currentStepWindow = 'tagsWindowAllTags-window';

	const windowHandler = (event) => {
		currentStepWindow = event.detail.step;
	}

</script>

<div>

    {#if currentStepWindow === 'tagsWindowAllTags-window'}
        <AdminsWindowAllAdmin on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'tagsWindowAddTags-window'}
        <AdminsWindowAddAdmin on:goToStep={windowHandler} />
    {/if}

</div>