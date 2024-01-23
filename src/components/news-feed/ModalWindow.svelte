<script>
	import { createEventDispatcher } from 'svelte';
	//import translations from '../../data/translations';
	import Popup      from './../../js/popup-window.js';

	const dispatch = createEventDispatcher();
	//const LANG = __myapp.env.CURRENT_LANG;

	// Init Popup Windows
	const popup_instance = new Popup();
	popup_instance.init();

	const goToBack = (event) =>{
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	export let id ='';
	export let isOpen = false;

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_modal_window.scss";
</style>

<div class="popup opened">
    <div class="my_overlay js-popup-close"
         on:click
         data-role="popup-close"
    ></div>
    <div class="popup-wrapper-inner">
        <div class="in js-popup-inner">

            <div class="popup__body">
                <slot></slot>
            </div>
        </div>
        <button class="popup-close js-popup-close"
                on:click
                data-role="popup-close">close popup</button>

    </div>
</div>