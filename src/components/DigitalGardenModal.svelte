<script>
  import Modal from "./Modal.svelte";
  let {
    showModal = $bindable(),
    children,
    title = "",
    image = "",
    text = "",
    link = "",
  } = $props();
</script>

<Modal bind:showModal>
  {#snippet header()}{/snippet}
  <div
    class="flex md:flex-row max-h-screen md:max-h-[80vh] overflow-hidden"
    style="color: var(--ink)"
  >
    <!-- Left Side: Image & Link -->
    <div class="flex flex-col items-start space-y-4 w-full md:w-1/3 p-4">
      {#if image}
        <img
          src={image}
          alt={title}
          class="w-full h-auto object-contain"
          style="border: 1px solid var(--rule); border-radius: 2px"
        />
      {/if}
      {#if link}
        <a
          href={link}
          target="_blank"
          class="font-label"
          style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; border-bottom: 1px solid var(--ink); padding-bottom: 2px"
          >Visit Website →</a
        >
      {/if}
    </div>

    <!-- Right Side: Title & Scrollable Text -->
    <div class="flex flex-col w-full md:w-2/3 p-4 space-y-4">
      <h1 class="text-3xl" style="font-weight: 500">{title}</h1>
      <p class="text-lg" style="color: var(--ink-soft)">{text}</p>
    </div>
    {@render children()}
  </div>
</Modal>
