<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import RatingChart from '$lib/squash/RatingChart.svelte';
	import DaySummary from '$lib/squash/DaySummary.svelte';

	let { data, form } = $props();
	// Every action returns this shape; the generated union is too narrow to narrow on `form`.
	const f = $derived(form as { form?: string; error?: string; ok?: string; name?: string } | null);

	let today = $state('');
	let busy = $state<string | null>(null);
	let winner = $state('');
	let loser = $state('');

	onMount(() => {
		const d = new Date();
		const pad = (n: number) => String(n).padStart(2, '0');
		today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
	});

	const nameOf = (id: string) => data.standings.find((p) => p.id === id)?.name ?? '?';

	function submit(name: string, resetOnSuccess = true): SubmitFunction {
		return () => {
			busy = name;
			return async ({ result, update }) => {
				await update({ reset: resetOnSuccess });
				if (result.type === 'success' && name === 'match') winner = loser = '';
				busy = null;
			};
		};
	}

	// Combined chart: every player who has played, one grey line each, no legend.
	// Tapping a line or a leaderboard row highlights that player and shows their day.
	const charted = $derived(
		data.standings
			.filter((p) => data.ratingDays[p.id]?.length)
			.map((p) => ({ id: p.id, name: p.name, color: 'var(--line)', days: data.ratingDays[p.id] }))
	);
	let focus = $state<string | null>(null);
	let picked = $state<string | null>(null);
	const focusedPlayer = $derived(data.standings.find((p) => p.id === focus));
	const focusDays = $derived(focus ? (data.ratingDays[focus] ?? []) : []);
	const shownDay = $derived(focusDays.find((d) => d.date === picked) ?? focusDays.at(-1));
	let chartCard = $state<HTMLElement>();

	function highlight(id: string) {
		if (focus === id) {
			focus = picked = null;
			return;
		}
		focus = id;
		picked = data.ratingDays[id]?.at(-1)?.date ?? null;
		// Bring the chart into view if it's off screen, so the tap visibly does something.
		const r = chartCard?.getBoundingClientRect();
		if (r && (r.top < 64 || r.bottom > innerHeight)) {
			chartCard!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}

	const fmtDate = (d: string) =>
		new Date(d + 'T12:00:00').toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
			year: d.slice(0, 4) === String(new Date().getFullYear()) ? undefined : 'numeric'
		});
</script>

<svelte:head>
	<title>Squash ladder</title>
</svelte:head>

<h1>Squash ladder</h1>
<p class="muted mt-1">Elo ratings · everyone starts at 1000</p>

