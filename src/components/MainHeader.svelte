<script>
	import { createEventDispatcher } from 'svelte';
	import HeaderMessage      from './admin/HeaderMessage.svelte';

    const dispatch = createEventDispatcher();
    const goToHome = (event) =>{
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

	let avatarStatus = false;
	function onAvatar() {
		avatarStatus = !avatarStatus;

		dispatch('status', {
			text: avatarStatus
		});
	}

	let headerMessage = { haveMessage: false };
	function toggle() {
		headerMessage.haveMessage = !headerMessage.haveMessage;
	}
</script>

<style lang="scss">
	@import "../sass/_variables.scss";
	@import "../sass/_mixin.scss";
	@import "../sass/_main-header.scss";
</style>

<div class="header">
    <div class="header__left">
        <div>
            <button
                    class="header__logo-link"
                    data-step="analytics-window"
                    on:click|preventDefault={goToHome}>
                <img src="images/main-logo.svg" alt="logo" class="header__logo" />
            </button>
        </div>
        <div class="d-flex align-items-center">
            <button data-step="analytics-window"
                    on:click|preventDefault={goToHome}>
                <i class="settings-icon"></i>
            </button>
        </div>
    </div>
    <div class="header__right">
        <div class="notif">
            <button on:click={toggle}>
                <i class="icon-notification"></i>
                <span class="notif__message-count">1</span>
            </button>
            {#if headerMessage.haveMessage}
                <div class="header-message">
                    <HeaderMessage iconType="alert"
                                    textMessage="Adipiscing at in tellus integer feugiat varius morbi. Neque vitae tempus quam aliquam."/>
                    <HeaderMessage iconType="message"
                                   textMessage="Adipiscing at in tellus integer feugiat varius morbi. Neque vitae tempus quam aliquam."/>

                </div>
            {/if}
        </div>

        <div class="user-block">
            <div class="d-flex align-items-center"
                 data-role="open-profile"
                 on:click
            >
                <div class="user-block__avatar">
                    <span>SJ</span>
<!--                    <img src="images/saleforce.png" alt="avatar" class="user-block__avatar-img" />-->
                </div>
                <div class="user-block__name">
                    John Doe
                </div>

            </div>
            <div class="d-flex align-items-center">
                <button>
                    <i class="logout-icon"></i>
                </button>
            </div>
        </div>

    </div>
</div>