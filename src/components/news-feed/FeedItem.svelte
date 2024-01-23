<script>
    import Avatar       from './Avatar.svelte';
    import translations from '../../data/translations';
    import CommentForm  from './CommentForm.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    // Getting app lang
    const LANG = __myapp.env.CURRENT_LANG;

    export let data          = '';
    export let customClasses = '';
    export let isChild       = false;
    export let timeInstance  = '';

    let mode              = 'show';
    let commentMenuStatus = 'hidden';

    // Show/Hide child posts
    const toggleChildComment = (event) => {
        mode = ( mode === 'show' ) ? 'hide' : 'show';

        dispatch('toggleChild', {
            isChildShown: ( mode === 'hide' ) ? 'show' : 'hide',
            parent_id: data?.id
        });
    }

    // Show/Hide comment menu
    const toggleCommentMenu = (event) => {
        commentMenuStatus = ( commentMenuStatus === 'hidden' ) ? '' : 'hidden';
    }
</script>

<style lang="scss">
    @import "../../sass/_feed_item.scss";
</style>

<div class="feed-item {isChild ? 'child-item': ''} {customClasses}">
    <div class="feed-item__header">
        <Avatar url={data?.avatar_url} name={data?.user_name} />

        {#if !isChild}
            <div class="feed-item__header-meta">
                <div class="feed-item__name">{data?.user_name}</div>
                <div class="feed-item__post-date">{timeInstance.format(Date.now() - data?.post_date)}</div>
            </div>
        {/if}

        <button class="feed-item__comment-menu-toggle" on:click|preventDefault={toggleCommentMenu}>
            <svg width="19" height="4" viewBox="0 0 19 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="2.6934" cy="2" rx="2.01859" ry="2" fill="black"/>
                <ellipse cx="9.75883" cy="2" rx="2.01859" ry="2" fill="black"/>
                <ellipse cx="16.8233" cy="2" rx="2.01859" ry="2" fill="black"/>
            </svg>
        </button>

        <div class="feed-item__comment-menu {commentMenuStatus}">
            <button class="feed-item__comment-menu-button">{translations[LANG]?.feed.reply}</button>
            <button class="feed-item__comment-menu-button">{translations[LANG]?.feed.delete}</button>
        </div>
    </div>

    <div class="feed-item__content">
        {#if isChild}
            <div class="feed-item__header-meta">
                <div class="feed-item__name">{data?.user_name}</div>
                <div class="feed-item__post-date">
                    {timeInstance.format(data?.post_date*1000)}
                </div>
            </div>
        {/if}

        {data?.comment}
    </div>

    {#if !isChild}
        <div class="feed-item__footer-meta">
            <div class="feed-item__tags">
                {#each  data?.tags as tag,index (index)}
                    <button class="feed-item__tags-button" data-tag={tag.toLowerCase()}>#{tag}</button>
                {/each}
            </div>

            {#if (data?.children_post_ids).length }
                <div class="feed-item__comment-count" on:click|preventDefault={toggleChildComment}>
                    {`
                        ${translations[LANG]?.feed[mode]}
                        ${( (data?.children_post_ids).length ) ? (data?.children_post_ids).length : 0}
                        ${( (data?.children_post_ids).length>1 )
                            ? translations[LANG]?.feed.comments
                            : translations[LANG]?.feed.comment
                        }
                    `}
                </div>
            {/if}
        </div>
    {/if}
</div>