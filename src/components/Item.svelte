<script>
	import { slide } from "svelte/transition";
	export let entry
	let isOpen = false
	const toggle = () => isOpen = !isOpen
</script>
<style lang="scss">
	@import "../sass/_variables.scss";
	@import "../sass/_mixin.scss";
    .accordion{
        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            width: 100%;
            height: 50px;
            background-color: $btn-bg-disabled;
            border: 1px solid $btn-border;
            border-radius: 10px;
            color: $black;
            font-weight: 500;
            font-size: 18px;
            line-height: 34px;
			margin-top: 15px;
            &:first-child{
                margin-top: 0;
            }
            &[aria-expanded="true"]{
                background: linear-gradient(79.72deg, $purple 0%, $purple-light 100%);
                color: $white;
                border: 0;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
            }
        }
        &__content{
			font-size: 14px;
			line-height: 160%;
			font-weight: 300;
			background: $white;
			border: 1px solid $btn-border;
            border-top: 0;
			border-radius: 10px;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
            padding: 15px 15px 30px 15px;
        }
	}

    svg {
        transition: transform 0.2s ease-in;
		transform: rotate(0.25turn);
    }

    [aria-expanded=true] svg { transform: rotate(-0.25turn); }
</style>
<button on:click={toggle} aria-expanded={isOpen} class="accordion__header">
    <span>{entry[0]}</span>
    <svg style=""  width="20" height="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 5l7 7-7 7"></path>
    </svg>
</button>
{#if isOpen}
    <ul transition:slide={{ duration: 300 }}>
        {#each entry[1] as item}
            <li class="accordion__content">{item}</li>
        {/each}
    </ul>
{/if}
