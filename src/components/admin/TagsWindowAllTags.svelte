<script>
    import { createEventDispatcher } from 'svelte';
    import translations              from '../../data/translations';
    import Scrollbar                 from 'happy-svelte-scrollbar';
    import BtnStandart               from './../buttons/BtnStandart.svelte';
    import TagEdit                   from './../TagEdit.svelte';
    import {checkStepFields, saveEnteredTagData} from "../../js/helpers";

    let iChangeMyHeight = 100;
    let iAmScrollArea = 100;

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
    let itemsCount = [TagEdit];
    let isReadOnly = 'readonly';

    // Get rules data
    const tagsData     = localStorage.getItem('entered-tag-data');
    let parsedTagsData = (tagsData) ? {...JSON.parse(tagsData)} : {};

    let values = [
	    { id: "0", name: "Target an audience" },
	    { id: "1", name: "Target an audience 2" },
	    { id: "2", name: "Target an audience 3" }
    ];


    const elemBehaviourHandler = (event) => {

	    const ROLE = event.target.dataset.role;
	    const ITEM_INDEX = event.target.dataset.index;

	    switch ( ROLE ) {
		    case 'edit-elem':
			    parsedTagsData = parsedTagsData;
			    isReadOnly = '';
			    break;
		    case 'remove-elem':
			    delete parsedTagsData[ITEM_INDEX];
			    parsedTagsData = parsedTagsData;
			    break;
	    }

    }

    const goToNextStep = (event) => {
	    if ( !checkStepFields('editTagsBlock-step') ) return false;

	    // Update localStorage with users data
	    saveEnteredTagData('editTagsBlock-step');

	    dispatch('goToStep', {
		    step: event.target.dataset.step,
	    });
    }
</script>

<style lang="scss">
    .my-scroller {
        max-height : 251px;
    }
</style>

<div class="mt-30">

    <form name="edit-tags"
          data-role="editTagsBlock-step"
          data-step="tagsWindowAddTags-window"
          on:submit|preventDefault={goToNextStep}>

        <div class="my-scroller" bind:this={ iAmScrollArea }>
            <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                <div class="wrap-edit-blocks">
                    {#if parsedTagsData}
                        {#each Object.keys(parsedTagsData) as tagItem (tagItem)}
                            <TagEdit on:click={elemBehaviourHandler}
                                     keyIndex={tagItem}
                                     values={values}
                                     dataRoleRemove="remove-elem"
                                     dataRoleEdit="edit-elem"
                                     isReadOnly={isReadOnly}
                                     data={parsedTagsData[tagItem]} />
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
                         text="{translations[LANG].adminAllTags.adminAllTags_btn}"
                         color="purple" />
        </div>
    </form>
</div>