<script>
	import { onMount, onDestroy } from "svelte";

	let chsize = { x: 0, y: 0 };
	let origin = { x: 0, y: 0 };
	let m_el;

	onMount(async () => {
		let cr = m_el.getBoundingClientRect();
		chsize = { x: cr.width, y: cr.height };
		origin = { x: cr.left, y: cr.top };
	});

	const interval = setInterval(blink_cursor, 500);
	onDestroy(() => {
		clearInterval(interval);
	});

	export let value = "Edit me";
	$: getLines(value);
	let items;
	function getLines(v) {
		items = v.split("\n");
	}

	function mouse_ev(e) {
		let x = Math.floor((e.clientX - origin.x) / chsize.x);
		let y = Math.floor((e.clientY - origin.y) / chsize.y);
		return { x: x, y: y };
	}

	let sel_s;
	let sel_e;
	function selStart(e) {
		sel_s = mouse_ev(e);
		console.log(`selstart`, sel_s);
	}

	function selEnd(e) {
		sel_e = mouse_ev(e);
		console.log(`selend`, sel_e);
		if (sel_s.x == sel_e.x && sel_s.x == sel_e.x) {
			// move the cursor here
			cursor_enable = true;
			c_x_px = sel_e.x * chsize.x;
			c_y_px = sel_e.y * chsize.y;
		} else {
			cursor_enable = false;
		}
	}

	let cursor = false;
	let cursor_enable = true;
	let cursor_style = "solid";
	let c_x_px = 0;
	let c_y_px = 0;

	function blink_cursor() {
		cursor = !cursor;
		cursor_style = cursor && cursor_enable ? "solid" : "none";
	}
</script>

<div class="editor-container">
	<div class="editor" style={`--ch_h: ${chsize.y}px;`}>
		<div class="editor-inner" on:mousedown={selStart} on:mouseup={selEnd}>
			<div class="measure container">
				<pre bind:this={m_el}>x</pre>
			</div>
			<div class="cursor" style={`--cursor: ${cursor_style}; --cursor_x: ${c_x_px}px; --cursor_y: ${c_y_px}px;`}>
				<pre bind:this={m_el}>&nbsp;</pre>
			</div>
			<div class="container">
				{#each items as item}
					<pre class="line">{item}</pre>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	div.editor-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	div.editor {
		display: flex;
		outline: palegreen;
		border: peru;
		background-color: plum;
		flex-grow: 1;
		padding: 4px;
		margin: 0px;
	}

	div.editor-inner {
		position: relative;
		flex-grow: 1;
		padding: 0px;
		margin: 0px;
	}

	div.container {
		position: absolute;
		left: 0px;
		top: 0px;
		margin: 0px;
		padding: 0px;
	}

	div.measure {
		overflow: hidden;
		height: 0px;
	}

	div.measure pre {
		left: 0px;
		top: 0px;
		margin: 0px;
		padding: 0px;
	}

	div.cursor {
		position: absolute;
		left: var(--cursor_x);
		top: var(--cursor_y);
		margin: 0px;
		padding: 0px;
	}

	div.cursor pre {
		border-left-color: black;
		border-left-width: 1.5px;
		border-left-style: var(--cursor);
		left: 0px;
		top: 0px;
		margin: 0px;
		padding: 0px;
	}

	pre.line {
		overflow-wrap: break-word;
		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: normal;
		outline: none;
		width: 100%;
		margin: 0px;
		padding: 0px;
		height: var(--ch_h);
	}
</style>
