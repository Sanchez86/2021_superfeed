<script>
    export let dataStep = '';
    export let text = '';
    export let social ='';
    export let disabled ='';
    export let type = 'button';
    export let hrefAttr = '';
</script>

<style lang="scss">
    @import "../../sass/_variables.scss";
    @import "../../sass/_mixin.scss";
    @import "../../sass/_buttons.scss";
</style>

{#if type === 'link'}
    <a class="btn btn-social ml-5 mr-5 mb-5"
        data-step={dataStep}
        data-social={social}
        href={hrefAttr}
        on:click
        disabled={disabled}
    >
        {@html text}
        <i class="btn-icons btn-icon-{social}"></i>
    </a>
{/if}

{#if type === 'button'}
    <button class="btn btn-social ml-5 mr-5 mb-5"
        data-step={dataStep}
        data-social={social}
        on:click
        disabled={disabled}
    >
        {@html text}
        <i class="btn-icons btn-icon-{social}"></i>
    </button>
{/if}