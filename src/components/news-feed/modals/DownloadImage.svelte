<script>
	import translations from '../../../data/translations';
	import BtnStandart       from './../../buttons/BtnStandart.svelte';

	const LANG = __myapp.env.CURRENT_LANG


    const trigger = () =>{
	    let btnFile = document.getElementById('btnFile');
	    let text = document.getElementById('text');
	    btnFile.onchange=function(){
		    text.innerHTML=btnFile.value;
	    }
	    btnFile.click();
    };
</script>

<style lang="scss">
	@import "../../../sass/_variables.scss";
	@import "../../../sass/_mixin.scss";
	@import "../../../sass/_buttons.scss";
	@import "../../../sass/_modal_window.scss";
    .block-download{
        margin: 30px;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        &__hidden{
           display: none;
        }
    }
    .text{
        height: 24px;
    }
</style>

<h2 class="popup__header hr-bottom">{translations[LANG]?.download_img?.download_img_header}</h2>
<div class="m-30">
    <div id="text" class="text"></div>
</div>
<div class="block-download">
    <form>
        <input type="hidden" name="user_id">
        <input type="file"
               name="user_image"
               id="btnFile"
               class="block-download__hidden"
        />
        <BtnStandart text="{translations[LANG]?.download_img?.download_btn_2}"
                     role="close-edit-profile-popup"
                     on:click={trigger}
        />
        <BtnStandart btnType="submit"
                     text="{translations[LANG]?.download_img?.download_btn_1}"
                     role="close-edit-profile-popup"
                     className="hover-purple ml-15"
                     on:click
                     color="gray"
        />
    </form>
</div>
