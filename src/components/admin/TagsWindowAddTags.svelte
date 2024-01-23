<script>
	import {checkStepFields, saveEnteredTagData} from "../../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../../data/translations';
    import Scrollbar                 from 'happy-svelte-scrollbar';
    import BtnStandart               from './../buttons/BtnStandart.svelte';
    import BtnBack                   from './../buttons/BtnBack.svelte';
    import Tag                       from './../Tag.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
    let itemsCount = [Tag];

    const goToNextWindow = (event) => {
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

	const goToNextStep = (event) => {
		if ( !checkStepFields('addTagsBlock') ) return false;

		// Update localStorage with users data
		saveEnteredTagData('addTagsBlock');

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
				itemsCount = [...itemsCount, Tag];
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
	@import "../../sass/_add-tags.scss";
	.my-scroller {
		max-height : 251px;
	}
</style>

<div class="mt-30">
    <div class="mb-15">
        <h2>{translations[LANG]?.adminAddTags?.adminAddTags_heading}</h2>
    </div>
    <form data-role="addTagsBlock"
          data-step="tagsWindowAllTags-window"
          on:submit|preventDefault={goToNextStep}
    >
        <hr class="hr-top">
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
        <hr class="hr-top">

        <div class="mt-30">
            <BtnStandart text="{translations[LANG]?.adminAddTags?.adminAddTags_btn}"
                         btnType="submit"
                         color="purple" />
        </div>
    </form>
    <div class="mt-30">
        <BtnBack dataStep="tagsWindowAllTags-window" on:click={goToNextWindow} />
    </div>
</div>