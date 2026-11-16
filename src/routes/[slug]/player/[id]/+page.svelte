<script lang="ts">
	import RatingChart from '$lib/squash/RatingChart.svelte';
	import { seriesColor } from '$lib/squash/colors';

	let { data } = $props();

	const chartDays = $derived(data.ratingDays[data.player.id] ?? []);
	let picked = $state<string | null>(null);
	const shownDay = $derived(chartDays.find((d) => d.date === picked) ?? chartDays.at(-1));
	// The day's matches rolled up per opponent: "Arman 5–0 +80".
	const dayOpponents = $derived.by(() => {
		const rows = new Map<string, { id: string; wins: number; losses: number; net: number }>();
		for (const o of shownDay?.opponents ?? []) {
			const r = rows.get(o.id) ?? { id: o.id, wins: 0, losses: 0, net: 0 };
			if (o.won) r.wins++;
			else r.losses++;
			r.net += o.delta;
			rows.set(o.id, r);
		}
		return [...rows.values()].sort((a, b) => b.wins + b.losses - (a.wins + a.losses));
	});

	const nameOf = (id: string) => data.standings.find((p) => p.id === id)?.name ?? '?';
	// Same-day matches are scored together, so show each day's net change as one step.
	const days = $derived.by(() => {
		const out: {
			date: string;
			before: number;
			after: number;
			matches: typeof data.history;
		}[] = [];
		for (const m of data.history) {
			const won = m.winnerId === data.player.id;
			let day = out.at(-1);
			if (day?.date !== m.date) {
				day = {
					date: m.date,
					before: won ? m.winnerBefore : m.loserBefore,
					after: won ? m.winnerAfter : m.loserAfter,
					matches: []
				};
				out.push(day);
			}
			day.matches.push(m);
		}
		return out;
	});

	const fmtDate = (d: string) =>
		new Date(d + 'T12:00:00').toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>{data.player.name} · Squash ladder</title>
</svelte:head>

<a href={data.base} class="small muted back">&larr; Ladder</a>
<h1 class="mt-3">{data.player.name}</h1>

<dl class="card stats mt-5">
	<div>
		<dt>Rating</dt>
		<dd>{data.player.rating}</dd>
	</div>
	<div>
		<dt>Rank</dt>
		<dd>#{data.rank}</dd>
	</div>
	<div>
		<dt>Won–lost</dt>
		<dd>{data.player.wins}–{data.player.losses}</dd>
	</div>
</dl>

<h2 id="chart">Rating over time</h2>
<div class="card" aria-labelledby="chart">
	{#if chartDays.length === 0}
		<p class="muted">No matches yet. The chart starts after the first one.</p>
	{:else}
		<RatingChart
			series={[
				{
					id: data.player.id,
					name: data.player.name,
					color: seriesColor(data.player.slot),
					days: chartDays
				}
			]}
			bind:selected={picked}
			label="{data.player.name}'s rating at the end of each day played"
		/>
		{#if shownDay}
			<div class="summary" aria-live="polite">
				<p class="sum-head">
					<span class="font-label">{fmtDate(shownDay.date)}</span>
					<span>
						<span class="font-label"
							><span class="up">{shownDay.wins}</span>–<span class="down">{shownDay.losses}</span
							></span
						>
						<span class="muted">·</span>
						<span class="font-label {shownDay.net >= 0 ? 'up' : 'down'}"
							>{shownDay.net >= 0 ? '+' : '−'}{Math.abs(shownDay.net)}</span
						>
						<span class="muted">→ <strong class="rating-now">{shownDay.rating}</strong></span>
					</span>
				</p>
				<ul class="opps small">
					{#each dayOpponents as o (o.id)}
						<li>
							{nameOf(o.id)}
							<span class="font-label"
								><span class="up">{o.wins}</span>–<span class="down">{o.losses}</span></span
							>
							<span class="muted">{o.net >= 0 ? '+' : '−'}{Math.abs(o.net)}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/if}
</div>

{#if data.headToHead.length}
	<h2 id="h2h">Head to head</h2>
	<ul class="card h2h" aria-labelledby="h2h">
		{#each data.headToHead as o (o.id)}
			{@const total = o.wins + o.losses}
			<li>
				<a href="{data.base}/player/{o.id}" class="opp underline">{o.name}</a>
				<span class="bar" aria-hidden="true">
					<span class="bar-win" style="width: {(o.wins / total) * 100}%"></span>
				</span>
				<span class="font-label rec" aria-label="{o.wins} wins, {o.losses} losses">
					<span class="up">{o.wins}</span>–<span class="down">{o.losses}</span>
				</span>
			</li>
		{/each}
	</ul>
{/if}

<h2 id="history">Match history</h2>
{#if data.history.length === 0}
	<p class="muted">No matches yet.</p>
{:else}
	{#each days as day (day.date)}
		<section class="day" aria-label={fmtDate(day.date)}>
			<div class="day-head small">
				<span class="font-label">{fmtDate(day.date)}</span>
				<span class="muted">
					{day.before} → {day.after}
					<span class={day.after >= day.before ? 'up' : 'down'}
						>({day.after >= day.before ? '+' : '−'}{Math.abs(day.after - day.before)})</span
					>
				</span>
			</div>
			<ul class="card match-list">
				{#each day.matches as m (m.id)}
					{@const won = m.winnerId === data.player.id}
					<li>
						<span>
							<strong class={won ? 'up' : 'down'}>{won ? 'Won' : 'Lost'}</strong>
							vs
							<a href="{data.base}/player/{won ? m.loserId : m.winnerId}" class="underline">
								{nameOf(won ? m.loserId : m.winnerId)}
							</a>
							{#if m.score}<span class="muted"> · {m.score}</span>{/if}
						</span>
						<span class="shrink-0 text-right">
							<span class="font-label {won ? 'up' : 'down'}">{won ? '+' : '−'}{m.delta}</span>
							{#if data.unlocked}
								<br /><a
									href="{data.base}/match/{m.id}"
									class="small underline muted"
									aria-label="Edit match vs {nameOf(won ? m.loserId : m.winnerId)}">Edit</a
								>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
{/if}

<style>
	.summary {
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--rule);
	}
	.sum-head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.25rem 1rem;
		margin: 0;
	}
	.rating-now {
		color: var(--ink);
		font-family: var(--font-label);
	}
	.opps {
		list-style: none;
		margin: 0.4rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem 1rem;
	}
	.opps li {
		white-space: nowrap;
	}
	.h2h {
		list-style: none;
		margin: 0;
		padding: 0.25rem 1rem;
	}
	.h2h li {
		display: grid;
		grid-template-columns: minmax(0, 7rem) 1fr auto;
		align-items: center;
		gap: 0.75rem;
		min-height: 2.75rem;
	}
	.h2h li + li {
		border-top: 1px solid var(--rule);
	}
	.opp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.bar {
		height: 0.4rem;
		border-radius: 999px;
		background: var(--sun-red);
		opacity: 0.85;
		overflow: hidden;
	}
	.bar-win {
		display: block;
		height: 100%;
		background: var(--up);
	}
	.rec {
		font-weight: 700;
		min-width: 2.5rem;
		text-align: right;
	}
	.day + .day {
		margin-top: 1rem;
	}
	.day-head {
		display: flex;
		justify-content: space-between;
		padding: 0 0.25rem 0.4rem;
	}
	.back {
		display: inline-block;
		padding: 0.5rem 0;
		text-decoration: none;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		text-align: center;
	}
	dt {
		font-family: var(--font-label);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}
	dd {
		font-family: var(--font-label);
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0.25rem 0 0;
	}
</style>
