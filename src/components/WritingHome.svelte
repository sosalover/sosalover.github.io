<script>
	import { onMount } from 'svelte';
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

	onMount(() => {
		const w = /** @type {any} */ (window);
		if (!w.ml) {
			w.ml = function () {
				(w.ml.q = w.ml.q || []).push(arguments);
			};
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://assets.mailerlite.com/js/universal.js';
			document.head.appendChild(script);
		}
		w.ml('account', '2512820');
	});
</script>

<div class="relative top-16 w-full flex flex-col justify-center items-center gap-8 pt-0">
	<section class="about">
		<img src="/images/writing/author-photo.jpg" alt="Thomas Moh" class="about__portrait" />
		<div class="about__content">
			<p class="about__blurb">
				Hey! I'm Thomas. I'm currently writing and self-publishing my novel, <em
					>Mockingbirds Talk</em
				>. I write about what it means to be a human. 
			</p>
			<p class="about__blurb">
				Reluctantly, I post content on socials. My newsletter is healthier. 
			</p>
			<div class="about__socials font-label">
				<a href="https://instagram.com/thomasmohwriting" target="_blank" rel="noopener noreferrer"
					>Instagram ↗</a
				>
				<a href="https://tiktok.com/@thomasmohwriting" target="_blank" rel="noopener noreferrer"
					>TikTok ↗</a
				>
				<a href="mailto:thomasmohwriting@gmail.com">thomasmohwriting@gmail.com</a>
			</div>
		</div>
	</section>

	<SectionWithStickyHeader title={'Newsletter'}>
		<div class="newsletter">
			<div class="newsletter__media">
				<img
					src="/images/writing/newsletter-bookstore.jpg"
					alt="Thomas on an escalator in front of a floor-to-ceiling library wall"
					class="newsletter__image"
				/>
			</div>
			<div class="newsletter__copy">
				<h3 class="newsletter__title">Mockingbirds Talk updates. Spare writing. Publishing journey. </h3>
				<p class="newsletter__desc">
					I send a free newsletter every Tuesday morning. Subscribe to get the first chapter of Mockingbirds Talk, see what's going on in my publishing journey, or hear some odd thoughts from a random human. 
				</p>
				<!-- MailerLite Universal -->
				<div class="ml-embedded" data-form="lghLu7"></div>
			</div>
		</div>
	</SectionWithStickyHeader>

	<div class="left-align">
		<SectionWithStickyHeader title={'Mockingbirds Talk Quotes'}>
			<div class="quote-block">
				<p class="quote-line">
					And out of a dream, or a nightmare, I heard her utter:
					<span class="quote-accent">"Thank you."</span>
				</p>
				<p class="quote-byline font-label">— Mockingbirds Talk</p>
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

		<SectionWithStickyHeader title={'Beta Reading'}>
			<div class="intro">
				<p class="intro__text">Here to beta read Mockingbirds Talk? Enter your access code below.</p>

				<button onclick={openModal} class="intro__cta font-label"> Read now → </button>
			</div>
		</SectionWithStickyHeader>
	</div>
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
	.left-align {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.left-align :global(.section-body) {
		justify-content: flex-start;
	}

	.left-align :global(.entry__text) {
		align-items: center;
		text-align: center;
	}

	.left-align :global(.entry__heading) {
		justify-content: center;
	}

	.left-align :global(.entry__cta) {
		align-self: center;
	}

	.about {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.75rem;
		width: 100%;
		max-width: 44rem;
		padding: 3rem 1.5rem 1rem;
		text-align: center;
	}

	.about__portrait {
		width: 9rem;
		height: 9rem;
		object-fit: cover;
		border: 1px solid var(--rule);
		border-radius: 2px;
		flex-shrink: 0;
	}

	.about__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.about__blurb {
		margin: 0;
		font-size: 1.2rem;
		line-height: 1.7;
		color: var(--ink-soft);
	}

	.about__socials {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1.5rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.about__socials a {
		color: var(--ink);
		border-bottom: 1px solid var(--ink);
		padding-bottom: 2px;
	}

	.about__socials a:hover {
		color: var(--sun-red);
		border-color: var(--sun-red);
	}

	@media (min-width: 768px) {
		.about {
			flex-direction: row;
			align-items: center;
			text-align: left;
			gap: 3rem;
			max-width: 56rem;
		}

		.about__content {
			align-items: flex-start;
		}

		.about__socials {
			justify-content: flex-start;
		}
	}

	.newsletter {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		max-width: 64rem;
		min-width: 0;
	}

	.newsletter__media {
		width: 100%;
		min-width: 0;
	}

	.newsletter__image {
		width: 100%;
		display: block;
		object-fit: cover;
		aspect-ratio: 4 / 3;
		border: 1px solid var(--rule);
		border-radius: 2px;
	}

	.newsletter__copy {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	.newsletter__title {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 500;
		color: var(--ink);
	}

	.newsletter__desc {
		margin: 0;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--ink-soft);
		max-width: 30rem;
	}

	/* Best-effort override of the MailerLite embed's default styling — it
	   injects its own scoped CSS with an #id selector, so these need
	   !important to reliably win. Fragile if MailerLite changes their
	   markup/class names. */
	.newsletter__copy :global(.ml-embedded) {
		width: 100%;
		max-width: 100%;
		min-width: 0;
	}
	.newsletter__copy :global(.ml-form-embedContainer),
	.newsletter__copy :global(.ml-form-embedWrapper) {
		width: 100% !important;
		max-width: 100% !important;
		min-width: 0 !important;
		background-color: transparent !important;
	}
	.newsletter__copy :global(.ml-embedded input.form-control) {
		box-sizing: border-box !important;
		width: 100% !important;
		max-width: 100% !important;
		border: 1px solid var(--rule) !important;
		border-radius: 2px !important;
		background: var(--paper) !important;
		color: var(--ink) !important;
		font-family: var(--font-serif) !important;
		box-shadow: none !important;
	}
	.newsletter__copy :global(.ml-embedded .ml-form-embedSubmit button.primary) {
		background: var(--sun-red) !important;
		border-radius: 2px !important;
		border: none !important;
		font-family: var(--font-label) !important;
		text-transform: uppercase !important;
		letter-spacing: 0.08em !important;
		font-size: 0.75rem !important;
		box-shadow: none !important;
		transition: background 0.2s ease !important;
	}
	.newsletter__copy :global(.ml-embedded .ml-form-embedSubmit button.primary:hover) {
		background: var(--ink) !important;
	}

	@media (min-width: 768px) {
		.newsletter {
			flex-direction: row;
			align-items: center;
			gap: 4rem;
		}

		.newsletter__media {
			flex: 0 0 calc(45% - 2rem);
		}

		.newsletter__copy {
			flex: 1 1 calc(55% - 2rem);
		}
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 64rem;
	}

	.intro__text {
		margin: 0;
		max-width: 34rem;
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

	.quote-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 40rem;
		text-align: center;
	}

	.quote-line {
		margin: 0;
		font-size: clamp(1.9rem, 5vw, 3rem);
		line-height: 1.35;
		color: var(--ink);
	}

	.quote-byline {
		margin-top: 1.25rem;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--ink-soft);
	}

	.quote-accent {
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
