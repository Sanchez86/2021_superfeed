<script>
	import Search       from './Search.svelte';
	let foundedTagsData = '';

	const searchFormSubmitHandler = async (event) => {
		//const queryValue = event.target['search-tag-name'];
		let formData = new FormData(event.target);

		// TODO : Test data
		//let communityId = 12;

		//const res = await sendDataToBackend(SEARCH_TAGS_ENDPOINT+communityId, formData);
		//foundedTagsData = await res.json();


		foundedTagsData = {
			name: 'CEO'
		}
	}

	const sortPostsByTagHandler = (event) => {
		const tagName = event.target.dataset?.name;

		if ( !tagName ) return;

		dispatch('sortPostsByTag', {
			tag_name: tagName,
		});
	}
</script>

<style lang="scss">
	@import "../../sass/_comment-form.scss";
	@import "../../sass/_mixin.scss";

	.tags-area{
		display: flex;
		justify-content: space-between;
		align-items: center;

		@include break(small){
			flex-direction: column;
			align-items: flex-end;
		}

		&__tag{
			color: #000000;
			font-size: 15px;
			line-height: 1.3;
			height: 32px;
			margin: 5px 10px 5px 0;
			border: 1px solid #DCDCDC;
			background-color: #FFFFFF;
			border-radius: 60px;
			padding: 0 20px;
			cursor: pointer;

			&:last-child{
				margin-right: 0;
			}

			&:hover{
				color: #FFFFFF;
				background: linear-gradient(90deg, #FF5C01 0%, #FFB102 100%);
			}
		}
	}
</style>

<div class="tags-area">
    <div class="tags-area__tags">
        {#each Object.keys(foundedTagsData) as tag, index (index)}
            <button class="tags-area__tag"
                    data-name={foundedTagsData[tag]}
                    on:click|preventDefault={sortPostsByTagHandler}>
                {foundedTagsData[tag]}
            </button>
        {/each}
    </div>
    <Search on:submit={searchFormSubmitHandler}/>
</div>