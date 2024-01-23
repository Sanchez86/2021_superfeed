<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let heading = '';
</script>

<h1>{@html heading}</h1>