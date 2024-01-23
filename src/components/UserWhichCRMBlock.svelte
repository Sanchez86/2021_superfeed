<script>
	import {makeRequestToBackend, saveEnteredUserData} from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnBack                   from './buttons/BtnBack.svelte';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Heading                   from './Heading.svelte';
    import Cookies                   from 'universal-cookie';
	import {createdDriversData}      from '../js/stores.js';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
	let scoops     = "user-which-crm";
	let listCRM    = [];

    const goToBack = (event) =>{
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

    //checking for the presence of the entered data
	let isNextBtnDisabled = true;
	const changeInputHandler = () => {
		const nameInput = document.querySelector('.js-check-input');

		isNextBtnDisabled = !(!!nameInput.value );
	}

	( async () => {

        const cookies = new Cookies();
		const IS_DEV  = __myapp.env.IS_DEV;

		/*if ( IS_DEV !== 'true') {
			// Prevent access for user if he doesn't authorized
			if ( !LARAVEL_SESSION ) {
				nextStep = 'login-step';
				return;
			}
		}*/

		const GET_DRIVERS_ENDPOINT  = __myapp.env.GET_DRIVERS_ENDPOINT;

		let res = await makeRequestToBackend(false, GET_DRIVERS_ENDPOINT, 'GET');

		// Access isn't authorized
		if ( res.status === 401 ) {
			nextStep = 'login-step';
			return;
		}

		createdDriversData.update( (n) => JSON.parse(res) );
		//console.log('createdDriversData', $createdDriversData);

		listCRM = JSON.parse(res);

	})();

    const goToNextStep = (event) => {

        // Update localStorage with users data
        saveEnteredUserData('user-which-crm');

        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }
</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_crm-block.scss";
</style>

<div class="center-block__content">
    <div class="center-block__inner">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.which_crm?.heading} />
        </div>
        <form data-step="user-setApiKey-step"
              data-role="user-which-crm"
              on:submit|preventDefault={goToNextStep}>
            <div class="d-flex justify-content-center flex-wrap">
                {#if listCRM}
                    {#each listCRM as name, i}
                        <div class="input-control">
                            <input type="radio"
                                   bind:group={scoops}
                                   data-input-role="name"
                                   name="user_crm_name"
                                   value={listCRM[i]}
                                   on:input={changeInputHandler}
                                   class="input-control__input js-check-input">
                            <span class="crm-block other-crm">{listCRM[i]}</span>
                        </div>
                    {/each}
                {/if}

            </div>
            <div class="mt-30">
                <BtnStandart text={translations[LANG].which_crm.which_crm_btn}
                             btnType="submit"
                             disabled={ isNextBtnDisabled }/>
            </div>
        </form>

        <div class="mt-30">
            <BtnBack dataStep="user-community-step" on:click={goToBack} />
        </div>

    </div>

</div>
