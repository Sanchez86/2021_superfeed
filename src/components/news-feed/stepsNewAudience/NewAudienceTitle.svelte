<script>
	import Input                      from './../../inputs/Input.svelte';
	import translations               from '../../../data/translations';
	import BtnStandart                from "../../buttons/BtnStandart.svelte";
	import AudienceTagsGroup          from "./AudienceTagsGroup.svelte";
	import {createdNewAudienceData}   from "../../../js/stores";
	import {checkStepFields, saveEnteredAudienceData} from "../../../js/helpers";

	let audienceName = ( createdNewAudienceData
		&& createdNewAudienceData?.['audience-name']
	) ? createdNewAudienceData?.['audience-name'] : '';

	const LANG = __myapp.env.CURRENT_LANG;

	const saveEnteredDataHandler = (event) => {
		if ( !checkStepFields('new-audience') ) return false;

		saveEnteredAudienceData('new-audience');
	}

</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_modal_window.scss";

	.custom-save{
		width: 200px;
	}
</style>

<form data-role="new-audience"
      on:submit|preventDefault={saveEnteredDataHandler}
>

    <div class="popup__search">
        <div class="popup__element-wrap">
            <Input  name="audience-name"
                    value={audienceName}
                    dataInputRole="subject"
                    placeholder="{translations[LANG]?.NewAudienceTitle?.NewAudienceTitle_placeholder}" />
        </div>
    </div>

    <AudienceTagsGroup />

    <div class="popup__footer">
        <div class="popup__element-wrap d-flex justify-content-center">
            <BtnStandart btnType="submit"
                         className="btn-200 btn btn-purple custom-save"
                         text="{translations[LANG]?.NewAudienceTitle?.NewAudienceTitle_btn}"/>
        </div>
    </div>
</form>