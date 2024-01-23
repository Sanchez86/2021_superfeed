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
            <Heading heading={translations[LANG]?.addAdmin?.heading} />
        </div>

        <div>{@html translations[LANG]?.addAdmin?.description}</div>

        <div class="admin-buttons">
            <BtnStandart dataStep="StepsAdminWindow"
                         text={translations[LANG]?.addAdmin?.addAdmin_btn_1}
                         on:click={goToNextStep}
                         color="purple"
                         className="m-5"
            />

            <BtnStandart dataStep="StepsAdminWindow"
                         text={translations[LANG]?.addAdmin?.addAdmin_btn_2}
                         on:click={goToNextStep}
                         color="orange"
                         className="m-5"
            />
        </div>
    </div>

</div>