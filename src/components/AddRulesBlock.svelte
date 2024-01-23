<script>
    import { checkStepFields,
             saveEnteredRuleData,
             makeRequestToBackend,
             debounce } from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import Scrollbar                 from 'happy-svelte-scrollbar';
    import BtnBack                   from './buttons/BtnBack.svelte';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Heading                   from './Heading.svelte';
    import Rule                      from './Rule.svelte';
    import {previewTagsData, createdCommunityData, createdAudienceData}        from '../js/stores';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
    let itemsCount = [Rule];

    let iChangeMyHeight = 100;
    let iAmScrollArea   = 100;
    let autoCompleteValuesFormatted = [];

    const goToBack = (event) =>{
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

    console.log('previewTagsData', $previewTagsData);


    /**
     *  Go to next step
     */
    const goToNextStep = (event) => {
        if ( !checkStepFields('addRulesBlock-step') ) return false;

        // Checking what page should we open on start app
        ( async () => {

            const formData = new FormData(event.target)
            let rules      = {};
            const names    = formData.getAll('rules[name]');
            const compare  = formData.getAll('rules[compare]');
            const values   = formData.getAll('rules[value]');

            for (let i = 0; i<names.length; i++) {
                rules[`rules[${i}][name]`]    = names[i];
                rules[`rules[${i}][compare]`] = compare[i];
                rules[`rules[${i}][value]`]   = values[i];
            }

            let temp = {
                "key": "keyVDzfim1QmZLG6L",
                "driver":"airtable",
                "base":"app7pvsuZJ5eZ4WLH",
                "table":"Applicants",
                "fields[Email]":"Email address",
                "fields[Name]":"Name",
                "fields[Location]":"Location",
                "fields[Organization]":"Organization",
                "fields[Title]":"Title",
                "fields[Industry]":"Industry",
            }

            console.log('createdAudienceData', $createdAudienceData);
            console.log('$previewTagsData', $previewTagsData);

            const generalData = {
                "fields[Email]": $previewTagsData.fields['Email'],
                "fields[Name]": $previewTagsData.fields['Name'],
                "fields[Location]": $previewTagsData.fields['Location'],
                "fields[Organization]": $previewTagsData.fields['Organization'],
                "fields[Title]": $previewTagsData.fields['Title'],
                "fields[Industry]": $previewTagsData.fields['Industry']
            }

            const EXPORT_RULES_ENDPOINT  = __myapp.env.EXPORT_RULES_ENDPOINT;
            const data = {
                ...generalData,
                ...$previewTagsData,
                //...temp,
                ...rules,
                "community_id" : $createdCommunityData.id
            };

            delete data.fields;

            console.log('EXPORT_RULES_ENDPOINT data', data);

            let res = await makeRequestToBackend(data, EXPORT_RULES_ENDPOINT, 'POST');

            console.log('EXPORT_RULES_ENDPOINT res', res);

            // Access isn't authorized
            if ( res.status === 401 ) {
                dispatch('goToStep', {
                    step: 'login-step',
                });
                return;
            }

        })();


        /*dispatch('goToStep', {
            step: event.target.dataset.step,
        });*/
    }


    /**
     * Create duplicate rule set / Remove existing rule set
     * @param event
     */
    const elemBehaviourHandler = (event) => {
	    const ROLE = event.target.dataset.role;
	    const ITEM_INDEX = event.target.dataset.index;

	    let rowsRules = '';

	    switch ( ROLE ) {
		    case 'create-new-elem':
		    	setTimeout(function(){
				    rowsRules = document.querySelectorAll('.rules__block');
				    rowsRules.forEach((element) => {
					    element.querySelectorAll('button')[1].disabled = false;
				    })
                },100);

			    itemsCount = [...itemsCount, Rule];

			    break;


		    case 'remove-elem':
			    setTimeout(function(){
				    rowsRules = document.querySelectorAll('.rules__block');
				    if(rowsRules.length < 2){
					    rowsRules.forEach((element) => {
						    element.querySelectorAll('button')[1].disabled = true;
					    });
				    }
			    },100);

			    delete itemsCount[ITEM_INDEX];
			    itemsCount = itemsCount;

			    break;
	    }

    }


</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_rules.scss";
</style>

<div class="center-block__content rules">
    <form data-role="addRulesBlock-step"
          data-step="editRulesBlock-step"
          name="add-rules-form"
          on:submit|preventDefault={goToNextStep}
    >
        <div class="mb-15">
            <Heading heading={translations[LANG]?.addRules?.heading} />
        </div>
        <div class="my-scroller" bind:this={ iAmScrollArea }>
            <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                <div class="wrap-rules-blocks">
                    {#each itemsCount as component , index}
                        <svelte:component this="{component}"
                                          on:click={elemBehaviourHandler}
                                          keyIndex={index}
                                          disableStatus="disabled"
                                          dataRoleRemove="remove-elem"
                                          dataRolePlus="create-new-elem" />
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

        <div class="mt-30">
            <BtnStandart text={translations[LANG].addRules.addRules_btn}
                         btnType="submit"
                         color="purple"
            />  
        </div>

        <div class="mt-30">
            <BtnBack dataStep="createAccessRulesBlock-step" on:click={goToBack} />
        </div>
    </form>

</div>