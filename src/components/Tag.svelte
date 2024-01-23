<script>
    import translations              from '../data/translations';
    import BtnSymbol                 from './buttons/BtnSymbol.svelte';
    import Input                     from './inputs/Input.svelte';
    import Select                    from './inputs/Select.svelte';
    
    const LANG     = __myapp.env.CURRENT_LANG;

    export let dataRolePlus = '';
    export let keyIndex = '';
    export let dataRoleRemove = '';
    export let readOnly = ''

    let values = [
        { id: '0', name: 'Target an audience' },
        { id: '1', name: 'Target an audience 2' },
        { id: '2', name: 'Target an audience 3' }
    ];

</script>

<style lang="scss">
    @import "../sass/_variables.scss";
    @import "../sass/_mixin.scss";
    @import "../sass/_buttons.scss";
    @import "../sass/_add-tags.scss";
    .add-tags{
        &__item{
            margin-bottom: 30px;
            &:last-child{
				margin-bottom: 0;
            }
			@include break(small) {
				margin-bottom: 15px;
			}
        }
    }
    .add-tags__controls.mod{
		@include break(small) {
			display: none;
		}
    }
</style>

<div class="add-tags__block data-index={keyIndex}">
    <div class="add-tags__controls mod">

    </div>
    <div class="add-tags__form">
        <div class="add-tags__item">
            <Input wrapperClass="input-text"
                   label={translations[LANG]?.addTags?.select_1}
                   name="tag-name[]"
                   dataInputRole="anyText"
                   groupIndex={keyIndex}
                   search="search"
                   {readOnly}
            />
        </div>
        <div class="add-tags__item">
            <Select
                    dataInputRole="name"
                    label={translations[LANG]?.addTags?.select_2}
                    name="tags-values[]"
                    id="tags-values"
                    optionObject={values}
                    groupIndex={keyIndex}
            />
        </div>
    </div>
    <div class="add-tags__controls">
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
                   on:click />
    </div>
</div>