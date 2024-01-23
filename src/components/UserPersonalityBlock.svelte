<script>
	import {checkStepFields, makeRequestToBackend, saveEnteredUserData} from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnBack                   from './buttons/BtnBack.svelte';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Input                     from './inputs/Input.svelte';
    import Heading                   from './Heading.svelte';
	import {peopleAudienceData}      from "../js/stores";

	let user_name = ( $peopleAudienceData
		&& $peopleAudienceData?.user_name
	) ? $peopleAudienceData?.user_name : '';

	let user_email = ( $peopleAudienceData
		&& $peopleAudienceData?.user_email
	) ? $peopleAudienceData?.user_email : '';

	let user_code = ( $peopleAudienceData
		&& $peopleAudienceData?.user_code
	) ? $peopleAudienceData?.user_code : '';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
	let profileData;
	let user_email_exist = true;

	( async () => {
		const IS_DEV  = __myapp.env.IS_DEV;
		const GET_USER_PROFILE_ENDPOINT = __myapp.env.GET_USER_PROFILE_ENDPOINT;

		let res = await makeRequestToBackend(false, GET_USER_PROFILE_ENDPOINT, 'GET', true);
		profileData = JSON.parse(res);
		console.log('profileData', profileData);

		// Access isn't authorized
		if ( res.status === 401 ) {
			nextStep = 'login-step';
			return;
		}

		if(profileData.email === null) { // if user came first time
			console.log('email === null');

			if (profileData.social_email) {// and if came from social network
				user_email = profileData.social_email; //show email in input
				user_email_exist = false; //hidden input for code
			}

		}
	})()


    /**
     * Check form's input for valid values
     * and skip transition to the next step if some fields isn't valid
     * @param event
     * @returns {boolean}
     */
    const goToNextStep = (event) => {
        if ( !checkStepFields('user-personality') ) return false;

        // Update localStorage with users data
        saveEnteredUserData('user-personality');

	    ( async () => {
            //the user came to the site for the first time
            if(profileData.email === null){

                let dataToSent = {
                    "email": $peopleAudienceData?.user_email
                }
                if ( !profileData.social_email ) {
                    dataToSent ={
                        ...dataToSent,
                        "code": $peopleAudienceData?.user_code
	                }
                }

                const GET_USER_PROFILE_EMAIL_ENDPOINT = __myapp.env.GET_USER_PROFILE_EMAIL_ENDPOINT;
	            console.log('dataToSent', dataToSent);
                let resEmail = await makeRequestToBackend(dataToSent, GET_USER_PROFILE_EMAIL_ENDPOINT, 'POST', false);
                let emailProfileData = JSON.parse(resEmail);

                console.log('emailProfileData', emailProfileData);
            }

	    })();

	    dispatch('goToStep', {
		    step: event.target.dataset.step,
	    });
    }

    const goToBack = (event) =>{
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

	//checking for the presence of the entered data
	let isNextBtnDisabled = true;
	const changeInputHandler = () => {
		const nameInput = document.querySelector('.js-check-input-name');
		const emailInput = document.querySelector('.js-check-input-email');
		const codeInput = document.querySelector('.js-check-input-code');

		console.log('user_email_exist', user_email_exist);
		if(user_email_exist){
			isNextBtnDisabled = !(!!nameInput.value && !!emailInput.value && !!codeInput.value );
		}else{
			isNextBtnDisabled = !(!!nameInput.value && !!emailInput.value );
        }
	}

</script>

<style lang="scss">
	.center-block{
		&__inner-mod{
			max-width: 100%;
		}
	}
    .user-data{
        &__group{
            display: flex;
			@media all and (max-width: 767px){
                flex-wrap: wrap;
				justify-content: center;
			}
        }
    }
    .center-block{
        &__text{
			max-width: 520px;
            margin: 15px auto;
        }
    }
</style>

<div class="center-block__content">
    <div class="center-block__inner center-block__inner-mod">
        <div class="center-block__text">
            <Heading heading={translations[LANG]?.personality_step?.heading} />
            {@html translations[LANG]?.personality_step?.description}
        </div>
        <form data-role="user-personality"
              data-step="user-community-step"
              on:submit|preventDefault={goToNextStep}
        >
            <div class="user-data__group">
                <Input
                    name="user_name"
                    wrapperClass="mt-0 mb-15 m-15"
                    value={user_name}
                    dataInputRole="name"
                    className="form-control__input-text js-check-input-name"
                    on:input={changeInputHandler}
                    errorText={translations[LANG]?.inputsErrors?.name}
                    placeholder={translations[LANG]?.personality_step?.placeholder_1}
                />

                <Input
                        type="email"
                        name="user_email"
                        wrapperClass="mt-0 mb-15 m-15"
                        value={user_email}
                        dataInputRole="email"
                        className="form-control__input-text js-check-input-email"
                        on:input={changeInputHandler}
                        errorText={translations[LANG]?.inputsErrors?.email}
                        placeholder={translations[LANG]?.personality_step?.placeholder_2}
                />
                {#if user_email_exist}
                <Input
                        name="user_code"
                        wrapperClass="mt-0 mb-15 m-15"
                        value={user_code}
                        dataInputRole="subject"
                        className="form-control__input-text js-check-input-code"
                        on:input={changeInputHandler}
                        errorText={translations[LANG]?.inputsErrors?.subject}
                        placeholder={translations[LANG]?.personality_step?.placeholder_3}
                />
                {/if}
            </div>
            <div class="mt-30">
                <BtnStandart
                    text={translations[LANG]?.personality_step?.personality_step_btn}
                    color="purple"
                    btnType="submit"
                    disabled={ isNextBtnDisabled } />
                <!--disabled={ isNextBtnDisabled }-->
            </div>
        </form>

        <div class="mt-30">
            <BtnBack dataStep="welcome-step" on:click={goToBack} />
        </div>


    </div>

</div>