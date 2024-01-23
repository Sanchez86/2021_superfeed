<script>
	import {checkStepFields, saveEnteredRuleData} from "../../js/helpers";
	import { createEventDispatcher } from 'svelte';
	import translations              from '../../data/translations';
	import Scrollbar                 from 'happy-svelte-scrollbar';
	import BtnBack                   from './../buttons/BtnBack.svelte';
	import BtnStandart               from './../buttons/BtnStandart.svelte';
	import Rule                      from './../Rule.svelte';

	const dispatch = createEventDispatcher();
	const LANG     = __myapp.env.CURRENT_LANG;
	let itemsCount = [Rule];

	let operators = [
		{ id: '0', name: 'Equals' },
		{ id: '1', name: 'Plus' },
		{ id: '2', name: 'Minus' }
	];

	const windowHandler = (event) => {
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	const goToNextStep = (event) => {
		if ( !checkStepFields('addRulesBlock-step') ) return false;

		// Update localStorage with users data
		saveEnteredRuleData('addRulesBlock-step');

		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}
	let iChangeMyHeight = 100;
	let iAmScrollArea = 100;

	/**
	 *
	 * @param event
	 */
	const elemBehaviourHandler = (event) => {

		const ROLE = event.target.dataset.role;
		const ITEM_INDEX = event.target.dataset.index;

		switch ( ROLE ) {
			case 'create-new-elem':
				itemsCount = [...itemsCount, Rule];
				break;
			case 'remove-elem':
				delete itemsCount[ITEM_INDEX];
				itemsCount = itemsCount;
				break;
		}

	}
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_rules.scss";
</style>

<div class="center-block__content rules">
    <h2 class="mt-15">{@html translations[LANG]?.adminAddRules?.header}</h2>
    <hr class="hr-top">

    <form data-role="addRulesBlock-step"
          data-step="accessWindowAllRules-window"
          on:submit|preventDefault={goToNextStep}
    >

        <div class="my-scroller" bind:this={ iAmScrollArea }>
            <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                <div class="wrap-rules-blocks">
                    {#if itemsCount}
                        {#each itemsCount as component , index}
                            <svelte:component this="{component}"
                                              on:click={elemBehaviourHandler}
                                              keyIndex={index}
                                              dataRoleRemove="remove-elem"
                                              dataRolePlus="create-new-elem" />
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
        <Scrollbar
                observerTarget={ iChangeMyHeight }
                scrollArea={ iAmScrollArea }
                showArrows={ false }
                buttonPressingMove={ 10 }
        />

        <div class="mt-30">
            <!--dataStep="accessWindowAddRules-window"-->
            <BtnStandart text="{translations[LANG]?.adminAddRules?.btn}"
                         btnType="submit"
                         color="purple" />
        </div>
        <div class="mt-30">
            <BtnBack dataStep="accessWindowAllRules-window" on:click={windowHandler} />
        </div>
    </form>

</div>