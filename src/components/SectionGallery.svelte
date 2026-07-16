<script lang="ts">
  export let title: string;
  export let paragraph: string;
  export let images: {
    src: string;
    alt: string;
    caption: string;
  }[];
</script>

<section class="gallery">
  <!-- Title -->
  <h2 class="gallery__title">{title}</h2>

  <!-- Paragraph -->
  <p class="gallery__paragraph">{paragraph}</p>

  <!-- Image Grid -->
  <div class="gallery__grid">
    {#each images as image}
      <figure class="gallery__figure">
        <img src={image.src} alt={image.alt} class="gallery__image" />
        <figcaption class="gallery__caption font-label">
          {image.caption}
        </figcaption>
      </figure>
    {/each}
  </div>
</section>

<style>
  .gallery {
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    text-align: center;
  }

  .gallery__title {
    margin: 0 0 1rem;
    font-size: 1.85rem;
    font-weight: 500;
    color: var(--ink);
  }

  .gallery__paragraph {
    max-width: 38rem;
    margin: 0 auto 3rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .gallery__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1.5rem;
    text-align: left;
  }

  .gallery__figure {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .gallery__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: 1px solid var(--rule);
    border-radius: 2px;
  }

  .gallery__caption {
    font-size: 0.78rem;
    line-height: 1.6;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
  }

  @media (min-width: 768px) {
    .gallery__grid {
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      grid-template-columns: none;
    }
  }
</style>
