<script>
    
    import { createEventDispatcher } from 'svelte';
    import translations              from '../data/translations';
    import Scrollbar                 from 'happy-svelte-scrollbar';
    import BtnStandart               from './buttons/BtnStandart.svelte';
    import Heading                   from './Heading.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    const goToNextStep = (event) => {
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }
    let iChangeMyHeight = 100;
    let iAmScrollArea = 100;
</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_scrollbar.scss";
    
    .read-block{
        max-width: 640px;
        .my-scroller{
            height: 316px;
        }
    }
    .wrap-scroll:after{
		content: "";
		width: 8px;
		height: 100%;
		border-radius: 5px;
		background-color: #F6F6F6;
		position: absolute;
		right: 0;
		top: 0;
	}
</style>

<div class="center-block__content">
    <div class="center-block__inner read-block">
        <div class="mb-15">
            <Heading heading={translations[LANG]?.willYouReadThisBlock2?.heading} />
        </div>
        <div class="wrap-scroll">
            <div class="my-scroller" bind:this={ iAmScrollArea }>
                <div class="dynamic-content" bind:this={ iChangeMyHeight }>
                    
                    {@html translations[LANG].willYouReadThisBlock2.description}
                    {@html translations[LANG].willYouReadThisBlock2.description}
                    
                </div>
            </div>
            <Scrollbar 
                observerTarget={ iChangeMyHeight } 
                scrollArea={ iAmScrollArea }
                showArrows={ false }
                buttonPressingMove={ 10 }
            />
        </div>
		
        <div class="mt-30">
            <BtnStandart dataStep="shallWeStartBlock-step" 
                         text={translations[LANG].willYouReadThisBlock2.willYouReadThisBlock2_btn}
                         on:click={goToNextStep}  
                         color="purple" />  
        </div>
    </div>

</div>