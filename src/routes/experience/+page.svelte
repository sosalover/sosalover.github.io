<script>
  import SectionContent from "../../components/SectionContent.svelte";
  import SectionWithStickyHeader from "../../components/SectionWithStickyHeader.svelte";
  import GithubSvgDark from "../../svgs/GithubSVGDark.svelte";
  import LinkedInSvgLarge from "../../svgs/LinkedInSVGLarge.svelte";
</script>

<!-- HTML Markup -->
<section
  class=" top-24 md:top-0 text-black px-4 text-center md:text-left h-screen flex items-center relative pb-32 md:pb-0"
>
  <div
    class="max-w-7xl mx-auto flex gap-8 flex-col-reverse md:flex-row items-center"
  >
    <div class="md:w-1/2">
      <h1
        class="clip-right-angle text-white text-4xl font-extrabold mb-4 pr-30 bg-black p-2 w-fit"
      >
        Thomas Moh
      </h1>
      <p class="text-lg mb-6">
        I am a Software Engineer interested in frontend architecture, system
        design, and human computer interaction.
      </p>
      <p class="text-lg mb-6">
        I graduated from Northwestern University with a degree in Computer
        Science.
      </p>
      <p class="text-lg mb-6">
        I have worked as a frontend engineer, a UX designer, a data engineer, a
        tennis instructor, and at one restaurant in Flåm, a server.
      </p>
      <div class="flex gap-8 align-center">
        <a
          href="/Thomas_Moh_SE_Resume.pdf"
          download="ThomasMoh_Resume"
          class="hover:scale-110 transition underline clip-right-angle inline-block px-2 py-2 pr-6 bg-red-400 text-white transition text-xl"
        >
          My Resume
        </a>
        <a
          href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
          class="text-white text-2xl"
          target="_blank"
        >
          <LinkedInSvgLarge />
        </a>
        <a
          href="https://github.com/tmoh-figs"
          class="text-white text-2xl"
          target="_blank"
        >
          <GithubSvgDark />
        </a>
      </div>
    </div>
    <div class="md:w-1/2 mt-8 md:mt-0">
      <img
        src="/images/experience/serving.jpeg"
        alt="Thomas Working"
        class="w-full h-auto rounded-lg shadow-lg object-cover aspect-square"
      />
    </div>
  </div>

  <!-- Bouncing down arrow -->
</section>
<div
  class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
>
  <svg
    class="w-6 h-6 text-black"
    fill="none"
    stroke="black"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"
    ></path>
  </svg>
</div>

<SectionWithStickyHeader title="FIGS">
  <SectionContent
    title="Software Engineer II @ FIGS"
    description="I have worked at FIGS for 2 years. I was promoted in 2025 to Software Engineer II."
    bullets={[
      "Spearheaded A/B testing initiatives and architecture, resulting in X million dollars in revenue.",
      "Developed high traffic (100M users), resuable, and a11y-friendly pages components, using React.",
      "Launched Olympics and F1 campaign pages",
      "Shattered rendering application into server components using RSCs.",
    ]}
    skills={["React", "TypeScript", "CircleCI", "Apollo", "GraphQL"]}
    imageSrc="/images/portfolio-images/figsSS.png"
    imageAlt="FIGS Scrubwear logo"
    ctaHref="https://wearfigs.com"
    ctaText="Visit FIGS site"
    reverse={true}
  ></SectionContent>
</SectionWithStickyHeader>
<SectionWithStickyHeader title="Axiom Health">
  <SectionContent
    title="Frontend Engineer & UX Designer at Axiom Health (2023)."
    description="Axiom Health is a healthcare analytics startup. I built out and designed the initial user dashboard."
    bullets={[
      "Sold the product to multi-million dollar spinal instrument companies (North America Spine Convention, LA, 2024).",
      "Stood up the user dashboard using React.",
      "Designed the user dashboard using Figma.",
    ]}
    skills={["Figma", "React", "ReactCharts"]}
    video="https://cdn.prod.website-files.com/64416a6ea101a25f1320e33b/644182f05e8f7375da6e9e2c_Axiom-cube-transcode.mp4"
    imageAlt="FIGS Scrubwear logo"
    ctaHref="https://www.axiomhealth.com/"
    ctaText="Visit Axiom site"
  ></SectionContent>
</SectionWithStickyHeader>
<SectionWithStickyHeader title="CURED.">
  <SectionContent
    title="Technical Intern @ Cured (2022)."
    description="I wrote software for Cured."
    bullets={[
      "Created query log dashboard in LookerML.",
      "Optimized SQL queries and created persisted (cached) views.",
      "Educated developers on data hierarchy.",
    ]}
    skills={["LookerML", "HTML", "SQL"]}
    imageSrc="/images/experience/cured.png"
    imageAlt="Cured logo"
    ctaHref="https://wearfigs.com"
    ctaText="Visit FIGS site"
    reverse={true}
  ></SectionContent>
</SectionWithStickyHeader>
<SectionWithStickyHeader title="AMAZON">
  <SectionContent
    title="Software Engineering Intern @ Amazon (2021)."
    description="I wrote frontend software for the seller-side Amazon storefront."
    bullets={[
      "Developed Cypress integration test suite for key workflows.",
      "Created workers for CI.",
      "Educated devlelopers on how to use the test suite.",
    ]}
    skills={["Cypress", "React", "Git", "CI"]}
    imageSrc="/images/amazon.png"
    imageAlt="Amazon Logo"
  ></SectionContent>
</SectionWithStickyHeader>

<!-- Contact Section -->
<section id="contact" class="py-16 text-center bg-black">
  <div class="container mx-auto">
    <h2 class="text-3xl font-semibold text-white mb-5">Contact Me</h2>
    <p class="text-lg text-white mb-6">Please do!</p>
    <a
      href="mailto:thomasmoh314@gmail.com"
      class="bg-red-400 text-white py-2 px-6 rounded hover:bg-blue-600"
      >Email Me</a
    >
  </div>
</section>

<style>
  .clip-right-angle {
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
  }
</style>
