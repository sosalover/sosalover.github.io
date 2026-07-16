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

<section class="hero">
  <div class="hero__inner">
    <!-- Image -->
    <div class="hero__media">
      <img
        src="/images/experience/serving.jpeg"
        alt="Thomas Working"
        class="hero__image"
      />
    </div>

    <!-- Text Content -->
    <div class="hero__text">
      <p class="hero__eyebrow font-label">Experience</p>
      <div class="hero__heading">
        <span class="hero__marker" aria-hidden="true"></span>
        <h1 class="hero__title">Thomas Moh</h1>
      </div>
      <p class="hero__lead">
        I am a Software Engineer interested in frontend architecture, system
        design, and human-computer interaction.
      </p>
      <p class="hero__lead">
        I graduated from Northwestern University with a degree in Computer
        Science.
      </p>
      <p class="hero__lead">
        I've worked as a frontend engineer, UX designer, and a data engineer.
      </p>
      <div class="hero__actions">
        <a
          href="/Thomas_Moh_SE_Resume.pdf"
          download="ThomasMoh_Resume"
          class="hero__cta font-label"
        >
          My Resume →
        </a>
        <a
          href="https://www.linkedin.com/in/thomas-moh-39ab27196/"
          class="hero__social"
          aria-label="LinkedIn"
          target="_blank"
        >
          <LinkedInSvgLarge />
        </a>
        <a
          href="https://github.com/tmoh-figs"
          class="hero__social"
          aria-label="GitHub"
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

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 1.5rem 4rem;
  }

  .hero__inner {
    max-width: 64rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
  }

  .hero__media {
    width: 75%;
  }

  .hero__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: 1px solid var(--rule);
    border-radius: 2px;
  }

  .hero__text {
    width: 100%;
    text-align: center;
  }

  .hero__eyebrow {
    margin: 0 0 1rem;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--ink-soft);
  }

  .hero__heading {
    display: inline-flex;
    align-items: baseline;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .hero__marker {
    width: 0.55rem;
    height: 0.55rem;
    flex-shrink: 0;
    background: var(--sun-red);
    border-radius: 1px;
  }

  .hero__title {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 500;
    color: var(--ink);
  }

  .hero__lead {
    margin: 0 auto 1rem;
    max-width: 34rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .hero__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .hero__cta {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink);
    border-bottom: 1px solid var(--ink);
    padding-bottom: 3px;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .hero__cta:hover {
    color: var(--sun-red);
    border-color: var(--sun-red);
  }

  .hero__social {
    font-size: 1.5rem;
    color: var(--ink-soft);
    transition: color 0.2s ease;
  }

  .hero__social:hover {
    color: var(--ink);
  }

  @media (min-width: 768px) {
    .hero__inner {
      flex-direction: row-reverse;
      gap: 4rem;
    }

    .hero__media {
      width: 50%;
    }

    .hero__text {
      width: 50%;
      text-align: left;
    }

    .hero__heading {
      display: flex;
    }

    .hero__lead {
      margin-left: 0;
      margin-right: 0;
    }

    .hero__actions {
      justify-content: flex-start;
    }
  }
</style>
