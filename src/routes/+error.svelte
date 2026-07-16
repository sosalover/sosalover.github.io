<script>
	import { page } from '$app/stores';
</script>

<div class="error-wrap">
	<p class="error-code font-label">{$page.status}</p>
	<p class="error-message">{$page.error?.message || 'Something went wrong'}</p>
	<p class="error-sub">The page you're looking for doesn't exist or has been moved.</p>
	<a href="/" class="error-link font-label">&larr; Back to Thomas Moh</a>
</div>

<style>
	.error-wrap {
		min-height: calc(100dvh - 4rem);
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}
	.error-code {
		font-size: clamp(4rem, 12vw, 7rem);
		font-weight: 700;
		color: var(--ink);
		line-height: 1;
		margin-bottom: 1rem;
	}
	.error-message {
		font-size: 1.3rem;
		color: var(--ink);
		margin-bottom: 0.5rem;
	}
	.error-sub {
		font-size: 1rem;
		color: var(--ink-soft);
		margin-bottom: 2rem;
	}
	.error-link {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--ink);
		border-bottom: 1px solid var(--ink);
		padding-bottom: 2px;
	}
	.error-link:hover {
		color: var(--sun-red);
		border-color: var(--sun-red);
	}
</style>
