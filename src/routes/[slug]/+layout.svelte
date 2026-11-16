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
	/* Ladder-only tokens. The ladder follows the device's light/dark setting; the rest of
	   the site is light only, so dark mode is scoped to pages that contain the ladder. */
	:global(:root:has(.squash)) {
		--card: #fff;
		--up: #2f6b3a;
		--notice: #fdf6e3;
		/* Chart series, in a fixed order validated for colour-blind separation. */
		--s1: #2a78d6;
		--s2: #eb6834;
		--s3: #1baf7a;
		--s4: #eda100;
		--s5: #e87ba4;
		--s6: #008300;
		--s7: #6250d6;
		--s8: #e34948;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:has(.squash)) {
			color-scheme: dark;
			--paper: #1c1917;
			--paper-alt: #29241f;
			--ink: #eee7dc;
			--ink-soft: #b8ac9c;
			--sun-red: #ff7088;
			--indigo: #8fb0cc;
			--mustard: #e0b458;
			--rule: rgba(238, 231, 220, 0.16);
			--card: #25211d;
			--up: #7fc58a;
			--notice: #2f2818;
			--s1: #3987e5;
			--s2: #d95926;
			--s3: #199e70;
			--s4: #c98500;
			--s5: #d55181;
			--s6: #0ca30c;
			--s7: #9085e9;
			--s8: #e66767;
		}
	}
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
		background: var(--card);
		border: 1px solid var(--rule);
		border-radius: 0.75rem;
		padding: 1rem;
	}
	.squash :global(.muted) {
		color: var(--ink-soft);
	}
	.squash :global(.up) {
		color: var(--up);
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
		color: var(--paper);
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
		color: var(--up);
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
