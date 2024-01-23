<script>
    import {checkStepFields, saveEnteredUserData} from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnBack                   from './buttons/BtnBack.svelte';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Input                     from './inputs/Input.svelte';
    import Heading                   from './Heading.svelte';
    import {exportFieldsData}        from "../js/stores";

    let user_api_key = ($exportFieldsData && $exportFieldsData?.key) ? $exportFieldsData?.key : '';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    let submitBtnType = 'submit';

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

    const goToNextStep = (event) => {
        if ( !checkStepFields('user-api-key') ) return false;

        // Update localStorage with users data
        saveEnteredUserData('user-api-key');

        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

    let videoplayer;
    let paused = true;

</script>

<style lang="scss">
	.center-block{
		&__inner-api-mod{
			max-width: 100%;
		}
	}

    .video-api{
		width: 270px;
		height: 180px;
		border-radius: 15px;
		margin-right: 30px;
        overflow: hidden;
        position: relative;

        video{
            width: 100%;
            height: 100%;
        }
    }

    .play {
		width: 40px;
		height: 40px;
		background: linear-gradient(90deg, #FF5E02 0%, #FFB203 100%);
        position: absolute;
        margin: auto;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
        border-radius: 100%;
		cursor: pointer;
		opacity: 1;
        transition: .5s;

        &:after{
            content: "";
			position: absolute;
			margin: auto;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
            display: block;
			width: 12px;
			height: 14px;
            background-repeat: no-repeat;
            background-position: center;
			background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMi4xNzQxMSAwLjMwODY4OUMwLjk3MzQzMyAtMC40MTUzMTUgMCAwLjE3Nzc5OCAwIDEuNjMyMzhWMTIuMzY2NkMwIDEzLjgyMjYgMC45NzM0MzMgMTQuNDE1IDIuMTc0MTEgMTMuNjkxN0wxMS4wOTkyIDguMzExMDFDMTIuMzAwMyA3LjU4Njc1IDEyLjMwMDMgNi40MTMzNCAxMS4wOTkyIDUuNjg5MjVMMi4xNzQxMSAwLjMwODY4OVoiIGZpbGw9IndoaXRlIi8+PC9zdmc+);
        }
	}

    .play.active{
		opacity: 0;
	}
</style>

<div class="center-block__content">
    <div class="center-block__inner center-block__inner-api-mod">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.set_api_key?.heading} />
        </div>

        <form data-role="user-api-key"
              data-step="user-import-step"
              on:submit|preventDefault={goToNextStep}
        >

            <div class="d-flex align-items-flex-end">

                <div class="video-api">
                    <video controls="controls" poster="./images/video-poster.png"
                           bind:paused
                           bind:this = {videoplayer}>
                        <source src="../../video/svelteJS.mp4">
                    </video>
                    <span on:click={function(){paused?videoplayer.play():videoplayer.pause()}} class="play {paused ? '' : 'active'}"></span>

                </div>

                <div>
                    {@html translations[LANG].set_api_key.description}

                    <Input  wrapperClass="ml-0"
                            className="form-control__input-text js-check-input"
                            on:input={changeInputHandler}
                            name="user_api_key"
                            dataInputRole="subject"
                            value={user_api_key}
                            errorText={translations[LANG]?.inputsErrors?.subject}
                            placeholder={translations[LANG].set_api_key.placeholder}
                    />

                </div>
            </div>

            <div class="mt-30">
                <BtnStandart text={translations[LANG].set_api_key.set_api_key_btn}
                             color="purple"
                             btnType={submitBtnType}
                             disabled={ isNextBtnDisabled }/>
            </div>
        </form>

        <div class="mt-30">
            <BtnBack dataStep="user-whichCRM-step" on:click={goToBack} />
        </div>

    </div>

</div>