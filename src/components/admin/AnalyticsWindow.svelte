<script>
    import { createEventDispatcher } from 'svelte';
    import translations              from '../../data/translations';
    import AnalyticsOverall          from './AnalyticsOverall.svelte';
    import AnalyticsTitle            from './AnalyticsTitle.svelte';
    import AnalyticsGeography        from './AnalyticsGeography.svelte';
    import AnalyticsIndustry         from './AnalyticsIndustry.svelte';
    import Select                    from '../inputs/Select.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    // let currentStepWindow = 'analytics-window';
    let currentStepWindow = 'analyticsOverall-window';

    // Define what step should be displayed
    const windowHandler = (event) => {
	    currentStepWindow = event.target.dataset.step;

	    let elementsMenu = document.querySelectorAll('.analytics-menu__item');
	    elementsMenu.forEach(function(el){
		    el.classList.remove("active");
	    });
	    event.target.classList.add("active");
    }
    let operators = [
	    { id: '1', name: 'Logins per Week' },
	    { id: '2', name: 'Logins per Week' },
	    { id: '3', name: 'Logins per Week' }
    ];
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_admin.scss";
	@import "../../sass/_buttons.scss";
    @import "../../sass/_tags.scss";

    .wrap-analytics-menu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
		border-bottom: 2px solid $hr-border;
    }

    .analytics-menu{
        padding: 30px 15px 15px 30px;
        text-align: left;
        @include break(x-small){
			text-align: center;
			padding-bottom: 0;
            padding-top: 15px;
            padding-left: 15px;
        }
        &__item{
			margin-bottom: 15px;
			@include break(x-small){
				height: 30px !important;
				line-height: 30px !important;
                font-size: 16px !important;
			}
        }
        .btn-gray{
            height: 40px;
            line-height: 40px;
            text-transform: capitalize;
            font-size: 18px;
            margin-right: 10px;
            &:last-child{
                margin-right: 0;
            }
        }
    }

    .analytics-menu-sort{
		margin: 30px;
		@include break(x-small){
			width: 100%;
            display: flex;
            justify-content: center;
		}
        &__select{
			background: $white;
			border: 1px solid $btn-border;
			border-radius: 60px;
			width: 180px;
			height: 40px;
			font-size: 14px;
			line-height: 1.4;
            color: $gray;
			padding: 0 15px;
			-webkit-appearance: none !important;
			-moz-appearance: none !important;
			background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEyIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUuNDA1OTQgNi43NDgxNUwwLjI0NjI4OSAxLjQ2Nzk5Qy0wLjA4MjA5NjEgMS4xMzIxIC0wLjA4MjA5NjEgMC41ODc1MjkgMC4yNDYyODkgMC4yNTE4MUMwLjU3NDM4MyAtMC4wODM5MzY0IDEuMTA2NTIgLTAuMDgzOTM2NCAxLjQzNDU5IDAuMjUxODFMNi4wMDAwOSA0LjkyMzk0TDEwLjU2NTQgMC4yNTE5NDZDMTAuODkzNyAtMC4wODM4MDA3IDExLjQyNTcgLTAuMDgzODAwNyAxMS43NTM4IDAuMjUxOTQ1QzEyLjA4MjEgMC41ODc2OTIgMTIuMDgyMSAxLjEzMjI0IDExLjc1MzggMS40NjgxMkw2LjU5NDEgNi43NDgyOUM2LjQyOTk4IDYuOTE2MTYgNi4yMTUxIDcgNi4wMDAxMSA3QzUuNzg1MDIgNyA1LjU2OTk4IDYuOTE2IDUuNDA1OTQgNi43NDgxNVoiIGZpbGw9ImJsYWNrIi8+PC9zdmc+);
			background-repeat: no-repeat;
			background-position: calc(100% - 20px) center;
        }
    }
</style>


<div>
    <div class="wrap-analytics-menu">
        <div class="analytics-menu">
            <button class="analytics-menu__item btn btn-gray active"
                    data-step="analyticsOverall-window"
                    on:click|preventDefault={windowHandler}
            >
                {@html translations[LANG]?.analytics?.menu_1}
            </button>
            <button class="analytics-menu__item btn btn-gray"
                    data-step="analyticsTitle-window"
                    on:click|preventDefault={windowHandler}
            >
                {@html translations[LANG]?.analytics?.menu_2}
            </button>
            <button class="analytics-menu__item btn btn-gray"
                    data-step="analyticsGeography-window"
                    on:click|preventDefault={windowHandler}
            >
                {@html translations[LANG]?.analytics?.menu_3}
            </button>
            <button class="analytics-menu__item btn btn-gray"
                    data-step="analyticsIndustry-window"
                    on:click|preventDefault={windowHandler}
            >
                {@html translations[LANG]?.analytics?.menu_4}
            </button>
        </div>
        <div class="analytics-menu-sort">
            <!--<Select className="analytics-menu-sort__select"
                    dataInputRole="name"
                    name="operator[]"
                    optionObject={operators}/>-->

            <select name="" id="" class="analytics-menu-sort__select">
                <option value="1">Logins per Week</option>
                <option value="2">Logins per Week</option>
                <option value="3">Logins per Week</option>
            </select>
        </div>
    </div>

    {#if currentStepWindow === 'analyticsOverall-window'}
        <AnalyticsOverall on:goToMenuItem={windowHandler} />
    {/if}
    {#if currentStepWindow === 'analyticsTitle-window'}
        <AnalyticsTitle on:goToMenuItem={windowHandler} />
    {/if}
    {#if currentStepWindow === 'analyticsGeography-window'}
        <AnalyticsGeography on:goToMenuItem={windowHandler} />
    {/if}
    {#if currentStepWindow === 'analyticsIndustry-window'}
        <AnalyticsIndustry on:goToMenuItem={windowHandler} />
    {/if}
</div>