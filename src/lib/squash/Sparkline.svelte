<script lang="ts">
	// A leaderboard-row glyph: rating at the end of each day played, on a time axis
	// shared by every row (from–to), starting at 1000 the day before the first match.
	let { days, from, to }: { days: { date: string; rating: number }[]; from: string; to: string } =
		$props();

	const W = 72;
	const H = 24;
	const PAD = 3;
	const DAY = 86400000;
	const toNum = (d: string) => Date.parse(d + 'T00:00:00Z') / DAY;

	const pts = $derived([
		{ x: toNum(days[0].date) - 1, y: 1000 },
		...days.map((d) => ({ x: toNum(d.date), y: d.rating }))
	]);
	const geo = $derived.by(() => {
		const x0 = toNum(from) - 1;
		const x1 = Math.max(toNum(to), x0 + 1);
		const ys = pts.map((p) => p.y);
		// At least a 40-point window, so small moves stay small.
		const mid = (Math.min(...ys) + Math.max(...ys)) / 2;
		const lo = Math.min(Math.min(...ys), mid - 20);
		const hi = Math.max(Math.max(...ys), mid + 20);
		const sx = (x: number) => PAD + ((x - x0) / (x1 - x0)) * (W - 2 * PAD);
		const sy = (y: number) => PAD + (1 - (y - lo) / (hi - lo)) * (H - 2 * PAD);
		return {
			d: pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(''),
			end: { x: sx(pts.at(-1)!.x), y: sy(pts.at(-1)!.y) },
			base: sy(1000)
		};
	});
</script>

<svg viewBox="0 0 {W} {H}" width={W} height={H} aria-hidden="true">
	<line class="base" x1={PAD} x2={W - PAD} y1={geo.base} y2={geo.base} />
	<path d={geo.d} fill="none" stroke="var(--line)" stroke-width="1.5" stroke-linejoin="round" />
	<circle cx={geo.end.x} cy={geo.end.y} r="2.5" fill="var(--line)" />
</svg>

<style>
	svg {
		display: block;
		overflow: visible;
	}
	.base {
		stroke: var(--ink-soft);
		stroke-width: 1;
		stroke-dasharray: 2 2;
		opacity: 0.45;
	}
</style>
