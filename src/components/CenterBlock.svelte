<script>
    import Header      from './Header.svelte';
    import Footer      from './Footer.svelte';
</script>

<main class="wrap-center-block">
    <div class="center-block">
        <Header />
        <slot></slot>
        <Footer />
    </div>
</main>