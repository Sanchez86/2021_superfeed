<script>
	import {checkStepFields, makeRequestToBackend, saveEnteredUserData} from "../js/helpers.js";
	import {createEventDispatcher} from 'svelte';
	import translations     from '../data/translations';
	import BtnBack          from './buttons/BtnBack.svelte';
	import BtnStandart      from './buttons/BtnStandart.svelte';
	import Heading          from './Heading.svelte';
	import Select           from "./inputs/Select.svelte";
	import Scrollbar        from 'happy-svelte-scrollbar';
	import {responseFieldsData, previewTagsData, previewTagsResponseData, exportFieldsData} from "../js/stores";
	import Cookies from 'universal-cookie';

	const dispatch  = createEventDispatcher();
	const LANG      = __myapp.env.CURRENT_LANG;
	let submitBtnType = 'submit';

	console.log('$responseFieldsData' ,$responseFieldsData);

	let dataFields = ( JSON.parse($responseFieldsData) );


	let iChangeMyHeight = 100;
	let iAmScrollArea   = 100;

	const goToBack = (event) => {
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	const goToNextStep = (event) => {

		let nextStep = event.target.dataset.step;

		if ( !checkStepFields('user-setup') ) return false;

		// Update localStorage with users data
		saveEnteredUserData('user-setup');

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
			const PREVIEW_TAGS_ENDPOINT = __myapp.env.PREVIEW_TAGS_ENDPOINT;

			submitBtnType = 'loader';

			let res = await makeRequestToBackend($previewTagsData, PREVIEW_TAGS_ENDPOINT, 'POST');
			submitBtnType = 'submit';

			// Access isn't authorized
			if ( res.status === 401 ) {
				nextStep = 'login-step';
				return;
			}

			previewTagsResponseData.update( (n) => res);

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
	}
	.center-block{
		&__content-mod{
			width: 100%;
		}
		&__inner-mod{
			max-width: 100%;
		}
	}
	.my-scroller {
		max-height : 251px;
	}
</style>

<div class="center-block__content center-block__content-mod">
    <div class="center-block__inner center-block__inner-mod">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.setup?.heading} />
        </div>
        <hr class="hr-top">

        <form data-role="user-setup"
              data-step="user-preview-step"
              on:submit|preventDefault={goToNextStep}>

            <div class="my-scroller" bind:this={ iAmScrollArea }>
                <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                    <div class="d-flex justify-content-center flex-wrap">
                        {#if dataFields }
                            <div class="input-wrap">
                                <Select label="{translations[LANG].setup.label_1}"
                                        dataInputRole="name"
                                        optionObject={dataFields}
                                        name="location" />
                            </div>
                            <div class="input-wrap">
                                <Select label="{translations[LANG].setup.label_2}"
                                        dataInputRole="name"
                                        optionObject={dataFields}
                                        name="industry" />
                            </div>
                            <div class="input-wrap">
                                <Select label="{translations[LANG].setup.label_3}"
                                        dataInputRole="name"
                                        optionObject={dataFields}
                                        name="name" />
                            </div>
                        {/if}
                    </div>

                    <hr class="hr-top mt-15">

                    <div class="d-flex justify-content-center flex-wrap">
                        {#if dataFields }
                            <div class="input-wrap">
                                <Select label="{translations[LANG].setup.label_4}"
                                        dataInputRole="name"
                                        optionObject={dataFields}
                                        name="organization" />
                            </div>
                            <div class="input-wrap">
                                <Select label="{translations[LANG].setup.label_5}"
                                        dataInputRole="name"
                                        optionObject={dataFields}
                                        name="title" />
                            </div>
                            <div class="input-wrap">
                                <Select label="{translations[LANG].setup.label_6}"
                                        dataInputRole="email"
                                        optionObject={dataFields}
                                        name="email" />
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            <hr class="hr-top mt-15">
            <div class="mt-30">
                <BtnStandart text={translations[LANG].setup.btn}
                             color="purple"
                             btnType={submitBtnType}
                />
            </div>
            <Scrollbar
                    observerTarget={ iChangeMyHeight }
                    scrollArea={ iAmScrollArea }
                    showArrows={ false }
                    buttonPressingMove={ 10 }
            />
        </form>



        <div class="mt-30">
            <BtnBack dataStep="user-import-step" on:click={goToBack} />
        </div>

    </div>

</div>