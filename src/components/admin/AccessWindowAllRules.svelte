<script>
	import { createEventDispatcher } from 'svelte';
	import translations              from '../../data/translations';
	import Scrollbar                 from 'happy-svelte-scrollbar';
	import BtnStandart               from './../buttons/BtnStandart.svelte';
	import RuleEdit                  from './../RuleEdit.svelte';
	import {checkStepFields, saveEnteredRuleData} from "../../js/helpers";

	let iChangeMyHeight = 100;
	let iAmScrollArea = 100;

	const dispatch = createEventDispatcher();
	const LANG     = __myapp.env.CURRENT_LANG;
	let itemsCount = [RuleEdit];
	let isReadOnly = 'readonly';

	// Get rules data
	const rulesData     = localStorage.getItem('entered-rule-data');
	let parsedRulesData = (rulesData) ? {...JSON.parse(rulesData)} : {};

	let operators = [
		{ id: '0', name: 'Equals' },
		{ id: '1', name: 'Plus' },
		{ id: '2', name: 'Minus' }
	];


	const elemBehaviourHandler = (event) => {
		const ROLE = event.target.dataset.role;
		const ITEM_INDEX = event.target.dataset.index;

		switch ( ROLE ) {
			case 'edit-rule':
				parsedRulesData = parsedRulesData;
				isReadOnly = '';
				break;
			case 'remove-elem':
				delete parsedRulesData[ITEM_INDEX];
				parsedRulesData = parsedRulesData;
				break;
		}
	}

	const goToNextStep = (event) => {
		if ( !checkStepFields('editRulesBlock-step') ) return false;

		// Update localStorage with users data
		saveEnteredRuleData('editRulesBlock-step');

		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	//console.log('parsedRulesData', parsedRulesData);
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_rules.scss";

	.my-scroller {
		max-height : 251px;
	}
</style>

<div>
    <form name="edit-rules"
          data-role="editRulesBlock-step"
          data-step="accessWindowAddRules-window"
          on:submit|preventDefault={goToNextStep}>

        <div class="my-scroller" bind:this={ iAmScrollArea }>
            <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                <div class="wrap-rules-blocks">
                    {#if parsedRulesData}
                        {#each Object.keys(parsedRulesData) as ruleItem (ruleItem)}
                            <RuleEdit on:click={elemBehaviourHandler}
                                      keyIndex={ruleItem}
                                      operators={operators}
                                      dataRoleRemove="remove-elem"
                                      dataRoleEdit="edit-rule"
                                      isReadOnly={isReadOnly}
                                      data={parsedRulesData[ruleItem]} />
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
            <BtnStandart btnType="submit"
                         text="{translations[LANG].adminAllRules.btn}"
                         color="purple" />
        </div>
    </form>
</div>