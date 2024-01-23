<script>
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Heading                   from './Heading.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    const goToNextStep = (event) => {
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }
</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
</style>

<div class="center-block__content">

    <div class="center-block__inner">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.welcome_step?.heading} />
        </div>

        <div>{@html translations[LANG]?.welcome_step?.description}</div>

        <div class="mt-30">
            <BtnStandart dataStep="user-personality-step" 
                         text={translations[LANG]?.welcome_step?.welcome_step_btn}
                         on:click={goToNextStep}
                         color="purple" />  
        </div>
    </div>

</div>