{#if data.deleted}
	<form method="POST" action="?/restore" class="card notice mt-6" role="status" use:enhance>
		<span>Deleted: {data.deleted.label}.</span>
		<input type="hidden" name="target" value={data.deleted.target} />
		<button class="underline font-label">Undo</button>
	</form>
{:else if data.restored}
	<p class="card notice mt-6" role="status">
		Restored {data.restored} match{data.restored === 1 ? '' : 'es'}.
	</p>
{:else if data.saved}
	<p class="card notice mt-6" role="status">Match updated. Ratings recalculated.</p>
{/if}

{#if !data.configured}
	<p class="card msg error mt-6">
		The ladder’s storage isn’t connected yet. Add an Upstash Redis store to this Vercel project.
	</p>
{/if}

<h2 id="leaderboard">Leaderboard</h2>
{#if data.standings.length === 0}
	<p class="muted">No players yet.</p>
{:else}
	<ol class="card board" aria-labelledby="leaderboard">
		{#each data.standings as p, i (p.id)}
			<li>
				<button
					type="button"
					aria-pressed={focus === p.id}
					class:on={focus === p.id}
					onclick={() => highlight(p.id)}
				>
					<span class="rank font-label" aria-label="Rank {i + 1}">{i + 1}</span>
					<span class="name">{p.name}</span>
					<span class="record small muted">{p.wins}–{p.losses}</span>
					<span class="rating font-label">{p.rating}</span>
				</button>
			</li>
		{/each}
	</ol>
{/if}

{#if charted.length}
	<h2 id="over-time">Ratings over time</h2>
	<div class="card" aria-labelledby="over-time" bind:this={chartCard}>
		<RatingChart
			series={charted}
			bind:focus
			bind:selected={picked}
			label="Everyone's rating at the end of each day they played"
		/>
		{#if focusedPlayer && shownDay}
			<DaySummary
				day={shownDay}
				{nameOf}
				player={{ name: focusedPlayer.name, href: `${data.base}/player/${focusedPlayer.id}` }}
			/>
		{:else if focusedPlayer}
			<p class="hint small muted">
				{focusedPlayer.name} hasn’t played yet ·
				<a href="{data.base}/player/{focusedPlayer.id}" class="underline">Player page →</a>
			</p>
		{:else}
			<p class="hint small muted">Tap a line, or a player above, to see their days.</p>
		{/if}
	</div>
{/if}

{#if data.unlocked}
	<a href="{data.base}/session" class="session-link card mt-6">
		<span>
			<strong>Enter a session</strong><br />
			<span class="small muted">Copy a whiteboard of who beat who, all at once</span>
		</span>
		<span aria-hidden="true">→</span>
	</a>

	<h2 id="log">Log a match</h2>
	<form
		method="POST"
		action="?/logMatch"
		class="card grid gap-3"
		aria-labelledby="log"
		use:enhance={submit('match')}
	>
		{#if data.standings.length < 2}
			<p class="muted">Add at least two players to log a match.</p>
		{:else}
			<div class="grid grid-cols-2 gap-3">
				<div>
					<label for="winner">Winner</label>
					<select id="winner" name="winner" required bind:value={winner}>
						<option value="" disabled>Choose…</option>
						{#each data.standings as p (p.id)}
							<option value={p.id} disabled={p.id === loser}>{p.name}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="loser">Loser</label>
					<select id="loser" name="loser" required bind:value={loser}>
						<option value="" disabled>Choose…</option>
						{#each data.standings as p (p.id)}
							<option value={p.id} disabled={p.id === winner}>{p.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-3">
				<div>
					<label for="score">Score <span class="small">(optional)</span></label>
					<input id="score" name="score" maxlength="40" placeholder="3–1" autocomplete="off" />
				</div>
				<div>
					<label for="date">Date <span class="small">(blank = today)</span></label>
					<input id="date" name="date" type="date" max={today || undefined} />
				</div>
			</div>
			<input type="hidden" name="today" value={today} />
			<button class="primary" disabled={busy === 'match'}>
				{busy === 'match' ? 'Saving…' : 'Log match'}
			</button>
		{/if}
		{#if f?.form === 'match'}
			<p class="msg {f.error ? 'error' : 'ok'}" role="status">{f.error ?? f.ok}</p>
		{/if}
	</form>

	<h2 id="add">Add a player</h2>
	<form
		method="POST"
		action="?/addPlayer"
		class="card flex flex-col gap-3"
		aria-labelledby="add"
		use:enhance={submit('player')}
	>
		<div>
			<label for="name">Name</label>
			<input
				id="name"
				name="name"
				required
				maxlength="40"
				autocomplete="off"
				autocapitalize="words"
				value={f?.form === 'player' && f.error ? (f.name ?? '') : ''}
			/>
		</div>
		<button class="primary" disabled={busy === 'player'}>
			{busy === 'player' ? 'Adding…' : 'Add player'}
		</button>
		{#if f?.form === 'player'}
			<p class="msg {f.error ? 'error' : 'ok'}" role="status">{f.error ?? f.ok}</p>
		{/if}
	</form>
{:else if data.configured}
	<h2 id="unlock">Log matches</h2>
	<form
		method="POST"
		action="?/unlock"
		class="card flex flex-col gap-3"
		aria-labelledby="unlock"
		use:enhance={submit('unlock')}
	>
		{#if data.passcodeRequired}
			<div>
				<label for="passcode">Passcode</label>
				<input
					id="passcode"
					name="passcode"
					type="password"
					required
					autocomplete="current-password"
				/>
			</div>
			<button class="primary" disabled={busy === 'unlock'}>
				{busy === 'unlock' ? 'Checking…' : 'Unlock'}
			</button>
			<p class="small muted">Needed once per device to add players and log matches.</p>
			{#if f?.form === 'unlock' && f.error}
				<p class="msg error" role="alert">{f.error}</p>
			{/if}
		{:else}
			<p class="muted">Logging is turned off until a passcode is set (SQUASH_PASSCODE).</p>
		{/if}
	</form>
{/if}

<h2 id="recent">Recent matches</h2>
{#if data.matches.length === 0}
	<p class="muted">No matches yet.</p>
{:else}
	<ul class="card match-list" aria-labelledby="recent">
		{#each data.matches.slice(0, 20) as m (m.id)}
			<li>
				<span>
					<strong>{nameOf(m.winnerId)}</strong> beat {nameOf(m.loserId)}
					{#if m.score}<span class="muted"> · {m.score}</span>{/if}
				</span>
				<span class="small muted shrink-0 text-right">
					{fmtDate(m.date)}<br /><span class="up">+{m.delta}</span> /
					<span class="down">−{m.delta}</span>
					{#if data.unlocked}
						<br /><a
							href="{data.base}/match/{m.id}"
							class="edit underline"
							aria-label="Edit {nameOf(m.winnerId)} beat {nameOf(m.loserId)}, {fmtDate(m.date)}"
							>Edit</a
						>
					{/if}
				</span>
			</li>
		{/each}
	</ul>
{/if}

{#if data.unlocked && data.passcodeRequired}
	<form method="POST" action="?/lock" class="mt-8 text-center" use:enhance>
		<button class="small muted underline">Lock this device</button>
	</form>
{/if}

<style>
	.board {
		list-style: none;
		padding: 0.25rem 0;
		margin: 0;
	}
	.board li + li {
		border-top: 1px solid var(--rule);
	}
	.board button {
		width: 100%;
		text-align: left;
		cursor: pointer;
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr) auto 3.5rem;
		align-items: center;
		gap: 0.5rem;
		min-height: 3.25rem;
		padding: 0.5rem 1rem;
		color: inherit;
		text-decoration: none;
	}
	@media (hover: hover) {
		.board button:hover .name {
			text-decoration: underline;
		}
	}
	.board button.on {
		background: color-mix(in srgb, var(--line) 10%, transparent);
		box-shadow: inset 3px 0 0 var(--line);
	}
	.hint {
		margin: 0.75rem 0 0;
		padding-top: 0.75rem;
		border-top: 1px solid var(--rule);
	}
	.rank {
		color: var(--ink-soft);
		font-weight: 700;
	}
	.board li:first-child .rank {
		color: var(--mustard);
	}
	.name {
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.notice {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: var(--notice);
		border-color: var(--mustard);
	}
	.notice button {
		min-height: 2.75rem;
		padding: 0 0.5rem;
		font-weight: 700;
		cursor: pointer;
	}
	.edit {
		display: inline-block;
		padding: 0.35rem 0 0.1rem;
		color: var(--ink-soft);
	}
	.session-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		color: inherit;
		text-decoration: none;
	}
	.session-link:hover strong {
		text-decoration: underline;
	}
	.rating {
		text-align: right;
		font-weight: 700;
		font-size: 1.1rem;
	}
</style>
