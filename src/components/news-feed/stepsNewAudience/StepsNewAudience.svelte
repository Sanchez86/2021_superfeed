<script>
	import NewAudienceTitle         from './NewAudienceTitle.svelte';
	import NewAudienceIndustry      from './NewAudienceIndustry.svelte';
	import NewAudienceGeography     from './NewAudienceGeographySteps.svelte';
	import translations             from '../../../data/translations';

	let currentStepWindow = 'NewAudienceTitle-window';
	const LANG = __myapp.env.CURRENT_LANG;

	// Define what step should be displayed
	const windowHandler = (event) => {
		currentStepWindow = event.target.dataset.step;

		let elementsMenu = document.querySelectorAll('.admin-menu__item');

		elementsMenu.forEach(function(el){
			el.classList.remove("active");
		});

		event.target.classList.add("active");
	}

</script>
<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_admin.scss";
	@import "../../../sass/_modal_window.scss";
	.admin-menu{
        margin-top: 0;
    }
</style>
<div>

    <h2 class="popup__header">{translations[LANG]?.newAudience?.newAudience_header}</h2>
    <!--  Menu for create audience  -->
    <div class="admin-menu">
        <button class="admin-menu__item active"
                data-step="NewAudienceTitle-window"
                on:click|preventDefault={windowHandler}
        >
            {translations[LANG]?.newAudience?.newAudienceMenuItem1}
        </button>
        <button class="admin-menu__item"
                data-step="NewAudienceIndustry-window"
                on:click|preventDefault={windowHandler}
        >
            {translations[LANG]?.newAudience?.newAudienceMenuItem2}
        </button>
        <button class="admin-menu__item"
                data-step="NewAudienceGeographySteps-window"
                on:click|preventDefault={windowHandler}
        >
            {translations[LANG]?.newAudience?.newAudienceMenuItem3}
        </button>
    </div>

    {#if currentStepWindow === 'NewAudienceTitle-window'}
        <NewAudienceTitle on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'NewAudienceIndustry-window'}
        <NewAudienceIndustry on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'NewAudienceGeographySteps-window'}
        <NewAudienceGeography on:goToStep={windowHandler} />
    {/if}

</div>