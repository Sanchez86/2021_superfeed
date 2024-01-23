<script>
    import AdminsWindowAllAdmin      from './AdminsWindowAllAdmin.svelte';
    import AdminsWindowAddAdmin      from './AdminsWindowAddAdmin.svelte';

    let currentStepWindow = 'adminsWindowAllAdmin-window';

    const windowHandler = (event) => {
	    currentStepWindow = event.detail.step;
    }

</script>

<div>

    {#if currentStepWindow === 'adminsWindowAllAdmin-window'}
        <AdminsWindowAllAdmin on:goToStep={windowHandler} />
    {/if}
    {#if currentStepWindow === 'adminsWindowAddAdmin-window'}
        <AdminsWindowAddAdmin on:goToStep={windowHandler} />
    {/if}

</div>