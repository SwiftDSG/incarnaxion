import { ViewMode } from "~~/interfaces/general"

export default function () {
  const viewMode = useState<ViewMode>('view-mode', () => null)

  const loaded = useState<boolean>('loaded', () => false)
  const assets = useState<{
    male: {
      hairs: { src: string, file?: HTMLImageElement }[]
      bodies: { src: string, file?: HTMLImageElement }[]
      eyes: { src: string, file?: HTMLImageElement }[]
      eyebrows: { src: string, file?: HTMLImageElement }[]
      clothes: { src: string, file?: HTMLImageElement }[]
      accessories: { src: string, file?: HTMLImageElement }[]
    }
    female: {
      hairs: { src: string, file?: HTMLImageElement }[]
      bodies: { src: string, file?: HTMLImageElement }[]
      eyes: { src: string, file?: HTMLImageElement }[]
      eyebrows: { src: string, file?: HTMLImageElement }[]
      clothes: { src: string, file?: HTMLImageElement }[]
      accessories: { src: string, file?: HTMLImageElement }[]
    }
    backgrounds: { src: string, file?: HTMLImageElement }[]
  }>('assets', () => ({
    male: {
      hairs: [
        { src: '/assets/male/hairs/1.svg' },
        { src: '/assets/male/hairs/2.svg' },
        { src: '/assets/male/hairs/3.svg' },
        { src: '/assets/male/hairs/4.svg' },
        { src: '/assets/male/hairs/5.svg' },
        { src: '/assets/male/hairs/6.svg' },
        { src: '/assets/male/hairs/7.svg' },
        { src: '/assets/male/hairs/8.svg' },
        { src: '/assets/male/hairs/9.svg' },
        { src: '/assets/male/hairs/10.svg' },
      ],
      bodies: [
        { src: '/assets/male/bodies/1.svg' },
        { src: '/assets/male/bodies/2.svg' },
        { src: '/assets/male/bodies/3.svg' },
        { src: '/assets/male/bodies/4.svg' },
        { src: '/assets/male/bodies/5.svg' },
      ],
      eyes: [
        { src: '/assets/male/eyes/1.svg' },
        { src: '/assets/male/eyes/2.svg' },
        { src: '/assets/male/eyes/3.svg' },
        { src: '/assets/male/eyes/4.svg' },
        { src: '/assets/male/eyes/5.svg' },
        { src: '/assets/male/eyes/6.svg' },
        { src: '/assets/male/eyes/7.svg' },
        { src: '/assets/male/eyes/8.svg' },
        { src: '/assets/male/eyes/9.svg' },
        { src: '/assets/male/eyes/10.svg' },
      ],
      eyebrows: [
        { src: '/assets/male/eyebrows/1.svg' },
      ],
      clothes: [
        { src: '/assets/male/clothes/1.svg' },
        { src: '/assets/male/clothes/2.svg' },
        { src: '/assets/male/clothes/3.svg' },
        { src: '/assets/male/clothes/4.svg' },
        { src: '/assets/male/clothes/5.svg' },
        { src: '/assets/male/clothes/6.svg' },
        { src: '/assets/male/clothes/7.svg' },
        { src: '/assets/male/clothes/8.svg' },
        { src: '/assets/male/clothes/9.svg' },
        { src: '/assets/male/clothes/10.svg' },
      ],
      accessories: [],
    },
    female: {
      hairs: [],
      bodies: [],
      eyes: [],
      eyebrows: [],
      clothes: [],
      accessories: [],
    },
    backgrounds: [
      { src: '/assets/backgrounds/1.png' },
      { src: '/assets/backgrounds/2.png' },
      { src: '/assets/backgrounds/3.png' },
      { src: '/assets/backgrounds/4.png' },
      { src: '/assets/backgrounds/5.png' },
      { src: '/assets/backgrounds/6.png' },
      { src: '/assets/backgrounds/7.png' },
      { src: '/assets/backgrounds/8.png' },
      { src: '/assets/backgrounds/9.png' },
      { src: '/assets/backgrounds/10.png' },
      { src: '/assets/backgrounds/11.png' },
      { src: '/assets/backgrounds/12.png' },
      { src: '/assets/backgrounds/13.png' },
      { src: '/assets/backgrounds/14.png' },
    ]
  }))

  return { viewMode, loaded, assets }
}