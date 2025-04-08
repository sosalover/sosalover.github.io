<script>
  export let title;
</script>

<section class="relative">
  <!-- Sticky header -->
  <div class="sticky top-16 bg-white px-4 py-2 z-10 overflow-hidden">
    <div class="flex items-center gap-4 whitespace-nowrap overflow-hidden">
      <!-- Main solid title -->
      <h2 class="text-xl md:text-2xl font-bold text-black shrink-0 underline">
        {title}
      </h2>

      <!-- Repeating echoed titles -->
      {#each Array(20) as _, i}
        <h2
          class="text-sm md:text-l font-bold text-red-400/40 select-none shrink-0"
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
