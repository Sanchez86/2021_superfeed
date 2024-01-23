<script>
    import {createdNewAudienceData} from "../../js/stores";

    export let value = "";
    export let showCloseIcon = false;
    export let colorIcon = "white";
    export let typeName = ""; // industry-name or geography-name

    const deletionAudienceData = (event) => {

    	console.log('deletionAudienceData createdNewAudienceData', $createdNewAudienceData);
    	console.log('deletionAudienceData typeName', typeName);

    	let audienceNameArr     = $createdNewAudienceData[typeName];
	    const valueToDelete     = event.target.dataset.value;

	    audienceNameArr = {
		    ...$createdNewAudienceData,
		    [typeName] : (audienceNameArr) && audienceNameArr.filter( item => item !== valueToDelete )
        }

        // save audience data
	    createdNewAudienceData.update( (n) => audienceNameArr);
    }
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_tags.scss";
</style>

<div class="tag-search orange" on:click={deletionAudienceData} data-value={value}>
    {value}
    {#if showCloseIcon}
        <i class="tag-icon tag-search-{colorIcon}-icon"></i>
    {/if}
</div>