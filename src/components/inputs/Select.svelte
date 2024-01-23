<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let id        = '';
    export let name      = '';
    export let className = 'select';
    export let wrapperClass = '';
    export let label        = '';
    export let optionObject = [];
    export let dataInputRole ='';
    export let valueReadOnly = '';
    export let groupIndex = '';
    export let selectedValue = '';

    // console.log('valueReadOnly', valueReadOnly);
    // console.log('optionObject', optionObject);

</script>

<style lang="scss">
     @import "../../sass/_variables.scss";
     @import "../../sass/_mixin.scss";
     @import "../../sass/_rules.scss";
     @import "../../sass/_elements.scss";

	 .select {
		 @include break(small) {
			 height: 40px;
		 }
		 @include break(x-small) {
			 height: 30px;
		 }
	 }

</style>

<div class={`form-control ${wrapperClass}`}>
    {#if label}
        <label for="{id}" class="form-control__label">{@html label}</label>
    {/if}
    
    <select name={name}
            bind:value={selectedValue}
            id={id}
            class={className + " " + valueReadOnly}
            data-input-role={dataInputRole}
            data-group-index={groupIndex} >
        {#if optionObject}
            {#each optionObject as name (name)}
                <option value={name} >{name}</option>
            {/each}
        {/if}
    </select>
</div>