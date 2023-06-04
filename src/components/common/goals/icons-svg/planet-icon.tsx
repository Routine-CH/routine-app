import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import AppColors from "../../../../utils/constants/colors";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const PlanetIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={AppColors.white}
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_4" data-name="Layer 4">
      <Path d="M105.07 53.84a47.29 47.29 0 00-8.45-18.41A40.76 40.76 0 0081 22.72a37 37 0 00-7-2.39 43.32 43.32 0 00-7.36-1.12 46.56 46.56 0 00-25.42 5.71 44.94 44.94 0 00-18.6 18.35 49.34 49.34 0 00-5.07 22.81 45.6 45.6 0 002.78 14.69A42.47 42.47 0 0027.8 93.6c2 2.34 1.29 2.59-1.07 1.05a12.21 12.21 0 01-2-1.56L23.61 92l-.6-.61-.56-.68a24.69 24.69 0 01-2.3-3.17c-.36-.6-.72-1.22-1.09-1.87s-.63-1.35-.94-2.06a46.46 46.46 0 01-2.49-7.79c-.25-1.34-.53-2.68-.69-4s-.35-2.7-.35-4.06a53.42 53.42 0 011.79-16.12A55.57 55.57 0 0119.14 44a38.57 38.57 0 014.14-7.08A47.1 47.1 0 0135 25.63a54.07 54.07 0 0117.93-8 46.7 46.7 0 0119.83-.39 42.09 42.09 0 0119.46 9.51 47.38 47.38 0 0112.65 17.52 51.57 51.57 0 013.6 12.83 48.6 48.6 0 01-6.66 32.25A46.48 46.48 0 0188 103.83c-8.66 5.85-19.15 8.19-29.39 7.74-1.14-.06-2.25-.15-3.38-.23s-2.23-.25-3.36-.44a44.2 44.2 0 01-8.68-2.22 20.76 20.76 0 01-2.18-1 7.78 7.78 0 01-1.33-1 7.39 7.39 0 01-.93-.89c-.27-.4.44-.42 1.9-.1l6.63 1.58c8.61 1.88 17.87 2.27 26.62-.09a41.86 41.86 0 0022.37-14.65A46.74 46.74 0 00105 74.22a45.83 45.83 0 000-20.35z" />
      <Path d="M41.22 94.81c-3.73 3.74-7.49 7.47-11.4 11.07-1.43 1.32-2.83 2.66-4.33 3.91a48 48 0 01-8.55 6 11.13 11.13 0 01-5.34 1.44 5.79 5.79 0 01-2.89-.78 4.08 4.08 0 01-1.83-2.56 10.32 10.32 0 01.3-4.91 29.17 29.17 0 011.6-4.37 32.88 32.88 0 016.48-9.82c.94-.85 1.21-.25 1 .87a14.16 14.16 0 01-2.08 4.63 46.07 46.07 0 00-2.83 4.9 25.29 25.29 0 00-2 5.12c-.41 1.69-.38 3.44.41 4a3.14 3.14 0 001.91.61 6.52 6.52 0 002.44-.36 21.78 21.78 0 005.94-3.37c1.91-1.41 3.74-3 5.54-4.57 3.94-3.49 7.73-7.21 11.49-11l6.9-7c3.48-3.54 7-7.06 10.58-10.48a86.86 86.86 0 018.61-7.61 21.91 21.91 0 012.17-1.42c2.91-1.6 4.56-1.28 5.12-.53a1.71 1.71 0 01.33.54c0 .28-.25.4-.7.52a12.94 12.94 0 00-2.06.72 20.6 20.6 0 00-4 2.56c-1.33 1-2.62 2.12-3.91 3.28-2.59 2.32-5.12 4.8-7.65 7.29C48.73 87.22 45 91 41.27 94.85zM66.45 58.67l.43.51.35.37.48.48a5 5 0 01-.06 1c-.06.16-.13.33-.2.49l-.3.45a9.68 9.68 0 01-.93 1 1.64 1.64 0 00-.24.23c-.06 0 0 .11 0 .13a.29.29 0 00.19.05 1.62 1.62 0 00.44 0 2.63 2.63 0 00.47-.06 9.36 9.36 0 002-.62 26.63 26.63 0 003.82-2.13c1.51-1 3-2.13 4.37-3.27 2.52-2 4.93-4.17 7.26-6.42A59.51 59.51 0 0091 43.72a3 3 0 00.45-3.44c-.47-1-2-.55-3.17 0a26.41 26.41 0 00-4.51 2.94c-1.44 1.11-2.84 2.28-4.24 3.45-1.72 1.5-.78-1.71 2.63-4.43A31.22 31.22 0 0187 39a8.43 8.43 0 013.11-1 3 3 0 012 .63 3.5 3.5 0 011.07 1.7 4.55 4.55 0 01-.49 3.51A17.11 17.11 0 0191 46.32c-1.3 1.47-2.63 2.84-4 4.18a118 118 0 01-10.44 9.31 42.12 42.12 0 01-5.29 3.5 15.59 15.59 0 01-3 1.29 7.57 7.57 0 01-1.68.32 1.78 1.78 0 01-.46 0 3.07 3.07 0 01-.57-.06 5.6 5.6 0 01-1.07-.44 1.22 1.22 0 01-.54-.75 1.36 1.36 0 01.27-.89 4.65 4.65 0 01.69-.78l.53-.51A4.42 4.42 0 0066 61c.07-.11.17-.28.07-.39l-.25-.27-.44-.51a9.77 9.77 0 01-.8-1.11 4.45 4.45 0 01-.6-1.39 1.72 1.72 0 01.51-1.7 2.93 2.93 0 01.84-.18 4.43 4.43 0 01.72 0 8.68 8.68 0 011.26.17c.31.07.61.15.92.24l.4.12.23.09c.08.06.12-.07.18-.1l.21-.2.64-.64 2.07-2-1-.49-1.56-.83a34.89 34.89 0 01-3-1.85 11 11 0 01-1.7-1.46 2.88 2.88 0 01-.71-1 1.31 1.31 0 01.26-1.35 4.54 4.54 0 013.56-1.38 26.23 26.23 0 013.48.27c.8.1 1.58.2 2.38.32 3 .45 3.86.68 4.43 1.2a3.41 3.41 0 01.38.35c.24.37-1 .47-3.19.23-1.8-.2-3.62-.46-5.41-.65a15.37 15.37 0 00-2.6-.08 3.6 3.6 0 00-1.06.23 2.06 2.06 0 00-.41.23l-.19.14-.08.09.11.14a2.93 2.93 0 00.3.32 12.23 12.23 0 001.64 1.27A43.21 43.21 0 0071.46 51l1.34.67 1.83.86L70 57.19l-.42.42c-.15.13-.27.35-.47.2L68 57.43a10.19 10.19 0 00-1-.28 6.4 6.4 0 00-1-.15h-.39s0 .16.1.26a6.78 6.78 0 00.86 1.33z" />
      <Path d="M84.3 62.51a9.65 9.65 0 00.33-1.87c.07-.67.1-1.36.12-2v-1.51c0-.87 0-1.83-.08-2.61a4 4 0 000-.57 1.91 1.91 0 00-.06-.33s-.06-.12-.11-.11a.43.43 0 00-.09.1c-.1.13-.2.3-.31.46a2.09 2.09 0 01-.18.27 5 5 0 01-.43.5 4.36 4.36 0 01-.64.58 7.36 7.36 0 01-.63.47 6.23 6.23 0 01-1.39.76c-.14 0-.32 0-.29-.17a.21.21 0 01-.11-.22 1.17 1.17 0 010-.32 1.8 1.8 0 01.73-1.31 13.23 13.23 0 001.12-.82 3.19 3.19 0 00.43-.46c.29-.35.59-.85.87-1.27a2.75 2.75 0 01.42-.58 1.51 1.51 0 01.37-.15c.22 0 .38-.23.71 0a1 1 0 01.57.6 5.23 5.23 0 01.29 1.25c.15 1.29.14 1.7.2 2.41s.09 1.31.09 2a29 29 0 01-.29 4.39 5.07 5.07 0 01-.41 1.42 1.55 1.55 0 01-1.47 1 2.16 2.16 0 01-1.16-.58 6 6 0 01-.73-.8 15.35 15.35 0 01-1.1-1.74 18.4 18.4 0 01-1.35-2.83 5 5 0 01-.21-.69c-.21-.89.06-1.47.55-1.48a.52.52 0 01.29.07c.2.29.38.28.48.73A18.32 18.32 0 0083 61.63a6.82 6.82 0 00.55.72 3.47 3.47 0 00.48.44s.09-.09.16-.31zM68.92 62.36a3.19 3.19 0 01-.73.66 2.27 2.27 0 01-.6.26 4 4 0 01-1.26.1c-.28 0-.67-.41-.5-.7l.86-1.36.07-.09v-.08a2.14 2.14 0 00.13-.22.31.31 0 00-.2-.48s-.06 0-.09-.05h-.05l-.19-.13c-.26-.18-.53-.36-.81-.57a4.58 4.58 0 01-.47-.39 3.11 3.11 0 01-.29-.31 2 2 0 01-.19-.27 1.07 1.07 0 01-.12-.19c0-.12-.1-.24-.14-.36V58a2.15 2.15 0 010-.45 2.06 2.06 0 01.29-1 2.09 2.09 0 01.86-.8 2.05 2.05 0 01.49-.18h.33a2.46 2.46 0 01.54 0 2.36 2.36 0 01.38.08 1 1 0 01.39.13 5.88 5.88 0 001.15.45l.26.07h.07l.74-.7c.54-.54 1.07-1.11 1.56-1.69l.69-.86-.31-.14-.51-.21-.5-.2-.54-.25-.92-.46a21.42 21.42 0 01-2-1.14 5.35 5.35 0 01-1.31-1.2 4 4 0 01-.34-.5 1.87 1.87 0 01-.14-.27 2.32 2.32 0 01-.13-.37 1.74 1.74 0 01-.09-.51 3 3 0 010-.6 2.53 2.53 0 011.1-1.66 3 3 0 01.79-.37 5.15 5.15 0 011.52-.2c.4 0 .76 0 1.11.06.7.06 1.37.14 2 .22a4.12 4.12 0 001.31.06 31 31 0 015.26.67h.05a1.29 1.29 0 00.31-.13 7.07 7.07 0 00.63-.41c.33-.22.81-.62 1.24-1l1.35-1.06a33.32 33.32 0 012.87-2 2.55 2.55 0 01.91-.47 8 8 0 002.25-.8 6.14 6.14 0 013.35-.55 2.76 2.76 0 011.58.91c.37.37-.17.62-.31.61-.45-.06-.25.32-.34.5a.86.86 0 01-.11.19.42.42 0 01-.19 0h-.43a3.31 3.31 0 00-1.33.4 17.94 17.94 0 00-2.25 1.61s-.41.3-1 .74-1.3 1.08-2 1.77-1.47 1.44-2.09 2.08a10 10 0 01-1.76 1.44 4.36 4.36 0 01-2.3.63 4.09 4.09 0 01-1.11-.07c-.37-.06-1.79-.27-3.19-.42s-2.72-.26-2.83-.26H69a1.42 1.42 0 01-.31 0h-.09v-.1a4.61 4.61 0 00-.16-.64c0-.15-.09-.29-.13-.43a2.57 2.57 0 00-.16-.37.76.76 0 00-.15-.26c-.07-.08-.06-.11-.12-.15s-.08 0 0 0a.45.45 0 00.19-.06l.52-.29.09-.05a4.16 4.16 0 00.79-.7h.09l.44.25c.37.19.83.39 1.35.6l.87.4.71.34.83.42.48.25c.24.13.45.27.68.41a5.26 5.26 0 012 2.15 3.19 3.19 0 01.25 1.42 1.9 1.9 0 01-.14.7 3.33 3.33 0 01-.28.69 3.72 3.72 0 01-.65.91 6.17 6.17 0 01-.48.54l-.4.43A25.27 25.27 0 0172 58.9l-.47.33c-.06.06-.22.13-.34.22l-.38.24A6.38 6.38 0 0170 60a2.6 2.6 0 01-.88 0c-1.39-.22-1.86-.55-2.55-.64h-.33l.07-.28a3.68 3.68 0 00.18-1.5.23.23 0 00.1 0l.35-.18a4 4 0 00.48-.35l.3-.24c.08-.08.22-.22.18-.17l.1.12c.17.18.44.41.71.65l.22.2a2.83 2.83 0 01.3.3c.21.19.37.39.53.56a4.44 4.44 0 01.39.65 2.84 2.84 0 01.21.46 2.08 2.08 0 01-.36 1.58 7 7 0 01-1.08 1.2zM44.26 15.62a9.29 9.29 0 017.24-3c1.14.06 2.54-1.62.87-1.7a13 13 0 00-10.15 4c-1.08 1.07 1.3 1.39 2 .66zM111.67 47.16a8.2 8.2 0 012.38 8.72c-.41 1.09 1.62 1.07 1.93.23a9.12 9.12 0 00-2.46-9.84c-.66-.63-2.57.21-1.85.89zM116.62 43.57a5.66 5.66 0 012.79 5.3c0 .89 2 .51 2-.23a6.49 6.49 0 00-3.22-6.11c-.61-.39-2.46.47-1.61 1zM41.44 40.62c.2 2.67-4.89 2.84-4.43-.3.31-2.2 3.72-2.34 4.34-.18a2.23 2.23 0 01.09.48zM31.38 50.19c.12 1.59-2.93 1.7-2.66-.19a1.35 1.35 0 012.6-.1 1.5 1.5 0 01.06.29zM80.78 98.68c.12 1.6-2.94 1.7-2.66-.19a1.35 1.35 0 012.6-.1 1.67 1.67 0 01.06.29z" />
    </G>
  </Svg>
);

export default PlanetIcon;
