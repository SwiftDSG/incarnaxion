<template>
  <div class="rd-container">
    <div v-if="loaded" ref="rdContainer" class="rd-canvas-container">
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
      v-if="loaded && viewMode === 'desktop'"
      class="rd-action-container rd-action-container-left"
    >
      <rd-input-button-small
        icon="palette"
        tooltip="Backdrop"
        @clicked="mouseIndexChange(0)"
        :type="panelIndex === 0 && panelOpened ? 'primary' : 'default'"
      />
      <rd-input-button-small
        icon="glasses"
        tooltip="Accessories"
        @clicked="mouseIndexChange(3)"
        :type="panelIndex === 3 && panelOpened ? 'primary' : 'default'"
      />
      <rd-input-button-small
        :icon="selection.gender === 'male' ? 'clothing-man' : 'clothing-woman'"
        tooltip="Clothing"
        @clicked="mouseIndexChange(1)"
        :type="panelIndex === 1 && panelOpened ? 'primary' : 'default'"
      />
    </div>
    <div
      v-if="loaded && viewMode === 'desktop'"
      class="rd-action-container rd-action-container-right"
    >
      <rd-input-button-small
        icon="eye"
        tooltip="Eyes"
        @clicked="mouseIndexChange(4)"
        :type="panelIndex === 4 && panelOpened ? 'primary' : 'default'"
      />
      <rd-input-button-small
        icon="feather"
        tooltip="Eyebrows"
        @clicked="mouseIndexChange(5)"
        :type="panelIndex === 5 && panelOpened ? 'primary' : 'default'"
      />
      <rd-input-button-small
        icon="emoticon"
        tooltip="Mouth"
        @clicked="mouseIndexChange(6)"
        :type="panelIndex === 6 && panelOpened ? 'primary' : 'default'"
      />
      <rd-input-button-small
        :icon="selection.gender === 'male' ? 'face-man' : 'face-woman'"
        tooltip="Hair"
        @clicked="mouseIndexChange(2)"
        :type="panelIndex === 2 && panelOpened ? 'primary' : 'default'"
      />
    </div>
    <div class="rd-export-button-container">
      <button class="rd-export-button rd-button-text" @click="exportOpen">
        EXPORT
      </button>
    </div>
    <div
      v-if="viewMode === 'mobile' && panelOption && loaded"
      ref="rdPanel"
      class="rd-panel-container"
      :class="panelOpened ? 'rd-panel-container-active' : ''"
    >
      <div class="rd-panel-header">
        <span class="rd-panel-title rd-headline-4">Configure avatar</span>
        <rd-input-button-small icon="close" @clicked="closePanel" />
      </div>
      <div class="rd-panel-actions-wrapper">
        <div class="rd-panel-actions-container">
          <rd-input-button-small
            icon="palette"
            tooltip="Backdrop"
            @clicked="mouseIndexChange(0)"
            :type="panelIndex === 0 && panelOpened ? 'primary' : 'default'"
          />
          <rd-input-button-small
            icon="glasses"
            tooltip="Accessories"
            @clicked="mouseIndexChange(3)"
            :type="panelIndex === 3 && panelOpened ? 'primary' : 'default'"
          />
          <rd-input-button-small
            :icon="
              selection.gender === 'male' ? 'clothing-man' : 'clothing-woman'
            "
            tooltip="Clothing"
            @clicked="mouseIndexChange(1)"
            :type="panelIndex === 1 && panelOpened ? 'primary' : 'default'"
          />
          <rd-input-button-small
            icon="eye"
            tooltip="Eyes"
            @clicked="mouseIndexChange(4)"
            :type="panelIndex === 4 && panelOpened ? 'primary' : 'default'"
          />
          <rd-input-button-small
            icon="feather"
            tooltip="Eyebrows"
            @clicked="mouseIndexChange(5)"
            :type="panelIndex === 5 && panelOpened ? 'primary' : 'default'"
          />
          <rd-input-button-small
            icon="emoticon"
            tooltip="Mouth"
            @clicked="mouseIndexChange(6)"
            :type="panelIndex === 6 && panelOpened ? 'primary' : 'default'"
          />
          <rd-input-button-small
            :icon="selection.gender === 'male' ? 'face-man' : 'face-woman'"
            tooltip="Hair"
            @clicked="mouseIndexChange(2)"
            :type="panelIndex === 2 && panelOpened ? 'primary' : 'default'"
          />
        </div>
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
            :style="
              option.multi
                ? `background-image: url('${option.src[0]}')`
                : `background-image: url('${option.src}')`
            "
            class="rd-panel-content-image"
          ></div>
          <div
            v-if="option.multi"
            :style="`background-image: url('${option.src[1]}')`"
            class="rd-panel-content-image"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-if="viewMode === 'desktop' && loaded"
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
              :style="
                option.multi
                  ? `background-image: url('${option.src[0]}')`
                  : `background-image: url('${option.src}')`
              "
              class="rd-panel-content-image"
            ></div>
            <div
              v-if="option.multi"
              :style="`background-image: url('${option.src[1]}')`"
              class="rd-panel-content-image"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="viewMode === 'desktop' && loaded"
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
    <div
      v-if="selection && !loaded"
      ref="rdQuestionContainer"
      class="rd-question-wrapper"
    >
      <div
        class="rd-question-container"
        data-index="0"
        :class="questionIndex === 0 ? 'rd-question-container-active' : ''"
      >
        <span class="rd-question rd-headline-4">Choose your gender</span>
        <div class="rd-question-answers">
          <div
            class="rd-question-answer"
            :class="
              selection.gender === 'male' ? 'rd-question-answer-active' : ''
            "
            @click="selection.gender = 'male'"
          >
            <div class="rd-question-answer-icon-container">
              <rd-svg
                class="rd-question-answer-icon"
                name="male"
                color="secondary"
              />
            </div>
          </div>
          <div
            class="rd-question-answer"
            :class="
              selection.gender === 'female' ? 'rd-question-answer-active' : ''
            "
            @click="selection.gender = 'female'"
          >
            <div class="rd-question-answer-icon-container">
              <rd-svg
                class="rd-question-answer-icon"
                name="female"
                color="secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="rd-question-container"
        :class="questionIndex === 1 ? 'rd-question-container-active' : ''"
        data-index="1"
      >
        <span class="rd-question rd-headline-4">Choose your skin tone</span>
        <div class="rd-question-answers">
          <div
            class="rd-question-answer"
            style="background-color: #d89c74"
            :class="selection.bodies === 1 ? 'rd-question-answer-active' : ''"
            @click="selection.bodies = 1"
          ></div>
          <div
            class="rd-question-answer"
            style="background-color: #aa6b57"
            :class="selection.bodies === 2 ? 'rd-question-answer-active' : ''"
            @click="selection.bodies = 2"
          ></div>
          <div
            class="rd-question-answer"
            style="background-color: #fdc78e"
            :class="selection.bodies === 3 ? 'rd-question-answer-active' : ''"
            @click="selection.bodies = 3"
          ></div>
          <div
            class="rd-question-answer"
            style="background-color: #b8785f"
            :class="selection.bodies === 4 ? 'rd-question-answer-active' : ''"
            @click="selection.bodies = 4"
          ></div>
          <div
            class="rd-question-answer"
            style="background-color: #53250c"
            :class="selection.bodies === 5 ? 'rd-question-answer-active' : ''"
            @click="selection.bodies = 5"
          ></div>
        </div>
      </div>
      <div
        class="rd-question-container"
        :class="questionIndex === 2 ? 'rd-question-container-active' : ''"
        data-index="2"
      >
        <span class="rd-question rd-headline-4"
          >Lastly, what is your name?</span
        >
        <div class="rd-question-answers">
          <input
            type="text"
            class="rd-question-answer rd-headline-4"
            @input="updateName"
            ref="rdQuestionAnswerInput"
          />
          <div class="rd-question-answer-shadow"></div>
        </div>
      </div>
      <button
        class="rd-question-button rd-question-button-prev"
        style="opacity: 0; transform: scale(0.875)"
        :class="questionIndex > 0 ? 'rd-question-button-active' : ''"
        @click="prevQuestionIndex"
      >
        <div class="rd-question-button-icon-container">
          <rd-svg
            name="arrow-left"
            class="rd-question-button-icon"
            color="secondary"
          />
        </div>
      </button>
      <button
        class="rd-question-button rd-question-button-next"
        style="opacity: 0; transform: scale(0.875)"
        :class="
          (questionIndex === 0 && selection.gender) ||
          (questionIndex === 1 && selection.bodies) ||
          (questionIndex === 2 && name)
            ? 'rd-question-button-active'
            : ''
        "
        @click="nextQuestionIndex"
      >
        <div class="rd-question-button-icon-container">
          <rd-svg
            name="arrow-right"
            class="rd-question-button-icon"
            color="secondary"
          />
        </div>
      </button>
    </div>
    <div
      class="rd-export-container"
      ref="rdExportContainer"
      :class="exportOpened ? 'rd-export-container-active' : ''"
    >
      <span class="rd-export-title rd-headline-4">Share your avatar!</span>
      <div class="rd-export-image-container">
        <canvas
          class="rd-export-canvas"
          width="1500"
          height="1500"
          ref="rdExportCanvas"
        ></canvas>
      </div>
      <div class="rd-export-caption-container">
        <p class="rd-export-caption rd-body-text" ref="rdExportCaption">
          {{
            `Hi, ${name} here! Imbued with all the cosmic powers that burst from ‘the big bang phenomenon,’ I finally find my IncarnaXion, and now I’m ready to BLAST OFF to ArtXplosion!!!`
          }}
          <br />
          <br />
          Let’s take a journey together into this creative galaxy! Visit
          @vcd.outliningdesign to incarnate yourself and get ready to BLAST
          OFF!!
          <br />
          <br />
          #ArtXplosion #VCDears #OutliningDesign2023 #IncarnaXion
        </p>
      </div>
      <button @click="download" class="rd-export-button rd-button-text">
        DOWNLOAD
      </button>
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
    mouths: number;
  }

  const { viewMode, assets, loaded } = useMain();

  const rdQuestionContainer: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdLoadingContainer: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdContainer: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdCanvas: Ref<HTMLCanvasElement> = ref<HTMLCanvasElement>(null);
  const rdExportCanvas: Ref<HTMLCanvasElement> = ref<HTMLCanvasElement>(null);
  const rdExportCaption: Ref<HTMLParagraphElement> =
    ref<HTMLParagraphElement>(null);
  const rdCursor: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdPanel: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdQuestionAnswerInput: Ref<HTMLInputElement> =
    ref<HTMLInputElement>(null);

  const assetsCount: Ref<number> = ref<number>(0);
  const assetsLoaded: Ref<number> = ref<number>(0);

  const loading: Ref<boolean> = ref<boolean>(false);

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

  const questionIndex: Ref<number> = ref<number>(-1);

  const panelAnim: Ref<GSAPTimeline> = ref<GSAPTimeline>(null);
  const panelIndex: Ref<number> = ref<number>(-1);
  const panelOpened: Ref<boolean> = ref<boolean>(false);
  const panelOption: Ref<{
    index: number;
    name: string;
    identifier: string;
    option: {
      src: string;
      file: HTMLImageElement;
      multi?: boolean;
    }[];
  }> = ref<{
    index: number;
    name: string;
    identifier: string;
    option: {
      src: string;
      file: HTMLImageElement;
      multi?: boolean;
    }[];
  }>(null);

  const exportOpened: Ref<boolean> = ref<boolean>(false);

  const selection: Ref<Selection> = ref<Selection>({
    gender: null,
    backgrounds: 1,
    hairs: 1,
    bodies: null,
    eyes: 1,
    eyebrows: 1,
    clothes: 1,
    accessories: 0,
    mouths: 1,
  });

  const name: Ref<string> = ref<string>("");

  const bounds: Ref<
    {
      width: number;
      height: number;
      top: number;
      left: number;
      name: string;
      icon: string;
      identifier: string;
    }[]
  > = ref<
    {
      width: number;
      height: number;
      top: number;
      left: number;
      name: string;
      icon: string;
      identifier: string;
    }[]
  >([
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
      width: 40,
      height: 7.5,
      top: 42.5,
      left: 30,
      name: "accessories",
      icon: "glasses",
      identifier: "accessories",
    },
    {
      width: 22.5,
      height: 7.5,
      top: 42.5,
      left: 38.75,
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
    {
      width: 10,
      height: 5,
      top: 55,
      left: 45,
      name: "mouths",
      icon: "emoticon",
      identifier: "mouths",
    },
  ]);

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
        if (sub) {
          if (assets.value[category][sub][index].multi) {
            assets.value[category][sub][index].file = [];
            assets.value[category][sub][index].file.push(image);
            const newImage: HTMLImageElement = new Image();
            newImage.onload = () => {
              assetsLoaded.value++;
              assets.value[category][sub][index].file.push(newImage);
              loadAsset(index + 1, category, sub);
            };
            newImage.src = assets.value[category][sub][index].src[1];
          } else {
            assetsLoaded.value++;
            assets.value[category][sub][index].file = image;
            loadAsset(index + 1, category, sub);
          }
        } else {
          assetsLoaded.value++;
          assets.value[category][index].file = image;
          loadAsset(index + 1, category, sub);
        }
      };
      if (sub) {
        if (assets.value[category][sub][index].multi) {
          image.src = assets.value[category][sub][index].src[0];
        } else {
          image.src = assets.value[category][sub][index].src;
        }
      } else image.src = assets.value[category][index].src;
    } else if (assets.value[category]?.[sub]) {
      const keys: string[] = Object.keys(assets.value[category]);
      const i: number = keys.indexOf(sub);
      loadAsset(0, category, keys[i + 1]);
    } else if (assets.value[category]) {
      if (category === "backgrounds") loaded.value = true;
      else {
        loadAsset(0, "backgrounds");
      }
    }
  }

  function mouseInHandler(): void {
    mouseIn.value = true;
  }
  function mouseOutHandler(): void {
    mouseIn.value = false;
  }
  function mouseIndexChange(e: MouseEvent | TouchEvent | number): void {
    if (typeof e === "number") {
      mouseIndex.value = e;
      const x: number =
        e === 0 || e === 1 || e === 3
          ? 5 * rem.value
          : window.innerWidth - 20 * rem.value;
      const y: number = window.innerHeight / 2 - 7.5 * rem.value;

      openPanel({
        clientX: x,
        clientY: y,
      });
    } else if (e.target instanceof HTMLElement) {
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

  function openPanel(
    e: MouseEvent | { clientX: number; clientY: number }
  ): void {
    panelIndex.value = mouseIndex.value;
    panelOption.value = {
      index: mouseIndex.value,
      name: bounds.value[mouseIndex.value].name,
      identifier: bounds.value[mouseIndex.value].identifier,
      option:
        mouseIndex.value === 0
          ? assets.value.backgrounds
          : assets.value[selection.value.gender][
              bounds.value[mouseIndex.value].identifier
            ],
    };
    if (viewMode.value === "desktop") {
      const {
        clientX,
        clientY,
      }: MouseEvent | { clientX: number; clientY: number } = e;
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
          duration: 0.5,
          ease: "power2.inOut",
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

  function prevQuestionIndex(): void {
    animate.questionExit(
      rdQuestionContainer.value,
      questionIndex.value,
      false,
      () => {
        animate.questionInit(
          rdQuestionContainer.value,
          questionIndex.value - 1,
          false,
          () => {
            questionIndex.value--;
          }
        );
      }
    );
  }
  function nextQuestionIndex(): void {
    const temp: number = questionIndex.value;
    questionIndex.value = -1;
    if (temp < 2) {
      animate.questionExit(rdQuestionContainer.value, temp, false, () => {
        animate.questionInit(rdQuestionContainer.value, temp + 1, false, () => {
          questionIndex.value = temp + 1;
          if (questionIndex.value === 2) {
            rdQuestionAnswerInput.value.focus();
          }
        });
      });
    } else {
      animate.questionExit(rdQuestionContainer.value, 2, true, () => {
        loading.value = true;

        assetsCount.value =
          assets.value[selection.value.gender].accessories.length +
          assets.value[selection.value.gender].bodies.length +
          assets.value[selection.value.gender].clothes.length +
          assets.value[selection.value.gender].eyebrows.length +
          assets.value[selection.value.gender].eyes.length +
          assets.value[selection.value.gender].hairs.length +
          assets.value[selection.value.gender].mouths.length +
          assets.value.backgrounds.length;

        setTimeout(() => {
          animate.loaderInit(rdLoadingContainer.value, () => {
            loadAsset(0, selection.value.gender, "hairs");
          });
        }, 100);
      });
    }
  }

  function exportOpen(): void {
    drawExport();
    setTimeout(() => {
      exportOpened.value = true;
    }, 250);
  }

  function draw(): void {
    canvasCtx.value.beginPath();
    canvasCtx.value.drawImage(
      assets.value.backgrounds[selection.value.backgrounds - 1].file,
      0,
      0,
      1500,
      1500
    );
    if (
      selection.value.gender === "female" &&
      assets.value["female"].hairs[selection.value.hairs - 1].multi
    ) {
      canvasCtx.value.drawImage(
        assets.value["female"].hairs[selection.value.hairs - 1].file[0],
        0,
        0,
        1500,
        1500
      );
    }
    canvasCtx.value.drawImage(
      assets.value[selection.value.gender].bodies[selection.value.bodies - 1]
        .file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.value.drawImage(
      assets.value[selection.value.gender].clothes[selection.value.clothes - 1]
        .file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.value.drawImage(
      assets.value[selection.value.gender].eyes[selection.value.eyes - 1].file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.value.drawImage(
      assets.value[selection.value.gender].mouths[selection.value.mouths - 1]
        .file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.value.drawImage(
      assets.value[selection.value.gender].eyebrows[
        selection.value.eyebrows - 1
      ].file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.value.drawImage(
      Array.isArray(
        assets.value[selection.value.gender].hairs[selection.value.hairs - 1]
          .file
      )
        ? assets.value[selection.value.gender].hairs[selection.value.hairs - 1]
            .file[1]
        : assets.value[selection.value.gender].hairs[selection.value.hairs - 1]
            .file,
      0,
      0,
      1500,
      1500
    );
    if (selection.value.accessories) {
      canvasCtx.value.drawImage(
        assets.value[selection.value.gender].accessories[
          selection.value.accessories - 1
        ].file,
        0,
        0,
        1500,
        1500
      );
    }
    canvasCtx.value.closePath();
  }
  function drawExport(): void {
    const canvasCtx = rdExportCanvas.value.getContext("2d");
    canvasCtx.globalAlpha = 1;
    canvasCtx.fillStyle = "#000";
    canvasCtx.strokeStyle = "#000";
    canvasCtx.lineWidth = 0;
    canvasCtx.setLineDash([0, 0]);
    canvasCtx.save();
    canvasCtx.beginPath();
    canvasCtx.drawImage(
      assets.value.backgrounds[selection.value.backgrounds - 1].file,
      0,
      0,
      1500,
      1500
    );
    if (
      selection.value.gender === "female" &&
      assets.value["female"].hairs[selection.value.hairs - 1].multi
    ) {
      canvasCtx.drawImage(
        assets.value["female"].hairs[selection.value.hairs - 1].file[0],
        0,
        0,
        1500,
        1500
      );
    }
    canvasCtx.drawImage(
      assets.value[selection.value.gender].bodies[selection.value.bodies - 1]
        .file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.drawImage(
      assets.value[selection.value.gender].clothes[selection.value.clothes - 1]
        .file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.drawImage(
      assets.value[selection.value.gender].eyes[selection.value.eyes - 1].file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.drawImage(
      assets.value[selection.value.gender].mouths[selection.value.mouths - 1]
        .file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.drawImage(
      assets.value[selection.value.gender].eyebrows[
        selection.value.eyebrows - 1
      ].file,
      0,
      0,
      1500,
      1500
    );
    canvasCtx.drawImage(
      Array.isArray(
        assets.value[selection.value.gender].hairs[selection.value.hairs - 1]
          .file
      )
        ? assets.value[selection.value.gender].hairs[selection.value.hairs - 1]
            .file[1]
        : assets.value[selection.value.gender].hairs[selection.value.hairs - 1]
            .file,
      0,
      0,
      1500,
      1500
    );
    if (selection.value.accessories) {
      canvasCtx.drawImage(
        assets.value[selection.value.gender].accessories[
          selection.value.accessories - 1
        ].file,
        0,
        0,
        1500,
        1500
      );
    }

    const imageOne: HTMLImageElement = new Image();
    const imageTwo: HTMLImageElement = new Image();
    const imageThree: HTMLImageElement = new Image();

    imageOne.onload = () => {
      canvasCtx.drawImage(imageOne, 50, 50, 100, 100);
    };
    imageTwo.onload = () => {
      canvasCtx.drawImage(
        imageTwo,
        200,
        50,
        (imageTwo.width * 100) / imageTwo.height,
        100
      );
    };
    imageThree.onload = () => {
      canvasCtx.drawImage(
        imageThree,
        1450 - (imageThree.width * 100) / imageThree.height,
        50,
        (imageThree.width * 100) / imageThree.height,
        100
      );
    };

    imageOne.src = "uc_logo.webp";
    imageTwo.src = "vcd_logo.webp";
    imageThree.src = "artxplosion_logo.png";

    canvasCtx.closePath();
  }

  function updateName(e: InputEvent): void {
    if (e.target instanceof HTMLInputElement) {
      const value: string = e.target.value;
      name.value = value;
    }
  }

  function download(): void {
    const rdTextarea: HTMLTextAreaElement = document.createElement("textarea");
    rdTextarea.innerHTML = `Hi, ${name.value} here! Imbued with all the cosmic powers that burst from ‘the big bang phenomenon,’ I finally find my IncarnaXion, and now I’m ready to BLAST OFF to ArtXplosion!!!\r\n\r\nLet’s take a journey together into this creative galaxy! Visit @vcd.outliningdesign to incarnate yourself and get ready to BLAST OFF!!\r\n\r\n#ArtXplosion #VCDears #OutliningDesign2023 #IncarnaXion`;
    rdTextarea.select();
    rdTextarea.setSelectionRange(0, 999999);
    navigator.clipboard.writeText(rdTextarea.value);
    rdTextarea.remove();

    let base64: string = rdExportCanvas.value.toDataURL("image/png");
    base64 = base64.replace(
      /^data:image\/[^;]*/,
      "data:application/octet-stream"
    );
    base64 = base64.replace(
      /^data:application\/octet-stream/,
      "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Avatar.png"
    );

    const rdAnchor: HTMLAnchorElement = document.createElement("a");
    rdAnchor.setAttribute("href", base64);
    rdAnchor.setAttribute("download", "Avatar.png");
    rdAnchor.click();
    rdAnchor.remove();
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
            y: `-${window.innerHeight * 0.2 + 2 * rem.value}`,
            duration: 0.25,
            ease: "power2.out",
          },
          "<0"
        )
        .to(gsap.utils.toArray(rdPanel.children).slice(1), {
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

      tl.to(gsap.utils.toArray(rdPanel.children).slice(1), {
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
    questionInit(
      rdQuestionContainer: HTMLElement,
      index: number,
      init?: boolean,
      cb?: () => void
    ): void {
      const tl: GSAPTimeline = gsap.timeline({ onComplete: cb });

      const rdQuestionText: HTMLElement = rdQuestionContainer.querySelector(
        `.rd-question-container[data-index="${index}"] .rd-question`
      );
      const rdQuestionAnswer: HTMLElement[] = gsap.utils.toArray(
        rdQuestionContainer.querySelectorAll(
          `.rd-question-container[data-index="${index}"] .rd-question-answer`
        )
      );

      tl.to(rdQuestionText, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.5,
      }).to(
        rdQuestionAnswer,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.5,
          stagger: 0.05,
        },
        "<0.25"
      );

      if (init) {
        const rdQuestionButton: HTMLElement[] = gsap.utils.toArray(
          rdQuestionContainer.querySelectorAll("button.rd-question-button")
        );

        tl.to(
          rdQuestionButton,
          {
            opacity: 0.25,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete() {
              rdQuestionButton.forEach((a) => a.setAttribute("style", ""));
            },
          },
          "<0"
        );
      }
    },
    questionExit(
      rdQuestionContainer: HTMLElement,
      index: number,
      exit?: boolean,
      cb?: () => void
    ): void {
      const tl: GSAPTimeline = gsap.timeline({
        onComplete() {
          gsap.to(rdQuestionText, {
            opacity: 0,
            y: "-100%",
            duration: 0,
          });
          gsap.to(rdQuestionAnswer, {
            opacity: 0,
            y: "-2rem",
            duration: 0,
          });
          cb();
        },
      });

      const rdQuestionText: HTMLElement = rdQuestionContainer.querySelector(
        `.rd-question-container[data-index="${index}"] .rd-question`
      );
      const rdQuestionAnswer: HTMLElement[] = gsap.utils.toArray(
        rdQuestionContainer.querySelectorAll(
          `.rd-question-container[data-index="${index}"] .rd-question-answer`
        )
      );

      tl.to(rdQuestionAnswer, {
        y: "2rem",
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.5,
        stagger: 0.05,
      }).to(
        rdQuestionText,
        {
          y: "100%",
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.5,
        },
        "<0.25"
      );

      if (exit) {
        const rdQuestionButton: HTMLElement[] = gsap.utils.toArray(
          rdQuestionContainer.querySelectorAll("button.rd-question-button")
        );

        tl.to(
          rdQuestionButton,
          {
            opacity: 0,
            scale: 1.125,
            duration: 0.5,
            ease: "power2.out",
            onComplete() {
              rdQuestionButton.forEach((a) => a.setAttribute("style", ""));
            },
          },
          "<0"
        );
      }
    },
  };

  watch(
    () => mouseIn.value,
    (val) => {
      if (viewMode.value === "desktop") {
        if (val) {
          mouseActive.value = {
            icon: bounds.value[mouseIndex.value].icon,
            name: bounds.value[mouseIndex.value].name,
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
            icon: bounds.value[val].icon,
            name: bounds.value[val].name,
          };
          mouseTextAnim.value = animate.cursorTextShow(rdCursor.value, true);
        });
      }
    }
  );

  watch(
    () => selection.value,
    (val) => {
      if (loaded.value) draw();
    },
    { deep: true }
  );
  watch(
    () => loaded.value,
    (val) => {
      if (val) {
        setTimeout(() => {
          canvasCtx.value = rdCanvas.value.getContext("2d");
          canvasCtx.value.globalAlpha = 1;
          canvasCtx.value.fillStyle = "#000";
          canvasCtx.value.strokeStyle = "#000";
          canvasCtx.value.lineWidth = 0;
          canvasCtx.value.setLineDash([0, 0]);
          canvasCtx.value.save();

          draw();

          if (selection.value.gender === "female") {
            bounds.value = [
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
                height: 27.5,
                top: 72.5,
                left: 22.5,
                name: "clothing",
                icon: "clothing-woman",
                identifier: "clothes",
              },
              {
                width: 50,
                height: 50,
                top: 30,
                left: 25,
                name: "hair",
                icon: "face-woman",
                identifier: "hairs",
              },
              {
                width: 30,
                height: 7.5,
                top: 52.5,
                left: 35,
                name: "accessories",
                icon: "glasses",
                identifier: "accessories",
              },
              {
                width: 22.5,
                height: 7.5,
                top: 52.5,
                left: 38.75,
                name: "eyes",
                icon: "eye",
                identifier: "eyes",
              },
              {
                width: 30,
                height: 5,
                top: 47.5,
                left: 35,
                name: "eyebrows",
                icon: "feather",
                identifier: "eyebrows",
              },
              {
                width: 10,
                height: 5,
                top: 65,
                left: 45,
                name: "mouths",
                icon: "emoticon",
                identifier: "mouths",
              },
            ];
          }

          setTimeout(() => {
            animate.loaderExit(rdLoadingContainer.value, () => {
              loading.value = false;
            });
          }, 400);
        }, 100);
        if (viewMode.value === "desktop")
          window.addEventListener("mousemove", moveCursor);
      }
    }
  );

  onMounted(() => {
    setTimeout(() => {
      animate.questionInit(rdQuestionContainer.value, 0, true, () => {
        questionIndex.value = 0;
      });
    }, 500);
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
    .rd-action-container {
      position: absolute;
      top: 50%;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      transform: translateY(-50%);
      &.rd-action-container-left {
        left: 2rem;
      }
      &.rd-action-container-right {
        right: 2rem;
      }
    }
    .rd-export-button-container {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      button.rd-export-button {
        cursor: pointer;
        position: relative;
        height: 2rem;
        padding: 0 0.75rem;
        border-radius: 0.5rem;
        background: var(--primary-color);
        color: #fff;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s scale, 0.25s filter, 0.25s opacity;
        &:active {
          scale: 0.875 !important;
          transition: 0.25s scale;
          &::after {
            opacity: 0.25;
            transition: 0.25s opacity;
          }
        }
        &:hover {
          &::before {
            opacity: 1;
          }
        }
        &::after {
          content: "";
          position: absolute;
          pointer-events: none;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          background: #000;
          opacity: 0;
          transition: 0.5s opacity;
        }
        &::before {
          content: "";
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 2rem var(--primary-color);
          border-radius: 0.5rem;
          opacity: 0;
          transition: 0.25s opacity;
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
        background: #fff;
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
          span.rd-panel-title {
            color: #000;
          }
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
              position: absolute;
              left: 0;
              top: 0;
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
              background: #f0f0f0;
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
    .rd-question-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background-depth-one-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .rd-question-container {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .rd-question {
          position: relative;
          color: #fff;
          margin-bottom: 2rem;
          text-transform: uppercase;
          transform: translateY(-100%);
          opacity: 0;
        }
        .rd-question-answers {
          position: relative;
          width: 100%;
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          .rd-question-answer {
            cursor: pointer;
            position: relative;
            width: 5rem;
            height: 5rem;
            background: var(--background-depth-one-color);
            border-radius: 1rem;
            border: 0.25rem solid var(--background-depth-three-color);
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: translateY(-2rem);
            transition: 0.25s border-color;
            .rd-question-answer-icon-container {
              pointer-events: none;
              position: relative;
              width: 100%;
              height: 100%;
              padding: 1rem;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            &::before {
              content: "";
              pointer-events: none;
              position: absolute;
              width: 100%;
              height: 100%;
              box-shadow: 0 0 2rem var(--primary-color);
              opacity: 0;
              transition: 0.25s opacity;
            }
          }
          input.rd-question-answer {
            z-index: 1;
            cursor: auto;
            position: relative;
            width: 30vw;
            height: 3rem;
            padding: 0 1rem;
            border-radius: 1rem;
            border: 0.25rem solid var(--background-depth-three-color);
            box-sizing: border-box;
            opacity: 0;
            transform: translateY(-2rem);
            transition: 0.25s border-color;
            color: #fff;
            &:focus {
              border-color: var(--primary-color);
              outline: none;
              & + .rd-question-answer-shadow {
                opacity: 1;
                scale: 1;
              }
            }
          }
          .rd-question-answer-shadow {
            z-index: 0;
            pointer-events: none;
            position: absolute;
            width: 30vw;
            height: 3rem;
            border-radius: 1rem;
            box-shadow: 0 0 2rem var(--primary-color);
            opacity: 0;
            scale: 0.5;
            transition: 0.25s opacity, 0.25s scale ease-out;
          }
        }
        &.rd-question-container-active {
          pointer-events: all;
          .rd-question-answers {
            .rd-question-answer.rd-question-answer-active {
              border-color: var(--primary-color);
              .rd-question-answer-icon-container {
                opacity: 1;
              }
              &::before {
                opacity: 1;
              }
            }
          }
        }
      }
      button.rd-question-button {
        pointer-events: none;
        cursor: pointer;
        position: absolute;
        width: 3rem;
        height: 3rem;
        border: none;
        padding: 0;
        margin: 0;
        border-radius: 1.5rem;
        background: var(--primary-color);
        display: flex;
        justify-content: center;
        align-content: center;
        transition: 0.5s scale, 0.25s filter, 0.25s opacity;
        opacity: 0.25;
        filter: grayscale(1);
        .rd-question-button-icon-container {
          pointer-events: none;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0.75rem;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-content: center;
        }
        &:active {
          scale: 0.875 !important;
          transition: 0.25s scale;
          &::after {
            opacity: 0.25;
            transition: 0.25s opacity;
          }
        }
        &:hover {
          &::before {
            opacity: 1;
          }
        }
        &::after {
          content: "";
          position: absolute;
          pointer-events: none;
          width: 100%;
          height: 100%;
          border-radius: 1.5rem;
          background: #000;
          opacity: 0;
          transition: 0.5s opacity;
        }
        &::before {
          content: "";
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 2rem var(--primary-color);
          border-radius: 50%;
          opacity: 0;
          transition: 0.25s opacity;
        }
        &.rd-question-button-prev {
          left: 2rem;
        }
        &.rd-question-button-next {
          right: 2rem;
        }
        &.rd-question-button-active {
          pointer-events: all;
          filter: grayscale(0);
          opacity: 1;
        }
      }
    }
    .rd-export-container {
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--background-depth-one-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: 0.5s opacity;
      span.rd-export-title {
        position: relative;
        color: #fff;
        margin-bottom: 2rem;
        text-transform: uppercase;
        // transform: translateY(-100%);
        // opacity: 0;
      }
      .rd-export-image-container {
        position: relative;
        width: 20vw;
        height: 20vw;
        border-radius: 1rem;
        margin-bottom: 1rem;
        background: var(--background-depth-two-color);
        display: flex;
        overflow: hidden;
        canvas.rd-export-canvas {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      .rd-export-caption-container {
        position: relative;
        width: 20vw;
        padding: 1rem;
        border-radius: 1rem;
        border: 0.25rem solid var(--background-depth-three-color);
        box-sizing: border-box;
        display: flex;
        p.rd-export-caption {
          position: relative;
          color: #fff;
          line-height: 1.5;
        }
      }
      button.rd-export-button {
        cursor: pointer;
        position: relative;
        width: 20vw;
        height: 2rem;
        padding: 0 0.75rem;
        margin-top: 2rem;
        border-radius: 0.5rem;
        background: var(--primary-color);
        color: #fff;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s scale, 0.25s filter, 0.25s opacity;
        &:active {
          scale: 0.875 !important;
          transition: 0.25s scale;
          &::after {
            opacity: 0.25;
            transition: 0.25s opacity;
          }
        }
        &:hover {
          &::before {
            opacity: 1;
          }
        }
        &::after {
          content: "";
          position: absolute;
          pointer-events: none;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          background: #000;
          opacity: 0;
          transition: 0.5s opacity;
        }
        &::before {
          content: "";
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 2rem var(--primary-color);
          border-radius: 0.5rem;
          opacity: 0;
          transition: 0.25s opacity;
        }
      }
      &.rd-export-container-active {
        pointer-events: all;
        opacity: 1;
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
    @media only screen and (max-width: 1024px) {
      .rd-canvas-container {
        top: calc(50% - 50vw + 1rem);
        left: calc(50% - 50vw + 1rem);
        width: calc(100vw - 2rem);
        height: calc(100vw - 2rem);
        box-sizing: border-box;
      }
      .rd-panel-container {
        position: absolute;
        top: auto;
        bottom: 0 !important;
        width: 100vw;
        height: calc(40vh + 4rem);
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
        .rd-panel-actions-wrapper {
          position: relative;
          width: 100%;
          height: 2rem;
          padding: 0 1rem;
          margin: 1rem 0;
          box-sizing: border-box;
          display: flex;
          flex-shrink: 0;
          overflow-x: auto;
          opacity: 0;
          .rd-panel-actions-container {
            position: relative;
            height: 100%;
            display: flex;
            gap: 1rem;
          }
        }
        .rd-panel-body {
          position: relative;
          width: 100%;
          height: calc(40vh - 4rem);
          padding: 0 1rem 1rem 1rem;
          box-sizing: border-box;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          overflow-y: auto;
          opacity: 0;
          .rd-panel-content {
            cursor: pointer;
            position: relative;
            width: calc((100vw - 4rem) / 3);
            height: calc((100vw - 4rem) / 3);
            border-radius: 0.5rem;
            .rd-panel-content-image {
              pointer-events: none;
              z-index: 2;
              position: absolute;
              left: 0;
              top: 0;
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
              background: #f0f0f0;
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
      .rd-question-wrapper {
        .rd-question-container {
          .rd-question-answers {
            gap: 3vw;
            .rd-question-answer {
              width: 15vw;
              height: 15vw;
              border-radius: 3vw;
              .rd-question-answer-icon-container {
                padding: 3vw;
              }
            }
            input.rd-question-answer {
              width: calc(100vw - 2rem);
            }
            .rd-question-answer-shadow {
              width: calc(100vw - 2rem);
            }
          }
        }
        button.rd-question-button {
          bottom: 1rem;
          &.rd-question-button-prev {
            left: 1rem;
          }
          &.rd-question-button-next {
            right: 1rem;
          }
        }
      }
      .rd-export-button-container {
        bottom: 1rem;
        right: 1rem;
        button.rd-export-button {
          width: calc(100vw - 2rem);
        }
      }
      .rd-export-container {
        height: 100vh;
        // height: calc(100 * var(--vh));
        span.rd-export-title {
          position: absolute;
          top: 1rem;
        }
        .rd-export-image-container {
          width: calc(100vw - 2rem);
          height: calc(100vw - 2rem);
          flex-shrink: 0;
        }
        .rd-export-caption-container {
          width: calc(100vw - 2rem);
          height: calc(60vw - 2rem);
          overflow-y: auto;
        }
        button.rd-export-button {
          position: absolute;
          bottom: 1rem;
          width: calc(100vw - 2rem);
          margin-top: 0 !important;
        }
      }
    }
  }
</style>
