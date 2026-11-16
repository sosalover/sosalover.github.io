<script lang="ts" module>
	export type ChartDay = { date: string; rating: number };
	export type ChartSeries = { id: string; name: string; color: string; days: ChartDay[] };
</script>

<script lang="ts">
	let {
		series,
		selected = $bindable(null),
		label
	}: {
		series: ChartSeries[];
		/** The tapped day (YYYY-MM-DD); the parent shows its summary. */
		selected?: string | null;
		label: string;
	} = $props();

	const START = 1000;
	const H = 210;
	const M = { top: 14, right: 14, bottom: 40, left: 52 };
	let width = $state(320);

	const DAY = 86400000;
	const toNum = (d: string) => Date.parse(d + 'T00:00:00Z') / DAY;
	const fromNum = (n: number) => new Date(n * DAY).toISOString().slice(0, 10);

	const drawn = $derived(series.filter((s) => s.days.length));
	// Every line starts at 1000 the day before that player's first match.
	const lines = $derived(
		drawn.map((s) => ({
			...s,
			pts: [
				{ x: toNum(s.days[0].date) - 1, y: START, date: null as string | null },
				...s.days.map((d) => ({ x: toNum(d.date), y: d.rating, date: d.date as string | null }))
			]
		}))
	);
	const dates = $derived([...new Set(drawn.flatMap((s) => s.days.map((d) => d.date)))].sort());

	const x0 = $derived(Math.min(...lines.map((l) => l.pts[0].x)));
	const x1 = $derived(Math.max(...lines.map((l) => l.pts.at(-1)!.x)));

	const yScale = $derived.by(() => {
		const ys = lines.flatMap((l) => l.pts.map((p) => p.y));
		let lo = Math.min(...ys);
		let hi = Math.max(...ys);
		// Keep at least a 40-point window so a few points of movement don't look dramatic.
		if (hi - lo < 40) {
			const mid = (hi + lo) / 2;
			lo = mid - 20;
			hi = mid + 20;
		}
		const raw = (hi - lo) / 4;
		const step = [5, 10, 20, 25, 50, 100, 200, 250, 500].find((s) => s >= raw) ?? 1000;
		lo = Math.floor(lo / step) * step;
		hi = Math.ceil(hi / step) * step;
		const ticks: number[] = [];
		for (let v = lo; v <= hi; v += step) ticks.push(v);
		return { lo, hi, ticks };
	});

	const plotW = $derived(Math.max(width - M.left - M.right, 60));
	const plotH = H - M.top - M.bottom;
	const sx = (x: number) => M.left + ((x - x0) / (x1 - x0)) * plotW;
	const sy = (y: number) => M.top + (1 - (y - yScale.lo) / (yScale.hi - yScale.lo)) * plotH;

	const yearOf = (n: number) => fromNum(n).slice(0, 4);
	const xTicks = $derived.by(() => {
		const span = x1 - x0;
		const max = Math.max(2, Math.floor(plotW / 56) + 1);
		const step = [1, 2, 3, 7, 14, 30, 61, 91, 182, 365].find((s) => span / s <= max) ?? 730;
		const ticks: number[] = [];
		for (let t = x1; t >= x0; t -= step) ticks.unshift(t);
		return ticks;
	});
	const multiYear = $derived(yearOf(x0) !== yearOf(x1));
	const fmtTick = (n: number) =>
		new Date(n * DAY).toLocaleDateString(undefined, {
			timeZone: 'UTC',
			month: 'short',
			...(multiYear && step() >= 30 ? { year: '2-digit' } : { day: 'numeric' })
		});
	const step = () => (xTicks.length > 1 ? xTicks[1] - xTicks[0] : 1);

	const path = (pts: { x: number; y: number }[]) =>
		pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join('');

	const dense = $derived(dates.length > 40);
	const sel = $derived(selected && dates.includes(selected) ? selected : null);

	let svg: SVGSVGElement;
	function pick(e: PointerEvent) {
		if (!dates.length) return;
		const r = svg.getBoundingClientRect();
		const px = ((e.clientX - r.left) / r.width) * width;
		let best = dates[0];
		for (const d of dates) {
			if (Math.abs(sx(toNum(d)) - px) < Math.abs(sx(toNum(best)) - px)) best = d;
		}
		selected = best;
	}
	function key(e: KeyboardEvent) {
		const i = sel ? dates.indexOf(sel) : dates.length;
		let j = i;
		if (e.key === 'ArrowLeft') j = Math.max(0, i - 1);
		else if (e.key === 'ArrowRight') j = Math.min(dates.length - 1, i + 1);
		else if (e.key === 'Home') j = 0;
		else if (e.key === 'End') j = dates.length - 1;
		else return;
		e.preventDefault();
		selected = dates[j];
	}
