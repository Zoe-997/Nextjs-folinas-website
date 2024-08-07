import { Roboto, Source_Serif_4 } from "next/font/google";
import localFont from 'next/font/local';

export const fontBaseVi = Roboto({
    subsets: ["latin", "vietnamese"],
    weight: "400"
});

export const fontSecondary = Source_Serif_4({ subsets: ["latin", "vietnamese"] });

export const fontBase = localFont({
    src: [
      {
        path: '../fonts/Ferrari/Ferrari-SansRegular.woff2',
        weight: '400'
      },
      {
        path: '../fonts/Ferrari/Ferrari-SansMedium.woff2',
        weight: '500'
      }
    ],
  });
