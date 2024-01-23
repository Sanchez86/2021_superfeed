<script>
    import {checkStepFields, saveEnteredTagData} from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import Scrollbar                 from 'happy-svelte-scrollbar';
    import BtnBack                   from './buttons/BtnBack.svelte';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Heading                   from './Heading.svelte';
    import Tag                       from './Tag.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
        let itemsCount = [Tag];

    const goToBack = (event) =>{
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
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_add-tags.scss";
	.my-scroller {
		max-height : 251px;
	}
</style>

<div class="center-block__content add-tags">
    <form data-role="addTagsBlock"
          data-step="editTags-step"
          on:submit|preventDefault={goToNextStep}
    >
        <div class="mb-15">
            <Heading heading={translations[LANG]?.addTags?.heading} />
        </div>
        <div class="my-scroller" bind:this={ iAmScrollArea }>
            <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                <div class="hr-top hr-bottom">
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
            <BtnStandart dataStep="editTags-step"
                         text={translations[LANG].addTags.addTags_btn}
                         on:click={goToNextStep}
                         color="purple" />
        </div>

        <div class="mt-30">
            <BtnBack dataStep="selectFieldsPull-step" on:click={goToBack} />
        </div>
    </form>
</div>