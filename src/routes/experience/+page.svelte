<script>
  import SectionContent from "../../components/SectionContent.svelte";
  import SectionWithStickyHeader from "../../components/SectionWithStickyHeader.svelte";
  import GithubSvgDark from "../../svgs/GithubSVGDark.svelte";
  import LinkedInSvgLarge from "../../svgs/LinkedInSVGLarge.svelte";
  import BouncingArrow from "../../components/BouncingArrow.svelte";
</script>

<svelte:head>
	<title>Experience — Thomas Moh</title>
</svelte:head>

<section class="min-h-screen flex items-center py-16 px-4 bg-white text-black">
  <div
    class="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-4 md:gap-12"
  >
    <!-- Image -->
    <div class="pt-4 md:pt-0 w-3/4 md:w-1/2">
      <img
        src="/images/experience/serving.jpeg"
        alt="Thomas Working"
        class="w-full rounded-lg shadow-lg object-cover aspect-square"
      />
    </div>

    <!-- Text Content -->
    <div class="w-full md:w-1/2 text-center md:text-left">
      <h1
        class="clip-right-angle text-4xl font-extrabold text-white bg-black inline-block px-4 py-2 mb-4 md:pr-20"
      >
        Thomas Moh
      </h1>
      <p class="text-lg mb-4">
        I am a Software Engineer interested in frontend architecture, system
        design, and human-computer interaction.
      </p>
      <p class="text-lg mb-4">
        I graduated from Northwestern University with a degree in Computer
        Science.
      </p>
      <p class="text-lg mb-6">
        I've worked as a frontend engineer, UX designer, and a data engineer.
      </p>
      <div class="flex justify-center md:justify-start gap-6 items-center">
        <a
          href="/Thomas_Moh_SE_Resume.pdf"
          download="ThomasMoh_Resume"
          class="bg-red-400 text-white px-4 py-2 text-lg font-semibold hover:scale-105 transition-transform clip-right-angle"
        >
          My Resume
        </a>
        <a
          href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
          class="text-2xl text-blue-600 hover:scale-110 transition-transform"
          target="_blank"
        >
          <LinkedInSvgLarge />
        </a>
        <a
          href="https://github.com/tmoh-figs"
          class="text-2xl text-black hover:scale-110 transition-transform"
          target="_blank"
        >
          <GithubSvgDark />
        </a>
      </div>
    </div>
  </div>
</section>

<BouncingArrow />

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
    ctaHref="https://www.cured.health/"
    ctaText="Visit Cured site"
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
