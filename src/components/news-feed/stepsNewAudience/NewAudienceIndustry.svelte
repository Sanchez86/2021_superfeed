<script>
	import Input from './../../inputs/Input.svelte';
	import translations from '../../../data/translations';
	import BtnStandart from "../../buttons/BtnStandart.svelte";
	import {checkStepFields, saveEnteredAudienceData} from "../../../js/helpers";
	import AudienceTagsGroup from "./AudienceTagsGroup.svelte";
	import {createdNewAudienceData}   from "../../../js/stores";
	const LANG = __myapp.env.CURRENT_LANG;

	$: dataReactive = $createdNewAudienceData;

	const saveEnteredDataHandler = (event, stepName, callBack) => {
		if (!checkStepFields(stepName)) return false;

		saveEnteredAudienceData(stepName);

		if ( typeof callBack === 'function' ) {
			callBack();
		}

		dataReactive = $createdNewAudienceData;
		event.target.reset();
	}
</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_tags.scss";
	@import "../../../sass/_modal_window.scss";

	.custom-save{
		width: 200px;
	}

</style>

<form data-role="new-industry"
      on:submit|preventDefault={ (event) => saveEnteredDataHandler(event, 'new-industry', 'industry-name') }>

    <div class="popup__search">
        <div class="popup__element-wrap">
            <Input  name="industry-name"
                    dataInputRole="subject"
                    placeholder="{translations[LANG]?.NewAudienceIndustry?.NewAudienceIndustry_placeholder}" />
        </div>
    </div>

    {#if dataReactive }
        <AudienceTagsGroup />
    {/if}

    <div class="popup__footer">
        <div class="popup__element-wrap d-flex justify-content-center">

            <BtnStandart btnType="submit"
                         className="btn btn-purple custom-save"
                         text="{translations[LANG]?.NewAudienceIndustry?.NewAudienceIndustry_btn}"/>
        </div>
    </div>
</form>