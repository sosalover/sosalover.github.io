<script>
  import Modal from '../../components/Modal.svelte';
  import SectionContent from '../../components/SectionContent.svelte';
  import SectionWithStickyHeader from '../../components/SectionWithStickyHeader.svelte';

  let showModal = $state(false);
  let codeInput = $state('');
  let codeCorrect = $state(false);
  let codeError = $state(false);

  const correctCode = 'beta2025';

  function openModal() {
    codeInput = '';
    codeCorrect = false;
    codeError = false;
    showModal = true;
  }

  function checkCode() {
    if (codeInput === correctCode) {
      codeCorrect = true;
      codeError = false;
    } else {
      codeError = true;
    }
  }
</script>

<svelte:head>
	<title>Writing — Thomas Moh</title>
</svelte:head>

<div class="relative top-16 w-full flex flex-col justify-center items-center text-3xl p-4 bg-white gap-8 pt-0">
  <SectionWithStickyHeader title={'Writing'}>
    <div class="flex-col gap-4 flex">
      <p class="text-black">
        Writing is my favorite thing to do. Reach out to me
        if you want to discuss something with me.
      </p>
      <p class="text-black">Here to beta read my novel?</p>

      <button
        onclick={openModal}
        class="hover:scale-110 transition underline clip-right-angle inline-block px-4 py-2 bg-red-400 text-white max-w-100"
      >
        READ NOW
      </button>
    </div>
  </SectionWithStickyHeader>

  <SectionWithStickyHeader title={'The Works of Steve Roper'}>
    <SectionContent
      title="The Works of Steve Roper"
      description="I wrote a small book to celebrate the works of Steve Roper."
      ctaText="PDF of book"
      ctaHref="/steve-book.pdf"
      imageSrc="/images/writing/steve-book.png"
      imageAlt="Screenshot of Steve Book"
      reverse={false}
    />
  </SectionWithStickyHeader>
</div>

{#if showModal}
  <Modal bind:showModal>
    {#snippet header()}
      <h2 class="text-xl font-semibold">Enter Access Code</h2>
    {/snippet}

    <form class="p-4 space-y-4">
      {#if !codeCorrect}
        <input
          bind:value={codeInput}
          oninput={() => (codeError = false)}
          class="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Enter code here"
        />
        {#if codeError}
          <p class="text-red-500 text-sm mt-1">Incorrect code, please try again.</p>
        {/if}

        <div class="flex justify-end gap-4">
          <button
            type="submit"
            onclick={checkCode}
            class="bg-red-400 hover:bg-red-500 text-white rounded px-4 py-2"
          >
            Submit
          </button>
        </div>
      {:else}
        <p class="text-green-700 font-semibold text-center">Access Granted!</p>
        <a
          href="https://docs.google.com/document/d/1zpX6ykNxbZanwe62d4wN-fx7CIx0ErNN8YgyHXmBbTI/edit?tab=t.0#heading=h.ddb19arc5umg"
          class="block text-center mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >Click here to read the novel</a>
      {/if}
    </form>
  </Modal>
{/if}
