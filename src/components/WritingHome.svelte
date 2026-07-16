<script>
	import Modal from './Modal.svelte';
	import SectionContent from './SectionContent.svelte';
	import SectionWithStickyHeader from './SectionWithStickyHeader.svelte';

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

<div class="relative top-16 w-full flex flex-col justify-center items-center gap-8 pt-0">
	<SectionWithStickyHeader title={'Writing'}>
		<div class="intro">
			<p class="intro__text">
				Writing is my favorite thing to do. Reach out to me if you want to discuss something
				with me.
			</p>
			<p class="intro__text">Here to beta read my novel?</p>

			<button onclick={openModal} class="intro__cta font-label"> Read now → </button>
		</div>
	</SectionWithStickyHeader>

	<section class="pull-band">
		<p class="pull-line">
			the ordinary keeps a door open, if you know where to <span class="pull-accent">knock</span
			>.
		</p>
	</section>

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
			<h2 class="modal__title font-label">Enter Access Code</h2>
		{/snippet}

		<form class="modal__form">
			{#if !codeCorrect}
				<input
					bind:value={codeInput}
					oninput={() => (codeError = false)}
					class="modal__input"
					placeholder="Enter code here"
				/>
				{#if codeError}
					<p class="modal__error">Incorrect code, please try again.</p>
				{/if}

				<div class="modal__actions">
					<button type="submit" onclick={checkCode} class="modal__submit font-label">
						Submit →
					</button>
				</div>
			{:else}
				<p class="modal__granted font-label">Access granted</p>
				<a
					href="https://docs.google.com/document/d/1zpX6ykNxbZanwe62d4wN-fx7CIx0ErNN8YgyHXmBbTI/edit?tab=t.0#heading=h.ddb19arc5umg"
					class="modal__read font-label"
				>
					Click here to read the novel →
				</a>
			{/if}
		</form>
	</Modal>
{/if}

<style>
	.intro {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 34rem;
	}

	.intro__text {
		margin: 0;
		font-size: 1.15rem;
		line-height: 1.7;
		color: var(--ink-soft);
	}

	.intro__cta {
		align-self: flex-start;
		background: none;
		border: none;
		border-bottom: 1px solid var(--ink);
		padding: 0 0 3px;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--ink);
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.intro__cta:hover {
		color: var(--sun-red);
		border-color: var(--sun-red);
	}

	.pull-band {
		width: 100%;
		background-color: var(--paper-alt);
		padding: 4rem 1.5rem;
		display: flex;
		justify-content: center;
	}

	.pull-line {
		max-width: 34rem;
		margin: 0;
		font-size: clamp(1.9rem, 5vw, 3rem);
		line-height: 1.35;
		color: var(--ink);
	}

	.pull-accent {
		color: var(--indigo);
	}

	.modal__title {
		margin: 0;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--ink);
	}

	.modal__form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.modal__input {
		width: 100%;
		padding: 0.6rem 0.75rem;
		background: var(--paper);
		border: 1px solid var(--rule);
		border-radius: 2px;
		color: var(--ink);
		font-family: var(--font-serif);
	}

	.modal__input:focus-visible {
		outline: 2px solid var(--indigo);
		outline-offset: 1px;
	}

	.modal__error {
		margin: 0;
		font-size: 0.85rem;
		color: var(--sun-red);
	}

	.modal__actions {
		display: flex;
		justify-content: flex-end;
	}

	.modal__submit {
		background: none;
		border: none;
		border-bottom: 1px solid var(--ink);
		padding: 0 0 3px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--ink);
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.modal__submit:hover {
		color: var(--sun-red);
		border-color: var(--sun-red);
	}

	.modal__granted {
		margin: 0;
		text-align: center;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--sage);
	}

	.modal__read {
		display: inline-block;
		align-self: center;
		margin-top: 0.5rem;
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

	.modal__read:hover {
		color: var(--sun-red);
		border-color: var(--sun-red);
	}
</style>
