<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let iconType = '';
	export let textMessage = '';
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_header-message.scss";

</style>

<div class="header-message__item">
    <i class="header-message__icon icon-{iconType}"></i>
    <p class="header-message__text">
        {textMessage}
    </p>
</div>