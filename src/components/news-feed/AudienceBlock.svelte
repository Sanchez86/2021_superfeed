<script>
    import {createEventDispatcher} from "svelte";

    let activeState = '';

    const selectHumanHandler = (event) => {
	    activeState = !activeState;
    }

    export let name = '';
    export let users = [];
    export let tags = [];
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	.feed-item{
		&__tags-button{
			font-weight: 300;
			font-size: 12px;
			line-height: 14px;
		}
	}
	.audience {
		border-top: 1px solid $hr-border;
		&__block {
			margin-bottom: 15px;
		}
		&__top {
			display: flex;
			justify-content: space-between;
			background-color: $btn-bg-disabled;
			border: 1px solid $btn-border;
			border-radius: 10px;
			padding: 15px 20px;
			&:hover,&.active {
				background: linear-gradient(79.72deg, $purple 0%, $purple-light 100%);
				color: $white;
				border-color: transparent;
			}
		}
		&__name {
			font-weight: 500;
			font-size: 14px;
			line-height: 140%;
		}
		&__count-people {
			font-weight: 300;
			font-size: 14px;
			line-height: 140%;
		}
		&__tags{
			display: flex;
			padding: 10px 0;
		}
		&__tags-button{
			color: $purple;
			font-size: 12px;
            margin-right: 5px;
		}
	}
</style>

<div class="audience__block">
    <div class="audience__top {activeState ? 'active' : ''}" on:click|preventDefault={selectHumanHandler}>
        <div class="audience__name">{name}</div>
        <div class="audience__count-people">62 people</div>
    </div>
    <div class="audience__tags">
        <button class="audience__tags-button"
                data-tag="ceo">
            #CEO
        </button>
        <button class="audience__tags-button"
                data-tag="ceo">
            #CEO
        </button>
        <button class="audience__tags-button"
                data-tag="ceo">
            #CEO
        </button>
    </div>
</div>