<svelte:head>
	<title>Time Grove — Privacy Policy</title>
</svelte:head>

<div class="pt-24 pb-20 px-8 max-w-3xl mx-auto text-white">
	<h1 class="text-4xl font-extrabold tracking-wide mb-2">Time Grove</h1>
	<p class="text-gray-400 text-sm mb-10">Privacy Policy — Last updated May 2026</p>

	<section class="mb-8">
		<h2 class="text-xl font-bold mb-3 text-red-400">Overview</h2>
		<p class="text-gray-300 leading-relaxed">
			Time Grove is a screen time budgeting app that rewards users with Sparks for spending less
			time on their phone. Sparks are used to fund real charitable donations. I make no profit from
			this app. It exists solely to serve charitable organizations and help people build healthier
			phone habits.
		</p>
	</section>

	<section class="mb-8">
		<h2 class="text-xl font-bold mb-3 text-red-400">Data We Collect</h2>
		<ul class="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
			<li>
				<strong>Email address</strong> — used for account creation and login via Supabase Auth.
			</li>
			<li>
				<strong>Display name</strong> — optional, set by you, stored in your account profile.
			</li>
			<li>
				<strong>Screen time usage data</strong> — processed entirely on your device using Apple's
				Screen Time API (FamilyControls / DeviceActivity). This data is never sent to our servers.
			</li>
			<li>
				<strong>Spark balance and game state</strong> — your earned Sparks, active builds, and
				completed causes are stored in Supabase to sync across sessions.
			</li>
			<li>
				<strong>Subscription status</strong> — managed by RevenueCat. We receive your subscription
				tier (Planter, Grower, Guardian) but not your payment details.
			</li>
		</ul>
	</section>

	<section class="mb-8">
		<h2 class="text-xl font-bold mb-3 text-red-400">Data We Do Not Collect</h2>
		<ul class="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
			<li>We do not collect or store which specific apps you use.</li>
			<li>We do not sell your data to any third party.</li>
			<li>We do not use your data for advertising.</li>
			<li>Payment information is handled entirely by Apple and RevenueCat.</li>
		</ul>
	</section>

	<section class="mb-8">
		<h2 class="text-xl font-bold mb-3 text-red-400">Third-Party Services</h2>
		<ul class="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
			<li>
				<strong>Supabase</strong> — authentication and database. Data is stored in the US.
			</li>
			<li>
				<strong>RevenueCat</strong> — subscription management. Subject to RevenueCat's privacy
				policy.
			</li>
			<li>
				<strong>Apple Screen Time API</strong> — all screen time data stays on your device and is
				never transmitted.
			</li>
		</ul>
	</section>

	<section class="mb-8">
		<h2 class="text-xl font-bold mb-3 text-red-400">Data Deletion</h2>
		<p class="text-gray-300 leading-relaxed">
			You can delete your account at any time by contacting me at
			<a href="mailto:thomasmoh314@gmail.com" class="text-red-400 underline"
				>thomasmoh314@gmail.com</a
			>. All associated data will be removed from Supabase within 30 days.
		</p>
	</section>

	<section class="mb-8">
		<h2 class="text-xl font-bold mb-3 text-red-400">Contact</h2>
		<p class="text-gray-300 leading-relaxed">
			Questions about this policy? Email
			<a href="mailto:thomasmoh314@gmail.com" class="text-red-400 underline"
				>thomasmoh314@gmail.com</a
			>.
		</p>
	</section>
</div>
