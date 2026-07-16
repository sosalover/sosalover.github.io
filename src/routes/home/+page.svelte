<script>
	import { fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	const tiles = [
		{
			href: '/experience',
			image: '/images/experience-tile-desktop.jpg',
			imageMobile: '/images/experience-tile-mobile.jpg',
			text: 'Work Experience',
			tag: 'var(--sun-red)'
		},
		{ href: '/writing', image: '/images/writing/newsletter-bookstore.jpg', text: 'Writing', tag: 'var(--indigo)' },
		{
			href: '/physical-creations',
			image: '/images/physical-creations/thomas-bonsaing.jpg',
			imagePosition: 'center 80%',
			text: 'Physical Creations',
			tag: 'var(--mustard)'
		},
		{
			href: '/digital-creations',
			image: '/images/thomasWorking.jpg',
			text: 'Digital Creations',
			tag: 'var(--sage)'
		}
	];
</script>

<svelte:head>
	<title>Overview — Thomas Moh</title>
</svelte:head>

<div class="home-grid">
	{#each tiles as tile, i}
		<a
			href={tile.href}
			in:fly={mounted ? { y: 20, duration: 400, delay: i * 150 } : { y: 0, duration: 0 }}
			class="tile group"
		>
			<picture>
				{#if tile.imageMobile}
					<source media="(max-width: 640px)" srcset={tile.imageMobile} />
				{/if}
				<img
					src={tile.image}
					alt={tile.text}
					class="tile-img"
					style={tile.imagePosition ? `object-position: ${tile.imagePosition}` : ''}
				/>
			</picture>
			<div class="tile-scrim"></div>
			<div class="tile-label" style="--tag-color: {tile.tag}">
				<span class="tile-marker" aria-hidden="true"></span>
				<span class="tile-text font-label">{tile.text}</span>
			</div>
		</a>
	{/each}

	<div
		in:scale={mounted ? { duration: 350, delay: 700, start: 0.92 } : { duration: 0 }}
		class="nameplate-wrap"
	>
		<div class="nameplate">
			<h1 class="nameplate-title font-label">THOMAS MOH</h1>
			<p class="nameplate-sub">Developer, creator, and writer.</p>
			<a href="mailto:thomasmoh314@gmail.com" class="nameplate-email font-label">
				thomasmoh314@gmail.com
			</a>
		</div>
	</div>
</div>

<style>
	.home-grid {
		position: relative;
		width: 100%;
		min-height: calc(100dvh - 4rem);
		margin-top: 4rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 1px;
		background: var(--rule);
	}

	.tile {
		position: relative;
		display: flex;
		overflow: hidden;
		background: var(--paper);
	}
	.tile:focus-visible {
		outline: 2px solid var(--sun-red);
		outline-offset: -2px;
		z-index: 10;
	}
	.tile-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
		filter: sepia(0.15) saturate(0.85);
	}
	.tile:hover .tile-img,
	.tile:focus-visible .tile-img {
		transform: scale(1.06);
	}
	.tile-scrim {
		position: absolute;
		inset: 0;
		background: rgba(43, 36, 32, 0.25);
		transition: background 0.3s ease;
	}
	.tile:hover .tile-scrim,
	.tile:focus-visible .tile-scrim {
		background: rgba(43, 36, 32, 0.4);
	}

	.tile-label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		gap: 0.6rem;
		background: var(--paper);
		border: 1px solid var(--rule);
		padding: 0.75rem 1.35rem;
		z-index: 10;
	}
	.tile-marker {
		width: 0.6rem;
		height: 0.6rem;
		background: var(--tag-color);
		border-radius: 1px;
		flex-shrink: 0;
	}
	.tile-text {
		font-size: 1.05rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--ink);
		white-space: nowrap;
	}

	.nameplate-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
	}
	.nameplate {
		background: var(--paper);
		border: 1px solid var(--rule);
		padding: 1.5rem 2.5rem;
		text-align: center;
	}
	.nameplate-title {
		font-size: clamp(1.6rem, 4vw, 2.4rem);
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--ink);
		margin: 0;
	}
	.nameplate-sub {
		font-size: 1rem;
		color: var(--ink-soft);
		margin-top: 0.5rem;
	}
	.nameplate-email {
		display: inline-block;
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		color: var(--sun-red);
		margin-top: 0.75rem;
		border-bottom: 1px solid var(--sun-red);
	}

	@media (max-width: 640px) {
		.tile-text {
			font-size: 0.85rem;
			white-space: normal;
			text-align: center;
		}
		.nameplate {
			padding: 1.25rem 1.5rem;
		}
	}
</style>
