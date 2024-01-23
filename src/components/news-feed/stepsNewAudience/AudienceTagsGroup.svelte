<script>
	import TagIcon from './../TagIcon.svelte';
	import {createdNewAudienceData}   from "../../../js/stores";

	$: industryName = ( $createdNewAudienceData && $createdNewAudienceData?.['industry-name'] )
                            ? $createdNewAudienceData?.['industry-name'] : '';

	$: geographyName = ( $createdNewAudienceData && $createdNewAudienceData?.['geography-name'] )
                            ? $createdNewAudienceData?.['geography-name'] : '';

	export let data = [];
	export let width = '';

</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_tags.scss";
	@import "../../../sass/_modal_window.scss";

    .mod-wrap{
        margin-top: 10px;
        max-width: 100% !important;
    }
</style>

<div class="popup__element-wrap {(width) ? 'mod-wrap' : ''} text-left">
    {#each industryName as name}
        <TagIcon value={name} typeName="industry-name" showCloseIcon="true"  on:click />
    {/each}
    {#each geographyName as name}
        <TagIcon value={name} typeName="geography-name" showCloseIcon="true"  on:click />
    {/each}
</div>