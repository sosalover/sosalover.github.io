<script>
  import SectionContent from "../../components/SectionContent.svelte";
  import SectionWithStickyHeader from "../../components/SectionWithStickyHeader.svelte";
</script>

<section
  class="text-black px-4 text-center md:text-left h-screen flex items-center"
>
  <div
    class="max-w-7xl mx-auto flex gap-8 flex-col-reverse md:flex-row items-center"
  >
    <div class="md:w-1/2">
      <h1
        class="clip-right-angle text-white text-4xl font-extrabold mb-4 pr-30 bg-black p-2 w-fit"
      >
        Digital Creations
      </h1>
      <p class="text-lg mb-6">
        I have created some interesting projects using a number of different
        technologies. Usually these projects revolve around communication with
        others.
      </p>
    </div>
    <div class="md:w-1/2 mt-8 md:mt-0">
      <img
        src="/images/thomasWorking.jpg"
        alt="Thomas Working"
        class="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>
<SectionWithStickyHeader title={"DIGITAL GARDEN"}>
  <SectionContent
    title="Digital Garden"
    description="Gameified internet scrapbooking. "
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

<style>
  .clip-right-angle {
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
  }
</style>
