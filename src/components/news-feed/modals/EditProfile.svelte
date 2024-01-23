<script>
	import translations from '../../../data/translations';
	import BtnBack           from './../../buttons/BtnBack.svelte';
	import Input             from './../../inputs/Input.svelte';
	import BtnStandart       from './../../buttons/BtnStandart.svelte';

	const LANG = __myapp.env.CURRENT_LANG

</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_modal_window.scss";
</style>

<h2 class="popup__header hr-bottom">{translations[LANG]?.editProfile?.editProfile_header}</h2>

<div class="mt-30">
    <Input label="Full name" />
</div>

<div class="mt-30">
    <BtnStandart btnType="submit"
                 text="Save"
                 role="close-edit-profile-popup"
                 className="hover-purple"
                 on:click
                 color="gray"
    />
</div>
<div class="mt-30">
    <BtnBack role="close-edit-profile-popup" on:click />
</div>
