<script>
	import { createEventDispatcher } from 'svelte';
	import translations              from '../../data/translations';
    import MainHeader                from './../MainHeader.svelte';
	import Heading                   from './../Heading.svelte';
    import AnalyticsWindow           from './AnalyticsWindow.svelte';
	import AdminsWindow              from './AdminsWindow.svelte';
	import TagsWindow                from './TagsWindow.svelte';
	import AccessWindow              from './AccessWindow.svelte';
	import ToolsWindow               from './ToolsWindow.svelte';
	import ImportWindow              from './ImportWindow.svelte';

	const dispatch = createEventDispatcher();
	const LANG     = __myapp.env.CURRENT_LANG;


    let currentStepWindow = 'analytics-window';
    //let previousStepWindow;

	//TODO: Need to remove
    // currentStepWindow = 'admins-window';

    // Define what step should be displayed
    const windowHandler = (event) => {
    	currentStepWindow = event.target.dataset.step;

    	let elementsMenu = document.querySelectorAll('.admin-menu__item');

	    elementsMenu.forEach(function(el){
		    el.classList.remove("active");
        });

	    event.target.classList.add("active");
    }

	const back = () =>{

	}

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_admin.scss";
</style>
<main>
    <MainHeader />
    <div class="wrap-admin-center-block">
        <div class="admin-center-block">
            <div class="admin-center-block__inner">
                <button class="step-back" on:click={back}></button>
                <div class="mb-15">
                    <Heading heading={translations[LANG]?.admin?.heading} />
                </div>

                <div class="admin-menu">
                    <button class="admin-menu__item active"
                            data-step="analytics-window"
                            on:click|preventDefault={windowHandler}
                    >
                        {@html translations[LANG]?.admin?.menu_1}
                    </button>
                    <button class="admin-menu__item"
                            data-step="admins-window"
                            on:click|preventDefault={windowHandler}
                    >
                        {@html translations[LANG]?.admin?.menu_2}
                    </button>
                    <button class="admin-menu__item"
                            data-step="tags-window"
                            on:click|preventDefault={windowHandler}
                    >
                        {@html translations[LANG]?.admin?.menu_3}
                    </button>
                    <button class="admin-menu__item"
                            data-step="access-window"
                            on:click|preventDefault={windowHandler}
                    >
                        {@html translations[LANG]?.admin?.menu_4}
                    </button>
                    <button class="admin-menu__item"
                            data-step="tools-window"
                            on:click|preventDefault={windowHandler}
                    >
                        {@html translations[LANG]?.admin?.menu_5}
                    </button>
                    <button class="admin-menu__item"
                            data-step="import-window"
                            on:click|preventDefault={windowHandler}
                    >
                        {@html translations[LANG]?.admin?.menu_6}
                    </button>
                </div>

                {#if currentStepWindow === 'analytics-window'}
                    <AnalyticsWindow on:goToMenuItem={windowHandler} />
                {/if}
                {#if currentStepWindow === 'admins-window'}
                    <AdminsWindow on:goToMenuItem={windowHandler} />
                {/if}
                {#if currentStepWindow === 'tags-window'}
                    <TagsWindow on:goToMenuItem={windowHandler} />
                {/if}
                {#if currentStepWindow === 'access-window'}
                    <AccessWindow on:goToMenuItem={windowHandler} />
                {/if}
                {#if currentStepWindow === 'tools-window'}
                    <ToolsWindow on:goToMenuItem={windowHandler} />
                {/if}
                {#if currentStepWindow === 'import-window'}
                    <ImportWindow on:goToMenuItem={windowHandler} />
                {/if}

            </div>
        </div>
    </div>
</main>