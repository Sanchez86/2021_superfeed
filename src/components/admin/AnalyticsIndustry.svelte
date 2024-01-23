<script>
	import AnalyticsColorBlock from './AnalyticsColorBlock.svelte';

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	.analytics-block {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>

<div class="analytics-block mt-30">

    <AnalyticsColorBlock
            type="average"
            header="Average"
            description=""
            count="9.3"
    />
    <AnalyticsColorBlock
            type="heighest"
            header="Highest"
            description="CEO"
            count="10.3"
    />
    <AnalyticsColorBlock
            type="lowest"
            header="Lowest"
            description="Boston"
            count="11.6"
    />

</div>