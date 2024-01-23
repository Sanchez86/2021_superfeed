<script>
	import { createEventDispatcher } from 'svelte';
	import translations              from '../../data/translations';

    let searchElem = document.querySelector('.search');

    let queryTagInputStatus = false;

	const dispatch = createEventDispatcher();
	const LANG     = __myapp.env.CURRENT_LANG;

	const searchFormHandler = (event) => queryTagInputStatus = !queryTagInputStatus;

	//console.log('queryTagInputStatus', queryTagInputStatus);

</script>

<style lang="scss">
	@import "../../sass/_variables.scss";
    .search{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 18px 0;

        &__input {
            display: none;
			width: 100%;
			max-width: 255px;
			height: 32px;
			background: $white;
			box-shadow: 0px 2px 20px #E8E8E8;
			border-radius: 60px;
			padding: 0 20px;
			font-size: 12px;
			line-height: 1.4;
            color: $black;

			&::-webkit-input-placeholder { /* Chrome/Opera/Safari */
				color: #B5B5B5;
			}
			&::-moz-placeholder { /* Firefox 19+ */
				color: #B5B5B5;
			}
			&:-ms-input-placeholder { /* IE 10+ */
				color: #B5B5B5;
			}
			&:-moz-placeholder { /* Firefox 18- */
				color: #B5B5B5;
			}
        }

		&__btn {
			cursor: pointer;
			background: linear-gradient(79.72deg, $purple 0%, $purple-light 100%);
			border-radius: 60px;
            display: inline-block;
			width: 50px;
			min-width: 50px;
			height: 32px;
            position: relative;
            margin-left: 15px;

			&:after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: block;
				width: 17px;
				height: 17px;
				background-repeat: no-repeat;
				background-position: center;
				background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNy4wNzQ1IDBDMy4xNzM2NiAwIDAgMy4xNzIxOCAwIDcuMDcxMjVDMCAxMC45NzAzIDMuMTczNjkgMTQuMTQyNSA3LjA3NDUgMTQuMTQyNUMxMC45NzUzIDE0LjE0MjUgMTQuMTQ5IDEwLjk3MDMgMTQuMTQ5IDcuMDcxMjVDMTQuMTQ5IDMuMTcyMTggMTAuOTc1MyAwIDcuMDc0NSAwWk03LjA3NDUgMTIuOTgwMUMzLjgxMzA3IDEyLjk4MDEgMS4xNTk3NSAxMC4zMjkyIDEuMTU5NzUgNy4wNzEyMUMxLjE1OTc1IDMuODEzMDEgMy44MTMwNyAxLjE2MjM2IDcuMDc0NSAxLjE2MjM2QzEwLjMzNTkgMS4xNjIzNiAxMi45ODkyIDMuODEzMDEgMTIuOTg5MiA3LjA3MTIxQzEyLjk4OTMgMTAuMzI5MiAxMC4zMzYgMTIuOTgwMSA3LjA3NDUgMTIuOTgwMVoiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTE2LjgyOTUgMTYuMDA2N0wxMS44NTAyIDExLjUzNThDMTEuNjIzMSAxMS4zMDk1IDExLjI1NiAxMS4zMTA1IDExLjAzIDExLjUzNzlDMTAuODA0MyAxMS43NjU1IDEwLjgwNTIgMTIuMTMzNCAxMS4wMzIyIDEyLjM1OTlMMTYuMDExNSAxNi44MzA4QzE2LjEyNDcgMTYuOTQzNiAxNi4yNzI0IDE2Ljk5OTkgMTYuNDIwNSAxNi45OTk5QzE2LjU2OTUgMTYuOTk5OSAxNi43MTgzIDE2Ljk0MjggMTYuODMxNiAxNi44Mjg3QzE3LjA1NzQgMTYuNjAxIDE3LjA1NjQgMTYuMjMzMSAxNi44Mjk1IDE2LjAwNjdaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==);
            }

            &:hover {
				background: linear-gradient(90deg, $orange 0%, $orange-light 100%);
            }
		}
    }

    .search__input {
        display: none;

        &.active {
			display: inline-block;
        }
    }

</style>

<!--<form name="search-tags-form"  class="search" on:submit|preventDefault>
    <input type="text"
           name="search-tag-name"
           class="search__input {queryTagInputStatus ? 'active' : ''}"
           placeholder="{translations[LANG].search.search_placeholder}" />

    <span class="search__btn"
          on:click|preventDefault={searchFormHandler}></span>
</form>-->

<div class="search">
    <input type="text"
           name="search-tag-name"
           class="search__input {queryTagInputStatus ? 'active' : ''}"
           placeholder="{translations[LANG].search.search_placeholder}" />

    <span class="search__btn"
          on:click|preventDefault={searchFormHandler}></span>
</div>