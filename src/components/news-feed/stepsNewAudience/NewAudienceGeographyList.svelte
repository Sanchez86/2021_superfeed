<script>
	import { createEventDispatcher } from 'svelte';
	import Input                     from './../../inputs/Input.svelte';
	import BtnStandart               from './../../buttons/BtnStandart.svelte';
	import BtnBack                   from './../../buttons/BtnBack.svelte';
	import Scrollbar                 from 'happy-svelte-scrollbar';
	import translations              from '../../../data/translations';
	import AudienceHumanItem         from './AudienceHumanItem.svelte';
	import AudienceTagsGroup         from "./AudienceTagsGroup.svelte";
	import { createdNewAudiencePeople }    from "../../../js/stores.js";

	const LANG     = __myapp.env.CURRENT_LANG;
	const dispatch = createEventDispatcher();

	const goToNextWindow = () => {

		let updatedData = [];
		const fieldsToSave = document.querySelectorAll(".audience-people__item.active .audience-people__name");
		[...fieldsToSave].forEach( (item, index) => {
			const itemValue  = 'name';

			updatedData[index] = {
				...updatedData[index],
				[itemValue] : item.innerText
			}
		});

		createdNewAudiencePeople.update( (n) => updatedData);

		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	const goToBack = (event) =>{
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	let iChangeMyHeight = 100;
	let iAmScrollArea   = 100;
	let searchKeyword   = '';

	// Temporary values;
	let peopleList = [
        {
        	'user_id' : 1,
        	'user_name' : 'John Doe',
        	'avatar_url' : '',
        	'user_company' : 'Google',
        },
        {
        	'user_id' : 2,
        	'user_name' : 'Lady Dee',
        	'avatar_url' : 'https://images.pexels.com/photos/2804282/pexels-photo-2804282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	        'user_company' : 'Google',

        },
        {
        	'user_id' : 3,
        	'user_name' : 'Lady Dee 2',
        	'avatar_url' : 'https://images.pexels.com/photos/2804282/pexels-photo-2804282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	        'user_company' : 'Google',

        },
        {
        	'user_id' : 4,
        	'user_name' : 'Lady Dee 3',
        	'avatar_url' : 'https://images.pexels.com/photos/2804282/pexels-photo-2804282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	        'user_company' : 'Google',

        }
    ];

    let counter = 0;
	Object.keys(peopleList).forEach(function(key) {
		counter++;
	}, peopleList);


	const searchValue = (event) =>  {
		searchKeyword = event.target.value;

		let newPeopleList = (peopleList)
                            && peopleList.filter( item => {
                            	return (item['user_company'].toLowerCase()).includes(searchKeyword.toLowerCase())
		                                || (item['user_name'].toLowerCase()).includes(searchKeyword.toLowerCase())
                            });

		counter = newPeopleList.length;
	}

</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_modal_window.scss";

	.my-scroller {
		max-height : 251px;
	}
    .tag-search-wrap{
        padding: 15px 30px;
        text-align: left;
        padding-right: 100px;
        position: relative;
    }
    .search-result{
        position: absolute;
		top: 36px;
        right: 15px;
		font-weight: 300;
		font-size: 16px;
		line-height: 140%;
        color: $gray;
    }
	.audience-people {
		display: flex;
		flex-wrap: wrap;
	}

</style>

<form data-role="new-industry"
      data-step="NewAudienceGeographySave-window"
      on:submit|preventDefault={goToNextWindow}
>
    <div class="tag-search-wrap">
        <div>
            <AudienceTagsGroup width />
        </div>
        <div class="search-result"><span>{counter} </span>{translations[LANG]?.NewAudienceList?.NewAudienceList_result}</div>
    </div>
    <hr class="hr">

    <div class="popup__search">
        <div class="popup__element-wrap">
            <Input placeholder="{translations[LANG]?.NewAudienceList?.NewAudienceList_placeholder}"
                   search="search" on:input={searchValue} />
        </div>
    </div>
    <div class="my-scroller" bind:this={ iAmScrollArea }>
        <div class="dynamic-content" bind:this={ iChangeMyHeight }>
            <div class="audience-people mt-10 ml-30 mr-30">
                {#each peopleList as peopleItemData (peopleItemData.user_id)}
                    {#if searchKeyword === ''
                        || (peopleItemData['user_company'].toLowerCase()).includes(searchKeyword.toLowerCase())
                        || (peopleItemData['user_name'].toLowerCase()).includes(searchKeyword.toLowerCase()) }
                        <AudienceHumanItem data={peopleItemData} />
                    {/if}
                {/each}
            </div>
        </div>
    </div>

    <Scrollbar
            observerTarget={ iChangeMyHeight }
            scrollArea={ iAmScrollArea }
            showArrows={ false }
            buttonPressingMove={ 10 }
    />
    <div class="popup__footer">
        <div class="popup__element-wrap d-flex justify-content-center">
            <BtnStandart btnType="submit"
                         text="{translations[LANG]?.NewAudienceList?.NewAudienceList_btn}"
                         />
        </div>
        <div class="mt-30">
            <BtnBack dataStep="NewAudienceGeography-window" on:click={goToBack} />
        </div>
    </div>
</form>