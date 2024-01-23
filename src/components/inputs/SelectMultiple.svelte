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

     .prevent-selecting {
         &:focus, &::selection, &:checked {
			 background: #F6F6F6 !important;
			 color: #383A3E !important;
         }
     }
     .select-multiple{
         height: 118px;
         width: 240px;
         background-image: none;
         background-color: #F6F6F6;
         border-radius: 4px;
         padding: 15px;
		 color: #383A3E;
		 font-size: 14px;
		 margin: 5px 0;
		 font-weight: 400;
		 font-family: "Roboto", sans-serif;
         option {

         }
		 /* width */
		 &::-webkit-scrollbar {
			 width: 4px;
		 }

		 /* Track */
		 &::-webkit-scrollbar-track {
			 box-shadow: inset 0 0 5px #E8E8E8;
			 border-radius: 10px;
		 }

		 /* Handle */
		 &::-webkit-scrollbar-thumb {
			 background: linear-gradient(180deg, $orange 0%, $orange-light 100%);
			 border-radius: 10px;
		 }

		 /* Handle on hover */
		 &::-webkit-scrollbar-thumb:hover {
			 background: linear-gradient(180deg, $orange 0%, $orange-light 100%);
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
            multiple
            data-group-index={groupIndex}
            >
        <!--multiple-->

        {#if optionObject}
            {#each optionObject as name (name)}
                <option value={name} >{name}</option>
            {/each}
        {/if}
    </select>
</div>