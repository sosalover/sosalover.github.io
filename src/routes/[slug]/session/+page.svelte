<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let { data, form } = $props();
	const f = $derived(form as { error?: string; ok?: string } | null);

	let today = $state('');
	let date = $state('');
	let selected = $state<string[]>([]);
	let counts = $state<Record<string, number>>({}); // key `${winnerId}:${loserId}`
	let removing = $state(false);
	let busy = $state(false);

	onMount(() => {
		const d = new Date();
		const pad = (n: number) => String(n).padStart(2, '0');
		today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
	});

	// Keep the leaderboard order so the grid reads like the ladder.
	const players = $derived(data.standings.filter((p) => selected.includes(p.id)));
	const total = $derived(Object.values(counts).reduce((a, b) => a + b, 0));
	const tally = $derived(
		players.map((p) => {
			let wins = 0;
			let losses = 0;
			for (const [key, n] of Object.entries(counts)) {
				const [w, l] = key.split(':');
				if (w === p.id) wins += n;
				if (l === p.id) losses += n;
			}
			return { ...p, wins, losses };
		})
	);

	function toggle(id: string) {
		selected = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
		// Drop cells for players no longer in the session.
		counts = Object.fromEntries(
			Object.entries(counts).filter(([k]) => k.split(':').every((x) => selected.includes(x)))
		);
	}

	function tap(w: string, l: string) {
		const key = `${w}:${l}`;
		const n = Math.max(0, Math.min(30, (counts[key] ?? 0) + (removing ? -1 : 1)));
		counts = { ...counts, [key]: n };
	}

	const short = (name: string) => (name.length > 7 ? name.slice(0, 6) + '…' : name);
</script>

<svelte:head>
	<title>Enter a session · Squash ladder</title>
</svelte:head>

<a href={data.base} class="small muted back">&larr; Ladder</a>
<h1 class="mt-3">Enter a session</h1>
<p class="muted mt-1">
	Copy the whiteboard: how many times each row player beat each column player.
</p>

