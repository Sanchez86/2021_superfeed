<script>
    import { createEventDispatcher } from 'svelte';
    

    const dispatch = createEventDispatcher();

    export let symbol   = '';
    export let dataIndex    = 0;
    export let dataRole = '';
    export let disabled ='';
    export let addClass ='';
    export let size ='medium';
    export let color ='purple';
</script>

<style lang="scss">
    @import "../../sass/_variables.scss";
    @import "../../sass/_mixin.scss";
    @import "../../sass/_buttons.scss";
</style>


<button class="btn-small {size} {addClass} {color}"
        data-role={ dataRole ?? '' }
        data-index={dataIndex}
        on:click|preventDefault
        {disabled}>
    <i class="btn-{symbol}"></i>
</button>