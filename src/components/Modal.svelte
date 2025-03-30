<script>
	let { showModal = $bindable(), header, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class="md:left-1/4 md:min-w-1/2 transition-transform transform"
>
	<div class="modal-content">
		{@render header?.()}
		<hr />
		{@render children?.()}
		<hr />
		<button onclick={() => dialog.close()}>Close Modal</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		position: fixed;
		top: 25%;
		overflow: hidden;
		z-index: 50;
		min-height: 50%;
		max-height: 50%;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog > .modal-content {
		padding: 1em;
		background: white;
		border-radius: 0.5em;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
	}

	/* For the mobile view */
	dialog[open] {
		animation: slideUpMobile 0.3s ease-out;
	}

	/* Desktop - Centered modal */
	@media (min-width: 640px) {
		dialog[open] {
			animation: slideUpDesktop 0.3s ease-out;
		}
	}

	@keyframes slideUpMobile {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes slideUpDesktop {
		from {
			transform: translateY(10%);
		}
		to {
			transform: translateY(0);
		}
	}

	/* Button styling */
	button {
		display: block;
		margin-top: 1em;
		padding: 0.5em;
		border: none;
		background-color: #4caf50;
		color: white;
		cursor: pointer;
		border-radius: 0.25em;
	}

	button:hover {
		background-color: #45a049;
	}
</style>
