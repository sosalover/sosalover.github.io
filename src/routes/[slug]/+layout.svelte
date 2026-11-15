<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow, noarchive" />
	<meta name="referrer" content="same-origin" />
</svelte:head>

<div class="squash">
	{@render children()}
</div>

<style>
	.squash {
		max-width: 40rem;
		margin: 0 auto;
		padding: 5.5rem 1rem 3rem;
		color: var(--ink);
	}
	.squash :global(h1) {
		font-family: var(--font-label);
		font-size: clamp(1.75rem, 7vw, 2.5rem);
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.1;
	}
	.squash :global(h2) {
		font-family: var(--font-label);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-soft);
		margin: 2.25rem 0 0.75rem;
	}
	.squash :global(.card) {
		background: #fff;
		border: 1px solid var(--rule);
		border-radius: 0.75rem;
		padding: 1rem;
	}
	.squash :global(.muted) {
		color: var(--ink-soft);
	}
	.squash :global(.up) {
		color: #2f6b3a;
	}
	.squash :global(.down) {
		color: var(--sun-red);
	}
	.squash :global(label) {
		display: block;
		font-family: var(--font-label);
		font-size: 0.85rem;
		color: var(--ink-soft);
		margin-bottom: 0.3rem;
	}
	.squash :global(input),
	.squash :global(select) {
		width: 100%;
		min-height: 2.9rem;
		/* 16px+ stops iOS zooming into the field */
		font-size: 1rem;
		font-family: inherit;
		color: var(--ink);
		background: var(--paper);
		border: 1px solid var(--rule);
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
	}
	.squash :global(input:focus-visible),
	.squash :global(select:focus-visible),
	.squash :global(button:focus-visible),
	.squash :global(a:focus-visible) {
		outline: 2px solid var(--indigo);
		outline-offset: 2px;
	}
	.squash :global(button.primary) {
		width: 100%;
		min-height: 3rem;
		font-family: var(--font-label);
		font-size: 1rem;
		font-weight: 700;
		color: #fff;
		background: var(--ink);
		border-radius: 0.5rem;
		cursor: pointer;
	}
	.squash :global(button.primary:disabled) {
		opacity: 0.6;
		cursor: wait;
	}
	.squash :global(.msg) {
		margin-top: 0.75rem;
		font-size: 0.95rem;
	}
	.squash :global(.msg.error) {
		color: var(--sun-red);
	}
	.squash :global(.msg.ok) {
		color: #2f6b3a;
	}
	.squash :global(.match-list) {
		list-style: none;
		padding: 0 1rem;
		margin: 0;
	}
	.squash :global(.match-list li) {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--rule);
	}
	.squash :global(.match-list li:last-child) {
		border-bottom: none;
	}
	.squash :global(.small) {
		font-size: 0.85rem;
	}
</style>
