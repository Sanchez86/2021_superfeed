<script>
	//import {createEventDispatcher} from 'svelte';
	import translations from '../../data/translations';
	import EditProfile from './modals/EditProfile.svelte';
	import DownloadImage from './modals/DownloadImage.svelte';
	import ModalWindow       from './ModalWindow.svelte';
	//const dispatch = createEventDispatcher();

	const LANG = __myapp.env.CURRENT_LANG;
    let isEditProfilePopupOpened = false;
    let isDownloadImagePopupOpened = false;

	/**
	 * Popup external click handler
	 * @param event
	 */
	const popupClickHandler = (event) => {
		const ROLE = event.target.dataset.role;

		// console.log(event.target);
		// console.log('ROLE', ROLE);

		switch ( ROLE ) {
			case 'popup-close':
				isEditProfilePopupOpened = false;
				isDownloadImagePopupOpened = false;

				break;
			case 'edit-user-data-popup':
				isEditProfilePopupOpened = true;
				break;
			case 'close-edit-profile-popup':
				isEditProfilePopupOpened = false;
				break;


			case 'download-image-popup':
				isDownloadImagePopupOpened = true;
				break;
			case 'close-download-image-popup':
				isDownloadImagePopupOpened = false;
				break;
		}
	}

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	@import "../../sass/_user-data.scss";
</style>

{#if isEditProfilePopupOpened }
    <ModalWindow on:click={popupClickHandler}>
        <EditProfile on:click={popupClickHandler} />
    </ModalWindow>
{/if}

{#if isDownloadImagePopupOpened }
    <ModalWindow on:click={popupClickHandler}>
        <DownloadImage on:click={popupClickHandler} />
    </ModalWindow>
{/if}


<div class="user-data">
    <div class="back-close"
         data-role="close-edit-profile"
         on:click></div>

    <div class="edit-profile js-open-popup-activator"
         on:click|preventDefault={popupClickHandler}
         data-role="edit-user-data-popup">{translations[LANG]?.editProfile?.editProfile_btn}</div>

    <div class="user-data__avatar">
        <img src="./images/avatar-user-data.png" alt="avatar"/>
        <div class="user-data__download js-open-popup-activator"
             on:click|preventDefault={popupClickHandler}
             data-role="download-image-popup"></div>
    </div>

    <div class="user-data__name">John Doe</div>
    <div class="user-data__company">Veritable</div>
    <div class="user-data__email">johndoe@veritable.io</div>
    <div class="group-tags">
        <div class="hash"></div>
        <div class="group-tags__list">
            <div class="group-tags__item">
                <div class="group-tags__header">Geography:</div>
                <div class="group-tags__elem">Boston</div>
            </div>
            <div class="group-tags__item">
                <div class="group-tags__header">Geography:</div>
                <div class="group-tags__elem">Boston</div>
            </div>
            <div class="group-tags__item">
                <div class="group-tags__header">Geography:</div>
                <div class="group-tags__elem">Boston</div>
            </div>
            <div class="group-tags__item">
                <div class="group-tags__header">Geography:</div>
                <div class="group-tags__elem">Boston</div>
            </div>
            <div class="group-tags__item">
                <div class="group-tags__header">Geography:</div>
                <div class="group-tags__elem">Boston</div>
            </div>
            <div class="group-tags__item">
                <div class="group-tags__header">Geography:</div>
                <div class="group-tags__elem">Boston</div>
            </div>
        </div>
    </div>
</div>