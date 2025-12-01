<script>
  export let title;
</script>

<section class="relative">
  <!-- Sticky header -->
  <div class="sticky top-16 bg-black px-4 py-2 z-10 overflow-hidden max-w-screen">
    <div class="flex items-center gap-4 whitespace-nowrap overflow-hidden">
      <!-- Main solid title -->
      <h2 class="text-xl md:text-4xl font-bold text-white shrink-0 underline">
        {title}
      </h2>

      <!-- Repeating echoed titles -->
      {#each Array(60) as _, i}
        <h2
          class="text-sm md:text-l font-bold text-red-400 select-none shrink-0"
        >
          {title}
        </h2>
      {/each}
    </div>
  </div>

  <!-- Section content -->
  <div class="px-4 py-2 md:py-20 md:flex md:justify-center">
    <slot />
  </div>
</section>
