<script>
    export let url = '';
    export let name = '';

    let initials = (url) ? '' : (name) ? name.split(' ') : 'XX';
</script>

<style lang="scss">
    @import "../../sass/_avatar.scss";
</style>

<div class="avatar">
    {#if initials }
        { initials[0].charAt(0)+ initials[1].charAt(0) }
    {:else if url}
        <img src={url} alt="user-avatar" />
    {/if}
</div>