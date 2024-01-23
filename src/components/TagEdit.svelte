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
	export let values = '';
	export let data = '';
</script>

<style lang="scss">
	@import "../sass/_variables.scss";
	@import "../sass/_mixin.scss";
	@import "../sass/_buttons.scss";
	@import "../sass/_tags.scss";

	.tags-group{
		display: flex;
		padding-top: 10px;
		padding-bottom: 15px;
		width: 50%;
		@include break(small) {
			flex-direction : column;
			width: 100%;
		}
		&__item{
			width: 50%;
			margin: 0 15px;

			@include break(small) {
				width: 100%;
				margin-bottom: 15px;
			}
		}
	}
</style>

<div class="tags-edit__block" data-index={keyIndex}>
    <div class="tags-edit__control">

    </div>
    <div class="tags-edit__elem tags-group">
        <div class="tags-group__item">
            <Input wrapperClass=""
                   dataInputRole="anyText"
                   label={translations[LANG]?.editTags?.title_1}
                   name="tag-name[]"
                   groupIndex={keyIndex}
                   value={data['tag-name']}
                   valueReadOnly={isReadOnly}
            />
        </div>
        <div class="tags-group__item">
            <Select
                    wrapperClass=""
                    dataInputRole="anyText"
                    label={translations[LANG]?.editTags?.title_2}
                    name="tags-values[]"
                    groupIndex={keyIndex}
                    optionObject={values}
                    selectedValue={data['tags-values']}
                    valueReadOnly={isReadOnly}
            />
        </div>
    </div>
    <div class="tags-edit__control">
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