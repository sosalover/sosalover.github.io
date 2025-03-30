<script lang="ts">
  import DigitalGardenModal from "../../components/DigitalGardenModal.svelte";
  type Item = {
    title: string;
    image: string;
    link: string;
    text: string;
    icon: string;
    label: string;
  };
  let showModal = $state(false);
  let selectedItem: Item | null = $state(null);
  let playerPosition = $state({ x: 2, y: 0 });
  let { data } = $props();
  const sheetData = data.sheetData.slice(1);
  const playerSprite = "../src/images/playerSprite.webp";
  const gridSize = 8;
  const legalPath = [
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
  ];
  const harvestingControlsList = [
    "press space",
    "press 1",
    "press 2",
    "press 3",
  ];
  let items: Array<Array<null | Item>> = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  sheetData.forEach((item) => {
    const { itemPosition, ...rest } = item;
    const position = itemPosition.split("-");
    items[Number(position[0])][Number(position[1])] = rest;
  });
  const getAvailableItems = (
    /** @type {number} */ colIndex: number,
    /** @type {number} */ rowIndex: number,
  ) => {
    const availableItems = [];
    if (items[rowIndex + 1]?.[colIndex])
      availableItems.push(items[rowIndex + 1][colIndex]);
    if (items[rowIndex - 1]?.[colIndex])
      availableItems.push(items[rowIndex - 1][colIndex]);
    if (items[rowIndex]?.[colIndex + 1])
      availableItems.push(items[rowIndex][colIndex + 1]);
    if (items[rowIndex]?.[colIndex - 1])
      availableItems.push(items[rowIndex][colIndex - 1]);
    return availableItems;
  };
  let availableItems = $state(getAvailableItems(2, 0));

  /**
   * @param {{ key: string; }} event
   */
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      movePlayer("up");
    } else if (event.key === "ArrowDown") {
      movePlayer("down");
    } else if (event.key === "ArrowLeft") {
      movePlayer("left");
    } else if (event.key === "ArrowRight") {
      movePlayer("right");
    } else if (event.key === " ") {
      selectedItem = availableItems?.at(0) ?? null;
      if (selectedItem) showModal = true;
    } else if (event.key === "1") {
      selectedItem = availableItems?.at(1) ?? null;
      if (selectedItem) showModal = true;
    } else if (event.key === "2") {
      selectedItem = availableItems?.at(2) ?? null;
      if (selectedItem) showModal = true;
    } else if (event.key === "3") {
      selectedItem = availableItems?.at(3) ?? null;
      if (selectedItem) showModal = true;
    }
  }

  /**
   * @param {'up' | 'down' | 'left' | 'right'} direction
   */
  function canMove(direction: "up" | "down" | "left" | "right") {
    if (direction === "up") {
      return (
        playerPosition.y > 0 &&
        legalPath[playerPosition.y - 1][playerPosition.x] === 1
      );
    } else if (direction === "down") {
      return (
        playerPosition.y < gridSize - 1 &&
        legalPath[playerPosition.y + 1][playerPosition.x] === 1
      );
    } else if (direction === "left") {
      return (
        playerPosition.x > 0 &&
        legalPath[playerPosition.y][playerPosition.x - 1] === 1
      );
    } else if (direction === "right") {
      return (
        playerPosition.x < gridSize - 1 &&
        legalPath[playerPosition.y][playerPosition.x + 1] === 1
      );
    }
    return false;
  }

  /**
   * @param {'up' | 'down' | 'left' | 'right'} direction
   */
  function movePlayer(direction: "up" | "down" | "left" | "right") {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (direction === "up" && playerPosition.y > 0) {
      newY -= 1;
    } else if (direction === "down" && playerPosition.y < gridSize - 1) {
      newY += 1;
    } else if (direction === "left" && playerPosition.x > 0) {
      newX -= 1;
    } else if (direction === "right" && playerPosition.x < gridSize - 1) {
      newX += 1;
    }

    if (legalPath[newY][newX] === 1) {
      playerPosition = { x: newX, y: newY };
      availableItems = getAvailableItems(playerPosition.x, playerPosition.y);
    }
  }
</script>

<div class="flex flex-col md:flex-row bg-gray-800 items-center justify-center">
  <!-- Header -->
  <header class="text-center p-4 bg-gray-800 text-white">
    <h1 class="text-3xl">Digital Garden</h1>
  </header>

  <!-- Main Content Section (Grid and Preview Panel) -->
  <div class="flex-1 p-4">
    <div class="grid-container">
      <div class="grid grid-cols-8 grid-rows-8">
        {#each Array(gridSize) as _, rowIndex}
          {#each Array(gridSize) as _, colIndex}
            <div
              class="cell h-full"
              class:backgroundCell={legalPath[rowIndex][colIndex] === 0 &&
                items[rowIndex][colIndex] === null}
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
              {#if items[rowIndex][colIndex] !== null}
                <div
                  class="backgroundCell h-full w-full flex items-center justify-center"
                >
                  <img
                    src={`/images/digital-garden-icons/${items[rowIndex][colIndex].icon}.png`}
                    class="w-3/4 h-3/4 md:w-1/2 md:h-1/2 object-cover absolute"
                    alt={items[rowIndex][colIndex].icon}
                  />
                </div>
              {/if}
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>

  <!-- Controls and Preview Panel (Desktop: Right, Mobile: Below) -->
  <div class="md:w-1/3 mt-4 md:mt-0 md:p-4 flex flex-col items-center">
    <!-- Controls -->
    <p class=" text-white">Controls</p>
    <div class="controls">
      <button onclick={() => movePlayer("up")} disabled={!canMove("up")}
        >Up</button
      >
      <button onclick={() => movePlayer("down")} disabled={!canMove("down")}
        >Down</button
      >
      <button onclick={() => movePlayer("left")} disabled={!canMove("left")}
        >Left</button
      >
      <button onclick={() => movePlayer("right")} disabled={!canMove("right")}
        >Right</button
      >
    </div>

    <p class=" text-white">Harvest</p>
    {#each availableItems as item, index}
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded m-2"
        onclick={() => {
          selectedItem = item;
          showModal = true;
        }}
      >
        {item?.title}
      </button>
      <p class="text-white hidden md:flex">
        {`(${harvestingControlsList[index]})`}
      </p>
    {/each}
  </div>
</div>

<DigitalGardenModal bind:showModal {...selectedItem}
  ><div></div></DigitalGardenModal
>

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
    background-image: url("/images/pathBackground.avif");
    background-size: cover;
    background-position: center;
  }

  .backgroundCell {
    background-image: url("/images/grassBackground.jpg");
    background-size: cover;
    background-position: center;
  }
  .controls {
    margin-top: 8px;
    display: flex;
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
