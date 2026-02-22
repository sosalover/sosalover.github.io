<script>
	let { children } = $props();
	import '../app.css';
	import GithubSvg from '../svgs/GithubSVG.svelte';
	import LinkedinSvg from '../svgs/LinkedinSVG.svelte';
	import { onNavigate } from '$app/navigation';

	let mobileMenuOpen = $state(false);

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

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
>
	Skip to content
</a>

<main class="flex flex-col min-h-screen">
	<!-- HEADER -->
	<nav
		class="h-16 fixed w-full top-0 bg-black p-4 shadow-md z-10 flex-shrink-0"
	>
		<div class="flex justify-between items-center h-full">
			<a href="/" class="text-white text-lg font-semibold focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded">THOMAS MOH</a>

			<!-- Desktop nav links -->
			<div class="hidden md:flex items-center space-x-6">
				<a href="/experience" class="text-white text-sm font-medium hover:text-red-500 border-b-2 border-transparent hover:border-red-500 transition-colors pb-0.5">EXPERIENCE</a>
				<a href="/writing" class="text-white text-sm font-medium hover:text-red-500 border-b-2 border-transparent hover:border-red-500 transition-colors pb-0.5">WRITING</a>
				<a href="/physical-creations" class="text-white text-sm font-medium hover:text-red-500 border-b-2 border-transparent hover:border-red-500 transition-colors pb-0.5">PHYSICAL CREATIONS</a>
				<a href="/digital-creations" class="text-white text-sm font-medium hover:text-red-500 border-b-2 border-transparent hover:border-red-500 transition-colors pb-0.5">DIGITAL CREATIONS</a>
			</div>

			<div class="flex items-center space-x-4">
				<a
					href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
					class="text-white text-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
					target="_blank"
					aria-label="LinkedIn profile"
				>
					<LinkedinSvg />
				</a>
				<a
					href="https://github.com/tmoh-figs"
					class="text-white text-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
					target="_blank"
					aria-label="GitHub profile"
				>
					<GithubSvg />
				</a>

				<!-- Mobile hamburger button -->
				<button
					class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
					onclick={toggleMenu}
					aria-label="Open menu"
					aria-expanded={mobileMenuOpen}
				>
					<span class="block w-5 h-0.5 bg-white transition-transform {mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
					<span class="block w-5 h-0.5 bg-white transition-opacity {mobileMenuOpen ? 'opacity-0' : ''}"></span>
					<span class="block w-5 h-0.5 bg-white transition-transform {mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
				</button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div
				class="md:hidden absolute top-full left-0 right-0 bg-black z-20 border-t border-gray-800 shadow-lg"
			>
				<div class="flex flex-col py-2">
					<a href="/experience" class="text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 hover:text-red-500 transition-colors" onclick={() => mobileMenuOpen = false}>EXPERIENCE</a>
					<a href="/writing" class="text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 hover:text-red-500 transition-colors" onclick={() => mobileMenuOpen = false}>WRITING</a>
					<a href="/physical-creations" class="text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 hover:text-red-500 transition-colors" onclick={() => mobileMenuOpen = false}>PHYSICAL CREATIONS</a>
					<a href="/digital-creations" class="text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 hover:text-red-500 transition-colors" onclick={() => mobileMenuOpen = false}>DIGITAL CREATIONS</a>
				</div>
			</div>
		{/if}
	</nav>

	<!-- MAIN CONTENT AREA: flexible -->
	<div id="main-content" class="flex-grow">
		{@render children()}
	</div>

	<!-- FOOTER -->
	<footer class="bg-black text-white py-12 px-8 flex-shrink-0">
		<div class="max-w-4xl mx-auto">
			<div class="clip-right-angle bg-red-400 inline-block px-4 py-1 mb-6">
				<span class="text-black font-extrabold text-sm tracking-widest">GET IN TOUCH</span>
			</div>
			<h2 class="text-3xl md:text-5xl font-extrabold tracking-widest mb-4">LET'S WORK TOGETHER</h2>
			<p class="text-xl md:text-2xl text-red-400 font-semibold mb-8">thomasmoh314@gmail.com</p>
			<div class="flex gap-6 mb-10">
				<a
					href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
					class="text-white hover:text-red-400 transition-colors focus-visible:ring-2 focus-visible:ring-white rounded"
					target="_blank"
					aria-label="LinkedIn profile"
				>
					<LinkedinSvg />
				</a>
				<a
					href="https://github.com/tmoh-figs"
					class="text-white hover:text-red-400 transition-colors focus-visible:ring-2 focus-visible:ring-white rounded"
					target="_blank"
					aria-label="GitHub profile"
				>
					<GithubSvg />
				</a>
			</div>
			<p class="text-gray-500 text-sm tracking-widest">THOMAS MOH © 2026</p>
		</div>
	</footer>
</main>
