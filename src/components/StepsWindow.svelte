<script>
	import CenterBlock      from './CenterBlock.svelte';
    import LoginBlock       from './LoginBlock.svelte';
    import SignUpBlock      from './SignUpBlock.svelte';
    import WelcomeBlock     from './WelcomeBlock.svelte';

    import UserPersonalityBlock from './UserPersonalityBlock.svelte';
    import UserCommunityBlock   from './UserCommunityBlock.svelte';
    import UserWhichCRMBlock    from './UserWhichCRMBlock.svelte';
    import UserSetApiKeyBlock   from './UserSetApiKeyBlock.svelte';
	import UserSetupBlock       from './UserSetupBlock.svelte';
	import UserPreviewBlock     from './UserPreviewBlock.svelte';
    import ImportConfirmation   from './ImportConfirmation.svelte';
    import WillYouReadThisBlock from './WillYouReadThisBlock.svelte';

    import WillYouReadThisBlock2  from './WillYouReadThisBlock2.svelte';
    import ShallWeStartBlock      from './ShallWeStartBlock.svelte';
    import CreateAccessRulesBlock from './CreateAccessRulesBlock.svelte';

    import AddRulesBlock    from './AddRulesBlock.svelte';
    import EditRulesBlock   from './EditRulesBlock.svelte';
    import SelectFieldsPull from './SelectFieldsPull.svelte';

    import AddTagsBlock  from './AddTagsBlock.svelte';
    import EditTagsBlock from './EditTagsBlock.svelte';
    import AddAdminBlock from './AddAdminBlock.svelte';

    // connection to the admin panel
    import StepsAdminWindow from './admin/StepsAdminWindow.svelte';
    import {makeRequestToBackend} from '../js/helpers';

    // News Feed
    import NewsFeed from './news-feed/NewsFeed.svelte';

    // Initial step
    let currentStepWindow = '';

    console.log('26.02.2021 22:03');

    // Checking what page should we open on start app
    ( async () => {

        // TODO: temp
        currentStepWindow = 'news-feed';
        // currentStepWindow = 'user-community-step';
	    // currentStepWindow = 'addTags-step';
        //currentStepWindow = 'createAccessRulesBlock-step';
        return;

        const GET_COMMUNITIES_ENDPOINT  = __myapp.env.GET_COMMUNITIES_ENDPOINT;

        let res = await makeRequestToBackend(false, GET_COMMUNITIES_ENDPOINT, 'GET');

        // Access isn't authorized
        if ( res.status === 401 ) {
            currentStepWindow = 'login-step';
            return;
        }

        //TODO: Remove before demo/live
        res = JSON.stringify([]);

        // User doesn't have available community
        if ( !res.length || !JSON.parse(res).length ) {
            currentStepWindow = 'user-community-step';
            return;
        }

        // User successfully entered and he has some community
        currentStepWindow = 'news-feed';
    })()


    // Define what step should be displayed
    const stepsHandler = (event) => {
	    currentStepWindow = event.detail.step;
    }

    console.log('28.02.2021 12:03 v1');

    // TODO: Need to remove before go to production
    const testStepsHandler = (event) => {
	    currentStepWindow = event.target.dataset.step;
    }

    console.log('ddd');


</script>

<style lang="scss">
    .test{
        button{
            width: 160px;
            height: 40px;
            border:1px solid #000;
            background-color: #fff;
            color: #000;
            margin: 5px;
        }
    }
</style>

<div class="test">
    <h2>Temporary buttons for testing</h2>
    <button data-step="login-step" on:click|preventDefault={testStepsHandler}>Login steps</button>
    <button data-step="StepsAdminWindow" on:click|preventDefault={testStepsHandler}>Admin Panel</button>
    <button data-step="news-feed" on:click|preventDefault={testStepsHandler}>Home Feed</button>
</div>


<!-- all steps -->
{#if currentStepWindow === 'login-step'}
    <CenterBlock>
        <LoginBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'sign-up-step'}
    <CenterBlock>
        <SignUpBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'welcome-step'}
    <CenterBlock>
        <WelcomeBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-personality-step'}
    <CenterBlock>
        <UserPersonalityBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-import-step'}
    <CenterBlock>
        <ImportConfirmation on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-setup-step'}
    <CenterBlock>
        <UserSetupBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-preview-step'}
    <CenterBlock>
        <UserPreviewBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-community-step'}
    <CenterBlock>
        <UserCommunityBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-whichCRM-step'}
    <CenterBlock>
        <UserWhichCRMBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'user-setApiKey-step'}
    <CenterBlock>
        <UserSetApiKeyBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'willYouReadThisBlock-step'}
    <CenterBlock>
        <WillYouReadThisBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'willYouReadThisBlock2-step'}
    <CenterBlock>
        <WillYouReadThisBlock2 on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'shallWeStartBlock-step'}
    <CenterBlock>
        <ShallWeStartBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'createAccessRulesBlock-step'}
    <CenterBlock>
        <CreateAccessRulesBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'addRulesBlock-step'}
    <CenterBlock>
        <AddRulesBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'editRulesBlock-step'}
    <CenterBlock>
        <EditRulesBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'selectFieldsPull-step'}
    <CenterBlock>
        <SelectFieldsPull on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'addTags-step'}
    <CenterBlock>
        <AddTagsBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'editTags-step'}
    <CenterBlock>
        <EditTagsBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}
{#if currentStepWindow === 'addAdmin-step'}
    <CenterBlock>
        <AddAdminBlock on:goToStep={stepsHandler} />
    </CenterBlock>
{/if}

{#if currentStepWindow === 'StepsAdminWindow'}
    <StepsAdminWindow on:goToStep={stepsHandler} />
{/if}

{#if currentStepWindow === 'news-feed'}
    <NewsFeed />
{/if}
