<script>
    import Avatar from "./../Avatar.svelte";
    import { createEventDispatcher } from 'svelte';

    export let data = {};
    let activeState = '';
    const dispatch = createEventDispatcher();

    const selectHumanHandler = (event) => {
	    activeState = !activeState;

	    dispatch('selectUser', {
		    user_id: event.target.dataset.id,
	    });
    }
</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_audience-human-item.scss";

</style>

<div class="audience-people__item {activeState ? 'active' : ''}">
    <Avatar url={data?.avatar_url} name={data?.user_name} />

    <div>
        <div class="audience-people__name">{data?.user_name}</div>
        <div class="audience-people__company-name">{data?.user_company}</div>
    </div>
    <button on:click|preventDefault={selectHumanHandler}
            class="audience-people__item-btn"
            data-id={data?.user_id}></button>
</div>