<script lang="ts">
  export let title = "";
  export let description = "";
  export let ctaText = "";
  export let ctaHref = "#";
  export let bullets: string[] = [];
  export let skills: string[] = [];
  export let imageSrc = "";
  export let imageAlt = "";
  export let reverse = false;
</script>

<div class="grid md:grid-cols-2 gap-8 items-center md:py-2">
  <!-- Left: Text content (1/3 width on md+) -->
  <div class="md:col-span-1 space-y-6 md:px-10">
    <h3 class="hidden md:flex text-2xl md:text-3xl font-bold">
      {title}
    </h3>
    <p class="text-gray-700 text-lg">{description}</p>

    {#if ctaText}
      <a
        href={ctaHref}
        class="clip-right-angle inline-block px-4 py-2 bg-red-400 text-white hover:bg-red-800 transition"
      >
        {ctaText}
      </a>
    {/if}

    {#if bullets.length}
      <ul class="list-disc list-inside text-gray-800 space-y-1">
        {#each bullets as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>
    {/if}

    {#if skills.length}
      <div class="flex flex-wrap gap-2 pt-2">
        {#each skills as skill, i}
          <span
            class={`text-sm font-medium px-3 py-1 ${
              i === 0
                ? "bg-red-200 text-red-800 clip-right-angle"
                : "bg-red-200 text-red-800 -skew-x-7"
            }`}
          >
            <span class={i !== 0 ? "skew-x-7 block" : ""}>
              {skill}
            </span>
          </span>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Right: Image (2/3 width on md+, centered) -->
  <div class="md:col-span-1 flex justify-center px-4 md:px-0">
    <img
      src={imageSrc}
      alt={imageAlt}
      class="w-full max-w-2xl rounded-md shadow-md object-contain"
    />
  </div>
</div>

<style>
  .clip-right-angle {
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
  }
</style>
