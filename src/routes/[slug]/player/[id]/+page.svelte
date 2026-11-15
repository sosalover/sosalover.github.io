<script lang="ts">
	let { data } = $props();

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
						<span class="font-label shrink-0 {won ? 'up' : 'down'}">{won ? '+' : '−'}{m.delta}</span
						>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
{/if}

<style>
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
		background: #2f6b3a;
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
