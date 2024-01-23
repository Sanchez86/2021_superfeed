<script>
	import Avatar                    from './Avatar.svelte';
	import translations              from '../../data/translations';
	import { createEventDispatcher } from 'svelte';
	import EmojiPicker               from "svelte-emoji-picker"
	import BtnStandart  from './../buttons/BtnStandart.svelte';
	//import {sendDataToBackend} from "../../js/helpers";
	//import { createEventDispatcher } from 'svelte';

	const SEARCH_TAGS_ENDPOINT     = __myapp.env.SEARCH_TAGS_ENDPOINT;
	const dispatch = createEventDispatcher();

	// Getting app lang
	const LANG = __myapp.env.CURRENT_LANG;

	//TODO: Need to take somewhere user avatar image, name, user_id
	let userData = {
		id: 1233,
		avatar_url: '',
		user_name: 'Jogn Doe',
	}
	export let className = '';
	export let showCheckbox = true;

	let emoji = { haveEmoji: false };
	function toggle() {
		emoji.haveEmoji = !emoji.haveEmoji;
	}

	let emojiElem = "";

	function addAutoResize() {
		document.querySelectorAll('[data-autoresize]').forEach(function (element) {
			//element.style.boxSizing = 'border-box';
			let offset = element.offsetHeight - element.clientHeight;
			element.addEventListener('input', function (event) {
				//event.target.style.height = 'auto';
				event.target.style.height = event.target.scrollHeight + offset + 'px';
			});
			element.removeAttribute('data-autoresize');
		});
	}
	setTimeout(function(){
		addAutoResize();
	}, 1000);



</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_comment-form.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_elements.scss";

    .emoji-wrap{
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		position: relative;
    }
    .emoji{
		position: absolute;
		background: #fff;
		top: 100%;
		right: 163px;
		padding: 15px;
		z-index: 100;
		width: 100%;
        max-width: 310px;
		border: 1px solid #f6f6f6;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		box-shadow: 0 2px 20px #E8E8E8;

        @include break(medium880){
			right: 154px;
        }

        @include break(s-small){
            left: 0;
        }

    }
	.form-control__input-text {
		border        : none;
		margin        : 0;
		background    : #F6F6F6;
		border-radius : 2px;
		padding       : 5px 80px 5px 14px;
		font-family   : Roboto, sans-serif;
		font-style    : normal;
		font-weight   : normal;
		font-size     : 14px;
		line-height   : 1.4;
		color         : #000000;
		min-height    : 46px;
		max-height    : 84px;
		width         : 100%;
		box-sizing    : border-box;
		resize        : none;

		&::placeholder {
			color : #9E9E9E;
		}
	}
</style>

<div class="comment-block__wrapper {(className) ? className : ''} {(showCheckbox === 'false') ? 'comment-block__wrapper-mod' : 'js-comment-main'}">

    <Avatar url={userData?.avatar_url} name={userData?.user_name} />
    <div class="emoji-wrap">
        <form name="add-comment-form"
          method="post"
          enctype="multipart/form-data"
          class="comment-block__form">

        <input type="hidden" value={userData.id} name="community-id" />

        <div class="comment-block__wrapper-block">
            <input type="hidden" value={userData.id} name="user-id" />
            <div class="comment-block__input-wrapper js-emoji">

                <div class="form-control mb-15 no-margin no-max-width">
                    <textarea data-autoresize class="form-control__input-text" bind:value={emojiElem}></textarea>
                </div>

                <div class="comment-block__emoji-btn js-emoji-btn" on:click={toggle}></div>

                <div class="comment-block__image-uploader">
                    <div class="comment-block__image-input-wrapper">
                        <input type="file"
                               name="user-new-comment-image[]"
                               class="comment-block__image"
                               accept="image/*"
                               multiple
                        />
                    </div>
                    <div class="comment-block__image-uploader-btn">
                        <svg width="22" height="22"
                             viewBox="0 0 22 22" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7109 4.21094C15.4228 4.21094 16 4.78805 16 5.5C15.9321 7.2099 13.4895 7.20943 13.4219 5.5C13.4219 4.78805 13.999 4.21094 14.7109 4.21094ZM20.2812 16.4878V3.4375C20.2812 2.48978 19.5102 1.71875 18.5625 1.71875H3.4375C2.48978 1.71875 1.71875 2.48978 1.71875 3.4375V11.0609L4.89173 7.8879C5.8969 6.88269 7.53251 6.88269 8.53776 7.8879L13.1113 12.4614L14.0754 11.4973C15.0807 10.4921 16.7162 10.4921 17.7215 11.4973L21.7483 15.5241C21.9095 15.6853 22 15.9039 22 16.1318V18.5625C22 20.4579 20.4579 22 18.5625 22H3.4375C1.54206 22 0 20.4579 0 18.5625V3.4375C0 1.54206 1.54206 0 3.4375 0H18.5625C20.4579 0 22 1.54206 22 3.4375V16.4878C21.9546 17.628 20.3262 17.6272 20.2812 16.4878ZM1.71875 13.4915V18.5625C1.71875 19.5102 2.48978 20.2812 3.4375 20.2812H18.5625C19.5102 20.2812 20.2812 19.5102 20.2812 18.5625V16.4878L16.5061 12.7126C16.1711 12.3776 15.6258 12.3776 15.2908 12.7126L11.0375 16.9659C10.702 17.3015 10.1579 17.3015 9.82218 16.9659C9.48656 16.6303 9.4866 16.0862 9.82218 15.7506L11.8959 13.6768L7.32235 9.10327C7.00249 8.76988 6.42692 8.76988 6.10706 9.10327L1.71875 13.4915Z" fill="#C8C8C8"/>
                        </svg>
                    </div>
                </div>
            </div>
            {#if showCheckbox !== 'false'}
                <div class="comment-block__anonymously-wrapper">
                    <input type="checkbox" name="post-anonymously" class="js-post-anonymously" />
                    <p class="comment-block__anonymously-label">
                        {@html translations[LANG]?.new_comment?.anonymously_label}
                    </p>
                </div>
            {/if}
        </div>

        <BtnStandart role="select-audience-popup"
                     text={translations[LANG].new_comment.select_audience}
                     on:click
                     className="comment-block__select-audience-btn"
                     color="purple" />
    </form>
        {#if emoji.haveEmoji}
            <div class="emoji">
                <EmojiPicker bind:value={emojiElem} />
            </div>
        {/if}
    </div>
</div>