</script>

<div class="chart" bind:clientWidth={width}>
	<svg
		bind:this={svg}
		viewBox="0 0 {width} {H}"
		{width}
		height={H}
		role="slider"
		tabindex="0"
		aria-label="{label}. Use the arrow keys to step through days."
		aria-valuemin={0}
		aria-valuemax={Math.max(dates.length - 1, 0)}
		aria-valuenow={sel ? dates.indexOf(sel) : dates.length - 1}
		aria-valuetext={sel ?? dates.at(-1)}
		onpointerdown={pick}
		onpointermove={(e) => (e.pointerType === 'mouse' || e.buttons) && pick(e)}
		onkeydown={key}
	>
		<!-- Grid and y axis -->
		{#each yScale.ticks as t (t)}
			<line class="grid" x1={M.left} x2={M.left + plotW} y1={sy(t)} y2={sy(t)} />
			<text class="tick" x={M.left - 6} y={sy(t)} dy="0.32em" text-anchor="end">{t}</text>
		{/each}
		{#if START > yScale.lo && START < yScale.hi}
			<line class="base" x1={M.left} x2={M.left + plotW} y1={sy(START)} y2={sy(START)} />
		{/if}
		<text
			class="title"
			x={4}
			y={M.top + plotH / 2}
			transform="rotate(-90 4 {M.top + plotH / 2})"
			dy="0.8em"
			text-anchor="middle">Rating</text
		>

		<!-- x axis -->
		<line class="axis" x1={M.left} x2={M.left + plotW} y1={M.top + plotH} y2={M.top + plotH} />
		{#each xTicks as t, i (t)}
			<line class="axis" x1={sx(t)} x2={sx(t)} y1={M.top + plotH} y2={M.top + plotH + 4} />
			<text
				class="tick"
				x={sx(t)}
				y={M.top + plotH + 16}
				text-anchor={xTicks.length > 1 && i === xTicks.length - 1 ? 'end' : 'middle'}
				>{fmtTick(t)}</text
			>
		{/each}
		<text class="title" x={M.left + plotW / 2} y={H - 4} text-anchor="middle">Date</text>

		<!-- Crosshair -->
		{#if sel}
			<line class="cross" x1={sx(toNum(sel))} x2={sx(toNum(sel))} y1={M.top} y2={M.top + plotH} />
		{/if}

		<!-- Lines -->
		{#each lines as l (l.id)}
			<path d={path(l.pts)} fill="none" stroke={l.color} stroke-width="2" stroke-linejoin="round" />
			{#each l.pts as p, i (i)}
				{#if p.date === sel && sel}
					<circle class="ring" cx={sx(p.x)} cy={sy(p.y)} r="5.5" fill={l.color} />
				{:else if !dense || i === l.pts.length - 1}
					<circle class="ring" cx={sx(p.x)} cy={sy(p.y)} r={p.date ? 4 : 3} fill={l.color} />
				{/if}
			{/each}
		{/each}
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		touch-action: pan-y;
		user-select: none;
		-webkit-user-select: none;
	}
	svg {
		display: block;
		overflow: visible;
		cursor: crosshair;
		-webkit-tap-highlight-color: transparent;
	}
	svg:focus-visible {
		outline: 2px solid var(--indigo);
		outline-offset: 4px;
		border-radius: 0.25rem;
	}
	.grid {
		stroke: var(--rule);
		stroke-width: 1;
	}
	.base {
		stroke: var(--ink-soft);
		stroke-width: 1;
		stroke-dasharray: 3 3;
		opacity: 0.6;
	}
	.axis {
		stroke: var(--ink-soft);
		stroke-width: 1;
		opacity: 0.6;
	}
	.cross {
		stroke: var(--ink);
		stroke-width: 1;
		opacity: 0.45;
	}
	.ring {
		stroke: var(--card);
		stroke-width: 2;
	}
	.tick {
		font-family: var(--font-label);
		font-size: 11px;
		fill: var(--ink-soft);
	}
	.title {
		font-family: var(--font-label);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		fill: var(--ink-soft);
	}
</style>
