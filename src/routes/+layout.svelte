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

<main>
  <nav class="sticky top-0 bg-gray-800 p-4 shadow-md z-10">
    <div class="flex justify-between items-center">
      <a href="/" class="text-white text-lg font-semibold">Thomas Moh</a>

      <ul class="hidden md:flex sm:gap-4 md:gap-8">
        <li>
          <a
            href="/experience"
            class="text-white hover:bg-gray-700 px-3 py-2 rounded">Experience</a
          >
        </li>
        <li>
          <a
            href="/digital-garden"
            class="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >Digital Garden</a
          >
        </li>
        <li>
          <a
            href="/creations"
            class="text-white hover:bg-gray-700 px-3 py-2 rounded">Creations</a
          >
        </li>
      </ul>
      <div class="flex items-center space-x-4">
        <!-- LinkedIn Icon -->
        <a
          href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
          class="text-white text-2xl"
          target="_blank"
        >
          <LinkedinSvg />
        </a>

        <!-- GitHub Icon -->
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
        class="md:hidden absolute top-full left-0 right-0 bg-gray-800 z-20 transition-transform transform duration-300 ease-in-out"
      >
        <ul class="flex flex-col gap-2">
          <li>
            <a
              href="/experience"
              class="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >Experience</a
            >
          </li>
          <li>
            <a
              href="/digital-garden"
              class="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >Digital Garden</a
            >
          </li>
          <li>
            <a
              href="/creations"
              class="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >Creations</a
            >
          </li>
        </ul>
      </div>
    {/if}
  </nav>
  {@render children()}

  <footer class="bg-gray-800 text-white text-center p-4">
    <span>Created By Thomas Moh</span>
  </footer>
</main>
