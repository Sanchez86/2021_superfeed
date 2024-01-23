<script>
	import { createEventDispatcher } from 'svelte';
	import Input                     from './../../inputs/Input.svelte';
	import BtnStandart               from './../../buttons/BtnStandart.svelte';
	import BtnBack                   from './../../buttons/BtnBack.svelte';
	import translations              from '../../../data/translations';
	import AudienceTagsGroup          from "./AudienceTagsGroup.svelte";

	const LANG = __myapp.env.CURRENT_LANG;
	const dispatch = createEventDispatcher();

	const goToNextWindow = (event) => {
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}
	const goToBack = (event) =>{
		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

</script>
<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_tags.scss";
	@import "../../../sass/_modal_window.scss";

	.tag-search-wrap{
		padding: 15px 30px;
		text-align: left;
		position: relative;
	}
	.popup{
        &__element-wrap{
            max-width: 420px;
		}
    }
</style>

<form data-role="save-audience"
      data-step=""
      on:submit={goToNextWindow}
>
    <div class="tag-search-wrap">
        <div>
            <AudienceTagsGroup width />
        </div>
    </div>
    <hr class="hr">

    <div class="popup__search mt-15">
        <div class="popup__element-wrap">
            <Input placeholder="{translations[LANG]?.NewAudienceGeographySave?.NewAudienceGeographySave_placeholder}"
                   search="search" />
        </div>
    </div>

    <div class="popup__footer">
        <div class="popup__element-wrap d-flex justify-content-between">
            <BtnStandart btnType="submit"
                         text="{translations[LANG]?.NewAudienceGeographySave?.NewAudienceGeographySave_btn_1}"
                         dataStep="NewAudienceGeographySave-window"
                         on:click={goToNextWindow}
                         color="orange"
                         className="btn-200 mr-20"/>

            <BtnStandart text="{translations[LANG]?.NewAudienceGeographySave?.NewAudienceGeographySave_btn_2}"
                         dataStep="NewAudienceGeographySave-window"
                         on:click={goToNextWindow}
                         color="gray hover-purple"
                         className="btn-200"/>
        </div>
        <div class="mt-30">
            <BtnBack dataStep="NewAudienceGeographyList-window" on:click={goToBack} />
        </div>
    </div>
</form>