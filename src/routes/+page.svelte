<script>
</script>

<!-- HTML Markup -->

<!-- Scroll-to-top button -->
<div class="scroll-button">
  <a href="#home"><i class="fas fa-arrow-up"></i></a>
</div>

<!-- Navigation Menu -->

<!-- Home Section -->

<div class="min-h-screen bg-gray-50">
  <!-- Navigation Bar -->

  <!-- Home Section -->
  <section id="home" class="text-center py-32 bg-blue-100">
    <h1 class="text-4xl font-bold text-gray-800">I'm Thomas Moh</h1>
    <p class="text-xl text-gray-600 mt-4">
      Software Developer | Northwestern University Graduate
    </p>
    <div class="mt-8">
      <a
        href="facebook.com"
        download="ThomasMoh_Resume"
        class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >Download Resume</a
      >
      <a
        href="#contact"
        class="ml-4 bg-transparent border-2 border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-blue-500 hover:text-white"
        >Contact</a
      >
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-32 bg-white text-center">
    <div class="container mx-auto">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">About Me</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        I'm a graduate of Northwestern University with a major in Computer
        Science and a minor in Psychology. I am passionate about technology,
        design, and making an impact in the world. Explore my projects and learn
        more about my journey!
      </p>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-32 bg-gray-100 text-center">
    <div class="container mx-auto">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">My Projects</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800">Chess Game (2021)</h3>
          <p class="text-gray-600 mb-2">
            A 2-player rotating chess game developed using Unity.
          </p>
          <a
            href="https://github.com/sosalover/Chess"
            class="text-blue-500 hover:text-blue-700">Link to Code</a
          >
        </div>
        <!-- Repeat for other projects -->
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-32 bg-white text-center">
    <div class="container mx-auto">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Contact Me</h2>
      <p class="text-lg text-gray-600 mb-6">
        Feel free to reach out to me for collaborations or inquiries!
      </p>
      <a
        href="mailto:thomasmoh2023@u.northwestern.edu"
        class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >Email Me</a
      >
    </div>
  </section>
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
