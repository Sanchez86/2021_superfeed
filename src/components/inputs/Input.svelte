<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let id = '';
    export let type = 'text';
    export let name = '';
    export let value = '';
    export let errorText = '';
    export let className = 'form-control__input-text';
    export let wrapperClass = '';
    export let dataInputRole = '';
    export let placeholder = '';
    export let label = '';
    export let valueReadOnly = '';
    export let search = "";
    export let groupIndex = "";

    let readonly = (valueReadOnly) ? valueReadOnly : '' ;
</script>

<style lang="scss">
    @import "../../sass/_variables.scss";
    @import "../../sass/_mixin.scss";
    @import "../../sass/_rules.scss";
    @import "../../sass/_elements.scss";

    .form-control {
        position : relative;

        &__input-text {
            @include break(small) {
                height : 40px;
            }
            @include break(x-small) {
                height : 30px;
            }

            & + .error-message {
                display : none;
            }

            &.error + .error-message {
                position: relative;
                font-size: 10px;
                padding-top: 5px;
                color: #f00;
                display : block;
            }
        }
    }

    .comment-block__input-text {
        border        : none;
        margin        : 0;
        background    : #F6F6F6;
        border-radius : 2px;
        padding       : 0 80px 0 14px;
        font-family   : Roboto, sans-serif;
        font-style    : normal;
        font-weight   : normal;
        font-size     : 14px;
        line-height   : 1.4;
        color         : #777777;
        height        : 46px;
        width         : 100%;

        &::placeholder {
            color : #9E9E9E;
        }
    }
</style>

<div class="{`form-control ${wrapperClass}`}">
    {#if label}
        <label class="form-control__label" for="{id}">{@html label}</label>
    {/if}

    <input
        id={id}
        type={type}
        name={name}
        value={value}
        class={className + " " + search + " " + readonly}
        data-input-role={dataInputRole}
        placeholder={placeholder}
        on:input
        data-group-index={groupIndex}
        readonly={valueReadOnly}
    />

    {#if errorText }
        <div class="error-message">{@html errorText}</div>
    {/if}

</div>
