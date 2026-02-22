<script>
	export let title;
</script>

<section class="relative">
	<!-- Sticky header -->
	<div class="sticky top-16 bg-black px-4 py-2 z-10 overflow-hidden max-w-screen">
		<div class="flex items-center gap-4 whitespace-nowrap">
			<!-- Main solid title -->
			<h2 class="text-xl md:text-4xl font-bold text-white shrink-0 underline z-10">
				{title}
			</h2>

			<!-- Marquee scrolling echoed titles (decorative) -->
			<div class="marquee-container overflow-hidden" aria-hidden="true">
				<div class="marquee-track">
					{#each Array(20) as _}
						<span class="text-sm md:text-l font-bold text-red-400 select-none shrink-0 mx-2">
							{title}
						</span>
					{/each}
					{#each Array(20) as _}
						<span class="text-sm md:text-l font-bold text-red-400 select-none shrink-0 mx-2">
							{title}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Section content -->
	<div class="px-4 py-2 md:py-20 md:flex md:justify-center">
		<slot />
	</div>
</section>

<style>
	.marquee-container {
		flex: 1;
		overflow: hidden;
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: marquee 20s linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
