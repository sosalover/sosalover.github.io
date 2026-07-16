<script>
  import SectionGallery from "../../components/SectionGallery.svelte";
  import SectionWithStickyHeader from "../../components/SectionWithStickyHeader.svelte";
  import BouncingArrow from "../../components/BouncingArrow.svelte";
</script>

<svelte:head>
  <title>Physical Creations — Thomas Moh</title>
</svelte:head>

<section class="hero">
  <div class="hero__inner">
    <div class="hero__text">
      <div class="hero__heading">
        <span class="hero__marker" aria-hidden="true"></span>
        <h1 class="hero__title">Physical Creations</h1>
      </div>
      <p class="hero__lead">
        I like to work with my hands and realize things that I imagine.
      </p>
    </div>
    <div class="hero__media">
      <img
        src="/images/physical-creations/thomas-bonsaing.jpg"
        alt="Thomas Working"
        class="hero__image"
      />
    </div>
  </div>

  <BouncingArrow />
</section>
<SectionWithStickyHeader title="Bonsai">
  <SectionGallery
    title="Bonsai"
    paragraph="I have always enjoyed raising plants. Bonsai is the Japanese art of growing miniature trees. For me, it is a way of understanding how nature evolves. In order to do it well, you need to understand what the plant wants and believes."
    images={[
      {
        src: "/images/physical-creations/bonsai1.jpg",
        alt: "a bonsai",
        caption: "A Ming Aralia bonsai I made for Hannah.",
      },
      {
        src: "/images/physical-creations/bonsai2.jpg",
        alt: "a bonsai",
        caption: "A Norfolk Island bonsai I made for myself.",
      },
      {
        src: "/images/physical-creations/bonsai3.jpg",
        alt: "a bonsai",
        caption: "A collection of Ficuses I made for my mother.",
      },
      {
        src: "/images/physical-creations/bonsai4.jpg",
        alt: "a bonsai",
        caption: "A boxwood bonsai I made for my mother.",
      },
    ]}
  ></SectionGallery>
</SectionWithStickyHeader>
<SectionWithStickyHeader title="Digital Typewriter">
  <SectionGallery
    title="Digital Typewriter"
    paragraph="I like writing. Sometimes I like to write with a keyboard. What I do not like is being distracted and feeling the energy of the internet interfering with my writing. So I created a digital typewriter. It boots to a text editing software whose only internet connection is to send .txt files to my own email."
    images={[
      {
        src: "/images/physical-creations/oldTypewriter.jpg",
        alt: "a typewriter",
        caption: "The first iteration. Components drilled into a cigar box.",
      },
      {
        src: "/images/physical-creations/typewriter.jpg",
        alt: "a typewriter",
        caption:
          "The second iteration. Enclosure 3D printed. Includes a Raspberry Pi, a power bank, and an embedded display. A wireless keyboard is used.",
      },
    ]}
  ></SectionGallery>
</SectionWithStickyHeader>
<SectionWithStickyHeader title="Woodworking">
  <SectionGallery
    title="Woodworking"
    paragraph="I have just started woodworking. It's difficult to do it in cities! But I really enjoy it! This first project was four cutting boards made for my family."
    images={[
      {
        src: "/images/physical-creations/walnut.jpg",
        alt: "a slab of wood",
        caption: "The slab of walnut used.",
      },
      {
        src: "/images/physical-creations/cuttingboard1.jpg",
        alt: "a bonsai",
        caption: "A cutting board. (in the shop)",
      },
      {
        src: "/images/physical-creations/cuttingboard2.jpg",
        alt: "a bonsai",
        caption: "Another cutting board. (in the shop)",
      },
    ]}
  ></SectionGallery>
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
    background: var(--sage);
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
    aspect-ratio: 1 / 1;
    object-fit: cover;
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
