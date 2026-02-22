<script>
  let { children } = $props();
  import "../app.css";
  import GithubSvg from "../svgs/GithubSVG.svelte";
  import LinkedinSvg from "../svgs/LinkedinSVG.svelte";

  let mobileMenuOpen = $state(false);

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
>
  Skip to content
</a>

<main class="flex flex-col h-screen">
  <!-- HEADER -->
  <nav
    class="h-16 fixed w-full top-0 bg-black p-4 shadow-md z-10 flex-shrink-0"
  >
    <div class="flex justify-between items-center h-full">
      <a href="/" class="text-white text-lg font-semibold focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded">THOMAS MOH</a>

      <div class="flex items-center space-x-4">
        <a
          href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
          class="text-white text-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          target="_blank"
          aria-label="LinkedIn profile"
        >
          <LinkedinSvg />
        </a>
        <a
          href="https://github.com/tmoh-figs"
          class="text-white text-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          target="_blank"
          aria-label="GitHub profile"
        >
          <GithubSvg />
        </a>
      </div>
    </div>

    {#if mobileMenuOpen}
      <div
        class="md:hidden absolute top-full left-0 right-0 bg-black z-20 transition-transform transform duration-300 ease-in-out"
      ></div>
    {/if}
  </nav>

  <!-- MAIN CONTENT AREA: flexible -->
  <div id="main-content" class="flex-grow">
    {@render children()}
  </div>

  <!-- FOOTER -->
  <footer class="h-12 bg-black text-white text-center p-3 flex-shrink-0">
    <span class="text-sm">CREATED BY THOMAS MOH, thomasmoh314@gmail.com</span>
  </footer>
</main>
