<template>
  <div class="rd-container">
    <div
      class="rd-image-preloader"
      ref="rdImagePreloadder"
      style="position: absolute; top: 0; left: 0; pointer-events: none"
    >
      <img
        src="/uc_logo.webp"
        class="rd-image rd-target"
        style="opacity: 0.01; width: 100px; object-fit: contain"
      />
      <img
        src="/vcd_logo.webp"
        class="rd-image rd-target"
        style="opacity: 0.01; width: 100px; object-fit: contain"
      />
      <img
        src="/b4.png"
        class="rd-image rd-target"
        style="opacity: 0.01; width: 100px; object-fit: contain"
      />
      <img
        src="/a8.png"
        class="rd-image rd-target"
        style="opacity: 0.01; width: 100px; object-fit: contain"
      />
    </div>
    <div class="rd-background" ref="rdBackground">
      <div class="rd-background-gradient-one" style="transform: scale(0)"></div>
      <div class="rd-background-gradient-two" style="transform: scale(0)"></div>
      <div class="rd-background-overlay"></div>
      <div class="rd-background-decoration">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          class="rd-background-decoration-container"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M619.86 525.024L499.731 662.951M619.86 525.024L1049 701.038M619.86 525.024L415.825 350.355M499.731 662.951L851.248 910.702M499.731 662.951L195.156 733.579M851.248 910.702L1049 701.038M851.248 910.702L1003.17 1164M1049 701.038L1149 719.331M195.156 733.579L159.672 926.233M195.156 733.579L603.227 936.957L541.499 1135.9M195.156 733.579L35.8458 334.588L215.116 164.121L240.99 -84M159.672 926.233L-31.0571 1135.9M159.672 926.233L309.002 1152.54M-78 672.935L415.825 350.355M1009.5 -30.5L637.972 205.243M415.825 350.355L637.972 205.243M637.972 205.243L552.5 -53.5M637.972 205.243L851.248 304.267L839.431 432.21M823.156 608.407L839.431 432.21M839.431 432.21L1232 139M1232 139L1103.5 -16.5M1232 139L1464.5 190.5M1464.5 190.5L1793 -16.5M1464.5 190.5L1551.75 389.047M1426 770L1569.87 580M1426 770L1499 910.702M1426 770L1149 719.331M1569.87 580L1611.5 525.024L1551.75 389.047M1569.87 580L1928.5 725.5M1499 910.702L1777 1086.5M1499 910.702L1392 1102.5M1499 910.702L1272 921L1149 719.331M1945.5 264.5L1551.75 389.047M1149 719.331L1182 506L1551.75 389.047M1551.75 1086.5L1634.5 792.5L1864 506L1551.75 389.047"
            stroke="#fff"
            stroke-width="3"
            class="rd-background-decoration-path"
          ></path>
        </svg>
      </div>
    </div>
    <div class="rd-description-container">
      <h1 ref="rdDescriptionTitle" class="rd-description-title rd-title-1">
        <div class="rd-sentence-row" style="z-index: 2">
          <span class="rd-word-wrapper">
            <span
              class="rd-word-container rd-word-container-down rd-target-container"
            >
              <span class="rd-word rd-target">The</span>
            </span>
          </span>
          <span class="rd-word-wrapper">
            <span
              class="rd-word-container rd-word-container-down rd-target-container"
            >
              <span class="rd-word rd-target">ART</span>
            </span>
          </span>
          <span class="rd-image-wrapper">
            <span
              class="rd-image-container rd-image-container-down rd-target-container"
            >
              <img src="/logo.png" class="rd-image rd-target" />
            </span>
          </span>
          <span
            class="rd-word-wrapper"
            :style="
              viewMode === 'desktop'
                ? 'margin-left: 2.25rem'
                : 'margin-left: 1.05rem'
            "
          >
            <span
              class="rd-word-container rd-word-container-down rd-target-container"
            >
              <span class="rd-word rd-target">PLOSION</span>
            </span>
          </span>
        </div>
        <div class="rd-sentence-row">
          <span class="rd-word-wrapper">
            <span
              class="rd-word-container rd-word-container-down rd-target-container"
            >
              <span class="rd-word rd-target">Custom</span>
            </span>
          </span>
          <span class="rd-word-wrapper">
            <span
              class="rd-word-container rd-word-container-down rd-target-container"
            >
              <span class="rd-word rd-target">Avatar</span>
            </span>
          </span>
          <span class="rd-word-wrapper">
            <span
              class="rd-word-container rd-word-container-down rd-target-container"
            >
              <span class="rd-word rd-target">Maker</span>
            </span>
          </span>
        </div>
      </h1>
      <div class="rd-description rd-body-text" ref="rdDescription">
        <div class="rd-sentence-row" v-for="(text, i) in description" :key="i">
          <span
            class="rd-word-wrapper"
            v-for="(word, j) in text.split(' ')"
            :key="j"
          >
            <span class="rd-word-container rd-word-container-down">
              <span class="rd-word">{{ word }}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="rd-description-sponsor" ref="rdDescriptionSponsor">
        <span class="rd-text-wrapper rd-button-text">
          <span
            class="rd-text-container rd-text-container-down rd-target-container"
          >
            <span class="rd-text rd-target">Brought to you by</span>
          </span>
        </span>
        <div class="rd-description-sponsor-container">
          <span class="rd-image-wrapper">
            <span
              class="rd-image-container rd-image-container-down rd-target-container"
            >
              <div class="rd-image rd-target"></div>
            </span>
          </span>
          <span class="rd-image-wrapper">
            <span
              class="rd-image-container rd-image-container-down rd-target-container"
            >
              <div class="rd-image rd-target"></div>
            </span>
          </span>
        </div>
      </div>
      <div class="rd-description-button" ref="rdButton">
        <div class="rd-description-button-background"></div>
        <button class="rd-description-button-input">
          <div class="rd-description-button-input-icon-container">
            <rd-svg name="play" color="secondary" />
          </div>
        </button>
      </div>
    </div>
    <div class="rd-attraction-container" ref="rdAttraction">
      <div class="rd-image-planet"></div>
      <div class="rd-image-avatar"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { gsap } from "gsap";
  import { Ref } from "vue";

  useHead({
    link: [
      { rel: "preload", href: "/uc_logo.webp", as: "image" },
      { rel: "preload", href: "/vcd_logo.webp", as: "image" },
    ],
  });

  const { viewMode } = useMain();

  const rdImagePreloadder: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdDescriptionTitle: Ref<HTMLHeadingElement> =
    ref<HTMLHeadingElement>(null);
  const rdDescription: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdDescriptionSponsor: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdBackground: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdAttraction: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);
  const rdButton: Ref<HTMLDivElement> = ref<HTMLDivElement>(null);

  const animate = {
    init(
      rdDescriptionTitle: HTMLElement,
      rdDescription: HTMLElement,
      rdDescriptionSponsor: HTMLElement,
      rdAttraction: HTMLElement,
      rdButton: HTMLElement
    ): void {
      const tl: GSAPTimeline = gsap.timeline({});

      const rdDescriptionTitleWordContainer: HTMLElement[] = gsap.utils.toArray(
        rdDescriptionTitle.querySelectorAll(".rd-target-container")
      );
      const rdDescriptionTitleWord: HTMLElement[] = gsap.utils.toArray(
        rdDescriptionTitle.querySelectorAll(".rd-target")
      );
      const rdDescriptionWordContainer: HTMLElement[] = gsap.utils.toArray(
        rdDescription.querySelectorAll(".rd-word-container")
      );
      const rdDescriptionWord: HTMLElement[] = gsap.utils.toArray(
        rdDescription.querySelectorAll(".rd-word")
      );
      const rdDescriptionSponsorWordContainer: HTMLElement[] =
        gsap.utils.toArray(
          rdDescriptionSponsor.querySelectorAll(".rd-target-container")
        );
      const rdDescriptionSponsorWord: HTMLElement[] = gsap.utils.toArray(
        rdDescriptionSponsor.querySelectorAll(".rd-target")
      );

      tl.to(rdDescriptionTitleWordContainer, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.125,
      })
        .to(
          rdDescriptionTitleWord,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.125,
          },
          "<0"
        )
        .to(
          rdDescriptionWordContainer,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
          },
          "<0.5"
        )
        .to(
          rdDescriptionWord,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
          },
          "<0"
        )
        .to(
          rdDescriptionSponsorWordContainer,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.125,
          },
          "<0.25"
        )
        .to(
          rdDescriptionSponsorWord,
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.125,
          },
          "<0"
        )
        .to(
          rdAttraction.children[0],
          {
            y: 0,
            rotate: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          "<0.25"
        )
        .to(
          rdAttraction.children[1],
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "<0.375"
        )
        .to(rdButton, {
          opacity: 1,
          duration: 0.25,
        });
    },
    backgroundInit(rdBackground: HTMLElement, cb: () => void): void {
      const tl: GSAPTimeline = gsap.timeline();

      const rdBlobOne: HTMLElement = rdBackground.querySelector(
        ".rd-background-gradient-one"
      );
      const rdBlobTwo: HTMLElement = rdBackground.querySelector(
        ".rd-background-gradient-two"
      );

      tl.to(rdBlobOne, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          rdBlobTwo,
          {
            scale: 1,
            duration: 1,
            ease: "power2.out",
            onComplete() {
              cb();
              rdBlobOne.style.animation = "rd-move-x 20s linear infinite";
              rdBlobTwo.style.animation = "rd-move-y 20s linear infinite";
            },
          },
          "<0"
        )
        .to(
          rdBackground.children[3].children[0].children[0],
          {
            strokeDashoffset: 0,
            duration: 50,
            ease: "power0",
          },
          "<0"
        );
    },
  };

  const description: string[] = [
    "Find your Incarnation and prepare to",
    "blast off into the ArtXplosion space!",
  ];

  onMounted(() => {
    animate.backgroundInit(rdBackground.value, () => {
      animate.init(
        rdDescriptionTitle.value,
        rdDescription.value,
        rdDescriptionSponsor.value,
        rdAttraction.value,
        rdButton.value
      );
    });
  });
