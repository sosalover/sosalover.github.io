<script>
  import { fly, scale } from 'svelte/transition';
  import { onMount } from 'svelte';

  let mounted = $state(false);
  onMount(() => { mounted = true; });

  const tiles = [
    { href: '/experience', image: '/images/skyline.jpg', text: 'Experience' },
    { href: '/writing', image: '/images/donquixote.avif', text: 'Writing' },
    { href: '/physical-creations', image: '/images/bonsai.webp', text: 'Physical Creations' },
    { href: '/digital-creations', image: '/images/thomasWorking.jpg', text: 'Digital Creations' }
  ];
</script>

<svelte:head>
	<title>Thomas Moh</title>
</svelte:head>

<div class="relative min-h-[100dvh] w-full grid grid-cols-2 grid-rows-2 gap-4 bg-black">
  {#each tiles as tile, i}
    <a
      href={tile.href}
      in:fly={mounted ? { y: 20, duration: 400, delay: i * 150 } : { y: 0, duration: 0 }}
      class="group relative overflow-hidden flex focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:z-10"
    >
      <img
        src={tile.image}
        alt={tile.text}
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div class="absolute top-1/2 -translate-y-1/2 px-4 py-2 z-10">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm shadow-lg z-[-1] clip-right-angle"></div>
        <span class="text-white text-lg md:text-3xl font-bold relative z-10">{tile.text}</span>
      </div>

      <div class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
    </a>
  {/each}

  <!-- Centered nameplate -->
  <div
    in:scale={mounted ? { duration: 350, delay: 700, start: 0.92 } : { duration: 0 }}
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
  >
    <div class="md:-skew-x-12 bg-black backdrop-blur-sm px-2 md:px-6 py-4 shadow-lg">
      <div class="nameplate md:skew-x-12 text-center">
        <h1 class="text-4xl md:text-6xl font-black tracking-widest text-white drop-shadow">
          THOMAS MOH
        </h1>
        <p class="text-lg md:text-xl text-white mt-2 drop-shadow">
          Developer, creator, and writer.
        </p>
        <p class="text-sm md:text-base text-red-400 mt-1 drop-shadow tracking-wide pointer-events-auto select-text cursor-text">
          thomasmoh314@gmail.com
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }
  .nameplate {
    animation: breathe 4s ease-in-out infinite;
  }
</style>
