<script>
  export let title;
</script>

<section class="section">
  <!-- Sticky header -->
  <div class="sticky-header">
    <span class="marker" aria-hidden="true"></span>
    <h2 class="section-title font-label">{title}</h2>
  </div>

  <!-- Section content -->
  <div class="section-body">
    <slot />
  </div>
</section>

<style>
  .section {
    position: relative;
    background-color: var(--paper);
  }

  .section:nth-of-type(even) {
    background-color: var(--paper-alt);
  }

  .sticky-header {
    position: sticky;
    top: 4rem;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.85rem 1.5rem;
    background-color: inherit;
    border-bottom: 1px solid var(--rule);
  }

  .marker {
    width: 0.5rem;
    height: 0.5rem;
    flex-shrink: 0;
    background: var(--sun-red);
    border-radius: 1px;
  }

  .section-title {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink);
  }

  .section-body {
    padding: 3rem 1.5rem;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .section-body {
      padding: 5rem 1.5rem;
    }
  }
</style>
