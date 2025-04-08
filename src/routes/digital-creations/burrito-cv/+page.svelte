<script lang="ts">
  import { onMount } from "svelte";

  const buildUrl = "/digital-creations/burrito-cv/Build";
  const loaderUrl = `${buildUrl}/Build.loader.js`;

  const config = {
    dataUrl: `${buildUrl}/Build.data`,
    frameworkUrl: `${buildUrl}/Build.framework.js`,
    codeUrl: `${buildUrl}/Build.wasm`,
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Chipotle CV",
    productVersion: "0.1",
    devicePixelRatio: 1,
  };

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let loadingBar: HTMLDivElement;
  let progressBarFull: HTMLDivElement;
  let mobileWarning: HTMLDivElement;

  onMount(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
      mobileWarning.style.display = "block";
      setTimeout(() => {
        mobileWarning.style.display = "none";
      }, 5000);
    } else {
      canvas.style.width = "960px";
      canvas.style.height = "600px";
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      // @ts-ignore: createUnityInstance is injected by Unity loader
      createUnityInstance(canvas, config, (progress: number) => {
        progressBarFull.style.width = `${progress * 100}%`;
      })
        .then(() => {
          loadingBar.style.display = "none";
        })
        .catch((message: string) => {
          alert(message);
        });
    };

    document.body.appendChild(script);
  });

  function restartGame() {
    window.location.reload();
  }
</script>

<svelte:head>
  <title>Burrito CV</title>
</svelte:head>

<div bind:this={container} id="unity-container" class="unity-desktop">
  <canvas bind:this={canvas} id="unity-canvas" width="960" height="600"
  ></canvas>

  <div bind:this={loadingBar} id="unity-loading-bar">
    <div id="unity-logo"></div>
    <div id="unity-progress-bar-empty">
      <div bind:this={progressBarFull} id="unity-progress-bar-full"></div>
    </div>
  </div>

  <div bind:this={mobileWarning} id="unity-mobile-warning">
    WebGL builds are not supported on mobile devices.
  </div>

  <div id="unity-footer">
    <a href="/Thomas_Moh_SE_Resume.pdf" download="ThomasMoh_Resume">
      <button class="button">Download My Resume</button>
    </a>
    <button class="button" on:click={restartGame}>Restart Game</button>
  </div>
</div>

<style>
  /* Optionally migrate any CSS you used in the original setup here */
</style>
