<script lang="ts">
  import { reveal } from "$lib/reveal";
  export let title = "";
  export let description = "";
  export let ctaText = "";
  export let ctaHref: string | null = null;
  export let bullets: string[] = [];
  export let skills: string[] = [];
  export let imageSrc = "";
  export let imageAlt = "";
  export let reverse = false;
  export let video: string | null = null;
  export let accent = "var(--indigo)";
</script>

<div
  use:reveal
  class="entry {reverse ? 'entry--reverse' : ''}"
  style="--accent: {accent}"
>
  <!-- Text content -->
  <div class="entry__text">
    <div class="entry__heading">
      <span class="entry__marker" aria-hidden="true"></span>
      <h3 class="entry__title">{title}</h3>
    </div>

    <p class="entry__desc">{description}</p>

    {#if ctaText}
      <a
        href={ctaHref}
        class="entry__cta font-label"
        aria-label="{ctaText} - {title}"
      >
        {ctaText} →
      </a>
    {/if}

    {#if bullets.length}
      <ul class="entry__bullets">
        {#each bullets as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>
    {/if}

    {#if skills.length}
      <div class="entry__skills font-label">
        {#each skills as skill}
          <span class="entry__skill">{skill}</span>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Image / video -->
  <a href={ctaHref} class="entry__media" aria-label="View {title}">
    {#if video}
      <video class="entry__asset" src={video} autoplay loop muted playsinline
      ></video>
    {:else}
      <img class="entry__asset" src={imageSrc} alt={imageAlt} />
    {/if}
  </a>
</div>

<style>
  .entry {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 100%;
    max-width: 64rem;
    padding: 1.5rem 0;
  }

  .entry__text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .entry__heading {
    display: flex;
    align-items: baseline;
    gap: 0.85rem;
  }

  .entry__marker {
    width: 0.5rem;
    height: 0.5rem;
    flex-shrink: 0;
    background: var(--accent);
    border-radius: 1px;
    transform: translateY(-0.15rem);
  }

  .entry__title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.3;
    color: var(--ink);
  }

  .entry__desc {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .entry__cta {
    align-self: flex-start;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink);
    border-bottom: 1px solid var(--ink);
    padding-bottom: 2px;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .entry__cta:hover {
    color: var(--sun-red);
    border-color: var(--sun-red);
  }

  .entry__cta:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .entry__bullets {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .entry__bullets li {
    position: relative;
    padding-left: 1.1rem;
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--ink-soft);
  }

  .entry__bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 0.35rem;
    height: 0.35rem;
    background: var(--accent);
    border-radius: 1px;
  }

  .entry__skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    padding-top: 0.25rem;
  }

  .entry__skill {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink-soft);
  }

  .entry__media {
    display: block;
    width: 100%;
    border-radius: 2px;
  }

  .entry__media:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  .entry__asset {
    width: 100%;
    display: block;
    object-fit: contain;
    border: 1px solid var(--rule);
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    .entry {
      flex-direction: row;
      gap: 6rem;
      align-items: center;
      padding: 0.5rem 0;
    }

    .entry--reverse {
      flex-direction: row-reverse;
    }

    .entry__text {
      width: 42%;
      flex-shrink: 0;
    }

    .entry__media {
      width: 58%;
    }

    .entry__title {
      font-size: 1.85rem;
    }
  }
</style>
