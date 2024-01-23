<script>
	import {checkStepFields, makeRequestToBackend, saveEnteredUserData} from "../js/helpers.js";
	import { createEventDispatcher } from 'svelte';
	import translations              from '../data/translations';
	import BtnBack                   from './buttons/BtnBack.svelte';
	import BtnStandart               from './buttons/BtnStandart.svelte';
	import Input                     from './inputs/Input.svelte';
	import Heading                   from './Heading.svelte';
	import {exportFieldsData}        from "../js/stores";
	import {responseFieldsData}      from "../js/stores";
	import Cookies                   from 'universal-cookie';

	let user_import_base  = (exportFieldsData.user_import_base) ? exportFieldsData.user_import_base : '';
	let user_import_table  = (exportFieldsData.user_import_table) ? exportFieldsData.user_import_table : '';

	const dispatch = createEventDispatcher();
	const LANG     = __myapp.env.CURRENT_LANG;
	let dataForSetup = [];
	let submitBtnType = 'submit';
	let messageError = '';


	const goToBack = (event) => {
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	//checking for the presence of the entered data
	let isNextBtnDisabled = true;
	const changeInputHandler = () => {
		const baseInput = document.querySelector('.js-user-community-base');
		const tableInput = document.querySelector('.js-user-community-table');

		isNextBtnDisabled = !(!!baseInput.value && !!tableInput.value);
	}

	const goToNextStep = (event) => {

		let nextStep = event.target.dataset.step;

		if ( !checkStepFields('user-import-step') ) return false;

		// Update localStorage with users data
		saveEnteredUserData('user-import-step');

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

			console.log('GET_FIELDS_ENDPOINT $exportFieldsData', $exportFieldsData);

			const GET_FIELDS_ENDPOINT = __myapp.env.GET_FIELDS_ENDPOINT;

			submitBtnType = 'loader';
			let res = await makeRequestToBackend($exportFieldsData, GET_FIELDS_ENDPOINT, 'POST');
			submitBtnType = 'submit';

			console.log('res==', res);

			// Access isn't authorized
			if ( res.status === 401 ) {
				nextStep = 'login-step';
				return;
			}
			if ( res.status === 411 ) {
				messageError = res.message;

				let inputBase  = document.querySelector('.js-user-community-base');
				let inputTable = document.querySelector('.js-user-community-table');

				if (inputBase)  inputBase.classList.add('error');
				if (inputTable) inputTable.classList.add('error');
				return;
			}

			responseFieldsData.update( (n) => res);

			dispatch('goToStep', {
				step: nextStep,
			});

		})();


	}

</script>

<style lang="scss">
	@import "../sass/_variables.scss";
	@import "../sass/_mixin.scss";
    .input-wrap{
        min-width: 240px;
        margin: 15px;
        @include break(medium){
			min-width: auto;
        }
    }
    .center-block{
        &__content-mod{
            width: 100%;
        }
        &__inner-mod{
            max-width: 100%;
        }
    }
</style>

<div class="center-block__content center-block__content-mod">
    <div class="center-block__inner center-block__inner-mod">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.importConfirmation?.heading} />
        </div>
        <hr class="hr-top">
        <form data-role="user-import-step"
              data-step="user-setup-step"
              on:submit|preventDefault={goToNextStep}
        >

            <div class="d-flex justify-content-center">
                <div class="input-wrap">
                    <Input label="{translations[LANG].importConfirmation.label_1}"
                           dataInputRole="subject"
                           value={$exportFieldsData.base}
                           name="user_import_base"
                           className="form-control__input-text js-user-community-base"
                           on:input={changeInputHandler}
                           errorText={messageError}
                           placeholder="{translations[LANG].importConfirmation.placeholder_1}"/>
                </div>
                <div class="input-wrap">
                    <Input label="{translations[LANG].importConfirmation.label_2}"
                           dataInputRole="subject"
                           value={$exportFieldsData.table}
                           name="user_import_table"
                           className="form-control__input-text js-user-community-table"
                           on:input={changeInputHandler}
                           errorText={messageError}
                           placeholder="{translations[LANG].importConfirmation.placeholder_2}"/>
                </div>
            </div>
            <hr class="hr-top mt-15">
            <div class="mt-30">
                <BtnStandart text={translations[LANG].importConfirmation.btn}
                             color="purple"
                             btnType={submitBtnType}
                             disabled={ isNextBtnDisabled }
                />
            </div>
        </form>

        <div class="mt-30">
            <BtnBack dataStep="user-setApiKey-step" on:click={goToBack} />
        </div>

    </div>

</div>