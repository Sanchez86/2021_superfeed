<script>
	import {checkStepFields, saveEnteredAdminData} from "../../js/helpers";
    import { createEventDispatcher } from 'svelte';
    import translations              from '../../data/translations';
    import BtnStandart               from './../buttons/BtnStandart.svelte';
    import BtnBack                   from './../buttons/BtnBack.svelte';
    import Input                     from './../inputs/Input.svelte';

    const dispatch = createEventDispatcher();
    const LANG     = __myapp.env.CURRENT_LANG;
	let keyIndex = '';

    const goToBack = (event) =>{
	    dispatch('goToStep', {
		    step: event.target.dataset.step,
	    });
    }

	const goToNextStep = (event) => {
		if ( !checkStepFields('addAdminBlock') ) return false;

		// Update localStorage with users data
		saveEnteredAdminData('addAdminBlock');

		dispatch('goToStep', {
			step: event.target.dataset.step,
		});
	}

</script>

<div class="mt-30">
    <form data-role="addAdminBlock"
          data-step="adminsWindowAllAdmin-window"
          on:submit|preventDefault={goToNextStep}
    >
        <Input  dataInputRole="email"
                name="admin-name"
                groupIndex={keyIndex}
                label="{translations[LANG]?.adminAddAdmins?.adminAddAdmins_input}" />

        <div class="mt-30">
            <BtnStandart text="{translations[LANG]?.adminAddAdmins?.adminAddAdmins_btn}"
                         btnType="submit"
                         color="purple" />
        </div>

        <div class="mt-30">
            <BtnBack dataStep="adminsWindowAllAdmin-window" on:click={goToBack} />
        </div>
    </form>
</div>
