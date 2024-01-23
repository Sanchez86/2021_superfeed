<script>
	import AccessWindowAllRules      from './AccessWindowAllRules.svelte';
	import AccessWindowAddRules      from './AccessWindowAddRules.svelte';

	let currentStepWindow = 'accessWindowAllRules-window';

	//TODO: Need to remove
	//currentStepWindow = 'accessWindowAddRules-window';

	const windowHandler = (event) => {
		currentStepWindow = event.detail.step;
	}

</script>

<div>

    {#if currentStepWindow === 'accessWindowAllRules-window'}
        <AccessWindowAllRules on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'accessWindowAddRules-window'}
        <AccessWindowAddRules on:goToStep={windowHandler} />
    {/if}

</div>