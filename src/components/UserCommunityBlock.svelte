<script>
    import {checkStepFields, saveEnteredUserData} from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import BtnBack                   from './buttons/BtnBack.svelte';
    import Input                     from './inputs/Input.svelte';
    import Heading                   from './Heading.svelte';

    import { createdCommunityData, createdAudienceData } from '../js/stores.js';
    import {makeRequestToBackend}  from '../js/helpers';

    let submitBtnType = 'submit';


    let user_community_name = ( $createdAudienceData
                                && $createdAudienceData?.user_community_name
                                && $createdAudienceData?.user_community_name[0]
                              ) ? $createdAudienceData?.user_community_name[0] : '';

    let user_community_type = ( $createdAudienceData
                                && $createdAudienceData?.user_community_type
                                && $createdAudienceData?.user_community_type[0]
                              ) ? $createdAudienceData?.user_community_type[0] : '';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    const goToBack = (event) =>{
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

    //checking for the presence of the entered data
    let isNextBtnDisabled = true;
    const changeInputHandler = () => {
        const nameInput = document.querySelector('.js-user-community-name');
        const typeInput = document.querySelector('.js-user-community-type');

	    isNextBtnDisabled = !(!!nameInput.value && !!typeInput.value);
    }

    const goToNextStep = (event) => {

    	const blockHolder = 'user-community';

        if ( !checkStepFields(blockHolder) ) return false;

        let nextStep = event.target.dataset.step;


        // Update localStorage with users data
        saveEnteredUserData(blockHolder);

        // Checking what page should we open on start app
        ( async () => {
	        const IS_DEV  = __myapp.env.IS_DEV;
            const CREATE_COMMUNITY_ENDPOINT = __myapp.env.CREATE_COMMUNITY_ENDPOINT;

            const dataToSent = {
                "name": $createdAudienceData.user_community_name[0],
                "company": $createdAudienceData.user_community_type[0]
            }

            submitBtnType = 'loader';

            let res = await makeRequestToBackend(dataToSent, CREATE_COMMUNITY_ENDPOINT, 'POST', true);
            submitBtnType = 'submit';


            // Access isn't authorized
            if ( res.status === 401 ) {
                nextStep = 'login-step';
                return;
            }

            createdCommunityData.update( (n) => JSON.parse(res) );

            //console.log('createdCommunityData', $createdCommunityData);

            // TODO: Add error catching

            dispatch('goToStep', {
                step: nextStep,
            });

        })()

    }

</script>

<div class="center-block__content">
    <div class="center-block__inner">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.community_step?.heading} />
        </div>
        
        {@html translations[LANG]?.community_step?.description}

        <form data-role="user-community"
              data-step="user-whichCRM-step"
              on:submit|preventDefault={goToNextStep}
        >
            <Input
                name="user_community_name"
                wrapperClass="mb-15"
                value="{user_community_name}"
                className="form-control__input-text js-user-community-name"
                dataInputRole="name"
                errorText={translations[LANG]?.inputsErrors?.name}
                on:input={changeInputHandler}
                placeholder={translations[LANG]?.community_step?.placeholder_1}
            />

            <Input
                name="user_community_type"
                value="{user_community_type}"
                wrapperClass="mb-5"
                className="form-control__input-text js-user-community-type"
                dataInputRole="subject"
                on:input={changeInputHandler}
                errorText={translations[LANG]?.inputsErrors?.subject}
                placeholder={translations[LANG]?.community_step?.placeholder_2}
            />

            <div class="mt-30">
                <BtnStandart
                             text={translations[LANG]?.community_step?.community_step_btn}
                             color="purple"
                             btnType={submitBtnType}
                             disabled={ isNextBtnDisabled }
                />

            </div>
        </form>

        <div class="mt-30">
            <BtnBack dataStep="user-personality-step" on:click={goToBack} />
        </div>

    </div>

</div>