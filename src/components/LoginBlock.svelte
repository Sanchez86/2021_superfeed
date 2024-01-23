
<script>
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import BtnSocial                 from './buttons/BtnSocial.svelte';
    import Heading                   from './Heading.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    const DOMAIN_FOR_REQUEST           = __myapp.env.DOMAIN_FOR_REQUEST;
    const GOOGLE_AUTHORIZATION_LINK    = __myapp.env.GOOGLE_AUTHORIZATION_LINK;
    const LINKEDIN_AUTHORIZATION_LINK  = __myapp.env.LINKEDIN_AUTHORIZATION_LINK;


</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
</style>

<div class="center-block__content">

    <div class="center-block__inner login-start">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.login_step?.heading} />
        </div>
        {@html translations[LANG]?.login_step?.description}

        <div class="d-flex justify-content-center flex-wrap mt-30">

            <BtnSocial dataStep="sign-up-step"
                text={translations[LANG]?.login_step?.login_btn_1_text}
                social="google"
                type="link"
                hrefAttr={DOMAIN_FOR_REQUEST+GOOGLE_AUTHORIZATION_LINK}
            />
                       
            <BtnSocial dataStep="sign-up-step"
                text={translations[LANG]?.login_step?.login_btn_2_text}
                social="linkedin"
                type="link"
                hrefAttr={DOMAIN_FOR_REQUEST+LINKEDIN_AUTHORIZATION_LINK}
            />

        </div>
    </div>

</div>