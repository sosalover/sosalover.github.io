<script>
  import SectionGallery from "../../components/SectionGallery.svelte";
  import SectionWithStickyHeader from "../../components/SectionWithStickyHeader.svelte";
</script>

<section
  class="text-black py-16 px-4 text-center md:text-left h-screen flex items-center relative"
>
  <div
    class="max-w-7xl mx-auto flex gap-8 flex-col-reverse md:flex-row items-center"
  >
    <div class="md:w-1/2">
      <h1
        class="clip-right-angle text-white text-4xl font-extrabold mb-4 pr-30 bg-black p-2 w-fit"
      >
        Physical Creations
      </h1>
      <p class="text-lg mb-6">
        I like to work with my hands and realize things that I imagine.
      </p>
    </div>
    <div class=" md:w-1/2 mt-8 md:mt-0">
      <img
        src="/images/physical-creations/thomas-bonsaing.jpg"
        alt="Thomas Working"
        class="w-full rounded-lg shadow-lg aspect-square object-cover"
      />
    </div>
  </div>

  <!-- Bouncing down arrow -->
  <div
    class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
  >
    <svg
      class="w-6 h-6 text-black"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </div>
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
<section id="contact" class="py-16 text-center bg-black">
  <div class="container mx-auto">
    <h2 class="text-3xl font-semibold text-white mb-5">Contact Me</h2>
    <p class="text-lg text-white mb-6">Please do!</p>
    <a
      href="mailto:thomasmoh314@gmail.com"
      class="bg-red-400 text-white py-2 px-6 skew-x-8 hover:bg-red-600"
      >Email Me</a
    >
  </div>
</section>

<style>
  .clip-right-angle {
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
  }
</style>
