<script>
    import translations              from '../data/translations';
    import BtnSymbol                 from './buttons/BtnSymbol.svelte';
    import Input                     from './inputs/Input.svelte';
    import Select                    from './inputs/Select.svelte';
    import { makeRequestToBackend,
             debounce } from "../js/helpers.js";
    import { createEventDispatcher } from 'svelte';

    const LANG     = __myapp.env.CURRENT_LANG;
    const dispatch = createEventDispatcher();

    export let dataRolePlus = '';
    export let keyIndex = '';
    export let dataRoleRemove = '';
    export let readOnly = ''
    export let disableStatus = 'disabled';

    let autoCompleteValues = [];
    let computedValue      = '';
    let isAutoCompleteOpen = ( !autoCompleteValues.length );

    const operators   = ['<', '>', '<>', '=', 'like', 'not like' ];
    const ruleOptions =  ['Email', 'Name', 'Location', 'Organization', 'Title', 'Industry'];

    /**
     * Select some autocomplete value
     * @param event
     */
    const selectAutocompleteValueHandler = (event) => {
        computedValue = event.target.innerText;
        isAutoCompleteOpen = false;
    }

    /**
     * Make request for autocomplete values
     * @type {function(...[*]=)}
     */
    const autocompleteHandler = debounce( (event) => {

        // Skip request if entered value is empty
        if ( !event.target.value ) return;

        // Checking what page should we open on start app
        ( async () => {

            const AUTOCOMPLETE_VALUES_ENDPOINT  = __myapp.env.AUTOCOMPLETE_VALUES_ENDPOINT;
            const RULE_ITEM = event.target.closest('.js-rule-item');
            const RULE_NAME = RULE_ITEM.querySelector('.js-rule-name');

            const data = {
                "field": RULE_NAME.value,
                "text" : event.target.value
            };

            const queryString = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');

            let res = await makeRequestToBackend(false, AUTOCOMPLETE_VALUES_ENDPOINT+'?'+queryString, 'GET');

            console.log('AUTOCOMPLETE_VALUES_ENDPOINT res', res);

            // Access isn't authorized
            if ( res.status === 401 ) {
                dispatch('goToStep', {
                    step: 'login-step',
                });
                return;
            }

            // convert received autocomplete data
            autoCompleteValues = JSON.parse(res);

        })();
    }, 700);

</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_buttons.scss";
    @import "../sass/_rules.scss";

    .rule-value-wrapper {
        position : relative;
    }

    .autocomplete-values {
        position: absolute;
        right: 0;
        bottom: 8px;
        z-index: 20;
        width: 100%;
        color: #000;
        border: 1px solid #d7d7d7;
        padding: 10px 0;
        height: 100px;
        overflow-y: scroll;
        background: #fff;
        border-top: none;
        transform: translateY(100%);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        &:empty {
            display : none;
        }

        li {
            padding: 5px 10px;

            &:hover {
                background: #F6F6F6;
            }
        }

    }
</style>

<div class="rules__block border-tb js-rule-item" data-index={keyIndex}>
    <Select wrapperClass="rules__elem"
            className="select js-rule-name"
            label={translations[LANG]?.addRules?.label_text_1}
            name="rules[name]"
            groupIndex={keyIndex}
            optionObject={ruleOptions}

    />

    <Select
        wrapperClass="rules__elem"
        dataInputRole="name"
        label={translations[LANG]?.addRules?.label_text_2}
        name="rules[compare]"
        optionObject={operators}
        groupIndex={keyIndex}
    />

    <div class="rule-value-wrapper rules__elem">
        <Input wrapperClass=""
               dataInputRole="anyText"
               className="form-control__input-text form-control__rule-input"
               label={translations[LANG]?.addRules?.label_text_3}
               name="rules[value]"
               groupIndex={keyIndex}
               value={computedValue}
               on:input={autocompleteHandler}
        />

        {#if isAutoCompleteOpen}
            <ul class="autocomplete-values">
                {#if autoCompleteValues}
                    {#each autoCompleteValues as value, index (index)}
                         <li on:click={selectAutocompleteValueHandler}>{value}</li>
                    {/each}
                {/if}
            </ul>
        {/if}
    </div>
    <div class="rules__inputs">
        <BtnSymbol size="small"
                   symbol="add"
                   addClass="mr-10"
                   dataRole={dataRolePlus}
                   on:click />

        <BtnSymbol size="small" 
                   symbol="del" 
                   dataRole={dataRoleRemove}
                   addClass="mr-10" 
                   dataIndex={keyIndex}
                   disabled="{disableStatus}"
                   on:click />
    </div>
</div>