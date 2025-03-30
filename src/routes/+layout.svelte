<script>
	let { children } = $props();
	import '../app.css';
</script>

<main>
	<nav class="sticky top-0 bg-gray-800 p-4 shadow-md z-10">
		<div class="flex justify-between items-center">
			<div>
				<a href="#" class="text-white text-lg font-semibold">Thomas Moh</a>
			</div>
			<ul class="flex gap-8">
				<li>
					<a href="/experience" class="text-white hover:bg-gray-700 px-3 py-2 rounded">Experience</a
					>
				</li>
				<li>
					<a href="/digital-garden" class="text-white hover:bg-gray-700 px-3 py-2 rounded"
						>Digital Garden</a
					>
				</li>
				<li>
					<a href="/creations" class="text-white hover:bg-gray-700 px-3 py-2 rounded">Creations</a>
				</li>
			</ul>
			<div class="flex items-center space-x-4">
				<a href="https://www.linkedin.com/in/thomas-moh-39ab27196/" class="text-white text-2xl"
					><i class="fab fa-linkedin"></i></a
				>
				<a href="https://www.instagram.com/thomas.moh/" class="text-white text-2xl"
					><i class="fab fa-instagram"></i></a
				>
			</div>
		</div>
	</nav>
	{@render children()}

	<footer class="bg-gray-800 text-white text-center p-4">
		<span>Created By Thomas Moh</span>
	</footer>
</main>