{#if !data.unlocked}
	<p class="card msg error mt-6">Unlock the ladder on its main page first.</p>
{:else}
	{#if data.lastSession}
		<form method="POST" action="?/undo" class="card last-session mt-6" use:enhance>
			<span class="small">
				Last session: {data.lastSession.count} match{data.lastSession.count === 1 ? '' : 'es'} on
				{data.lastSession.date}
			</span>
			<input type="hidden" name="session" value={data.lastSession.id} />
			<button class="underline font-label">Undo</button>
		</form>
	{/if}

	<h2 id="who">Who played</h2>
	{#if data.standings.length < 2}
		<p class="muted">Add at least two players on the ladder page first.</p>
	{:else}
		<div class="chips" role="group" aria-labelledby="who">
			{#each data.standings as p (p.id)}
				<button
					type="button"
					class="chip"
					aria-pressed={selected.includes(p.id)}
					onclick={() => toggle(p.id)}>{p.name}</button
				>
			{/each}
		</div>
	{/if}

	{#if players.length >= 2}
		<h2 id="grid">Results</h2>
		<div class="mode" role="group" aria-label="What tapping a cell does">
			<button type="button" aria-pressed={!removing} onclick={() => (removing = false)}
				>Tap adds +1</button
			>
			<button type="button" aria-pressed={removing} onclick={() => (removing = true)}
				>Tap removes −1</button
			>
		</div>

		<div class="grid-wrap card">
			<table aria-labelledby="grid">
				<thead>
					<tr>
						<th scope="col" class="corner small muted">beat →</th>
						{#each players as l (l.id)}
							<th scope="col" class="col small">{short(l.name)}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each players as w (w.id)}
						<tr>
							<th scope="row" class="row">{short(w.name)}</th>
							{#each players as l (l.id)}
								<td>
									{#if w.id === l.id}
										<span class="self" aria-hidden="true"></span>
									{:else}
										{@const n = counts[`${w.id}:${l.id}`] ?? 0}
										<button
											type="button"
											class="cell"
											class:filled={n > 0}
											aria-label="{w.name} beat {l.name}: {n}. Tap to {removing
												? 'remove'
												: 'add'} one."
											onclick={() => tap(w.id, l.id)}>{n || ''}</button
										>
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<ul class="tally small muted" aria-label="Session totals">
			{#each tally as p (p.id)}
				<li><strong class="text-[var(--ink)]">{p.name}</strong> {p.wins}–{p.losses}</li>
			{/each}
		</ul>

		<form
			method="POST"
			action="?/save"
			class="card flex flex-col gap-3 mt-4"
			use:enhance={() => {
				busy = true;
				return async ({ result, update }) => {
					await update({ reset: false });
					if (result.type === 'success') counts = {};
					busy = false;
				};
			}}
		>
			<div>
				<label for="date">Date played <span class="small">(blank = today)</span></label>
				<input id="date" name="date" type="date" bind:value={date} max={today || undefined} />
			</div>
			<input type="hidden" name="today" value={today} />
			{#each Object.entries(counts) as [key, n] (key)}
				{#if n > 0}<input type="hidden" name="beat:{key}" value={n} />{/if}
			{/each}
			<button class="primary" disabled={busy || total === 0}>
				{busy ? 'Saving…' : `Log ${total} match${total === 1 ? '' : 'es'}`}
			</button>
			<p class="small muted">
				Matches on the same day are scored together, so the order they were played doesn’t matter.
			</p>
		</form>
	{/if}

	{#if f?.error || f?.ok}
		<p class="card msg mt-4 {f.error ? 'error' : 'ok'}" role="status">
			{f.error ?? f.ok}
			{#if f.ok}<a href={data.base} class="underline">See the ladder</a>{/if}
		</p>
	{/if}
{/if}

<style>
	.last-session {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.last-session button {
		min-height: 2.75rem;
		padding: 0 0.5rem;
		font-weight: 700;
		color: var(--sun-red);
		cursor: pointer;
	}
	.back {
		display: inline-block;
		padding: 0.5rem 0;
		text-decoration: none;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.chip {
		min-height: 2.75rem;
		padding: 0 1rem;
		border: 1px solid var(--rule);
		border-radius: 999px;
		background: #fff;
		font-size: 1rem;
		cursor: pointer;
	}
	.chip[aria-pressed='true'] {
		background: var(--ink);
		border-color: var(--ink);
		color: #fff;
	}
	.mode {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border: 1px solid var(--rule);
		border-radius: 0.5rem;
		overflow: hidden;
		margin-bottom: 0.75rem;
	}
	.mode button {
		min-height: 2.75rem;
		font-family: var(--font-label);
		background: #fff;
		cursor: pointer;
	}
	.mode button[aria-pressed='true'] {
		background: var(--ink);
		color: #fff;
	}
	.grid-wrap {
		padding: 0.5rem;
		overflow-x: auto;
	}
	table {
		border-collapse: separate;
		border-spacing: 0.25rem;
		margin: 0 auto;
	}
	th {
		font-family: var(--font-label);
		font-weight: 700;
		white-space: nowrap;
	}
	.col {
		text-align: center;
		padding-bottom: 0.25rem;
	}
	.row {
		text-align: left;
		padding-right: 0.25rem;
	}
	.corner {
		font-weight: 400;
		text-align: left;
	}
	.cell,
	.self {
		display: block;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 0.4rem;
	}
	.cell {
		border: 1px solid var(--rule);
		background: var(--paper);
		font-family: var(--font-label);
		font-size: 1.15rem;
		font-weight: 700;
		cursor: pointer;
		touch-action: manipulation;
	}
	.cell.filled {
		background: #e3efe2;
		border-color: #2f6b3a;
		color: #2f6b3a;
	}
	.self {
		background: repeating-linear-gradient(
			135deg,
			var(--paper-alt),
			var(--paper-alt) 4px,
			transparent 4px,
			transparent 8px
		);
	}
	.tally {
		list-style: none;
		padding: 0;
		margin: 0.75rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
	}
</style>
