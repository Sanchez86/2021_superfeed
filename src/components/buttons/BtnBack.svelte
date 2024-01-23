<script>
    import translations from '../../data/translations';

    const LANG          = __myapp.env.CURRENT_LANG;
    export let dataStep = '';
    export let role = '';
</script>

<style lang="scss">
    @import "../../sass/_variables.scss";
    @import "../../sass/_mixin.scss";
    @import "../../sass/_buttons.scss";
</style>

<button class="btn-back"
        data-step="{dataStep}"
        data-role={role}
        on:click
>
    <i class="btn-icon-back"></i>
    {@html translations[LANG].BtnBack.BtnBack_text}
</button>