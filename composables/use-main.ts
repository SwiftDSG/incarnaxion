import { ViewMode } from "~~/interfaces/general";

export default function () {
  interface Asset {
    src: string | string[];
    file?: HTMLImageElement | HTMLImageElement[];
    multi?: boolean;
  }

  const viewMode = useState<ViewMode>("view-mode", () => null);

  const config = useRuntimeConfig();
  const loaded = useState<boolean>("loaded", () => false);
  const assets = useState<{
    male: {
      hairs: Asset[];
      bodies: { src: string; file?: HTMLImageElement }[];
      eyes: { src: string; file?: HTMLImageElement }[];
      eyebrows: { src: string; file?: HTMLImageElement }[];
      clothes: { src: string; file?: HTMLImageElement }[];
      accessories: { src: string; file?: HTMLImageElement }[];
      mouths: { src: string; file?: HTMLImageElement }[];
    };
    female: {
      hairs: Asset[];
      bodies: { src: string; file?: HTMLImageElement }[];
      eyes: { src: string; file?: HTMLImageElement }[];
      eyebrows: { src: string; file?: HTMLImageElement }[];
      clothes: { src: string; file?: HTMLImageElement }[];
      accessories: { src: string; file?: HTMLImageElement }[];
      mouths: { src: string; file?: HTMLImageElement }[];
    };
    backgrounds: { src: string; file?: HTMLImageElement }[];
  }>("assets", () => ({
    male: {
      hairs: [
        { src: `${config.public.base}/assets/male/hairs/1.svg` },
        { src: `${config.public.base}/assets/male/hairs/2.svg` },
        { src: `${config.public.base}/assets/male/hairs/3.svg` },
        { src: `${config.public.base}/assets/male/hairs/4.svg` },
        { src: `${config.public.base}/assets/male/hairs/5.svg` },
        { src: `${config.public.base}/assets/male/hairs/6.svg` },
        { src: `${config.public.base}/assets/male/hairs/7.svg` },
        { src: `${config.public.base}/assets/male/hairs/8.svg` },
        { src: `${config.public.base}/assets/male/hairs/9.svg` },
        { src: `${config.public.base}/assets/male/hairs/10.svg` },
        { src: `${config.public.base}/assets/male/hairs/11.svg` },
        { src: `${config.public.base}/assets/male/hairs/12.svg` },
        { src: `${config.public.base}/assets/male/hairs/13.svg` },
        { src: `${config.public.base}/assets/male/hairs/14.svg` },
        { src: `${config.public.base}/assets/male/hairs/15.svg` },
        { src: `${config.public.base}/assets/male/hairs/16.svg` },
        { src: `${config.public.base}/assets/male/hairs/17.svg` },
        { src: `${config.public.base}/assets/male/hairs/18.svg` },
        { src: `${config.public.base}/assets/male/hairs/19.svg` },
        { src: `${config.public.base}/assets/male/hairs/20.svg` },
        { src: `${config.public.base}/assets/male/hairs/21.svg` },
        { src: `${config.public.base}/assets/male/hairs/22.svg` },
        { src: `${config.public.base}/assets/male/hairs/23.svg` },
        { src: `${config.public.base}/assets/male/hairs/24.svg` },
        { src: `${config.public.base}/assets/male/hairs/25.svg` },
        { src: `${config.public.base}/assets/male/hairs/26.svg` },
        { src: `${config.public.base}/assets/male/hairs/27.svg` },
        { src: `${config.public.base}/assets/male/hairs/28.svg` },
        { src: `${config.public.base}/assets/male/hairs/29.svg` },
        { src: `${config.public.base}/assets/male/hairs/30.svg` },
        { src: `${config.public.base}/assets/male/hairs/31.svg` },
        { src: `${config.public.base}/assets/male/hairs/32.svg` },
        { src: `${config.public.base}/assets/male/hairs/33.svg` },
        { src: `${config.public.base}/assets/male/hairs/34.svg` },
        { src: `${config.public.base}/assets/male/hairs/35.svg` },
        { src: `${config.public.base}/assets/male/hairs/36.svg` },
        { src: `${config.public.base}/assets/male/hairs/37.svg` },
        { src: `${config.public.base}/assets/male/hairs/38.svg` },
        { src: `${config.public.base}/assets/male/hairs/39.svg` },
        { src: `${config.public.base}/assets/male/hairs/40.svg` },
        { src: `${config.public.base}/assets/male/hairs/41.svg` },
        { src: `${config.public.base}/assets/male/hairs/42.svg` },
        { src: `${config.public.base}/assets/male/hairs/43.svg` },
        { src: `${config.public.base}/assets/male/hairs/44.svg` },
        { src: `${config.public.base}/assets/male/hairs/45.svg` },
        { src: `${config.public.base}/assets/male/hairs/46.svg` },
        { src: `${config.public.base}/assets/male/hairs/47.svg` },
        { src: `${config.public.base}/assets/male/hairs/48.svg` },
        { src: `${config.public.base}/assets/male/hairs/49.svg` },
        { src: `${config.public.base}/assets/male/hairs/50.svg` },
        { src: `${config.public.base}/assets/male/hairs/51.svg` },
        { src: `${config.public.base}/assets/male/hairs/52.svg` },
        { src: `${config.public.base}/assets/male/hairs/53.svg` },
        { src: `${config.public.base}/assets/male/hairs/54.svg` },
        { src: `${config.public.base}/assets/male/hairs/55.svg` },
        { src: `${config.public.base}/assets/male/hairs/56.svg` },
        { src: `${config.public.base}/assets/male/hairs/57.svg` },
        { src: `${config.public.base}/assets/male/hairs/58.svg` },
        { src: `${config.public.base}/assets/male/hairs/59.svg` },
        { src: `${config.public.base}/assets/male/hairs/60.svg` },
        { src: `${config.public.base}/assets/male/hairs/61.svg` },
        { src: `${config.public.base}/assets/male/hairs/62.svg` },
        { src: `${config.public.base}/assets/male/hairs/63.svg` },
        { src: `${config.public.base}/assets/male/hairs/64.svg` },
        { src: `${config.public.base}/assets/male/hairs/65.svg` },
        { src: `${config.public.base}/assets/male/hairs/66.svg` },
        { src: `${config.public.base}/assets/male/hairs/67.svg` },
        { src: `${config.public.base}/assets/male/hairs/68.svg` },
        { src: `${config.public.base}/assets/male/hairs/69.svg` },
        { src: `${config.public.base}/assets/male/hairs/70.svg` },
        { src: `${config.public.base}/assets/male/hairs/71.svg` },
        { src: `${config.public.base}/assets/male/hairs/72.svg` },
        { src: `${config.public.base}/assets/male/hairs/73.svg` },
        { src: `${config.public.base}/assets/male/hairs/74.svg` },
        { src: `${config.public.base}/assets/male/hairs/75.svg` },
        { src: `${config.public.base}/assets/male/hairs/76.svg` },
        { src: `${config.public.base}/assets/male/hairs/77.svg` },
        { src: `${config.public.base}/assets/male/hairs/78.svg` },
        { src: `${config.public.base}/assets/male/hairs/79.svg` },
        { src: `${config.public.base}/assets/male/hairs/80.svg` },
        { src: `${config.public.base}/assets/male/hairs/81.svg` },
        { src: `${config.public.base}/assets/male/hairs/82.svg` },
        { src: `${config.public.base}/assets/male/hairs/83.svg` },
        { src: `${config.public.base}/assets/male/hairs/84.svg` },
        { src: `${config.public.base}/assets/male/hairs/85.svg` },
        { src: `${config.public.base}/assets/male/hairs/86.svg` },
        { src: `${config.public.base}/assets/male/hairs/87.svg` },
        { src: `${config.public.base}/assets/male/hairs/88.svg` },
        { src: `${config.public.base}/assets/male/hairs/89.svg` },
        { src: `${config.public.base}/assets/male/hairs/90.svg` },
        { src: `${config.public.base}/assets/male/hairs/91.svg` },
        { src: `${config.public.base}/assets/male/hairs/92.svg` },
        { src: `${config.public.base}/assets/male/hairs/93.svg` },
        { src: `${config.public.base}/assets/male/hairs/94.svg` },
        { src: `${config.public.base}/assets/male/hairs/95.svg` },
        { src: `${config.public.base}/assets/male/hairs/96.svg` },
        { src: `${config.public.base}/assets/male/hairs/97.svg` },
        { src: `${config.public.base}/assets/male/hairs/98.svg` },
        { src: `${config.public.base}/assets/male/hairs/99.svg` },
        { src: `${config.public.base}/assets/male/hairs/100.svg` },
        { src: `${config.public.base}/assets/male/hairs/101.svg` },
        { src: `${config.public.base}/assets/male/hairs/102.svg` },
        { src: `${config.public.base}/assets/male/hairs/103.svg` },
        { src: `${config.public.base}/assets/male/hairs/104.svg` },
        { src: `${config.public.base}/assets/male/hairs/105.svg` },
        { src: `${config.public.base}/assets/male/hairs/106.svg` },
        { src: `${config.public.base}/assets/male/hairs/107.svg` },
        { src: `${config.public.base}/assets/male/hairs/108.svg` },
        { src: `${config.public.base}/assets/male/hairs/109.svg` },
        { src: `${config.public.base}/assets/male/hairs/110.svg` },
        { src: `${config.public.base}/assets/male/hairs/111.svg` },
        { src: `${config.public.base}/assets/male/hairs/112.svg` },
        { src: `${config.public.base}/assets/male/hairs/113.svg` },
        { src: `${config.public.base}/assets/male/hairs/114.svg` },
        { src: `${config.public.base}/assets/male/hairs/115.svg` },
        { src: `${config.public.base}/assets/male/hairs/116.svg` },
        { src: `${config.public.base}/assets/male/hairs/117.svg` },
        { src: `${config.public.base}/assets/male/hairs/118.svg` },
        { src: `${config.public.base}/assets/male/hairs/119.svg` },
        { src: `${config.public.base}/assets/male/hairs/120.svg` },
        { src: `${config.public.base}/assets/male/hairs/121.svg` },
        { src: `${config.public.base}/assets/male/hairs/122.svg` },
        { src: `${config.public.base}/assets/male/hairs/123.svg` },
        { src: `${config.public.base}/assets/male/hairs/124.svg` },
        { src: `${config.public.base}/assets/male/hairs/125.svg` },
        { src: `${config.public.base}/assets/male/hairs/126.svg` },
        { src: `${config.public.base}/assets/male/hairs/127.svg` },
        { src: `${config.public.base}/assets/male/hairs/128.svg` },
        { src: `${config.public.base}/assets/male/hairs/129.svg` },
        { src: `${config.public.base}/assets/male/hairs/130.svg` },
        { src: `${config.public.base}/assets/male/hairs/131.svg` },
        { src: `${config.public.base}/assets/male/hairs/132.svg` },
        { src: `${config.public.base}/assets/male/hairs/133.svg` },
        { src: `${config.public.base}/assets/male/hairs/134.svg` },
        { src: `${config.public.base}/assets/male/hairs/135.svg` },
        { src: `${config.public.base}/assets/male/hairs/136.svg` },
        { src: `${config.public.base}/assets/male/hairs/137.svg` },
        { src: `${config.public.base}/assets/male/hairs/138.svg` },
        { src: `${config.public.base}/assets/male/hairs/139.svg` },
        { src: `${config.public.base}/assets/male/hairs/140.svg` },
        { src: `${config.public.base}/assets/male/hairs/141.svg` },
        { src: `${config.public.base}/assets/male/hairs/142.svg` },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/143/1.svg`,
            `${config.public.base}/assets/male/hairs/143/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/144/1.svg`,
            `${config.public.base}/assets/male/hairs/144/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/145/1.svg`,
            `${config.public.base}/assets/male/hairs/145/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/146/1.svg`,
            `${config.public.base}/assets/male/hairs/146/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/147/1.svg`,
            `${config.public.base}/assets/male/hairs/147/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/148/1.svg`,
            `${config.public.base}/assets/male/hairs/148/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/149/1.svg`,
            `${config.public.base}/assets/male/hairs/149/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/150/1.svg`,
            `${config.public.base}/assets/male/hairs/150/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/151/1.svg`,
            `${config.public.base}/assets/male/hairs/151/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/152/1.svg`,
            `${config.public.base}/assets/male/hairs/152/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/153/1.svg`,
            `${config.public.base}/assets/male/hairs/153/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/male/hairs/154/1.svg`,
            `${config.public.base}/assets/male/hairs/154/2.svg`,
          ],
        },
      ],
      bodies: [
        { src: `${config.public.base}/assets/male/bodies/1.svg` },
        { src: `${config.public.base}/assets/male/bodies/2.svg` },
        { src: `${config.public.base}/assets/male/bodies/3.svg` },
        { src: `${config.public.base}/assets/male/bodies/4.svg` },
        { src: `${config.public.base}/assets/male/bodies/5.svg` },
      ],
      eyes: [
        { src: `${config.public.base}/assets/male/eyes/1.svg` },
        { src: `${config.public.base}/assets/male/eyes/2.svg` },
        { src: `${config.public.base}/assets/male/eyes/3.svg` },
        { src: `${config.public.base}/assets/male/eyes/4.svg` },
        { src: `${config.public.base}/assets/male/eyes/5.svg` },
        { src: `${config.public.base}/assets/male/eyes/6.svg` },
        { src: `${config.public.base}/assets/male/eyes/7.svg` },
        { src: `${config.public.base}/assets/male/eyes/8.svg` },
        { src: `${config.public.base}/assets/male/eyes/9.svg` },
        { src: `${config.public.base}/assets/male/eyes/10.svg` },
      ],
      eyebrows: [
        { src: `${config.public.base}/assets/male/eyebrows/1.svg` },
        { src: `${config.public.base}/assets/male/eyebrows/2.svg` },
        { src: `${config.public.base}/assets/male/eyebrows/3.svg` },
      ],
      clothes: [
        { src: `${config.public.base}/assets/male/clothes/1.svg` },
        { src: `${config.public.base}/assets/male/clothes/2.svg` },
        { src: `${config.public.base}/assets/male/clothes/3.svg` },
        { src: `${config.public.base}/assets/male/clothes/4.svg` },
        { src: `${config.public.base}/assets/male/clothes/5.svg` },
        { src: `${config.public.base}/assets/male/clothes/6.svg` },
        { src: `${config.public.base}/assets/male/clothes/7.svg` },
        { src: `${config.public.base}/assets/male/clothes/8.svg` },
        { src: `${config.public.base}/assets/male/clothes/9.svg` },
        { src: `${config.public.base}/assets/male/clothes/10.svg` },
        { src: `${config.public.base}/assets/male/clothes/11.svg` },
        { src: `${config.public.base}/assets/male/clothes/12.svg` },
        { src: `${config.public.base}/assets/male/clothes/13.svg` },
        { src: `${config.public.base}/assets/male/clothes/14.svg` },
        { src: `${config.public.base}/assets/male/clothes/15.svg` },
        { src: `${config.public.base}/assets/male/clothes/16.svg` },
        // { src: `${config.public.base}/assets/male/clothes/17.svg` },
        // { src: `${config.public.base}/assets/male/clothes/18.svg` },
        // { src: `${config.public.base}/assets/male/clothes/19.svg` },
        // { src: `${config.public.base}/assets/male/clothes/20.svg` },
        // { src: `${config.public.base}/assets/male/clothes/21.svg` },
        // { src: `${config.public.base}/assets/male/clothes/22.svg` },
        // { src: `${config.public.base}/assets/male/clothes/23.svg` },
        // { src: `${config.public.base}/assets/male/clothes/24.svg` },
        // { src: `${config.public.base}/assets/male/clothes/25.svg` },
        // { src: `${config.public.base}/assets/male/clothes/26.svg` },
        // { src: `${config.public.base}/assets/male/clothes/27.svg` },
        // { src: `${config.public.base}/assets/male/clothes/28.svg` },
        // { src: `${config.public.base}/assets/male/clothes/29.svg` },
        // { src: `${config.public.base}/assets/male/clothes/30.svg` },
        // { src: `${config.public.base}/assets/male/clothes/31.svg` },
        // { src: `${config.public.base}/assets/male/clothes/32.svg` },
        // { src: `${config.public.base}/assets/male/clothes/33.svg` },
        // { src: `${config.public.base}/assets/male/clothes/34.svg` },
        // { src: `${config.public.base}/assets/male/clothes/35.svg` },
        // { src: `${config.public.base}/assets/male/clothes/36.svg` },
        // { src: `${config.public.base}/assets/male/clothes/37.svg` },
      ],
      accessories: [
        { src: `${config.public.base}/assets/male/accessories/1.svg` },
        { src: `${config.public.base}/assets/male/accessories/2.svg` },
        { src: `${config.public.base}/assets/male/accessories/3.svg` },
        { src: `${config.public.base}/assets/male/accessories/4.svg` },
        { src: `${config.public.base}/assets/male/accessories/5.svg` },
        { src: `${config.public.base}/assets/male/accessories/6.svg` },
        { src: `${config.public.base}/assets/male/accessories/7.svg` },
        { src: `${config.public.base}/assets/male/accessories/8.svg` },
        { src: `${config.public.base}/assets/male/accessories/9.svg` },
      ],
      mouths: [
        { src: `${config.public.base}/assets/male/mouths/1.svg` },
        { src: `${config.public.base}/assets/male/mouths/2.svg` },
        { src: `${config.public.base}/assets/male/mouths/3.svg` },
        { src: `${config.public.base}/assets/male/mouths/4.svg` },
        { src: `${config.public.base}/assets/male/mouths/5.svg` },
        { src: `${config.public.base}/assets/male/mouths/6.svg` },
        { src: `${config.public.base}/assets/male/mouths/7.svg` },
        { src: `${config.public.base}/assets/male/mouths/8.svg` },
        { src: `${config.public.base}/assets/male/mouths/9.svg` },
      ],
    },
    female: {
      hairs: [
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/1/1.svg`,
            `${config.public.base}/assets/female/hairs/1/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/2/1.svg`,
            `${config.public.base}/assets/female/hairs/2/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/3/1.svg`,
            `${config.public.base}/assets/female/hairs/3/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/4/1.svg`,
            `${config.public.base}/assets/female/hairs/4/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/5/1.svg`,
            `${config.public.base}/assets/female/hairs/5/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/6/1.svg`,
            `${config.public.base}/assets/female/hairs/6/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/7/1.svg`,
            `${config.public.base}/assets/female/hairs/7/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/8/1.svg`,
            `${config.public.base}/assets/female/hairs/8/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/9/1.svg`,
            `${config.public.base}/assets/female/hairs/9/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/10/1.svg`,
            `${config.public.base}/assets/female/hairs/10/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/11/1.svg`,
            `${config.public.base}/assets/female/hairs/11/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/12/1.svg`,
            `${config.public.base}/assets/female/hairs/12/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/13/1.svg`,
            `${config.public.base}/assets/female/hairs/13/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/14/1.svg`,
            `${config.public.base}/assets/female/hairs/14/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/15/1.svg`,
            `${config.public.base}/assets/female/hairs/15/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/16/1.svg`,
            `${config.public.base}/assets/female/hairs/16/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/17/1.svg`,
            `${config.public.base}/assets/female/hairs/17/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/18/1.svg`,
            `${config.public.base}/assets/female/hairs/18/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/19/1.svg`,
            `${config.public.base}/assets/female/hairs/19/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/20/1.svg`,
            `${config.public.base}/assets/female/hairs/20/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/21/1.svg`,
            `${config.public.base}/assets/female/hairs/21/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/22/1.svg`,
            `${config.public.base}/assets/female/hairs/22/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/23/1.svg`,
            `${config.public.base}/assets/female/hairs/23/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/24/1.svg`,
            `${config.public.base}/assets/female/hairs/24/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/25/1.svg`,
            `${config.public.base}/assets/female/hairs/25/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/26/1.svg`,
            `${config.public.base}/assets/female/hairs/26/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/27/1.svg`,
            `${config.public.base}/assets/female/hairs/27/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/28/1.svg`,
            `${config.public.base}/assets/female/hairs/28/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/29/1.svg`,
            `${config.public.base}/assets/female/hairs/29/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/30/1.svg`,
            `${config.public.base}/assets/female/hairs/30/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/31/1.svg`,
            `${config.public.base}/assets/female/hairs/31/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/32/1.svg`,
            `${config.public.base}/assets/female/hairs/32/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/33/1.svg`,
            `${config.public.base}/assets/female/hairs/33/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/34/1.svg`,
            `${config.public.base}/assets/female/hairs/34/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/35/1.svg`,
            `${config.public.base}/assets/female/hairs/35/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/36/1.svg`,
            `${config.public.base}/assets/female/hairs/36/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/37/1.svg`,
            `${config.public.base}/assets/female/hairs/37/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/38/1.svg`,
            `${config.public.base}/assets/female/hairs/38/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/39/1.svg`,
            `${config.public.base}/assets/female/hairs/39/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/40/1.svg`,
            `${config.public.base}/assets/female/hairs/40/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/41/1.svg`,
            `${config.public.base}/assets/female/hairs/41/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/42/1.svg`,
            `${config.public.base}/assets/female/hairs/42/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/43/1.svg`,
            `${config.public.base}/assets/female/hairs/43/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/44/1.svg`,
            `${config.public.base}/assets/female/hairs/44/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/45/1.svg`,
            `${config.public.base}/assets/female/hairs/45/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/46/1.svg`,
            `${config.public.base}/assets/female/hairs/46/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/47/1.svg`,
            `${config.public.base}/assets/female/hairs/47/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/48/1.svg`,
            `${config.public.base}/assets/female/hairs/48/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/49/1.svg`,
            `${config.public.base}/assets/female/hairs/49/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/50/1.svg`,
            `${config.public.base}/assets/female/hairs/50/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/51/1.svg`,
            `${config.public.base}/assets/female/hairs/51/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/52/1.svg`,
            `${config.public.base}/assets/female/hairs/52/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/53/1.svg`,
            `${config.public.base}/assets/female/hairs/53/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/54/1.svg`,
            `${config.public.base}/assets/female/hairs/54/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/55/1.svg`,
            `${config.public.base}/assets/female/hairs/55/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/56/1.svg`,
            `${config.public.base}/assets/female/hairs/56/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/57/1.svg`,
            `${config.public.base}/assets/female/hairs/57/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/58/1.svg`,
            `${config.public.base}/assets/female/hairs/58/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/59/1.svg`,
            `${config.public.base}/assets/female/hairs/59/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/60/1.svg`,
            `${config.public.base}/assets/female/hairs/60/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/61/1.svg`,
            `${config.public.base}/assets/female/hairs/61/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/62/1.svg`,
            `${config.public.base}/assets/female/hairs/62/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/63/1.svg`,
            `${config.public.base}/assets/female/hairs/63/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/64/1.svg`,
            `${config.public.base}/assets/female/hairs/64/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/65/1.svg`,
            `${config.public.base}/assets/female/hairs/65/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/66/1.svg`,
            `${config.public.base}/assets/female/hairs/66/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/67/1.svg`,
            `${config.public.base}/assets/female/hairs/67/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/68/1.svg`,
            `${config.public.base}/assets/female/hairs/68/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/69/1.svg`,
            `${config.public.base}/assets/female/hairs/69/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/70/1.svg`,
            `${config.public.base}/assets/female/hairs/70/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/71/1.svg`,
            `${config.public.base}/assets/female/hairs/71/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/72/1.svg`,
            `${config.public.base}/assets/female/hairs/72/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/73/1.svg`,
            `${config.public.base}/assets/female/hairs/73/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/74/1.svg`,
            `${config.public.base}/assets/female/hairs/74/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/75/1.svg`,
            `${config.public.base}/assets/female/hairs/75/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/76/1.svg`,
            `${config.public.base}/assets/female/hairs/76/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/77/1.svg`,
            `${config.public.base}/assets/female/hairs/77/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/78/1.svg`,
            `${config.public.base}/assets/female/hairs/78/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/79/1.svg`,
            `${config.public.base}/assets/female/hairs/79/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/80/1.svg`,
            `${config.public.base}/assets/female/hairs/80/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/81/1.svg`,
            `${config.public.base}/assets/female/hairs/81/2.svg`,
          ],
        },
        {
          multi: true,
          src: [
            `${config.public.base}/assets/female/hairs/82/1.svg`,
            `${config.public.base}/assets/female/hairs/82/2.svg`,
          ],
        },
        { src: `${config.public.base}/assets/female/hairs/83.svg` },
        { src: `${config.public.base}/assets/female/hairs/84.svg` },
        { src: `${config.public.base}/assets/female/hairs/85.svg` },
        { src: `${config.public.base}/assets/female/hairs/86.svg` },
        { src: `${config.public.base}/assets/female/hairs/87.svg` },
        { src: `${config.public.base}/assets/female/hairs/88.svg` },
        { src: `${config.public.base}/assets/female/hairs/89.svg` },
        { src: `${config.public.base}/assets/female/hairs/90.svg` },
        { src: `${config.public.base}/assets/female/hairs/91.svg` },
        { src: `${config.public.base}/assets/female/hairs/92.svg` },
        { src: `${config.public.base}/assets/female/hairs/93.svg` },
        { src: `${config.public.base}/assets/female/hairs/94.svg` },
        { src: `${config.public.base}/assets/female/hairs/95.svg` },
        { src: `${config.public.base}/assets/female/hairs/96.svg` },
        { src: `${config.public.base}/assets/female/hairs/97.svg` },
        { src: `${config.public.base}/assets/female/hairs/98.svg` },
        { src: `${config.public.base}/assets/female/hairs/99.svg` },
        { src: `${config.public.base}/assets/female/hairs/100.svg` },
        { src: `${config.public.base}/assets/female/hairs/101.svg` },
        { src: `${config.public.base}/assets/female/hairs/102.svg` },
        { src: `${config.public.base}/assets/female/hairs/103.svg` },
        { src: `${config.public.base}/assets/female/hairs/104.svg` },
        { src: `${config.public.base}/assets/female/hairs/104.svg` },
        { src: `${config.public.base}/assets/female/hairs/105.svg` },
        { src: `${config.public.base}/assets/female/hairs/107.svg` },
        { src: `${config.public.base}/assets/female/hairs/108.svg` },
        { src: `${config.public.base}/assets/female/hairs/109.svg` },
        { src: `${config.public.base}/assets/female/hairs/110.svg` },
        { src: `${config.public.base}/assets/female/hairs/111.svg` },
        { src: `${config.public.base}/assets/female/hairs/112.svg` },
        { src: `${config.public.base}/assets/female/hairs/113.svg` },
        { src: `${config.public.base}/assets/female/hairs/114.svg` },
        { src: `${config.public.base}/assets/female/hairs/115.svg` },
        { src: `${config.public.base}/assets/female/hairs/116.svg` },
        { src: `${config.public.base}/assets/female/hairs/117.svg` },
        { src: `${config.public.base}/assets/female/hairs/118.svg` },
        { src: `${config.public.base}/assets/female/hairs/119.svg` },
        { src: `${config.public.base}/assets/female/hairs/120.svg` },
        { src: `${config.public.base}/assets/female/hairs/121.svg` },
      ],
      bodies: [
        { src: `${config.public.base}/assets/female/bodies/1.svg` },
        { src: `${config.public.base}/assets/female/bodies/2.svg` },
        { src: `${config.public.base}/assets/female/bodies/3.svg` },
        { src: `${config.public.base}/assets/female/bodies/4.svg` },
        { src: `${config.public.base}/assets/female/bodies/5.svg` },
      ],
      eyes: [
        { src: `${config.public.base}/assets/female/eyes/1.svg` },
        { src: `${config.public.base}/assets/female/eyes/2.svg` },
        { src: `${config.public.base}/assets/female/eyes/3.svg` },
        { src: `${config.public.base}/assets/female/eyes/4.svg` },
        { src: `${config.public.base}/assets/female/eyes/5.svg` },
        { src: `${config.public.base}/assets/female/eyes/6.svg` },
        { src: `${config.public.base}/assets/female/eyes/7.svg` },
        { src: `${config.public.base}/assets/female/eyes/8.svg` },
        { src: `${config.public.base}/assets/female/eyes/9.svg` },
        { src: `${config.public.base}/assets/female/eyes/10.svg` },
        { src: `${config.public.base}/assets/female/eyes/11.svg` },
      ],
      eyebrows: [
        { src: `${config.public.base}/assets/female/eyebrows/1.svg` },
        { src: `${config.public.base}/assets/female/eyebrows/2.svg` },
        { src: `${config.public.base}/assets/female/eyebrows/3.svg` },
      ],
      clothes: [
        { src: `${config.public.base}/assets/female/clothes/1.svg` },
        { src: `${config.public.base}/assets/female/clothes/2.svg` },
        { src: `${config.public.base}/assets/female/clothes/3.svg` },
        { src: `${config.public.base}/assets/female/clothes/4.svg` },
        { src: `${config.public.base}/assets/female/clothes/5.svg` },
        { src: `${config.public.base}/assets/female/clothes/6.svg` },
        { src: `${config.public.base}/assets/female/clothes/7.svg` },
        { src: `${config.public.base}/assets/female/clothes/8.svg` },
        { src: `${config.public.base}/assets/female/clothes/9.svg` },
        { src: `${config.public.base}/assets/female/clothes/10.svg` },
        { src: `${config.public.base}/assets/female/clothes/11.svg` },
        { src: `${config.public.base}/assets/female/clothes/12.svg` },
        { src: `${config.public.base}/assets/female/clothes/13.svg` },
        { src: `${config.public.base}/assets/female/clothes/14.svg` },
        { src: `${config.public.base}/assets/female/clothes/15.svg` },
        { src: `${config.public.base}/assets/female/clothes/16.svg` },
        // { src: `${config.public.base}/assets/female/clothes/17.svg` },
        // { src: `${config.public.base}/assets/female/clothes/18.svg` },
        // { src: `${config.public.base}/assets/female/clothes/19.svg` },
        // { src: `${config.public.base}/assets/female/clothes/20.svg` },
        // { src: `${config.public.base}/assets/female/clothes/21.svg` },
        // { src: `${config.public.base}/assets/female/clothes/22.svg` },
        // { src: `${config.public.base}/assets/female/clothes/23.svg` },
        // { src: `${config.public.base}/assets/female/clothes/24.svg` },
        // { src: `${config.public.base}/assets/female/clothes/25.svg` },
        // { src: `${config.public.base}/assets/female/clothes/26.svg` },
        // { src: `${config.public.base}/assets/female/clothes/27.svg` },
        // { src: `${config.public.base}/assets/female/clothes/28.svg` },
        // { src: `${config.public.base}/assets/female/clothes/29.svg` },
        // { src: `${config.public.base}/assets/female/clothes/30.svg` },
        // { src: `${config.public.base}/assets/female/clothes/31.svg` },
        // { src: `${config.public.base}/assets/female/clothes/32.svg` },
        // { src: `${config.public.base}/assets/female/clothes/33.svg` },
        // { src: `${config.public.base}/assets/female/clothes/34.svg` },
        // { src: `${config.public.base}/assets/female/clothes/35.svg` },
        // { src: `${config.public.base}/assets/female/clothes/36.svg` },
        // { src: `${config.public.base}/assets/female/clothes/37.svg` },
        // { src: `${config.public.base}/assets/female/clothes/38.svg` },
        // { src: `${config.public.base}/assets/female/clothes/39.svg` },
        // { src: `${config.public.base}/assets/female/clothes/40.svg` },
        // { src: `${config.public.base}/assets/female/clothes/41.svg` },
        // { src: `${config.public.base}/assets/female/clothes/42.svg` },
        // { src: `${config.public.base}/assets/female/clothes/43.svg` },
        // { src: `${config.public.base}/assets/female/clothes/44.svg` },
        // { src: `${config.public.base}/assets/female/clothes/45.svg` },
        // { src: `${config.public.base}/assets/female/clothes/46.svg` },
      ],
      accessories: [
        { src: `${config.public.base}/assets/female/accessories/1.svg` },
        { src: `${config.public.base}/assets/female/accessories/2.svg` },
        { src: `${config.public.base}/assets/female/accessories/3.svg` },
        { src: `${config.public.base}/assets/female/accessories/4.svg` },
        { src: `${config.public.base}/assets/female/accessories/5.svg` },
        { src: `${config.public.base}/assets/female/accessories/6.svg` },
        { src: `${config.public.base}/assets/female/accessories/7.svg` },
        { src: `${config.public.base}/assets/female/accessories/8.svg` },
        { src: `${config.public.base}/assets/female/accessories/9.svg` },
        { src: `${config.public.base}/assets/female/accessories/10.svg` },
        { src: `${config.public.base}/assets/female/accessories/11.svg` },
        { src: `${config.public.base}/assets/female/accessories/12.svg` },
      ],
      mouths: [
        { src: `${config.public.base}/assets/female/mouths/1.svg` },
        { src: `${config.public.base}/assets/female/mouths/2.svg` },
        { src: `${config.public.base}/assets/female/mouths/3.svg` },
        { src: `${config.public.base}/assets/female/mouths/4.svg` },
        { src: `${config.public.base}/assets/female/mouths/5.svg` },
        { src: `${config.public.base}/assets/female/mouths/6.svg` },
        { src: `${config.public.base}/assets/female/mouths/7.svg` },
        { src: `${config.public.base}/assets/female/mouths/8.svg` },
        { src: `${config.public.base}/assets/female/mouths/9.svg` },
        { src: `${config.public.base}/assets/female/mouths/10.svg` },
      ],
    },
    backgrounds: [
      { src: `${config.public.base}/assets/backgrounds/1.png` },
      { src: `${config.public.base}/assets/backgrounds/2.png` },
      { src: `${config.public.base}/assets/backgrounds/3.png` },
      { src: `${config.public.base}/assets/backgrounds/4.png` },
      { src: `${config.public.base}/assets/backgrounds/5.png` },
      { src: `${config.public.base}/assets/backgrounds/6.png` },
      { src: `${config.public.base}/assets/backgrounds/7.png` },
      { src: `${config.public.base}/assets/backgrounds/8.png` },
      { src: `${config.public.base}/assets/backgrounds/9.png` },
      { src: `${config.public.base}/assets/backgrounds/10.png` },
      { src: `${config.public.base}/assets/backgrounds/11.png` },
      { src: `${config.public.base}/assets/backgrounds/12.png` },
      { src: `${config.public.base}/assets/backgrounds/13.png` },
      { src: `${config.public.base}/assets/backgrounds/14.png` },
      { src: `${config.public.base}/assets/backgrounds/15.png` },
      { src: `${config.public.base}/assets/backgrounds/16.png` },
      { src: `${config.public.base}/assets/backgrounds/17.png` },
      { src: `${config.public.base}/assets/backgrounds/18.png` },
      { src: `${config.public.base}/assets/backgrounds/19.png` },
      { src: `${config.public.base}/assets/backgrounds/20.png` },
    ],
  }));

  return { viewMode, loaded, assets };
}
