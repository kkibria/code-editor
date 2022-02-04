<script>
	import { onMount, onDestroy } from "svelte";
	import { calcfrags } from "./editor";

	export let value = "Edit me";

	let chsize = { x: 0, y: 0 };
	let origin = { x: 0, y: 0 };
	let m_el;

	onMount(async () => {
		let cr = m_el.getBoundingClientRect();
		chsize = { x: cr.width, y: cr.height };
		origin = { x: cr.left, y: cr.top };
	});

	const interval = setInterval(blink_cursor, 300);
	onDestroy(() => {
		clearInterval(interval);
	});

	let ed_w = 0;
	let ed_h = 0;
	$: ed_cols = Math.floor(ed_w / chsize.x);
	$: ed_rows = Math.floor(ed_h / chsize.y);
	$: getLines(value, ed_cols);

	let row2line;
	let items;
	function getLines(v, cols) {
		row2line = [];
		items = [];
		let lineno = 0;
		v.split("\n").forEach((line) => {
			let item = calcfrags(line, cols);
			// we can decorate the presenation if we need here
			if (line.length == 0) {
				item.pres = "\u200b";
			}
			for (let i = 0; i < item.frags.length; i++) {
				row2line.push([lineno, i]);
			}
			items.push(item);
			lineno++;
		});
		// console.log((row2line.length == ed_rows), `row2line.length: ${row2line.length} != ed_rows: ${ed_rows}`);
	}

	function keyUp(e) {
		console.log(e);
	}

	let ed_el;
	function mouse_ev(e) {
		let x = Math.floor(0.7 + (e.clientX - origin.x) / chsize.x);
		let y = Math.floor((e.clientY - origin.y) / chsize.y);

		y = Math.min(y, row2line.length - 1);

		let lineno, fragno, a, b, charno;
		[lineno, fragno] = row2line[y];
		[a, b] = items[lineno].frags[fragno];

		x = Math.min(x, b - a);
		charno = a + x;
		ed_el.focus();
		return { x: x, y: y, lineno: lineno, charno: charno };
	}

	let cursor = true;
	let cursor_enable = true;
	let c_x_px = 0;
	let c_y_px = 0;

	let focused = false;
	$: cursor_vis = cursor_enable && focused ? "visible" : "hidden";
	$: cursor_style = cursor ? "solid" : "none";

	let sel_s;
	let sel_e;
	function selStart(e) {
		sel_s = mouse_ev(e);
		cursor_enable = false;
	}

	let n_c_x_px = 0;
	let n_c_y_px = 0;
	let n_cursor_enable = true;
	function selEnd(e) {
		sel_e = mouse_ev(e);
		// move the cursor
		n_c_x_px = sel_e.x * chsize.x;
		n_c_y_px = sel_e.y * chsize.y;
		n_cursor_enable = true;
	}

	function handleFocus(e) {
		focused = true;
	}

	function handleBlur(e) {
		focused = false;
	}

	function blink_cursor() {
		// update during blanking period to make it easy on eye
		if (!cursor) {
			c_x_px = n_c_x_px - 0.5;
			c_y_px = n_c_y_px;
			cursor_enable = n_cursor_enable;
		}
		cursor = !cursor;
	}
</script>

<div class="editor-container">
	<div class="editor" style={`--ch_h: ${chsize.y}px;`}>
		<div
			class="editor-inner"
			tabindex="0"
			bind:this={ed_el}
			bind:clientWidth={ed_w}
			bind:clientHeight={ed_h}
			on:mousedown={selStart}
			on:mouseup={selEnd}
			on:keyup={keyUp}
			on:focus={handleFocus}
			on:blur={handleBlur}
		>
			<div class="measure container">
				<pre bind:this={m_el}>x</pre>
			</div>
			<div
				class="cursor container"
				style={`--cursor: ${cursor_style}; --cursor_vis: ${cursor_vis}; --cursor_x: ${c_x_px}px; --cursor_y: ${c_y_px}px;`}
			>
				<pre>&nbsp;</pre>
			</div>
			<div class="container">
				{#each items as item}
					<pre class="line">{item.pres}</pre>
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
		background-color: rgb(240, 240, 240);
		flex-grow: 1;
		padding: 4px;
		margin: 0px;
		cursor: text;
	}

	div.editor-inner {
		position: relative;
		padding: 0px;
		margin: 0px;
		outline: none;
	}

	div.container {
		margin: 0px;
		padding: 0px;
	}

	div.measure {
		position: absolute;
		overflow: hidden;
		height: 0px;
	}

	div.measure pre {
		margin: 0px;
		padding: 0px;
	}

	div.cursor {
		position: absolute;
		left: var(--cursor_x);
		top: var(--cursor_y);
	}

	div.cursor pre {
		border-left-color: black;
		border-left-width: 2px;
		border-left-style: var(--cursor);
		margin: 0px;
		padding: 0px;
		opacity: 0.5;
		visibility: var(--cursor_vis);
	}

	pre.line {
		position: relative;
		overflow-wrap: break-word;
		overflow: visible;
		white-space: pre-wrap;
		word-break: normal;
		width: 100%;
		margin: 0px;
		padding: 0px;
		line-height: var(--ch_h);
		padding-right: 0.1px;
		z-index: 2;
		direction: ltr;
	}
</style>
