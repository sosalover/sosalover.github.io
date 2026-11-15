<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let { data, form } = $props();
	const f = $derived(form as { error?: string } | null);

	// Seed the form from the match once; the fields are then the user's to edit.
	const initial = (() => data.match)();
	let winner = $state(initial.winnerId);
	let loser = $state(initial.loserId);
	let today = $state('');
	let busy = $state<string | null>(null);

	onMount(() => {
		const d = new Date();
		const pad = (n: number) => String(n).padStart(2, '0');
		today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
	});

	const submitting = (name: string) => () => {
		busy = name;
		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			busy = null;
		};
	};
</script>

<svelte:head>
	<title>Edit match · Squash ladder</title>
</svelte:head>

<a href={data.base} class="small muted back">&larr; Ladder</a>
<h1 class="mt-3">Edit match</h1>
{#if data.match.sessionId}
	<p class="muted mt-1">Logged from a session grid.</p>
{/if}

{#if !data.unlocked}
	<p class="card msg error mt-6">Unlock the ladder on its main page first.</p>
{:else}
	<form method="POST" action="?/save" class="card grid gap-3 mt-6" use:enhance={submitting('save')}>
		<div class="grid grid-cols-2 gap-3">
			<div>
				<label for="winner">Winner</label>
				<select id="winner" name="winner" required bind:value={winner}>
					{#each data.standings as p (p.id)}
						<option value={p.id} disabled={p.id === loser}>{p.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="loser">Loser</label>
				<select id="loser" name="loser" required bind:value={loser}>
					{#each data.standings as p (p.id)}
						<option value={p.id} disabled={p.id === winner}>{p.name}</option>
					{/each}
				</select>
			</div>
		</div>
		<button
			type="button"
			class="swap small underline"
			onclick={() => ([winner, loser] = [loser, winner])}>Swap winner and loser</button
		>
		<div class="grid grid-cols-2 gap-3">
			<div>
				<label for="score">Score <span class="small">(optional)</span></label>
				<input
					id="score"
					name="score"
					maxlength="40"
					placeholder="3–1"
					autocomplete="off"
					value={initial.score ?? ''}
				/>
			</div>
			<div>
				<label for="date">Date</label>
				<input
					id="date"
					name="date"
					type="date"
					required
					value={initial.date}
					max={today || undefined}
				/>
			</div>
		</div>
		<input type="hidden" name="today" value={today} />
		<button class="primary" disabled={busy !== null}>
			{busy === 'save' ? 'Saving…' : 'Save changes'}
		</button>
	</form>

	<form method="POST" action="?/delete" class="mt-4" use:enhance={submitting('delete')}>
		<button class="delete" disabled={busy !== null}>
			{busy === 'delete' ? 'Deleting…' : 'Delete match'}
		</button>
		<p class="small muted mt-2 text-center">You can undo a delete straight afterwards.</p>
	</form>

	{#if f?.error}
		<p class="card msg error mt-4" role="alert">{f.error}</p>
	{/if}
{/if}

<style>
	.back {
		display: inline-block;
		padding: 0.5rem 0;
		text-decoration: none;
	}
	.swap {
		justify-self: start;
		min-height: 2.75rem;
		color: var(--ink-soft);
		cursor: pointer;
	}
	.delete {
		width: 100%;
		min-height: 3rem;
		font-family: var(--font-label);
		font-size: 1rem;
		font-weight: 700;
		color: var(--sun-red);
		border: 1px solid var(--sun-red);
		border-radius: 0.5rem;
		background: transparent;
		cursor: pointer;
	}
</style>
