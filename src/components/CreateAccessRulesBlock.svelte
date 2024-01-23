
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

    <div class="center-block__inner">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.createAccessRules?.heading} />
        </div>
        
        {@html translations[LANG].createAccessRules.description}
        
        <div class="mt-30">
            <BtnStandart dataStep="addRulesBlock-step" 
                         text={translations[LANG].createAccessRules.createAccessRules_btn}
                         on:click={goToNextStep}  
                         color="purple" />  
        </div>
    </div>

</div>