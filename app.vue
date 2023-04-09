<template>
  <div class="rd-layout" ref="rdLayout">
    <header v-if="viewMode === 'desktop'" class="rd-header">
      <div class="rd-logo-container">
        <img src="/incarnation_logo.webp" class="rd-logo" />
      </div>
    </header>
    <main ref="rdBody" class="rd-body">
      <nuxt-page class="rd-main" />
    </main>
  </div>
</template>

<script lang="ts" setup>
  const { viewMode } = useMain();

  function resizeHandler(e: MediaQueryList | MediaQueryListEvent): void {
    if (e.matches) viewMode.value = "mobile";
    else viewMode.value = "desktop";
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
  });
</script>

<style lang="scss" scoped>
  .rd-layout {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background: var(--background-depth-one-color);
    display: flex;
    flex-direction: column;
    .rd-header {
      z-index: 1;
      position: relative;
      width: 100%;
      height: 5rem;
      padding: 2rem 2rem 0 2rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .rd-logo-container {
        position: relative;
        height: 100%;
        display: flex;
      }
    }
    main.rd-body {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
</style>

<style lang="scss">
  :root {
    --primary-color: #864fef;
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

    @media (prefers-color-scheme: dark) {
      --background-depth-one-color: #050724;
      --background-depth-two-color: #070b36;
      --background-depth-three-color: #080c3d;
      --border-color: #0b0675;
      --box-shadow: 0 0.5rem 1rem rgba(33, 31, 90, 0.125);
      --font-main-color: #b8bdf0;
    }
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
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
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
      .rd-title-1 {
        font-size: 2rem;
      }
    }
    @media only screen and (max-width: 1319px) and (min-width: 1024px) {
      font-size: 18px;
      .rd-title-1 {
        font-size: 2rem;
      }
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
        font-size: 1rem;
      }
    }
  }
  .rd-title-1 {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: "Prompt";
    line-height: 1;
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
    font-family: "Montserrat";
  }
  .rd-headline-5 {
    font-size: 0.65rem;
    font-weight: 700;
    font-family: "Montserrat";
  }
  .rd-headline-6 {
    font-size: 0.55rem;
    font-weight: 700;
    font-family: "Montserrat";
  }
  .rd-subtitle-text {
    font-size: 0.75rem;
    font-weight: 500;
    font-family: "Montserrat";
  }
  .rd-body-text {
    font-size: 0.6rem;
    font-weight: 500;
    font-family: "Montserrat";
  }
  .rd-caption-text {
    font-size: 0.55rem;
    font-family: "Montserrat";
    font-weight: 500;
    color: var(--font-main-color);
    opacity: 0.5;
  }
  .rd-button-text {
    font-family: "Montserrat";
    font-size: 0.55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
    transform: translateX(0.0625rem);
  }
  span.rd-text-wrapper,
  span.rd-word-wrapper,
  span.rd-letter-wrapper,
  span.rd-image-wrapper,
  span.rd-svg-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    span.rd-text-container,
    span.rd-word-container,
    span.rd-letter-container,
    span.rd-image-container,
    span.rd-svg-container {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      span.rd-letter,
      span.rd-text,
      span.rd-word,
      .rd-image,
      svg.rd-svg {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
      }
      &.rd-letter-container-up,
      &.rd-text-container-up,
      &.rd-word-container-up,
      &.rd-image-container-up,
      &.rd-svg-container-up {
        transform: translateY(-100%);
        span.rd-letter,
        span.rd-text,
        span.rd-word,
        .rd-image,
        svg.rd-svg {
          transform: translateY(100%);
        }
      }
      &.rd-letter-container-down,
      &.rd-text-container-down,
      &.rd-word-container-down,
      &.rd-image-container-down,
      &.rd-svg-container-down {
        transform: translateY(100%);
        span.rd-letter,
        span.rd-text,
        span.rd-word,
        .rd-image,
        svg.rd-svg {
          transform: translateY(-100%);
        }
      }
      &.rd-letter-container-left,
      &.rd-text-container-left,
      &.rd-word-container-left,
      &.rd-image-container-left,
      &.rd-svg-container-left {
        transform: translateX(-100%);
        span.rd-letter,
        span.rd-text,
        span.rd-word,
        .rd-image,
        svg.rd-svg {
          transform: translateX(100%);
        }
      }
      &.rd-letter-container-right,
      &.rd-text-container-right,
      &.rd-word-container-right,
      &.rd-image-container-right,
      &.rd-svg-container-right {
        transform: translateX(100%);
        span.rd-letter,
        span.rd-text,
        span.rd-word,
        .rd-image,
        svg.rd-svg {
          transform: translateX(-100%);
        }
      }
    }
  }
  span.rd-image-wrapper {
    width: 100%;
    height: 100%;
    span.rd-image-container {
      width: 100%;
      height: 100%;
      .rd-image {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
  @keyframes rd-move-x {
    from,
    to {
      border-radius: 54% 79% 75% 58% / 70% 66% 71% 47%;
    }
    33% {
      border-radius: 79% 43% 56% 67% / 58% 64% 61% 60%;
      transform: translate(2.75em, 0) rotate(0) scale(0.75, 0.875);
      background-color: #7de9ee;
    }
    67% {
      border-radius: 55% 77% 56% 67% / 58% 64% 61% 60%;
      transform: translate(1.25em, -0.5em) rotate(0) scale(1.125, 0.875);
      background-color: #6bc785;
    }
  }
  @keyframes rd-move-y {
    from,
    to {
      border-radius: 60% 59% 51% 58% / 69% 64% 52% 55%;
    }
    33% {
      border-radius: 51% 95% 72% 59% / 75% 98% 54% 75%;
      transform: translate(0, 0.5em) rotate(0) scale(1, 1);
      background-color: #e3ee7d;
    }
    67% {
      border-radius: 74% 85% 63% 87% / 81% 100% 62% 82%;
      transform: translate(1em, 2em) rotate(0) scale(0.75, 0.875);
      background-color: #ee7d8a;
    }
  }
</style>
