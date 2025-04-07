<script>
  let { children } = $props();
  import "../app.css";
  import GithubSvg from "../svgs/GithubSVG.svelte";
  import HamburgerSvg from "../svgs/HamburgerSVG.svelte";
  import LinkedinSvg from "../svgs/LinkedinSVG.svelte";

  let mobileMenuOpen = $state(false);

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<main class="flex flex-col h-screen">
  <!-- HEADER -->
  <nav class="h-16 sticky top-0 bg-black p-4 shadow-md z-10 flex-shrink-0">
    <div class="flex justify-between items-center h-full">
      <a href="/" class="text-white text-lg font-semibold">Thomas Moh</a>

      <div class="flex items-center space-x-4">
        <a
          href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
          class="text-white text-2xl"
          target="_blank"
        >
          <LinkedinSvg />
        </a>
        <a
          href="https://github.com/tmoh-figs"
          class="text-white text-2xl"
          target="_blank"
        >
          <GithubSvg />
        </a>
        <div class="md:hidden flex items-center">
          <button class="text-white" onclick={toggleMenu}>
            <HamburgerSvg />
          </button>
        </div>
      </div>
    </div>

    {#if mobileMenuOpen}
      <div
        class="md:hidden absolute top-full left-0 right-0 bg-black z-20 transition-transform transform duration-300 ease-in-out"
      ></div>
    {/if}
  </nav>

  <!-- MAIN CONTENT AREA: flexible -->
  <div class="flex-grow">
    {@render children()}
  </div>

  <!-- FOOTER -->
  <footer class="h-12 bg-black text-white text-center p-3 flex-shrink-0">
    <span class="text-sm"
      >Created By Thomas Moh using Svelte, Tailwind, Vite, Vercel</span
    >
  </footer>
</main>
