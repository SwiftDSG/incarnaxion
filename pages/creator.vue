<template>
  <div class="rd-container">
    <div ref="rdContainer" class="rd-canvas-container">
      <canvas
        class="rd-canvas"
        ref="rdCanvas"
        width="1500"
        height="1500"
      ></canvas>
      <div
        class="rd-areas-container"
        @mouseenter="mouseInHandler"
        @mouseleave="mouseOutHandler"
      >
        <div
          v-for="(bound, i) in bounds"
          :key="i"
          class="rd-area rd-area-background"
          @mouseenter="mouseIndexChange"
          @touchstart="mouseIndexChange"
          :data-index="i"
          :style="`
            width: ${bound.width}%;
            height: ${bound.height}%;
            top: ${bound.top}%;
            left: ${bound.left}%;
          `"
          @click="openPanel"
        ></div>
      </div>
    </div>
    <div
      v-if="viewMode === 'mobile' && panelOption"
      ref="rdPanel"
      class="rd-panel-container"
      :class="panelOpened ? 'rd-panel-container-active' : ''"
    >
      <div class="rd-panel-header">
        <span class="rd-panel-title rd-headline-4">{{ panelOption.name }}</span>
        <rd-input-button-small icon="close" @clicked="closePanel" />
      </div>
      <div class="rd-panel-body">
        <div
          v-for="(option, i) in panelOption.option"
          :key="i"
          class="rd-panel-content"
          :class="
            i === selection[panelOption.identifier] - 1
              ? 'rd-panel-content-active'
              : ''
          "
          @click="changeAsset"
          :data-index="i + 1"
        >
          <div
            :style="`background-image: url('${option.src}')`"
            class="rd-panel-content-image"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-if="viewMode === 'desktop'"
      ref="rdPanel"
      class="rd-panel-container"
      :class="panelOpened ? 'rd-panel-container-active' : ''"
    >
      <div class="rd-panel-overlay"></div>
      <div v-if="panelOption" class="rd-panel-wrapper">
        <div class="rd-panel-header">
          <span class="rd-panel-title rd-headline-4">{{
            panelOption.name
          }}</span>
          <rd-input-button-small icon="close" @clicked="closePanel" />
        </div>
        <div class="rd-panel-body">
          <div
            v-for="(option, i) in panelOption.option"
            :key="i"
            class="rd-panel-content"
            :class="
              i === selection[panelOption.identifier] - 1
                ? 'rd-panel-content-active'
                : ''
            "
            @click="changeAsset"
            :data-index="i + 1"
          >
            <div
              :style="`background-image: url('${option.src}')`"
              class="rd-panel-content-image"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="viewMode === 'desktop'"
      ref="rdCursor"
      class="rd-cursor-container"
    >
      <div class="rd-cursor">
        <div class="rd-cursor-icon-wrapper">
          <div class="rd-cursor-icon-container">
            <rd-svg
              class="rd-cursor-icon"
              :name="mouseActive.icon"
              color="primary"
            />
          </div>
        </div>
      </div>
      <span class="rd-cursor-text-wrapper rd-headline-6">
        <span class="rd-cursor-text-container">
          <span class="rd-cursor-text">{{ mouseActive.name }}</span>
        </span>
      </span>
    </div>
    <div v-if="loading" class="rd-loading-container" ref="rdLoadingContainer">
      <div class="rd-loading-outer">
        <div
          class="rd-loading-inner"
          :style="`width: ${(assetsLoaded / assetsCount) * 100}%`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ComputedRef, Ref } from "vue";
  import { gsap } from "gsap";

  interface Selection {
    gender: "male" | "female";
    backgrounds: number;
    hairs: number;
    bodies: number;
    eyes: number;
    eyebrows: number;
    clothes: number;
    accessories: number;
  }

  const { viewMode, assets, loaded } = useMain();

  const rdLoadingContainer: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdContainer: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdCanvas: Ref<HTMLCanvasElement> = ref<HTMLCanvasElement>(null);
  const rdCursor: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdPanel: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);

  const assetsCount: Ref<number> = ref<number>(0);
  const assetsLoaded: Ref<number> = ref<number>(0);

  const loading: Ref<boolean> = ref<boolean>(true);

  const canvasCtx: Ref<CanvasRenderingContext2D> =
    ref<CanvasRenderingContext2D>(null);

  const mouseIn: Ref<boolean> = ref<boolean>(false);
  const mouseAnim: Ref<GSAPTimeline> = ref<GSAPTimeline>(null);
  const mouseTextAnim: Ref<GSAPTimeline> = ref<GSAPTimeline>(null);
  const mouseIndex: Ref<number> = ref<number>(0);
  const mouseActive: Ref<{
    name: string;
    icon: string;
  }> = ref<{
    name: string;
    icon: string;
  }>({
    name: "backdrop",
    icon: "palette",
  });

  const panelAnim: Ref<GSAPTimeline> = ref<GSAPTimeline>(null);
  const panelOpened: Ref<boolean> = ref<boolean>(false);
  const panelIndex: Ref<number> = ref<number>(0);
  const panelOption: Ref<{
    index: number;
    name: string;
    identifier: string;
    option: {
      src: string;
      file: HTMLImageElement;
    }[];
  }> = ref<{
    index: number;
    name: string;
    identifier: string;
    option: {
      src: string;
      file: HTMLImageElement;
    }[];
  }>(null);

  const selection: Ref<Selection> = ref<Selection>(null);

  const bounds: {
    width: number;
    height: number;
    top: number;
    left: number;
    name: string;
    icon: string;
    identifier: string;
  }[] = [
    {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      name: "backdrop",
      icon: "palette",
      identifier: "backgrounds",
    },
    {
      width: 55,
      height: 32.5,
      top: 67.5,
      left: 22.5,
      name: "clothing",
      icon: "clothing-man",
      identifier: "clothes",
    },
    {
      width: 50,
      height: 50,
      top: 20,
      left: 25,
      name: "hair",
      icon: "face-man",
      identifier: "hairs",
    },
    {
      width: 30,
      height: 7.5,
      top: 42.5,
      left: 35,
      name: "eyes",
      icon: "eye",
      identifier: "eyes",
    },
    {
      width: 30,
      height: 5,
      top: 37.5,
      left: 35,
      name: "eyebrows",
      icon: "feather",
      identifier: "eyebrows",
    },
  ];

  const rem: ComputedRef<number> = computed((): number =>
    typeof getComputedStyle === "function"
      ? parseInt(getComputedStyle(document.body).fontSize)
      : 0
  );

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
        assetsLoaded.value++;
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

  function mouseInHandler(): void {
    mouseIn.value = true;
  }
  function mouseOutHandler(): void {
    mouseIn.value = false;
  }
  function mouseIndexChange(e: MouseEvent | TouchEvent): void {
    if (e.target instanceof HTMLElement) {
      const index: number = parseInt(e.target.dataset.index);
      mouseIndex.value = index;
    }
  }

  function moveCursor(e: MouseEvent): void {
    const { clientX, clientY }: MouseEvent = e;

    gsap.to(rdCursor.value, {
      x: clientX,
      y: clientY,
      duration: 0,
    });
  }

  function openPanel(e: MouseEvent): void {
    panelOption.value = {
      index: mouseIndex.value,
      name: bounds[mouseIndex.value].name,
      identifier: bounds[mouseIndex.value].identifier,
      option:
        mouseIndex.value === 0
          ? assets.value.backgrounds
          : assets.value[selection.value.gender][
              bounds[mouseIndex.value].identifier
            ],
    };
    if (viewMode.value === "desktop") {
      const { clientX, clientY }: MouseEvent = e;
      const x: number =
        clientX + 15 * rem.value >= window.innerWidth
          ? window.innerWidth - 15 * rem.value
          : clientX;
      const y: number =
        clientY + 19 * rem.value >= window.innerHeight
          ? window.innerHeight - 19 * rem.value
          : clientY;

      if (panelOpened.value) {
        gsap.to(rdPanel.value, {
          x,
          y,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        setTimeout(() => {
          gsap.to(rdPanel.value, {
            x,
            y,
            duration: 0,
          });
          panelOpened.value = true;
          panelAnim.value = animate.panelOpen(rdPanel.value, () => {});
        }, 100);
      }
    } else {
      setTimeout(() => {
        panelAnim.value = animate.panelShow(
          rdPanel.value,
          rdContainer.value,
          () => {
            panelOpened.value = true;
          }
        );
      }, 100);
    }
  }
  function closePanel(): void {
    if (viewMode.value === "desktop") {
      panelAnim.value = animate.panelClose(rdPanel.value, () => {
        panelOpened.value = false;
      });
    } else {
      panelAnim.value = animate.panelHide(
        rdPanel.value,
        rdContainer.value,
        () => {
          panelOpened.value = false;
        }
      );
    }
  }
  function changeAsset(e: MouseEvent): void {
    if (e.target instanceof HTMLElement) {
      const index: number = parseInt(e.target.dataset.index);
      selection.value[panelOption.value.identifier] = index;
    }
  }

  const animate = {
    loaderInit(rdLoadingContainer: HTMLElement, cb: () => void): void {
      const tl: GSAPTimeline = gsap.timeline({ onComplete: cb });

      tl.to(rdLoadingContainer.children[0], {
        x: 0,
        width: "10rem",
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
    loaderExit(rdLoadingContainer: HTMLElement, cb: () => void): void {
      const tl: GSAPTimeline = gsap.timeline({ onComplete: cb });

      tl.to(rdLoadingContainer.children[0], {
        x: "5rem",
        width: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }).to(rdLoadingContainer, {
        opacity: 0,
        duration: 0.25,
      });
    },
    cursorShow(rdCursorContainer: HTMLElement): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({});

      const rdCursor: HTMLElement =
        rdCursorContainer.querySelector(".rd-cursor");
      const rdCursorIcon: HTMLElement = rdCursorContainer.querySelector(
        ".rd-cursor-icon-container"
      );

      tl.to(rdCursor, {
        opacity: 1,
        duration: 0.125,
        ease: "power2.inOut",
      })
        .to(
          rdCursor,
          {
            scale: 1,
            duration: 0.25,
            ease: "power3.inOut",
          },
          "<0"
        )
        .to(
          rdCursorIcon,
          {
            opacity: 1,
            y: 0,
            ease: "power2.inOut",
            duration: 0.25,
          },
          "<0.125"
        );

      return tl;
    },
    cursorHide(rdCursorContainer: HTMLElement): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({});

      const rdCursor: HTMLElement =
        rdCursorContainer.querySelector(".rd-cursor");
      const rdCursorIcon: HTMLElement = rdCursorContainer.querySelector(
        ".rd-cursor-icon-container"
      );

      tl.to(rdCursor, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      })
        .to(
          rdCursor,
          {
            scale: 0.75,
            duration: 0.25,
            ease: "power3.inOut",
          },
          "<0"
        )
        .to(rdCursorIcon, {
          opacity: 0,
          y: "-100%",
          duration: 0,
        });

      return tl;
    },
    cursorTextShow(
      rdCursorContainer: HTMLElement,
      changeCursor?: boolean
    ): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({});

      const rdCursorText: HTMLElement = rdCursorContainer.querySelector(
        `.rd-cursor-text-container`
      );
      const rdCursorIcon: HTMLElement = rdCursorContainer.querySelector(
        ".rd-cursor-icon-container"
      );

      tl.to(rdCursorText, {
        y: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });

      if (changeCursor) {
        tl.to(
          rdCursorIcon,
          {
            opacity: 0,
            y: "-100%",
            duration: 0,
          },
          "<0"
        ).to(
          rdCursorIcon,
          {
            opacity: 1,
            y: 0,
            ease: "power2.inOut",
            duration: 0.25,
          },
          "<0"
        );
      }

      return tl;
    },
    cursorTextHide(
      rdCursorContainer: HTMLElement,
      cb?: () => void
    ): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({
        onComplete() {
          if (cb) cb();
        },
      });

      const rdCursorText: HTMLElement = rdCursorContainer.querySelector(
        `.rd-cursor-text-container`
      );
      const rdCursorIcon: HTMLElement = rdCursorContainer.querySelector(
        ".rd-cursor-icon-container"
      );

      tl.to(rdCursorText, {
        y: "100%",
        duration: 0.25,
        ease: "power2.inOut",
      });

      if (cb) {
        tl.to(
          rdCursorIcon,
          {
            y: "100%",
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.25,
          },
          "<0"
        ).to(rdCursorIcon, {
          opacity: 0,
          y: "-100%",
          duration: 0,
        });
      }

      tl.to(rdCursorText, {
        y: "-105%",
        duration: 0,
      });

      return tl;
    },
    panelOpen(rdPanel: HTMLElement, cb?: () => void): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({
        onComplete() {
          if (cb) cb();
        },
      });

      tl.to(rdPanel.children[0], {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut",
      }).to(rdPanel.children[1], {
        opacity: 1,
        duration: 0.25,
      });

      return tl;
    },
    panelClose(rdPanel: HTMLElement, cb?: () => void): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({
        onComplete() {
          tl.to(rdPanel, {
            opacity: 1,
            duration: 0,
          })
            .to(rdPanel.children[0], {
              scale: 0.875,
              opacity: 0,
              duration: 0,
            })
            .to(rdPanel.children[1], {
              opacity: 0,
              duration: 0,
            });
          if (cb) cb();
        },
      });

      rdPanel.style.transformOrigin = "top right";

      tl.to(rdPanel, {
        opacity: 0,
        duration: 0.25,
        ease: "power0.linear",
      });

      return tl;
    },
    panelShow(
      rdPanel: HTMLElement,
      rdContainer: HTMLElement,
      cb?: () => void
    ): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({
        onComplete() {
          if (cb) cb();
        },
      });

      tl.to(rdPanel, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      })
        .to(
          rdContainer,
          {
            y: `-${window.innerWidth / 2 + 2 * rem.value}`,
            duration: 0.25,
            ease: "power2.out",
          },
          "<0"
        )
        .to(rdPanel.children[1], {
          opacity: 1,
          duration: 0.25,
        });

      return tl;
    },
    panelHide(
      rdPanel: HTMLElement,
      rdContainer: HTMLElement,
      cb?: () => void
    ): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({
        onComplete() {
          if (cb) cb();
        },
      });

      tl.to(rdPanel.children[1], {
        opacity: 0,
        duration: 0.25,
      })
        .to(rdPanel, {
          y: "105%",
          duration: 0.25,
          ease: "power2.inOut",
        })
        .to(
          rdContainer,
          {
            y: 0,
            duration: 0.25,
            ease: "power2.inOut",
          },
          "<0"
        );

      return tl;
    },
  };

  watch(
    () => mouseIn.value,
    (val) => {
      if (viewMode.value === "desktop") {
        if (val) {
          mouseActive.value = {
            icon: bounds[mouseIndex.value].icon,
            name: bounds[mouseIndex.value].name,
          };
          if (mouseAnim.value) mouseAnim.value.kill();
          if (mouseTextAnim.value) mouseTextAnim.value.kill();
          mouseAnim.value = animate.cursorShow(rdCursor.value);
          mouseTextAnim.value = animate.cursorTextShow(rdCursor.value);
        } else {
          if (mouseAnim.value) mouseAnim.value.kill();
          if (mouseTextAnim.value) mouseTextAnim.value.kill();
          mouseAnim.value = animate.cursorHide(rdCursor.value);
          mouseTextAnim.value = animate.cursorTextHide(rdCursor.value);
        }
      }
    }
  );
  watch(
    () => mouseIndex.value,
    (val) => {
      if (mouseIn.value && viewMode.value === "desktop") {
        if (mouseTextAnim.value) mouseTextAnim.value.kill();
        mouseTextAnim.value = animate.cursorTextHide(rdCursor.value, () => {
          mouseActive.value = {
            icon: bounds[val].icon,
            name: bounds[val].name,
          };
          mouseTextAnim.value = animate.cursorTextShow(rdCursor.value, true);
        });
      }
    }
  );

  watch(
    () => selection.value,
    (val) => {
      canvasCtx.value.beginPath();
      canvasCtx.value.drawImage(
        assets.value.backgrounds[selection.value.backgrounds - 1].file,
        0,
        0,
        1500,
        1500
      );
      canvasCtx.value.drawImage(
        assets.value[val.gender].bodies[selection.value.bodies - 1].file,
        0,
        0,
        1500,
        1500
      );
      canvasCtx.value.drawImage(
        assets.value[val.gender].hairs[selection.value.hairs - 1].file,
        0,
        0,
        1500,
        1500
      );
      canvasCtx.value.drawImage(
        assets.value[val.gender].clothes[selection.value.clothes - 1].file,
        0,
        0,
        1500,
        1500
      );
      canvasCtx.value.drawImage(
        assets.value[val.gender].eyes[selection.value.eyes - 1].file,
        0,
        0,
        1500,
        1500
      );
      canvasCtx.value.drawImage(
        assets.value[val.gender].eyebrows[selection.value.eyebrows - 1].file,
        0,
        0,
        1500,
        1500
      );
      canvasCtx.value.closePath();
    },
    { deep: true }
  );
  watch(
    () => loaded.value,
    (val) => {
      if (val) {
        setTimeout(() => {
          animate.loaderExit(rdLoadingContainer.value, () => {
            loading.value = false;
          });
        }, 500);
        selection.value = {
          gender: "male",
          backgrounds: 1,
          hairs: 1,
          bodies: 1,
          eyes: 1,
          eyebrows: 1,
          clothes: 1,
          accessories: 1,
        };
        if (viewMode.value === "desktop")
          window.addEventListener("mousemove", moveCursor);
      }
    }
  );

  onMounted(() => {
    canvasCtx.value = rdCanvas.value.getContext("2d");
    canvasCtx.value.globalAlpha = 1;
    canvasCtx.value.fillStyle = "#000";
    canvasCtx.value.strokeStyle = "#000";
    canvasCtx.value.lineWidth = 0;
    canvasCtx.value.setLineDash([0, 0]);
    canvasCtx.value.save();

    assetsCount.value =
      assets.value.male.accessories.length +
      assets.value.male.bodies.length +
      assets.value.male.clothes.length +
      assets.value.male.eyebrows.length +
      assets.value.male.eyes.length +
      assets.value.male.hairs.length +
      assets.value.female.accessories.length +
      assets.value.female.bodies.length +
      assets.value.female.clothes.length +
      assets.value.female.eyebrows.length +
      assets.value.female.eyes.length +
      assets.value.female.hairs.length +
      assets.value.backgrounds.length;

    animate.loaderInit(rdLoadingContainer.value, () => {
      loadAsset(0, "male", "hairs");
    });
  });

  onBeforeUnmount(() => {
    if (viewMode.value === "desktop")
      window.removeEventListener("mousemove", moveCursor);
  });
</script>

<style lang="scss" scoped>
  .rd-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    .rd-canvas-container {
      position: absolute;
      top: calc(50% - 37.5vh);
      left: calc(50% - 37.5vh);
      width: 75vh;
      height: 75vh;
      border-radius: 1rem;
      border: 0.5rem solid var(--background-depth-two-color);
      box-shadow: var(--box-shadow);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      canvas.rd-canvas {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .rd-images-container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img.rd-image {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .rd-areas-container {
        cursor: none;
        position: absolute;
        width: 100%;
        height: 100%;
        .rd-area {
          position: absolute;
          &.rd-area-background {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .rd-cursor-container {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      height: 1.5rem;
      display: flex;
      align-items: center;
      .rd-cursor {
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        background: var(--background-depth-one-color);
        box-shadow: 0 0.75rem 0.75rem 0.375rem rgba(63, 61, 134, 0.125);
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
        border-bottom-left-radius: 0.75rem;
        padding: 0 0.25rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-content: center;
        opacity: 0;
        transform: scale(0.75);
        transform-origin: top left;
        .rd-cursor-icon-wrapper {
          position: relative;
          width: 1rem;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          .rd-cursor-icon-container {
            position: relative;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: translateY(-100%);
          }
        }
      }
      span.rd-cursor-text-wrapper {
        position: relative;
        width: 4rem;
        height: calc(0.55rem + 2px);
        margin-left: 0.5rem;
        line-height: 1;
        text-shadow: -1px -1px 0 var(--background-depth-one-color),
          1px -1px 0 var(--background-depth-one-color),
          -1px 1px 0 var(--background-depth-one-color),
          1px 1px 0 var(--background-depth-one-color);
        text-transform: capitalize;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        overflow: hidden;
        span.rd-cursor-text-container {
          position: absolute;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transform: translateY(-105%);
        }
      }
    }
    .rd-panel-container {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 15rem;
      height: 19rem;
      .rd-panel-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        padding: 1rem;
        box-sizing: border-box;
        background: var(--background-depth-one-color);
        box-shadow: var(--box-shadow);
        opacity: 0;
        transform-origin: top left;
        transform: scale(0.875);
      }
      .rd-panel-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        opacity: 0;
        .rd-panel-header {
          position: relative;
          width: 100%;
          height: 4rem;
          padding: 1rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &::after {
            content: "";
            top: 100%;
            left: 0;
            position: absolute;
            width: 100%;
            height: 1px;
            background: var(--border-color);
          }
        }
        .rd-panel-body {
          position: relative;
          width: 100%;
          height: 15rem;
          padding: 1rem;
          box-sizing: border-box;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          overflow-y: auto;
          .rd-panel-content {
            cursor: pointer;
            position: relative;
            width: 6rem;
            height: 6rem;
            border-radius: 0.5rem;
            .rd-panel-content-image {
              pointer-events: none;
              z-index: 2;
              position: relative;
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
              background-size: contain;
              object-fit: contain;
            }
            &::before {
              z-index: 0;
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: calc(0.5rem + 4px);
              background: var(--font-main-color);
              opacity: 0.25;
              transition: 0.125s ease-out transform, 0.125s ease-out width,
                0.125s ease-out height, 0.125s ease-out background-color,
                0.25s opacity;
            }
            &::after {
              z-index: 1;
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
              background: var(--background-depth-two-color);
            }
            &:hover::before {
              width: calc(100% + 8px);
              height: calc(100% + 8px);
              transform: translate(-4px, -4px);
            }
            &:active::before {
              opacity: 0.5;
            }
            &.rd-panel-content-active::before {
              width: calc(100% + 8px);
              height: calc(100% + 8px);
              transform: translate(-4px, -4px);
              background: var(--primary-color);
              opacity: 1;
            }
          }
        }
      }
      &.rd-panel-container-active {
        pointer-events: all;
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .rd-loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--background-depth-one-color);
      display: flex;
      justify-content: center;
      align-items: center;
      .rd-loading-outer {
        position: relative;
        width: 0;
        height: 0.25rem;
        border-radius: 0.125rem;
        background: var(--border-color);
        display: flex;
        overflow: hidden;
        transform: translateX(-5rem);
        .rd-loading-inner {
          position: relative;
          height: 100%;
          border-radius: 0.125rem;
          background: var(--primary-color);
          transition: 0.25s width ease-out;
        }
      }
    }
    @media only screen and (max-width: 1023px) {
      .rd-canvas-container {
        top: calc(50% - 40vw);
        left: calc(50% - 40vw);
        width: 80vw;
        height: 80vw;
        box-sizing: border-box;
      }
      .rd-panel-container {
        position: absolute;
        top: auto;
        bottom: 0 !important;
        width: 100vw;
        height: calc(100vw + 4rem);
        background: var(--background-depth-one-color);
        box-shadow: 0 -0.5rem 1rem rgba(199, 199, 199, 0.125);
        display: flex;
        flex-direction: column;
        transform: translateY(105%);
        .rd-panel-header {
          position: relative;
          width: 100%;
          height: 4rem;
          padding: 1rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &::after {
            content: "";
            top: 100%;
            left: 0;
            position: absolute;
            width: 100%;
            height: 1px;
            background: var(--border-color);
          }
        }
        .rd-panel-body {
          position: relative;
          width: 100%;
          height: 100vw;
          padding: 1rem;
          box-sizing: border-box;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          overflow-y: auto;
          opacity: 0;
          .rd-panel-content {
            cursor: pointer;
            position: relative;
            width: calc(50vw - 1.5rem);
            height: calc(50vw - 1.5rem);
            border-radius: 0.5rem;
            .rd-panel-content-image {
              pointer-events: none;
              z-index: 2;
              position: relative;
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
              background-size: contain;
              object-fit: contain;
            }
            &::before {
              z-index: 0;
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: calc(0.5rem + 4px);
              background: var(--font-main-color);
              opacity: 0.25;
              transition: 0.125s ease-out transform, 0.125s ease-out width,
                0.125s ease-out height, 0.125s ease-out background-color,
                0.25s opacity;
            }
            &::after {
              z-index: 1;
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
              background: var(--background-depth-two-color);
            }
            &:hover::before {
              width: calc(100% + 8px);
              height: calc(100% + 8px);
              transform: translate(-4px, -4px);
            }
            &:active::before {
              opacity: 0.5;
            }
            &.rd-panel-content-active::before {
              width: calc(100% + 8px);
              height: calc(100% + 8px);
              transform: translate(-4px, -4px);
              background: var(--primary-color);
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
