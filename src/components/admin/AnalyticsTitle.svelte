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
            count="3.3"
    />
    <AnalyticsColorBlock
            type="heighest"
            header="Highest"
            description="CEO"
            count="4.3"
    />
    <AnalyticsColorBlock
            type="lowest"
            header="Lowest"
            description="Boston"
            count="5.6"
    />

</div>