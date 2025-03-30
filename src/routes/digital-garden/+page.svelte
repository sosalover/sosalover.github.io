<script>
	import DigitalGardenModal from '../../components/DigitalGardenModal.svelte';

	let showModal = $state(false);
	let selectedItem = $state('');
	let playerPosition = $state({ x: 2, y: 0 }); // Initial position of the player at (0, 0)
	const playerSprite = '../src/images/playerSprite.webp'; // Adjust path as necessary
	// @ts-ignore
	const pathBackground = '../src/images/pathBackground.jpg';
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
	let data = '';
	async function fetchCSV() {
		const sheetId = '157-hKxR5BwVdJ_aT3dQs4wQtGA9d50CnNTrpigENczs';
		const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

		try {
			const response = await fetch(url);
			const csvText = await response.text();
			data = csvText;
		} catch (error) {
			console.error('Error fetching CSV:', error);
		}
	}

	/**
	 * @param {string} csvString
	 */
	function dataToJson(csvString) {
		const rows = csvString.trim().split('\n');

		// Define the static labels for the fields
		// Map each row to the corresponding label
		return rows.map((row) => {
			const rowEntries = row.split(',');

			// Handle quotes: explicitly clean up the cells
			const cleanedRowEntries = rowEntries.map((cell) => {
				// Remove quotes and trim any unnecessary spaces
				return cell.replace(/"/g, '').trim();
			});
			return {
				itemPosition: cleanedRowEntries[0],
				title: cleanedRowEntries[1],
				image: cleanedRowEntries[2],
				link: cleanedRowEntries[3],
				text: cleanedRowEntries[4],
				icon: cleanedRowEntries[5],
				label: cleanedRowEntries[6]
			};
		});
	}

	fetchCSV().then(() => console.log(dataToJson(data)));
</script>

<div class="grid-container">
	<div class="grid">
		{#each Array(gridSize) as _, rowIndex}
			{#each Array(gridSize) as _, colIndex}
				<div
					class="cell"
					class:backgroundCell={legalPath[rowIndex][colIndex] === 0 &&
						items[rowIndex][colIndex] === 0}
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
	<button onclick={() => movePlayer('up')} disabled={!canMove('up')}>Up</button>
	<button onclick={() => movePlayer('down')} disabled={!canMove('down')}>Down</button>
	<button onclick={() => movePlayer('left')} disabled={!canMove('left')}>Left</button>
	<button onclick={() => movePlayer('right')} disabled={!canMove('right')}>Right</button>
</div>
<DigitalGardenModal bind:showModal title={selectedItem}><h1>{selectedItem}</h1></DigitalGardenModal>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(gridSize, 1fr);
		grid-template-rows: repeat(gridSize, 1fr);
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.cell {
		background-color: #f9f9f9;
		position: relative;
	}
	.yellow {
		background-image: url('../src/images/pathBackground.avif');
		background-size: cover;
		background-position: center;
	}

	.backgroundCell {
		background-image: url('../src/images/grassBackground.jpg');
		background-size: cover;
		background-position: center;
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
