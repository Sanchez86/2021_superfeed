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

<div class="center-block__content">
    <div class="center-block__inner lh-large">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.willYouReadThisBlock?.heading} />
        </div>
        {@html translations[LANG].willYouReadThisBlock.description}
        
        <div class="mt-30">
            <BtnStandart dataStep="willYouReadThisBlock2-step" 
                         text={translations[LANG].willYouReadThisBlock.willYouReadThisBlock_btn}
                         on:click={goToNextStep}  
                         color="purple" />  
        </div>
    </div>

</div>