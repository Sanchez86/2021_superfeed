<script>
	export let type = ""
	export let header = ""
	export let description = ""
	export let count = ""
</script>
<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	.analytics-block{
		//display: flex;
		//flex-wrap: wrap;
		//justify-content: center;
		&__item{
			width: 300px;
			height: 150px;
			border-radius: 8px;
			background: rgba(255, 44, 91, 0.6);
			margin: 0 15px;
			padding: 30px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			text-align: left;
			margin-bottom: 15px;
			@include break(small) {
				height: 120px;
			}
			@include break(x-small) {
				height: 110px;
				width: 95px;
				margin: 5px;
				padding: 15px;
			}
		}
		&__header{
			color: $white;
			font-size: 20px;
			line-height: 23px;
            margin-bottom: 6px;
			@include break(small) {
				font-size: 16px;
				line-height: 20px;
			}
		}
		&__description{
			color: $white;
			font-weight: bold;
			font-size: 20px;
			line-height: 23px;
			margin-bottom: 5px;
			@include break(small) {
				font-size: 16px;
				line-height: 20px;
			}
		}
		&__count{
			color: $white;
			font-weight: bold;
			font-size: 56px;
			line-height: 66px;
			@include break(small) {
				font-size: 46px;
				line-height: 56px;
			}
			@include break(x-small) {
				font-size: 36px;
				line-height: 46px;
			}
		}
	}
	.analytics-block-average{
		background-image: url("../images/analytics-block-average.png");
	}
	.analytics-block-heighest{
		background-image: url("../images/analytics-block-heighest.png");
	}
	.analytics-block-lowest{
		background-image: url("../images/analytics-block-lowest.png");
	}
</style>

<div class="analytics-block__item analytics-block-{type}">
    <div>
        {#if header}
            <div class="analytics-block__header">
                {header}
            </div>
        {/if}
        {#if description}
            <div class="analytics-block__description">
                {description}
            </div>
        {/if}
        {#if count}
            <div class="analytics-block__count">{count}</div>
        {/if}

    </div>
</div>