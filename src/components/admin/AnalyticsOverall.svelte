<script>
	import AnalyticsColorBlock from './AnalyticsColorBlock.svelte';

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
	.analytics-block {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

    .invited-users{
        &__table{
            width: 100%;
            border: 0;
            tr{
                text-align: left;
				font-size: 18px;
				line-height: 2.8;
            }
			tr:nth-child(even){
				background-color: #F9F9F9;
			}
			tr:nth-child(odd){
				background-color: #FFFFFF;
			}
            th{
                font-weight: 500;
				padding-left: 80px;
            }
		}
        &__name{
			padding-left: 80px;
        }
        &__name,
        &__email{
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
        }
        &__status{
            padding-right: 80px;
			font-family: "Roboto", sans-serif;
			color: #FF7002;
            font-weight: 500;
            text-align: right;
			&.joined{
				color: #310985;
			}
        }

    }
</style>

<div class="analytics-block mt-30">

    <AnalyticsColorBlock
        type="average"
        header="Average"
        description=""
        count="2.3"
    />
    <AnalyticsColorBlock
            type="heighest"
            header="Highest"
            description="CEO"
            count="2.3"
    />
    <AnalyticsColorBlock
            type="lowest"
            header="Lowest"
            description="Boston"
            count="0.6"
    />

</div>

<hr class="hr-top mt-15 mb-15">

<div class="invited-users">
    <table class="invited-users__table">
        <tr>
            <th colspan="3">Invited users</th>
        </tr>
        <tr>
            <td class="invited-users__name">Williams Johnson </td>
            <td class="invited-users__email">williamsjohnson@gmail.com</td>
            <td class="invited-users__status joined">Joined</td>
        </tr>
        <tr>
            <td class="invited-users__name">Williams Johnson </td>
            <td class="invited-users__email">williamsjohnson@gmail.com</td>
            <td class="invited-users__status">Not joined</td>
        </tr>
        <tr>
            <td class="invited-users__name">Williams Johnson </td>
            <td class="invited-users__email">williamsjohnson@gmail.com</td>
            <td class="invited-users__status joined">Joined</td>
        </tr>
    </table>
</div>