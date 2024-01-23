<script>
	import {makeRequestToBackend} from "../js/helpers.js";
	import {createEventDispatcher} from 'svelte';
	import translations     from '../data/translations';
	import BtnBack          from './buttons/BtnBack.svelte';
	import BtnStandart      from './buttons/BtnStandart.svelte';
	import Heading          from './Heading.svelte';
	import SelectMultiple   from "./inputs/SelectMultiple.svelte";
	import Scrollbar        from 'happy-svelte-scrollbar';
	import {previewTagsData, previewTagsResponseData} from "../js/stores";
	import Cookies from 'universal-cookie';

	const dispatch = createEventDispatcher();
	const LANG 	   = __myapp.env.CURRENT_LANG;
	let submitBtnType = 'submit';

	let iChangeMyHeight = 100;
	let iAmScrollArea   = 100;

	const goToBack = (event) => {
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

	const goToNextStep = (event) => {

		let nextStep = event.target.dataset.step;

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

			const LOAD_PREVIEW_PARAMETERS_ENDPOINT = __myapp.env.LOAD_PREVIEW_PARAMETERS_ENDPOINT;

			submitBtnType = 'loader';

			let res = await makeRequestToBackend($previewTagsData, LOAD_PREVIEW_PARAMETERS_ENDPOINT, 'POST');
			submitBtnType = 'submit';

			// Access isn't authorized
			if ( res.status === 401 ) {
				nextStep = 'login-step';
				return;
			}

			dispatch('goToStep', {
				step: nextStep,
			});

		})();
	}

	//let previewData = JSON.parse($previewTagsResponseData);

	let previewData = JSON.parse($previewTagsResponseData);
	let previewFormattedData = {};

    (previewData)
    && previewData.forEach( (row, index) => {
    	let keys = Object.keys(row);
	    keys.forEach( key => {
	    	if ( typeof previewFormattedData[key] === 'undefined' ) {
			    previewFormattedData[key] = [row[key]];
			    return;
            }
	    	previewFormattedData[key] = [...previewFormattedData[key], row[key]];
        });
    } );

</script>

<style lang="scss">
	@import "../sass/_variables.scss";
	@import "../sass/_mixin.scss";
	.input-wrap{
		min-width: 240px;
		margin: 15px;
        select{
			height: 118px;
        }
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

	.my-scroller {
		max-height : 251px;
	}
</style>

<div class="center-block__content center-block__content-mod">
    <div class="center-block__inner center-block__inner-mod">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.preview?.heading} />
        </div>
        <hr class="hr-top">
        <form data-role="user-preview-step"
              data-step="willYouReadThisBlock-step"
              on:submit|preventDefault={goToNextStep}
        >
            <div class="my-scroller" bind:this={ iAmScrollArea }>
                <div class="dynamic-content" bind:this={ iChangeMyHeight }>

                    <div class="d-flex justify-content-center flex-wrap">
                        <div class="input-wrap">
                            <SelectMultiple label="{translations[LANG].preview.label_1}"
                                    dataInputRole="name"
                                    optionObject={previewFormattedData['Location']}
                                    name="location[]"
                                    className="select prevent-selecting select-multiple js-location-select"/>
                        </div>
                        <div class="input-wrap">
                            <SelectMultiple label="{translations[LANG].preview.label_2}"
                                    dataInputRole="name"
                                    optionObject={previewFormattedData['Industry']}
                                    name="industry[]"
                                    className="select prevent-selecting select-multiple js-industry-select"/>
                        </div>
                        <div class="input-wrap">
                            <SelectMultiple label="{translations[LANG].preview.label_3}"
                                    dataInputRole="name"
                                    optionObject={previewFormattedData['Name']}
                                    name="name[]"
                                    className="select prevent-selecting select-multiple js-name-select"/>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center flex-wrap">
                        <div class="input-wrap">
                            <SelectMultiple label="{translations[LANG].preview.label_4}"
                                    dataInputRole="name"
                                    optionObject={previewFormattedData['Organization']}
                                    name="organization[]"
                                    className="select prevent-selecting select-multiple js-organization-select"/>
                        </div>
                        <div class="input-wrap">
                            <SelectMultiple label="{translations[LANG].preview.label_5}"
                                    dataInputRole="name"
                                    optionObject={previewFormattedData['Title']}
                                    name="title[]"
                                    className="select prevent-selecting select-multiple js-title-select"/>
                        </div>
                        <div class="input-wrap">
                            <SelectMultiple label="{translations[LANG].preview.label_6}"
                                    dataInputRole="email"
                                    optionObject={previewFormattedData['Email']}
                                    name="email[]"
                                    className="select prevent-selecting select-multiple js-email-select"/>
                        </div>
                    </div>

                </div>
            </div>

            <hr class="hr-top">
            <div class="mt-30">
                <BtnStandart text={translations[LANG].preview.btn}
                             color="purple"
                             btnType={submitBtnType}
                />
            </div>
        </form>

        <Scrollbar
                observerTarget={ iChangeMyHeight }
                scrollArea={ iAmScrollArea }
                showArrows={ false }
                buttonPressingMove={ 10 }
        />

        <div class="mt-30">
            <BtnBack dataStep="user-setup-step" on:click={goToBack} />
        </div>

    </div>

</div>