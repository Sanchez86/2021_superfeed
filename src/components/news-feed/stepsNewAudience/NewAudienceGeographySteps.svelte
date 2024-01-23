<script>
	import NewAudienceGeography          from './NewAudienceGeography.svelte';
	import NewAudienceGeographyList      from './NewAudienceGeographyList.svelte';
	import NewAudienceGeographySave      from './NewAudienceGeographySave.svelte';

	let currentStepWindow = 'NewAudienceGeography-window';
	// Define what step should be displayed
	const windowHandler = (event) => {
		currentStepWindow = event.detail.step;
	}

</script>
<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_admin.scss";
</style>
<div>

    {#if currentStepWindow === 'NewAudienceGeography-window'}
        <NewAudienceGeography on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'NewAudienceGeographyList-window'}
        <NewAudienceGeographyList on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'NewAudienceGeographySave-window'}
        <NewAudienceGeographySave on:goToStep={windowHandler} />
    {/if}

</div>