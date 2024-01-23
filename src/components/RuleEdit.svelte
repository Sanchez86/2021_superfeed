<script>
    import translations              from '../data/translations';
    import BtnSymbol                 from './buttons/BtnSymbol.svelte';
    import Input                     from './inputs/Input.svelte';
    import Select                    from './inputs/Select.svelte';

    const LANG     = __myapp.env.CURRENT_LANG;

    export let dataRoleEdit = '';
    export let keyIndex = '';
    export let dataRoleRemove = '';
    export let isReadOnly = '';
    export let operators = '';
	export let data = '';
</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_buttons.scss";
    @import "../sass/_rules.scss";
	@import "../sass/_elements.scss";

    .rules-group{
        display: flex;
		padding-top: 10px;
        padding-bottom: 15px;

		@include break(small) {
			flex-direction : column;
            width: 100%;
		}
        &__item{
            width: 33.3%;
            margin: 0 15px;

			@include break(small) {
				width: 100%;
			}


        }
    }
	.rule-id {
		color       : $purple;
		font-size   : 16px;
		font-weight : 700;
		white-space: nowrap;
	}

</style>

<div class="rules-edit__block border-tb" data-index={keyIndex} >
    <div class="rules-edit__elem">
        <div class="rule-id">Rule #{keyIndex}</div>
    </div>
    <div class="rules-edit__elem rules-group">
        <div class="rules-group__item">
            <div class="rules-edit__mob">
                <Input wrapperClass=""
                       dataInputRole="anyText"
                       className="form-control__input-text form-control__rule-input"
                       label={translations[LANG]?.addRules?.label_text_1}
                       name="rule-field[]"
                       groupIndex={keyIndex}
                       value={data['rule-field']}
                       valueReadOnly={isReadOnly}
                />
            </div>
        </div>
        <div class="rules-group__item">
            <div class="rules-edit__mob">
                <Select
                        wrapperClass=""
                        dataInputRole="anyText"
                        label={translations[LANG]?.addRules?.label_text_2}
                        name="rule-operator[]"
                        groupIndex={keyIndex}
                        optionObject={operators}
                        selectedValue={data['rule-operator']}
                        valueReadOnly={isReadOnly}
                />
            </div>
        </div>
        <div class="rules-group__item">
            <div class="rules-edit__mob">
                <Input wrapperClass=""
                       dataInputRole="anyText"
                       groupIndex={keyIndex}
                       className="form-control__input-text form-control__rule-input"
                       label={translations[LANG]?.addRules?.label_text_3}
                       name="rule-value[]"
                       value={data['rule-value']}
                       valueReadOnly={isReadOnly}
                />
            </div>
        </div>
    </div>
    <div class="rules-edit__elem d-flex">
        <BtnSymbol size="small"
                   symbol="edit"
                   addClass="mr-10"
                   dataRole={dataRoleEdit}
                   on:click />

        <BtnSymbol size="small"
                   symbol="del"
                   dataRole={dataRoleRemove}
                   addClass="mr-10"
                   dataIndex={keyIndex}
                   on:click />
    </div>
</div>