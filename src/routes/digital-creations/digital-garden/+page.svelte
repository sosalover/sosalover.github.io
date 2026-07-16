<script lang="ts">
  import DigitalGardenModal from "../../../components/DigitalGardenModal.svelte";
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
  const playerSprite = "/images/playerSprite.webp";
  const gridSize = 16;
  const legalPath = [
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  ];

  const harvestingControlsList = [
    "press space",
    "press 1",
    "press 2",
    "press 3",
  ];
  let items: Array<Array<null | Item>> = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(null));

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
    if (
      items[rowIndex + 1]?.[colIndex] &&
      items[rowIndex + 1]?.[colIndex]?.label !== "yes"
    )
      availableItems.push(items[rowIndex + 1][colIndex]);
    if (
      items[rowIndex - 1]?.[colIndex] &&
      items[rowIndex - 1]?.[colIndex]?.label !== "yes"
    )
      availableItems.push(items[rowIndex - 1][colIndex]);
    if (
      items[rowIndex]?.[colIndex + 1] &&
      items[rowIndex]?.[colIndex + 1]?.label !== "yes"
    )
      availableItems.push(items[rowIndex][colIndex + 1]);
    if (
      items[rowIndex]?.[colIndex - 1] &&
      items[rowIndex]?.[colIndex - 1]?.label !== "yes"
    )
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

<svelte:head>
  <title>Digital Garden — Thomas Moh</title>
  <link
    rel="preload"
    as="image"
    href={"/images/digital-garden-icons/blueberry.png"}
  />
  <link
    rel="preload"
    as="image"
    href={"/images/digital-garden-icons/carrot.png"}
  />
  <link
    rel="preload"
    as="image"
    href={"/images/digital-garden-icons/strawberry.png"}
  />
  <link
    rel="preload"
    as="image"
    href={"/images/digital-garden-icons/tomato.png"}
  />
  <link
    rel="preload"
    as="image"
    href={"/images/digital-garden-icons/wheat.png"}
  />
  <link rel="preload" as="image" href={"/images/pathBackground.jpg"} />
  <link rel="preload" as="image" href={"/images/grassBackground.jpg"} />
</svelte:head>

<div class="garden">
  <!-- Header -->
  <header class="garden__header">
    <span class="garden__marker" aria-hidden="true"></span>
    <h1 class="garden__title">Digital Garden</h1>
    <p class="sr-only">
      Use arrow keys to move the player around the grid. Press Space, 1, 2, or 3
      to harvest nearby items.
    </p>
  </header>

  <!-- Main Content Section (Grid and Preview Panel) -->
  <div class="flex-1 p-4">
    <div class="grid-container">
      <div
        class="grid grid-cols-16 grid-rows-16"
        role="grid"
        aria-label="Digital garden grid - use arrow keys to move"
      >
        {#each Array(gridSize) as _, rowIndex}
          {#each Array(gridSize) as _, colIndex}
            {#if items[rowIndex][colIndex] !== null || (playerPosition.x === colIndex && playerPosition.y === rowIndex)}
              <div
                class="cell h-full"
                class:backgroundCell={legalPath[rowIndex][colIndex] === 0 &&
                  items[rowIndex][colIndex] === null}
                class:yellow={legalPath[rowIndex][colIndex] === 1}
                style="grid-column: {colIndex + 1}; grid-row: {rowIndex + 1};"
                role="gridcell"
                aria-label={playerPosition.x === colIndex &&
                playerPosition.y === rowIndex
                  ? `Player position (row ${rowIndex + 1}, column ${colIndex + 1})`
                  : items[rowIndex][colIndex]
                    ? `${items[rowIndex][colIndex].title} at row ${rowIndex + 1}, column ${colIndex + 1}`
                    : undefined}
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
                      alt={items[rowIndex][colIndex]?.title}
                    />
                  </div>
                {/if}
              </div>
            {:else}
              <div
                class="cell h-full"
                class:backgroundCell={legalPath[rowIndex][colIndex] === 0}
                class:yellow={legalPath[rowIndex][colIndex] === 1}
                style="grid-column: {colIndex + 1}; grid-row: {rowIndex + 1};"
                aria-hidden="true"
              ></div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>

  <p class="garden__label font-label">Controls:</p>
  <div
    class="w-full p-2 md:w-1/3 mt-4 md:mt-0 md:p-4 md:h-full flex md:flex-col items-center gap-4"
  >
    <!-- Controls -->
    <div class="flex flex-col items-center">
      <div class="controls grid grid-cols-3 gap-2 w-32">
        <div></div>
        <button
          class="garden__dir"
          onclick={() => movePlayer("up")}
          disabled={!canMove("up")}
          aria-label="Move up"
        >
          Up
        </button>
        <div></div>

        <button
          class="garden__dir"
          onclick={() => movePlayer("left")}
          disabled={!canMove("left")}
          aria-label="Move left"
        >
          Left
        </button>
        <div></div>
        <button
          class="garden__dir"
          onclick={() => movePlayer("right")}
          disabled={!canMove("right")}
          aria-label="Move right"
        >
          Right
        </button>

        <div></div>
        <button
          class="garden__dir"
          onclick={() => movePlayer("down")}
          disabled={!canMove("down")}
          aria-label="Move down"
        >
          Down
        </button>
        <div></div>
      </div>
    </div>
    <div class="flex flex-col items-center flex-1/2">
      {#each availableItems as item, index}
        <p class="garden__label font-label">Harvest</p>
        <button
          class="garden__harvest font-label"
          onclick={() => {
            selectedItem = item;
            showModal = true;
          }}
          aria-label="Harvest {item?.title}"
        >
          {item?.title}
        </button>
        <p class="garden__hint font-label hidden md:flex">
          {`(${harvestingControlsList[index]})`}
        </p>
      {/each}
    </div>
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
    background-image: url("/images/pathBackground.jpg");
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
    gap: 10px;
    margin-bottom: 40px;
  }

  .garden {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--paper-alt);
  }

  @media (min-width: 768px) {
    .garden {
      flex-direction: row;
    }
  }

  .garden__header {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.85rem;
    padding: 1rem;
    color: var(--ink);
  }

  .garden__marker {
    width: 0.55rem;
    height: 0.55rem;
    flex-shrink: 0;
    background: var(--sage);
    border-radius: 1px;
  }

  .garden__title {
    font-size: 1.85rem;
    font-weight: 500;
    color: var(--ink);
  }

  .garden__label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-soft);
  }

  .garden__hint {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
  }

  .garden__dir,
  .garden__harvest {
    padding: 0.5rem 1rem;
    background: var(--paper);
    color: var(--ink);
    border: 1px solid var(--rule);
    border-radius: 2px;
    cursor: pointer;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition:
      border-color 0.2s ease,
      color 0.2s ease;
  }

  .garden__harvest {
    margin: 0.5rem;
    border-color: var(--indigo);
    color: var(--indigo);
  }

  .garden__dir:hover:not(:disabled),
  .garden__harvest:hover {
    border-color: var(--ink);
    color: var(--ink);
  }

  .garden__dir:focus-visible,
  .garden__harvest:focus-visible {
    outline: 2px solid var(--indigo);
    outline-offset: 2px;
  }

  .garden__dir:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .grid-container {
    height: min(80vh, 80vw);
    width: min(80vh, 80vw);
    margin: auto;
    margin-top: 20px;
  }
  * {
    touch-action: manipulation;
  }
</style>
