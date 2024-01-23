<script>
	import BtnStandart            from './../../buttons/BtnStandart.svelte';
	import AudienceBlock          from './../AudienceBlock.svelte';
	import BtnBack                from './../../buttons/BtnBack.svelte';
	import Input                  from './../../inputs/Input.svelte';
	import {checkStepFields, makeRequestToBackend, saveEnteredUserData} from "../../../js/helpers";
	import translations           from '../../../data/translations';
	import {loop_guard} from "svelte/internal";

	// Getting app lang
	const LANG = __myapp.env.CURRENT_LANG;

	let listAudience;
	( async () => {
		const GET_COMMUNITIES_ENDPOINT = __myapp.env.GET_COMMUNITIES_ENDPOINT;

		let res = await makeRequestToBackend(false, GET_COMMUNITIES_ENDPOINT, 'GET');

         listAudience = JSON.parse(res);
		console.log('listAudience', listAudience);
	})();

	const savePostData = (event) => {

        document.querySelector('.js-popup-close').click();

        let postData = {};
		let blacks = ["1","2","3","4"];
		let tags = [1,2,3,4];
        let postMsg = document.querySelector('.js-comment-main .form-control__input-text').value;
        let is_anonymous = document.querySelector('.js-comment-main .js-post-anonymously').checked;
		let photos = [];
		let files = document.querySelector('.js-comment-main .comment-block__image').files;

		for (var i = 0; i < files.length; i++){
			photos.push (files[i].name);
		}

		postData['blacks'] = blacks;
		postData['tags'] = tags;
		postData['description'] = postMsg;
		postData['photos'] = photos;
		postData['is_anonymous'] = (!!is_anonymous) ? 1 : 0;

		console.log('typeof blacks', typeof blacks);
		console.log('typeof tags', typeof tags);
		console.log('typeof photos', typeof photos);

		( async () => {
			const SET_NEW_POST_ENDPOINT = __myapp.env.SET_NEW_POST_ENDPOINT;
			let res = await makeRequestToBackend(postData, SET_NEW_POST_ENDPOINT, 'POST', false);
			//submitBtnType = 'submit';

			console.log('res - send post', res);

			// Access isn't authorized
			if ( res.status === 401 ) {
				nextStep = 'login-step';
				return;
			}

		})();

		console.log('postData ---', postData);



        // Update store with post data
		//saveEnteredUserData();

    }


</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_modal_window.scss";

    .wrap-buttons{
        max-width: 420px;
		width: 100%;
		margin: auto;
		.form-control{
			max-width: 100%;
		}
    }
</style>

<h2 class="popup__header hr-bottom">{translations[LANG].select_audience.heading}</h2>
<div class="popup__search">
    <div class="popup__element-wrap">
        <Input placeholder="Search audience"
               search="search" />
    </div>
</div>
<hr class="hr">
<div class="popup__element-wrap">
    <div class="audience mt-30">
        {#if listAudience}
            {#each listAudience as { id, name }}
                <AudienceBlock {name} users="" tags="" />
            {/each}
        {/if}
    </div>
</div>
<hr class="hr mt-30">
<div class="wrap-buttons">
    <div class="mt-30 d-flex flex-wrap justify-content-center">
        <BtnStandart type="button"
                     color="gray"
                     className="m-5 btn-200 hover-purple"
                     text="Post to audience"
                     on:click={savePostData}/>

        <BtnStandart type="button"
                     role="open-create-new-audience-popup"
                     className="m-5 btn-200 btn-orange"
                     text="Create new"
                     on:click
                     dataHref="#create_new_audience"
        />
    </div>
</div>
<div class="mt-30">
    <BtnBack className="js-popup-close" role="popup-close" on:click />
</div>

<!--</ModalWindow>-->