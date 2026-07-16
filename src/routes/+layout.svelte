<script>
	let { children } = $props();
	import '../app.css';
	import GithubSvg from '../svgs/GithubSVG.svelte';
	import LinkedinSvg from '../svgs/LinkedinSVG.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/experience', label: 'Work Experience' },
		{ href: '/writing', label: 'Writing' },
		{ href: '/physical-creations', label: 'Physical Creations' },
		{ href: '/digital-creations', label: 'Digital Creations' },
		{ href: '/home', label: 'Overview' }
	];

	/** @param {string} href */
	function isActive(href) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta property="og:title" content="Thomas Moh" />
	<meta property="og:description" content="Developer, creator, and writer." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Thomas Moh" />
	<meta name="twitter:description" content="Developer, creator, and writer." />
	<meta name="description" content="Developer, creator, and writer." />
</svelte:head>

<a href="#main-content" class="skip-link font-label">Skip to content</a>

<main class="flex min-h-screen flex-col">
	<!-- HEADER -->
	<nav class="site-nav">
		<div class="flex h-full items-center justify-between">
			<a
				href="/home"
				class="nav-brand font-label"
				aria-current={isActive('/home') ? 'page' : undefined}
			>
				THOMAS MOH
			</a>

			<!-- Desktop nav links -->
			<div class="hidden items-center gap-7 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="nav-link font-label"
						class:is-active={isActive(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="flex items-center gap-4">
				<a
					href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
					class="social-link"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn profile (opens in a new tab)"
				>
					<LinkedinSvg />
				</a>
				<a
					href="https://github.com/tmoh-figs"
					class="social-link"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub profile (opens in a new tab)"
				>
					<GithubSvg />
				</a>

				<!-- Mobile hamburger button -->
				<button
					class="menu-btn flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
					onclick={toggleMenu}
					aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-menu"
				>
					<span class="menu-bar {mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}"></span>
					<span class="menu-bar {mobileMenuOpen ? 'opacity-0' : ''}"></span>
					<span class="menu-bar {mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
				</button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div id="mobile-menu" class="mobile-menu md:hidden">
				<div class="flex flex-col py-2">
					{#each navLinks as link}
						<a
							href={link.href}
							class="mobile-link font-label"
							class:is-active={isActive(link.href)}
							aria-current={isActive(link.href) ? 'page' : undefined}
							onclick={() => (mobileMenuOpen = false)}
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</nav>

	<!-- MAIN CONTENT AREA: flexible -->
	<div id="main-content" class="flex-grow">
		{@render children()}
	</div>

	<!-- FOOTER -->
	<footer class="site-footer">
		<div class="footer-inner">
			<p class="footer-eyebrow font-label">Get in touch</p>
			<div class="footer-rule"></div>
			<h2 class="footer-heading">Let's work together</h2>
			<p class="footer-email">
				<a href="mailto:thomasmoh314@gmail.com">thomasmoh314@gmail.com</a>
			</p>
			<div class="footer-socials">
				<a
					href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
					class="social-link"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn profile (opens in a new tab)"
				>
					<LinkedinSvg />
				</a>
				<a
					href="https://github.com/tmoh-figs"
					class="social-link"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub profile (opens in a new tab)"
				>
					<GithubSvg />
				</a>
				<a href="/home" class="footer-overview font-label">Overview →</a>
			</div>
			<p class="footer-copy font-label">Thomas Moh © 2026</p>
		</div>
	</footer>
</main>

<style>
	/* Skip-to-content link — hidden until focused, legible on paper. */
	.skip-link {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 50;
	}
	.skip-link:focus {
		left: 1rem;
		top: 1rem;
		padding: 0.5rem 1rem;
		background: var(--ink);
		color: var(--paper);
		border-radius: 2px;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	/* ---- Navigation: quiet editorial chrome ---- */
	.site-nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4rem;
		padding: 0 1.5rem;
		z-index: 20;
		background: var(--paper);
		border-bottom: 1px solid var(--rule);
	}

	.nav-brand {
		font-size: 0.98rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--ink);
		border-bottom: 1px solid transparent;
		padding-bottom: 2px;
	}
	.nav-brand:hover {
		color: var(--sun-red);
	}

	.nav-link {
		position: relative;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.13em;
		color: var(--ink-soft);
		border-bottom: 1px solid transparent;
		padding-bottom: 3px;
		transition:
			color 0.18s ease,
			border-color 0.18s ease;
	}
	.nav-link:hover,
	.nav-link:focus-visible {
		color: var(--sun-red);
		border-bottom-color: var(--sun-red);
	}
	.nav-link.is-active {
		color: var(--ink);
		border-bottom-color: var(--ink);
	}

	.social-link {
		display: inline-flex;
		color: var(--ink);
		border-radius: 2px;
		transition: opacity 0.18s ease;
	}
	.social-link:hover {
		opacity: 0.6;
	}

	.menu-btn {
		border-radius: 2px;
	}
	.menu-bar {
		display: block;
		width: 1.25rem;
		height: 1.5px;
		background: var(--ink);
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}

	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 20;
		background: var(--paper);
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
	}
	.mobile-link {
		padding: 0.85rem 1.5rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--ink-soft);
		border-left: 2px solid transparent;
	}
	.mobile-link:hover,
	.mobile-link:focus-visible {
		color: var(--sun-red);
		background: var(--paper-alt);
	}
	.mobile-link.is-active {
		color: var(--ink);
		border-left-color: var(--sun-red);
	}

	/* ---- Shared focus ring: visible against paper ---- */
	.nav-brand:focus-visible,
	.nav-link:focus-visible,
	.social-link:focus-visible,
	.menu-btn:focus-visible,
	.mobile-link:focus-visible,
	.footer-email a:focus-visible,
	.footer-overview:focus-visible,
	.skip-link:focus-visible {
		outline: 2px solid var(--sun-red);
		outline-offset: 3px;
	}

	/* ---- Footer: quiet, hairline, sun-red used sparingly ---- */
	.site-footer {
		flex-shrink: 0;
		padding: 4rem 1.5rem 3rem;
		border-top: 1px solid var(--rule);
	}
	.footer-inner {
		max-width: 980px;
		margin: 0 auto;
	}
	.footer-eyebrow {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--ink-soft);
		margin: 0 0 0.9rem;
	}
	.footer-rule {
		border-top: 1px solid var(--rule);
		margin-bottom: 1.75rem;
	}
	.footer-heading {
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		font-weight: 500;
		letter-spacing: 0.01em;
		margin: 0 0 1rem;
		color: var(--ink);
	}
	.footer-email {
		font-size: 1.05rem;
		margin: 0 0 2rem;
	}
	.footer-email a {
		color: var(--sun-red);
		border-bottom: 1px solid var(--sun-red);
		padding-bottom: 2px;
	}
	.footer-email a:hover {
		color: var(--ink);
		border-bottom-color: var(--ink);
	}
	.footer-socials {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}
	.footer-overview {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--ink-soft);
		border-bottom: 1px solid transparent;
		padding-bottom: 2px;
	}
	.footer-overview:hover,
	.footer-overview:focus-visible {
		color: var(--sun-red);
		border-bottom-color: var(--sun-red);
	}
	.footer-copy {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--ink-soft);
		margin: 0;
	}
</style>
