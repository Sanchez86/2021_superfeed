<script>
	import translations              from '../../data/translations';
	import Scrollbar        from 'happy-svelte-scrollbar';
	import Item             from './../Item.svelte'
	const data = {
		'Steer the conversation': ["To maximize the relevancy of the feed, admins can override the audience set by the intial poster. Just type “/” before each tag in the replies. For example. If you type in “/CEO /Fintech” only Fintech CEOs will see the post, regardless of the intial user posted. The original poster will see a private reply that says the admin replaced"],
		'Remind the right people': ["To maximize the relevancy of the feed, admins can override the audience set by the intial poster. Just type “/” before each tag in the replies. For example. If you type in “/CEO /Fintech” only Fintech CEOs will see the post, regardless of the intial user posted. The original poster will see a private reply that says the admin replaced"],
	}
	const LANG     = __myapp.env.CURRENT_LANG;
    let iChangeMyHeight = 100;
    let iAmScrollArea = 100;
</script>
<style lang="scss">
	.my-scroller {
		max-height : 251px;
	}
    .accordion{
		width: 100%;
		max-width: 760px;
        margin: auto;
		padding: 15px;
    }
</style>

<div>
    <h2 class="mt-15">{translations[LANG]?.adminTools?.header}</h2>
    <hr class="hr-top">

    <div class="my-scroller" bind:this={ iAmScrollArea }>
        <div class="dynamic-content" bind:this={ iChangeMyHeight }>
            <div class="accordion mt-30 mb-30">
                {#each Object.entries(data) as entry}
                    <Item {entry} />
                {/each}
            </div>
        </div>
    </div>

    <Scrollbar
            observerTarget={ iChangeMyHeight }
            scrollArea={ iAmScrollArea }
            showArrows={ false }
            buttonPressingMove={ 10 }
    />

    <hr class="hr-top">
</div>
