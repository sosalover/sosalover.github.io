<script lang="ts">
  import { onDestroy } from 'svelte';

  let { showModal = $bindable(), header, children } = $props();

  let dialog: HTMLDialogElement | undefined = $state();
  let previouslyFocused: HTMLElement | null = $state(null);

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

  function trapFocus(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !dialog) return;
    const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  $effect(() => {
    if (showModal && dialog) {
      previouslyFocused = document.activeElement as HTMLElement | null;
      dialog.showModal();
      const first = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      if (first) first.focus();
      dialog.addEventListener('keydown', trapFocus);
    } else if (dialog?.open) {
      dialog.removeEventListener('keydown', trapFocus);
      dialog.close();
      if (previouslyFocused) previouslyFocused.focus();
    }
  });

  onDestroy(() => {
    if (dialog) dialog.removeEventListener('keydown', trapFocus);
    if (previouslyFocused) previouslyFocused.focus();
  });
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
  aria-labelledby="modal-title"
  class="md:left-1/4 md:min-w-1/2 transition-transform transform h-full"
>
  <div class="modal-content h-full">
    <div id="modal-title">
      {@render header?.()}
    </div>
    <hr />
    {@render children?.()}
    <hr />
    <button class="mb-4 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2" onclick={() => dialog?.close()}>Close</button>
  </div>
</dialog>

<style>
  dialog {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    border: none;
    padding: 0;
    position: fixed;
    top: auto;
    bottom: 0;
    overflow: hidden;
    z-index: 50;
    max-height: 90vh;
    margin: 0;
  }

  @media (min-width: 640px) {
    dialog {
      max-width: 32em;
      border-radius: 0.2em;
      top: 25%;
      bottom: auto;
      margin: auto;
      max-height: 50%;
    }
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog > .modal-content {
    padding: 1em;
    background: white;
    border-radius: 0.5em;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  /* For the mobile view */
  dialog[open] {
    animation: slideUpMobile 0.3s ease-out;
  }

  /* Desktop - Centered modal */
  @media (min-width: 640px) {
    dialog[open] {
      animation: slideUpDesktop 0.3s ease-out;
    }
  }

  @keyframes slideUpMobile {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideUpDesktop {
    from {
      transform: translateY(10%);
    }
    to {
      transform: translateY(0);
    }
  }

  /* Button styling */
  button {
    display: block;
    margin-top: 1em;
    padding: 0.5em;
    border: none;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border-radius: 0.25em;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
