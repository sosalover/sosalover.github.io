<script>
	import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
	<div class="relative inline-block mb-6">
		<div class="clip-right-angle bg-red-500 px-8 py-4 pr-16">
			<span class="text-white text-8xl md:text-9xl font-extrabold">{$page.status}</span>
		</div>
	</div>

	<p class="text-white text-xl md:text-2xl font-semibold mb-2">
		{$page.error?.message || 'Something went wrong'}
	</p>
	<p class="text-gray-400 text-lg mb-8">
		The page you're looking for doesn't exist or has been moved.
	</p>

	<a
		href="/"
		class="clip-right-angle bg-white text-black px-6 py-3 pr-12 font-bold text-lg hover:bg-red-500 hover:text-white transition-colors"
	>
		&larr; Back to Home
	</a>
</div>
