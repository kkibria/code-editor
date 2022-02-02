<script>
	import Editor from "./Editor.svelte";
	let value = `01234567890123456789012345678901234567890123456789\nSome words are *italic*, \n\nsome are **bold**`;
</script>

<main>
	<textarea bind:value />
	<Editor bind:value/>
</main>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-size: 11pt;
	}
</style>
