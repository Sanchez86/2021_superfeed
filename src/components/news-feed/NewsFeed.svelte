<script>
    import feed              from './../../data/feed.js';
    import MainHeader        from './../MainHeader.svelte';
    import FeedItem          from './FeedItem.svelte';
    import CommentForm       from './CommentForm.svelte';
    import ModalWindow       from './ModalWindow.svelte';
    import StepsNewAudience  from './stepsNewAudience/StepsNewAudience.svelte';
    import SelectAudience    from './modals/SelectAudience.svelte';
    import CreateNewAudience from './modals/CreateNewAudience.svelte';
    import UserData          from './UserData.svelte';
    import TagsArea          from './TagsArea.svelte';

    // Docs: https://www.npmjs.com/package/javascript-time-ago
    import TimeAgo      from 'javascript-time-ago';

    // English.
    import en from 'javascript-time-ago/locale/en';

    // TimeAgo.addLocale(de); //example
    TimeAgo.addLocale(en);

    // Getting app lang
    const LANG = __myapp.env.CURRENT_LANG;

    // Status of showing Child posts
    let childDisplayStatuses = [];

    // Defining lang for date conversion
    let timeFormatLang = 'en-US';

    switch ( LANG ) {
        case 'en':
            timeFormatLang = 'en-US';
            break;
        case 'de':
            timeFormatLang = 'de-DE';
            break;
    }

    console.log('timeFormatLang', timeFormatLang);

    // Create formatter (English).
    let timeAgo = new TimeAgo(timeFormatLang);

    let isUserProfileOpened = false;
    let activePopup         = false;
    let tagName             = '';

    const popupHandler = (event) => {
    	activePopup = event.target.dataset.href;
    }

    /**
     * Popup external click handler
     * @param event
     */
    const clickHandler = (event) => {
    	const ROLE = event.target.dataset.role;

    	//console.log('ROLE', ROLE);

    	switch ( ROLE ) {
    		case 'popup-close':
			    activePopup = false;
    			break;
    		case 'create-new-audience-popup':
			    activePopup = 'create-new-audience-popup';
    			break;
    		case 'select-audience-popup':
			    activePopup = 'select-audience-popup';
    			break;
    		case 'open-create-new-audience-popup':
			    activePopup = 'create-new-audience-popup';
    			break;
		    case 'open-profile':
			    isUserProfileOpened = true;
			    break;
		    case 'close-edit-profile':
			    isUserProfileOpened = false;
			    break;
        }
    }


    /**
     * Change child posts display status
     * @param event
     */
    const displayChildHandler = (event) => {
	    childDisplayStatuses[event.detail.parent_id] = event.detail.isChildShown;
	    console.log('showStatus', childDisplayStatuses);
    }


    const sortPostsByTagHandler = (event) => {
    	tagName = event.detail?.tag_name;
    }
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
    @import "../../sass/_buttons.scss";
    @import "../../sass/_news_feed.scss";

    :global(.feed-item.child-item + .comment-block__wrapper){
        display: none !important;
    }

	:global(.feed-item.child-item.show + .comment-block__wrapper){
		display: flex !important;
	}
</style>

{#if activePopup === 'create-new-audience-popup' }
    <ModalWindow on:click={clickHandler}>
        <CreateNewAudience />
    </ModalWindow>
{/if}

{#if activePopup === 'select-audience-popup' }
    <ModalWindow on:click={clickHandler}>
        <SelectAudience on:click={clickHandler}/>
    </ModalWindow>
{/if}
<main>
    <MainHeader on:click={clickHandler}/>

    <div class="news-feed-wrapper">
        {#if isUserProfileOpened}
            <UserData on:click={clickHandler}/>
        {:else}
            <div class="container">
                <TagsArea />
                <CommentForm  on:click={clickHandler} on:sortPostsByTag={sortPostsByTagHandler} />
                {#each feed as feed_item (feed_item.id) }

                    <!--Showing parent posts-->
                    {#if feed_item.parent_post_id === null
		            && (tagName === ''
			            || feed_item['tags'].includes(tagName)
		            )
                    }
                        <FeedItem data={feed_item}
                                  timeInstance={timeAgo}
                                  on:toggleChild={displayChildHandler} />

                        <!--Showing child posts-->
                        {#if feed_item.children_post_ids.length }
                            {#each feed_item.children_post_ids as child_feed_item (child_feed_item) }
                                <FeedItem data={feed[child_feed_item]}
                                          timeInstance={timeAgo}
                                          customClasses={childDisplayStatuses[feed_item.id]}
                                          isChild={true} />
                            {/each}
                            <CommentForm showCheckbox="false" />
                        {/if}
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</main>