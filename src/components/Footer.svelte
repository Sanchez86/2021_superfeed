<script>
    import translations              from '../data/translations';
    const LANG     = __myapp.env.CURRENT_LANG;
</script>

<div class="center-block__footer">
	{@html translations[LANG].footer.footer_text}
</div>