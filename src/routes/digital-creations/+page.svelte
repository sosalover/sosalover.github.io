<script>
  import SectionContent from "../../components/SectionContent.svelte";
  import SectionWithStickyHeader from "../../components/SectionWithStickyHeader.svelte";
  import BouncingArrow from "../../components/BouncingArrow.svelte";
</script>

<svelte:head>
  <title>Digital Creations — Thomas Moh</title>
</svelte:head>

<section class="hero">
  <div class="hero__inner">
    <div class="hero__text">
      <div class="hero__heading">
        <span class="hero__marker" aria-hidden="true"></span>
        <h1 class="hero__title">Digital Creations</h1>
      </div>
      <p class="hero__lead">
        I have created some interesting projects using a number of different
        technologies. Usually these projects revolve around communication with
        others.
      </p>
    </div>
    <div class="hero__media">
      <img
        src="/images/thomasWorking.jpg"
        alt="Thomas Working"
        class="hero__image"
      />
    </div>
  </div>

  <BouncingArrow />
</section>
<SectionWithStickyHeader title={"ALL BLUES NYC"}>
  <SectionContent
    title="All Blues NYC"
    description="Creatively communicated complex policies for a record bar in NYC. (2025)"
    ctaText="All Blues NYC"
    ctaHref="https://www.allbluesnyc.com"
    bullets={[
      "Designed new site layout",
      "Cleaned up the responsiveness of the site",
      "Added carousel to communicate rules",
    ]}
    skills={["Squarespace", "Vanilla JS", "CSS", "Figma"]}
    imageSrc="/images/portfolio-images/all-blues.png"
    imageAlt="Screenshot of all blues site"
    reverse={true}
  ></SectionContent>
</SectionWithStickyHeader>
<SectionWithStickyHeader title={"DIGITAL GARDEN"}>
  <SectionContent
    title="Digital Garden"
    description="Gameified internet scrapbooking. (2025)"
    ctaText="My Digital Garden"
    ctaHref="/digital-creations/digital-garden"
    bullets={[
      "Integrated w/ Google Sheets",
      "Mouse and keyboard support",
      "Created responsive Svelte modal",
    ]}
    skills={["SvelteKit", "Tailwind CSS", "Vite", "Vercel"]}
    imageSrc="/images/portfolio-images/digital-garden.png"
    imageAlt="Screenshot of digital garden"
  ></SectionContent>
</SectionWithStickyHeader>
<SectionWithStickyHeader title={"BURRITO CV"}>
  <SectionContent
    title="Burrito CV"
    description="Learn about my experience with a game. (2023)"
    ctaText="Play Game"
    ctaHref="https://sosalover.github.io/BurritoCV/"
    bullets={[
      "Generate my CV by selecting items off a Chipotle-style counter.",
      "Mouse and keyboard support",
      "Created responsive Svelte modal",
    ]}
    skills={["Unity", "C#", "WebGL"]}
    imageSrc="/images/portfolio-images/burrito-cv.png"
    imageAlt="Screenshot of burrito project"
    reverse={true}
  ></SectionContent>
</SectionWithStickyHeader>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 1.5rem 4rem;
  }

  .hero__inner {
    max-width: 64rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
    gap: 2.5rem;
    align-items: center;
  }

  .hero__text {
    width: 100%;
    text-align: center;
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
    background: var(--indigo);
    border-radius: 1px;
  }

  .hero__title {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 500;
    color: var(--ink);
  }

  .hero__lead {
    margin: 0 auto;
    max-width: 34rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .hero__media {
    width: 100%;
  }

  .hero__image {
    width: 100%;
    height: auto;
    border: 1px solid var(--rule);
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    .hero__inner {
      flex-direction: row;
      gap: 4rem;
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

    .hero__media {
      width: 50%;
    }
  }
</style>
