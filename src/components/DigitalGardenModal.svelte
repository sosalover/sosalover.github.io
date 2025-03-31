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
    class="flex md:flex-row bg-white rounded-lg shadow-lg max-h-screen md:max-h-[80vh] overflow-hidden"
  >
    <!-- Left Side: Image & Link -->
    <div class="flex flex-col items-start space-y-4 w-full md:w-1/3 p-4">
      {#if image}
        <img
          src={image}
          alt={title}
          class="w-full h-auto object-contain rounded-lg"
        />
      {/if}
      {#if link}
        <a href={link} target="_blank" class="text-blue-500 underline"
          >Visit Website</a
        >
      {/if}
    </div>

    <!-- Right Side: Title & Scrollable Text -->
    <div class="flex flex-col w-full md:w-2/3 p-4 space-y-4">
      <h1 class="text-3xl font-semibold">{title}</h1>
      <p class="text-lg">{text}</p>
    </div>
    {@render children()}
  </div>
</Modal>
