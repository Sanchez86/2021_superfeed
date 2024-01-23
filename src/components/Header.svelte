<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    const goToHome = (event) =>{
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }
</script>
<div class="center-block__header">
    <button
       class="link-logo"
       data-step="login-step"
       on:click|preventDefault={goToHome}>
        <img src="images/logo.svg" alt="logo" />
    </button>
</div>