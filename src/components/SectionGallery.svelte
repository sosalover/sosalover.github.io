<script lang="ts">
  export let title: string;
  export let paragraph: string;
  export let images: {
    src: string;
    alt: string;
    caption: string;
  }[];
</script>

<section class=" py-12 max-w-7xl mx-auto text-center">
  <!-- Title -->
  <h2 class="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

  <!-- Paragraph -->
  <p class="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">{paragraph}</p>

  <!-- Image Grid -->
  <div class="grid grid-cols-2 md:auto-cols-fr md:grid-flow-col gap-6">
    {#each images as image}
      <div class="flex flex-col items-center">
        <img
          src={image.src}
          alt={image.alt}
          class="rounded-lg shadow-md object-cover w-full aspect-square"
        />
        <p class="mt-2 text-sm md:text-l text-gray-600">{image.caption}</p>
      </div>
    {/each}
  </div>
</section>
