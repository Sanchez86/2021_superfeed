<script>
	import Input from './../../inputs/Input.svelte';
	import translations from '../../../data/translations';
	import BtnStandart from "../../buttons/BtnStandart.svelte";
	import {checkStepFields, saveEnteredAudienceData} from "../../../js/helpers";
	import {createEventDispatcher} from 'svelte';
	import AudienceTagsGroup from "./AudienceTagsGroup.svelte";
	const dispatch = createEventDispatcher();
	const LANG = __myapp.env.CURRENT_LANG;

	const saveEnteredDataHandler = (event, stepName, callBack) => {
		if (!checkStepFields(stepName)) return false;

		// Update localStorage with users data
		saveEnteredAudienceData(stepName);

		if ( typeof callBack === 'function' ) {
			callBack();
		}

		event.target.reset();

		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}
</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_modal_window.scss";

	.custom-save{
		width: 200px;
	}
</style>

<form data-role="new-geography"
      data-step="NewAudienceGeographyList-window"
      on:submit|preventDefault={ (event) => saveEnteredDataHandler(event, 'new-geography', 'geography-name') }
>
    <div class="popup__search">
        <div class="popup__element-wrap">
            <Input  name="geography-name"
                    dataInputRole="subject"
                    placeholder="{translations[LANG]?.NewAudienceGeography?.NewAudienceGeography_placeholder}" />
        </div>
    </div>

    <AudienceTagsGroup />

    <div class="popup__footer">
        <div class="popup__element-wrap d-flex justify-content-center">

            <BtnStandart btnType="submit"
                         className="btn btn-purple custom-save"
                         text="{translations[LANG]?.NewAudienceGeography?.NewAudienceGeography_btn}"
            />

        </div>
    </div>
</form>