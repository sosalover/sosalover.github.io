<script>
	import Modal from './Modal.svelte';
	let { showModal = $bindable(), children, title = 'Default Title' } = $props();
</script>

<Modal bind:showModal>
	{@render children()}
	{#snippet header()}
		<h2>
			{title}
			<small><em>adjective</em> mod·al \ˈmō-dəl\</small>
		</h2>
	{/snippet}
</Modal>
