<script>
    import { createEventDispatcher } from 'svelte';
    import translations              from '../../data/translations';
    import Scrollbar                 from 'happy-svelte-scrollbar';
    import BtnStandart               from './../buttons/BtnStandart.svelte';
    import Admin                     from './Admin.svelte';
    import {checkStepFields, saveEnteredAdminData} from "../../js/helpers";

    let iChangeMyHeight = 100;
    let iAmScrollArea = 100;

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;

    const windowHandler = (event) => {
        dispatch('goToStep', {
            step: event.target.dataset.step,
        });
    }

    // Get admins data
    const adminsData     = localStorage.getItem('entered-admin-data');
    let parsedAdminsData = (adminsData) ? {...JSON.parse(adminsData)} : {};

    const elemBehaviourHandler = (event) => {
	    const ROLE = event.target.dataset.role;
	    const ITEM_INDEX = event.target.dataset.index;

	    switch ( ROLE ) {
		    case 'remove-elem':
			    delete parsedAdminsData[ITEM_INDEX];
			    parsedAdminsData = parsedAdminsData;
			    break;
	    }

	    if ( !checkStepFields('editAdminBlock') ) return false;

	    // Update localStorage with users data
	    saveEnteredAdminData('editAdminBlock');
    }
</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
	@import "../../sass/_mixin.scss";
    .list-admins{
		display: flex;
        flex-wrap: wrap;
		border-bottom: 1px solid $hr-border;
        @include break(x-small){
            flex-direction: column;
        }
    }
	.my-scroller {
		max-height : 251px;
	}
</style>

<div>

    <div class="my-scroller" bind:this={ iAmScrollArea }>
        <div class="dynamic-content" bind:this={ iChangeMyHeight }>
            <div class="list-admins">
                {#if parsedAdminsData}
                    {#each Object.keys(parsedAdminsData) as adminItem (adminItem)}
                        <Admin on:click={elemBehaviourHandler}
                                  keyIndex={adminItem}
                                  dataRoleRemove="remove-elem"
                                  adminName={parsedAdminsData[adminItem]}
                        />
                    {/each}
                {/if}
            </div>
        </div>
    </div>

    <Scrollbar
            observerTarget={ iChangeMyHeight }
            scrollArea={ iAmScrollArea }
            showArrows={ false }
            buttonPressingMove={ 10 }
    />

    <div class="mt-30">
        <BtnStandart dataStep="adminsWindowAddAdmin-window"
                     text="{translations[LANG]?.adminAllAdmins?.adminAllAdmins_btn}"
                     on:click={windowHandler}
                     color="purple" />
    </div>

</div>
