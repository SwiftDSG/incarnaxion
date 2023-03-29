<template>
  <div class="rd-layout">
    <header class="rd-header"></header>
    <main ref="rdBody" class="rd-body">
      <nuxt-page class="rd-main" />
    </main>
  </div>
</template>

<script lang="ts" setup>
  const { viewMode, assets, loaded } = useMain();

  function resizeHandler(e: MediaQueryList | MediaQueryListEvent): void {
    if (e.matches) viewMode.value = "mobile";
    else viewMode.value = "desktop";
  }

  function loadAsset(
    index: number,
    category: "male" | "female" | "backgrounds",
    sub?: string
  ): void {
    if (
      (sub && assets.value[category]?.[sub]?.[index]) ||
      assets.value[category]?.[index]
    ) {
      const image: HTMLImageElement = new Image();
      image.onload = () => {
        if (sub) assets.value[category][sub][index].file = image;
        else assets.value[category][index].file = image;
        loadAsset(index + 1, category, sub);
      };
      if (sub) image.src = assets.value[category][sub][index].src;
      else image.src = assets.value[category][index].src;
    } else if (assets.value[category]?.[sub]) {
      const keys: string[] = Object.keys(assets.value[category]);
      const i: number = keys.indexOf(sub);
      loadAsset(0, category, keys[i + 1]);
    } else if (assets.value[category]) {
      if (category === "male") loadAsset(0, "female", "hairs");
      else if (category === "female") loadAsset(0, "backgrounds");
      else {
        loaded.value = true;
      }
    }
  }

  watch(
    () => viewMode.value,
    (val, oldVal) => {
      if (val && oldVal) location.reload();
    }
  );

  onMounted(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addEventListener("change", resizeHandler);
    resizeHandler(mediaQuery);

    loadAsset(0, "male", "hairs");
  });
</script>

<style lang="scss" scoped>
  .rd-layout {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background: var(--background-depth-two-color);
    display: flex;
    flex-direction: column;
  }
</style>

<style lang="scss">
  :root {
    --primary-color: #f0296d;
    --secondary-color: #fff;
    --error-color: #ff584c;
    --warning-color: #ffc904;
    --success-color: #6bc785;
    --border-color: #ececec;
    --font-main-color: #020f13;
    --font-secondary-color: #7f7f7f;
    --background-depth-one-color: #ffffff;
    --background-depth-two-color: #f8f8f8;
    --background-depth-three-color: #ececec;
    --border: 1px solid var(--border-color);
    --box-shadow: 0 0.5rem 1rem rgba(199, 199, 199, 0.25);

    // @media (prefers-color-scheme: dark) {
    //   --background-depth-one-color: #290e17;
    //   --background-depth-two-color: #36121f;
    //   --background-depth-three-color: #3e1422;
    //   --border-color: #4a2532;
    //   --box-shadow: 0 0.5rem 1rem rgba(56, 56, 56, 0.125);
    //   --font-main-color: #bba5ad;
    // }
  }
  html,
  body {
    position: relative;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-family: "Quicksand", -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--font-main-color);
    background: var(--background-depth-two-color);
    overflow-x: hidden;
    @media only screen and (max-width: 1900px) and (min-width: 1600px) {
      font-size: 22px;
    }
    @media only screen and (max-width: 1599px) and (min-width: 1480px) {
      font-size: 21px;
    }
    @media only screen and (max-width: 1479px) and (min-width: 1380px) {
      font-size: 20px;
    }
    @media only screen and (max-width: 1379px) and (min-width: 1320px) {
      font-size: 19px;
    }
    @media only screen and (max-width: 1319px) and (min-width: 1024px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 640px) {
      font-size: 24px;
    }
    @media only screen and (max-width: 320px) {
      font-size: 17px;
    }
    @media only screen and (max-width: 1024px) {
      height: auto;
      overflow-y: auto;
      .rd-title-1 {
        font-size: 1.25rem;
      }
      .rd-title-2 {
        font-size: 1.125rem;
      }
    }
  }
  .rd-title-1 {
    font-size: 1.75rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-title-2 {
    font-size: 1.375rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-headline-1 {
    font-size: 1.25rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-headline-2 {
    font-size: 1rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-headline-3 {
    font-size: 0.85rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-headline-4 {
    font-size: 0.75rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-headline-5 {
    font-size: 0.65rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-headline-6 {
    font-size: 0.55rem;
    font-weight: 700;
    font-family: "Quicksand";
  }
  .rd-subtitle-text {
    font-size: 0.75rem;
    font-weight: 500;
    font-family: "Quicksand";
  }
  .rd-body-text {
    font-size: 0.6rem;
    font-weight: 500;
    font-family: "Quicksand";
  }
  .rd-caption-text {
    font-size: 0.55rem;
    font-family: "Quicksand";
    font-weight: 500;
    color: var(--font-main-color);
    opacity: 0.5;
  }
  .rd-button-text {
    font-family: "Quicksand";
    font-size: 0.55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
    transform: translateX(0.0625rem);
  }
  span.rd-text-wrapper,
  span.rd-word-wrapper,
  span.rd-letter-wrapper,
  span.rd-image-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    span.rd-text-container,
    span.rd-word-container,
    span.rd-letter-container,
    span.rd-image-container {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  span.rd-image-wrapper {
    width: 100%;
    height: 100%;
    span.rd-image-container {
      width: 100%;
      height: 100%;
      img.rd-image {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.25);
      }
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }
  @keyframes rd-loading {
    0% {
      left: 0;
      right: 100%;
    }
    50% {
      left: 0;
      right: 0;
    }
    100% {
      left: 100%;
      right: 0;
    }
  }
  @keyframes rd-shake {
    0% {
      transform: translate(1px, 1px);
    }
    10% {
      transform: translate(-1px, -2px);
    }
    20% {
      transform: translate(-3px, 0px);
    }
    30% {
      transform: translate(3px, 2px);
    }
    40% {
      transform: translate(1px, -1px);
    }
    50% {
      transform: translate(-1px, 2px);
    }
    60% {
      transform: translate(-3px, 1px);
    }
    70% {
      transform: translate(3px, 1px);
    }
    80% {
      transform: translate(-1px, -1px);
    }
    90% {
      transform: translate(1px, 2px);
    }
    100% {
      transform: translate(1px, -2px);
    }
  }
  @keyframes rd-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rd-circular-rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-140deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>
