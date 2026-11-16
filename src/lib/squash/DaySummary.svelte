<script lang="ts">
	type Day = {
		date: string;
		rating: number;
		wins: number;
		losses: number;
		net: number;
		opponents: { id: string; won: boolean; delta: number }[];
	};
	let {
		day,
		nameOf,
		player
	}: {
		day: Day;
		nameOf: (id: string) => string;
		/** On the combined chart: whose day this is, linking to their page. */
		player?: { name: string; href: string };
	} = $props();

	// The day's matches rolled up per opponent: "Arman 5–0 +80".
	const opponents = $derived.by(() => {
		const rows = new Map<string, { id: string; wins: number; losses: number; net: number }>();
		for (const o of day.opponents) {
			const r = rows.get(o.id) ?? { id: o.id, wins: 0, losses: 0, net: 0 };
			if (o.won) r.wins++;
			else r.losses++;
			r.net += o.delta;
			rows.set(o.id, r);
		}
		return [...rows.values()].sort((a, b) => b.wins + b.losses - (a.wins + a.losses));
	});

	const fmtDate = (d: string) =>
		new Date(d + 'T12:00:00').toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<div class="summary" aria-live="polite">
	{#if player}
		<p class="who">
			<strong class="font-label">{player.name}</strong>
			<a href={player.href} class="small underline muted">Player page →</a>
		</p>
	{/if}
	<p class="sum-head">
		<span class="font-label">{fmtDate(day.date)}</span>
		<span>
			<span class="font-label"
				><span class="up">{day.wins}</span>–<span class="down">{day.losses}</span></span
			>
			<span class="muted">·</span>
			<span class="font-label {day.net >= 0 ? 'up' : 'down'}"
				>{day.net >= 0 ? '+' : '−'}{Math.abs(day.net)}</span
			>
			<span class="muted">→ <strong class="rating-now">{day.rating}</strong></span>
		</span>
	</p>
	<ul class="opps small">
		{#each opponents as o (o.id)}
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

<style>
	.summary {
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--rule);
	}
	.who {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin: 0 0 0.2rem;
	}
	.who strong {
		font-size: 1.1rem;
	}
	.who a {
		padding: 0.4rem 0;
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
</style>
