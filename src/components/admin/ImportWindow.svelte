<script>
	import translations              from '../../data/translations';
	import BtnStandart                    from '../buttons/BtnStandart.svelte';

	const LANG     = __myapp.env.CURRENT_LANG;


</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_buttons.scss";
</style>
<div>

    <div class="m-30">
        <BtnStandart text={translations[LANG]?.importWindow?.importWindow_btn} />
    </div>

</div>