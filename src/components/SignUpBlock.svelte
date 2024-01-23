<script>
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnSocial                 from './buttons/BtnSocial.svelte';
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

    <div class="center-block__inner login-start">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.signup_step?.heading} />
        </div>
        {@html translations[LANG]?.signup_step?.description}

        <div class="d-flex justify-content-center flex-wrap mt-30">
            <BtnSocial dataStep="welcome-step"
                text={translations[LANG]?.login_step?.login_btn_1_text}
                on:click={goToNextStep}  
                social="google"
            />
                       
            <BtnSocial dataStep="welcome-step"
                text={translations[LANG]?.login_step?.login_btn_2_text}
                on:click={goToNextStep}  
                social="linkedin" 
            />
        </div>
    </div>

</div>