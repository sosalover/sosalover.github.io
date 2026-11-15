<script lang="ts">
	let { data } = $props();

	const nameOf = (id: string) => data.standings.find((p) => p.id === id)?.name ?? '?';
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

<h2 id="history">Match history</h2>
{#if data.history.length === 0}
	<p class="muted">No matches yet.</p>
{:else}
	<ul class="card match-list" aria-labelledby="history">
		{#each data.history as m (m.id)}
			{@const won = m.winnerId === data.player.id}
			{@const before = won ? m.winnerBefore : m.loserBefore}
			<li>
				<span>
					<strong class={won ? 'up' : 'down'}>{won ? 'Won' : 'Lost'}</strong>
					vs
					<a href="{data.base}/player/{won ? m.loserId : m.winnerId}" class="underline">
						{nameOf(won ? m.loserId : m.winnerId)}
					</a>
					{#if m.score}<span class="muted"> · {m.score}</span>{/if}
					<br /><span class="small muted">{fmtDate(m.date)}</span>
				</span>
				<span class="shrink-0 text-right">
					<span class="font-label {won ? 'up' : 'down'}">{won ? '+' : '−'}{m.delta}</span>
					<br /><span class="small muted"
						>{before} → {won ? before + m.delta : before - m.delta}</span
					>
				</span>
			</li>
		{/each}
	</ul>
{/if}

<style>
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
