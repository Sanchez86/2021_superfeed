<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let dataStep = '';
    export let role = '';
    export let text     = '';
    export let color    = 'purple';
    export let btnType  = 'button';
    export let disabled = false;
    export let className = '';
    export let dataHref = '';
</script>

<style lang="scss">
    @import "../../sass/_variables.scss";
    @import "../../sass/_mixin.scss";
    @import "../../sass/_buttons.scss";

    .loader {
        svg {
            width: auto;
            height: 10px;
        }
    }
</style>

{#if btnType === 'loader'}
    <div class="btn loader btn-{color} {className}">
        <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <circle cx="15" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                         begin="0s" dur="0.8s"
                         values="15;9;15" calcMode="linear"
                         repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="1" to="1"
                         begin="0s" dur="0.8s"
                         values="1;.5;1" calcMode="linear"
                         repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                <animate attributeName="r" from="9" to="9"
                         begin="0s" dur="0.8s"
                         values="9;15;9" calcMode="linear"
                         repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="0.5" to="0.5"
                         begin="0s" dur="0.8s"
                         values=".5;1;.5" calcMode="linear"
                         repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                         begin="0s" dur="0.8s"
                         values="15;9;15" calcMode="linear"
                         repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="1" to="1"
                         begin="0s" dur="0.8s"
                         values="1;.5;1" calcMode="linear"
                         repeatCount="indefinite" />
            </circle>
        </svg>
    </div>
{/if}

{#if btnType !== 'loader'}
    <button class="btn btn-{color} {className}"
            type={btnType}
            data-step={dataStep}
            data-role={role}
            on:click
            disabled={disabled}
            data-href={dataHref}
    >
        {@html text}
    </button>
{/if}


