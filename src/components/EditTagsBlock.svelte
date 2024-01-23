<script>
	import { createEventDispatcher } from 'svelte';
	import translations              from '../data/translations';
	import Scrollbar                 from 'happy-svelte-scrollbar';
	import BtnBack                   from './buttons/BtnBack.svelte';
	import BtnStandart               from './buttons/BtnStandart.svelte';
	import Heading                   from './Heading.svelte';
	import TagEdit                   from './TagEdit.svelte';
	import {checkStepFields, saveEnteredTagData} from "../js/helpers.js";

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
		{ id: '0', name: 'Target an audience' },
		{ id: '1', name: 'Target an audience 2' },
		{ id: '2', name: 'Target an audience 3' }
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
	const goToBack = (event) =>{
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
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
	@import "../sass/_variables.scss";
	@import "../sass/_mixin.scss";
	@import "../sass/_tags.scss";
	.edit-tags{
		width: 100%;
		text-align: center;
	}
	.my-scroller {
		max-height : 251px;
	}
</style>

<div class="center-block__content edit-tags">

    <div class="mb-15">
        <Heading heading={translations[LANG]?.editTags?.heading} />
    </div>
    <form name="edit-rules"
          data-role="editTagsBlock-step"
          data-step="addAdmin-step"
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
            <BtnStandart text={translations[LANG].editTags.editTags_btn}
                         btnType="submit"
                         color="purple" />
        </div>
    </form>

    <div class="mt-30">
        <BtnBack dataStep="addTags-step" on:click={goToBack} />
    </div>

</div>