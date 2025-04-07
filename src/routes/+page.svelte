<script>
  // You can define your tiles as an array for flexibility
  const tiles = [
    {
      href: "/experience",
      image: "/images/experiences.jpg",
      text: "Experience",
    },
    { href: "/writing", image: "/images/donquixote.avif", text: "Writing" },

    {
      href: "/physical-creations",
      image: "/images/bonsai.webp",
      text: "Physical Creations",
    },
    {
      href: "/digital-creations",
      image: "/images/thomasWorking.jpg",
      text: "Digital Creations",
    },
  ];
</script>

<div class="relative h-full w-full grid grid-cols-2 grid-rows-2">
  {#each tiles as tile, i}
    <a href={tile.href} class="group relative overflow-hidden flex i">
      <!-- Background image -->
      <img
        src={tile.image}
        alt={tile.text}
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <!-- Bright rectangle behind text -->
      <div
        class="absolute top-1/2 -translate-y-1/2 px-4 py-2 bg-black z-10 shadow-black"
      >
        <span class="text-white text-lg md:text-3xl font-bold">{tile.text}</span
        >
      </div>

      <!-- Optional overlay -->
      <div
        class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
      ></div>
    </a>
  {/each}

  <!-- 👇 Centered content in middle of all tiles -->
  <div
    class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20"
  >
    <h1 class="text-4xl md:text-6xl font-bold text-white drop-shadow">
      Thomas Moh
    </h1>
    <p class="text-lg md:text-xl text-white mt-2 drop-shadow">
      Creative Technologist. Svelte enjoyer. Design-driven developer.
    </p>
  </div>
</div>
