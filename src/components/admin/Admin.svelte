<script>

	import BtnSymbol                 from './../buttons/BtnSymbol.svelte';

	const LANG     = __myapp.env.CURRENT_LANG;

	export let dataRolePlus = '';
	export let keyIndex = '';
	export let dataRoleRemove = '';
	export let adminName = '';

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";

    .list-admins{

        &__item{
             display: flex;
             align-items: center;
             justify-content: space-between;
             width: 50%;
             padding: 15px 25px;
             margin: 15px 0;
             border-right: 1px solid $hr-border;
        @include break(x-small){
            width: 100%;
            border-right: 0;
            border-bottom: 1px solid $hr-border;
        }
        &:nth-child(even){
             border-right: 0;
            @include break(x-small){
                border-bottom: 0;
            }
        }
    }
    &__name{
         font-weight: 500;
         font-size: 18px;
         line-height: 34px;
     }
    }
</style>

<div class="list-admins__item" data-index={keyIndex} >
    <div class="list-admins__name">{ adminName['admin-name']}</div>
    <BtnSymbol symbol="del"
               dataRole={dataRoleRemove}
               color="gray"
               dataIndex={keyIndex}
               on:click />
</div>