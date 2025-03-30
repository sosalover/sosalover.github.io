<script>
	import DigitalGardenModal from '../../components/DigitalGardenModal.svelte';

	let showModal = $state(false);
	let selectedItem = $state('');
	let playerPosition = $state({ x: 2, y: 0 }); // Initial position of the player at (0, 0)
	const playerSprite = '../src/images/playerSprite.webp'; // Adjust path as necessary
	const gridSize = 8;
	const legalPath = [
		[0, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 0]
	];
	let items = [
		[0, 'SCROOCHIE', 0, 0, 0, 0, 'POOKIE', 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	];
	const getAvailableItems = (/** @type {number} */ colIndex, /** @type {number} */ rowIndex) => {
		const availableItems = [];
		if (items[rowIndex + 1]?.[colIndex]) availableItems.push(items[rowIndex + 1][colIndex]);
		if (items[rowIndex - 1]?.[colIndex]) availableItems.push(items[rowIndex - 1][colIndex]);
		if (items[rowIndex]?.[colIndex + 1]) availableItems.push(items[rowIndex][colIndex + 1]);
		if (items[rowIndex]?.[colIndex - 1]) availableItems.push(items[rowIndex][colIndex - 1]);
		return availableItems;
	};
	let availableItems = $state(getAvailableItems(2, 0));

	/**
	 * @param {{ key: string; }} event
	 */
	function onKeyDown(event) {
		if (event.key === 'ArrowUp') {
			movePlayer('up');
		} else if (event.key === 'ArrowDown') {
			movePlayer('down');
		} else if (event.key === 'ArrowLeft') {
			movePlayer('left');
		} else if (event.key === 'ArrowRight') {
			movePlayer('right');
		} else if (event.key === ' ') {
			selectedItem = String(availableItems?.at(0)) ?? '';
			if (availableItems.length > 0) showModal = true;
		}
	}

	/**
	 * @param {'up' | 'down' | 'left' | 'right'} direction
	 */
	function canMove(direction) {
		if (direction === 'up') {
			return playerPosition.y > 0 && legalPath[playerPosition.y - 1][playerPosition.x] === 1;
		} else if (direction === 'down') {
			return (
				playerPosition.y < gridSize - 1 && legalPath[playerPosition.y + 1][playerPosition.x] === 1
			);
		} else if (direction === 'left') {
			return playerPosition.x > 0 && legalPath[playerPosition.y][playerPosition.x - 1] === 1;
		} else if (direction === 'right') {
			return (
				playerPosition.x < gridSize - 1 && legalPath[playerPosition.y][playerPosition.x + 1] === 1
			);
		}
		return false;
	}

	/**
	 * @param {'up' | 'down' | 'left' | 'right'} direction
	 */
	function movePlayer(direction) {
		let newX = playerPosition.x;
		let newY = playerPosition.y;

		if (direction === 'up' && playerPosition.y > 0) {
			newY -= 1;
		} else if (direction === 'down' && playerPosition.y < gridSize - 1) {
			newY += 1;
		} else if (direction === 'left' && playerPosition.x > 0) {
			newX -= 1;
		} else if (direction === 'right' && playerPosition.x < gridSize - 1) {
			newX += 1;
		}

		// Check if the new position is a legal path (1)
		if (legalPath[newY][newX] === 1) {
			playerPosition = { x: newX, y: newY };
			availableItems = getAvailableItems(playerPosition.x, playerPosition.y);
		}
	}
</script>

<div class="grid-container">
	<div class="grid">
		{#each Array(gridSize) as _, rowIndex}
			{#each Array(gridSize) as _, colIndex}
				<div
					class="cell"
					class:yellow={legalPath[rowIndex][colIndex] === 1}
					style="grid-column: {colIndex + 1}; grid-row: {rowIndex + 1};"
				>
					{#if playerPosition.x === colIndex && playerPosition.y === rowIndex}
						<img
							src={playerSprite}
							alt="Player"
							class="w-full h-full object-contain absolute player"
						/>
					{/if}
					{#if items[rowIndex][colIndex] !== 0}
						<div class="absolute">{items[rowIndex][colIndex]}</div>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>

<div class="controls">
	<button on:click={() => movePlayer('up')} disabled={!canMove('up')}>Up</button>
	<button on:click={() => movePlayer('down')} disabled={!canMove('down')}>Down</button>
	<button on:click={() => movePlayer('left')} disabled={!canMove('left')}>Left</button>
	<button on:click={() => movePlayer('right')} disabled={!canMove('right')}>Right</button>
</div>
<DigitalGardenModal bind:showModal title={selectedItem}><h1>{selectedItem}</h1></DigitalGardenModal>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(gridSize, 1fr);
		grid-template-rows: repeat(gridSize, 1fr);
		gap: 5px;
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.cell {
		border: 1px solid #ccc;
		background-color: #f9f9f9;
		position: relative;
	}
	.yellow {
		background-color: yellowgreen;
	}

	.player {
	}

	.controls {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-bottom: 40px;
	}

	button {
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
	}

	button:disabled {
		background-color: #ccc;
	}

	.grid-container {
		height: min(80vh, 80vw);
		width: min(80vh, 80vw);
		margin: auto;
		margin-top: 20px;
	}
</style>