</script>

<style lang="scss" scoped>
  .rd-container {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    .rd-description-container {
      position: relative;
      width: 60%;
      padding: 5rem 0 5rem 10vw;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      h1.rd-description-title {
        position: relative;
        width: 100%;
        color: #fff;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        .rd-word-wrapper {
          position: relative;
          margin-right: 0.6rem;
          .rd-word-container {
            position: relative;
          }
        }
        .rd-sentence-row {
          position: relative;
          width: 100%;
          margin-top: 0.5rem;
          display: flex;
          .rd-image-wrapper {
            position: absolute;
            left: 8.9rem;
            bottom: -1.75rem;
            height: 7rem;
            width: auto;
            .rd-image-container {
              width: auto;
              transform: translateY(100%);
              .rd-image {
                position: relative;
                height: 100%;
                object-fit: cover;
                transform: translateY(-100%);
              }
            }
          }
        }
      }
      .rd-description {
        position: relative;
        width: 100%;
        color: #fff;
        font-size: 1rem;
        margin: 1.5rem 0;
        text-align: left;
        display: flex;
        flex-direction: column;
        .rd-sentence-row {
          position: relative;
          width: 100%;
          margin-bottom: 0.25rem;
          display: flex;
          span.rd-word-wrapper {
            margin-right: 0.25rem;
            justify-content: flex-start;
            span.rd-word-container {
              opacity: 0;
              justify-content: flex-start;
              span.rd-word {
                justify-content: flex-start;
              }
            }
          }
        }
      }
      .rd-description-sponsor {
        position: relative;
        width: 100%;
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        span.rd-text-wrapper {
          position: relative;
          width: 100%;
          color: #fff;
          opacity: 0.5;
          justify-content: flex-start;
          span.rd-text-container {
            justify-content: flex-start;
            span.rd-text {
              justify-content: flex-start;
            }
          }
        }
        .rd-description-sponsor-container {
          position: relative;
          width: 100%;
          height: 3rem;
          margin-top: 0.5rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span.rd-image-wrapper {
            position: relative;
            width: auto;
            height: 100%;
            margin-right: 0.5rem;
            span.rd-image-container {
              .rd-image {
                height: 100%;
                background-size: contain;
                background-position: center center;
                background-repeat: no-repeat;
              }
            }
            &:first-child {
              span.rd-image-container {
                .rd-image {
                  background-image: url("/uc_logo.webp");
                  width: 3rem;
                }
              }
            }
            &:last-child {
              span.rd-image-container {
                .rd-image {
                  background-image: url("/vcd_logo.webp");
                  width: 6.5rem;
                }
              }
            }
          }
        }
      }
      .rd-description-button {
        position: relative;
        width: 7rem;
        height: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        .rd-description-button-background {
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("/incarnate_2.svg");
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          animation: rd-rotate 20s linear infinite;
          transition: 0.5s scale;
        }
        button.rd-description-button-input {
          cursor: pointer;
          position: relative;
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
          transition: 0.5s scale;
          .rd-description-button-input-icon-container {
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
            transition: 0.375s scale;
            &::after {
              opacity: 0.25;
              transition: 0.375s opacity;
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
        }
        &:hover {
          .rd-description-button-background {
            scale: 1.125;
          }
        }
      }
    }
    .rd-attraction-container {
      pointer-events: none;
      position: absolute;
      right: 0;
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-content: flex-end;
      span.rd-image-wrapper {
        position: relative;
        width: 100%;
      }
      .rd-image-planet {
        position: absolute;
        bottom: -19vw;
        width: 35vw;
        height: 35vw;
        background-image: url("/a8.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        transform: translateY(100%) rotate(180deg);
      }
      .rd-image-avatar {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("/b4.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        opacity: 0;
        transform: scale(1.125);
      }
    }
    .rd-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .rd-background-gradient-one {
        position: absolute;
        top: 15%;
        right: 5%;
        width: 27vw;
        height: 36vw;
        border-radius: 54% 79% 75% 58% / 70% 66% 71% 47%;
        background: #f64fff;
        opacity: 0.75;
      }
      .rd-background-gradient-two {
        position: absolute;
        bottom: -10%;
        right: 7.5%;
        width: 36vw;
        height: 27vw;
        border-radius: 60% 59% 51% 58% / 69% 64% 52% 55%;
        background: #2633cb;
        opacity: 0.75;
      }
      .rd-background-overlay {
        position: absolute;
        top: -100vh;
        left: -100vw;
        width: 300vw;
        height: 300vh;
        backdrop-filter: blur(5rem);
      }
      .rd-background-decoration {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        svg.rd-background-decoration-container {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.025;
          path.rd-background-decoration-path {
            stroke-dashoffset: 12647.2490234375px;
            stroke-dasharray: 12647.2490234375px;
          }
        }
      }
    }
    @media only screen and (max-width: 1024px) {
      flex-direction: column;
      .rd-description-container {
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 2rem 2rem 0 2rem;
        h1.rd-description-title {
          .rd-sentence-row {
            .rd-word-wrapper {
              margin-right: 0.375rem;
            }
            .rd-image-wrapper {
              left: 3.75rem;
              .rd-image-container {
                .rd-image {
                  bottom: -1rem;
                  height: 3rem;
                }
              }
            }
          }
        }
        .rd-description {
          font-size: 0.55rem;
          margin: 1rem 0;
        }
        .rd-description-sponsor {
          span.rd-text-wrapper {
            font-size: 0.45rem;
          }
        }
        .rd-description-button {
          position: absolute;
          bottom: calc(2rem + 37.5vw - 3.5rem);
          left: calc(50vw - 3.5rem);
        }
      }
      .rd-attraction-container {
        z-index: 1;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60vh;
        .rd-image-planet {
          bottom: 2rem;
          width: 75vw;
          height: 75vw;
          transform: translateY(150%) rotate(-180deg);
        }
        .rd-image-avatar {
          top: 5%;
          width: 50vw;
          height: 50vw;
        }
      }
      .rd-background {
        .rd-background-gradient-one {
          top: auto;
          bottom: 10%;
          right: 10%;
          width: 27vh;
          height: 36vh;
        }
        .rd-background-gradient-two {
          bottom: 0;
          left: 7.5%;
          width: 36vh;
          height: 27vh;
        }
        .rd-background-decoration {
          transform: rotate(90deg) scale(2.5);
          svg.rd-background-decoration-container {
            opacity: 0.05;
          }
        }
      }
    }
  }
</style>
