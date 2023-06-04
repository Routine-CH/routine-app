import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import AppColors from "../../../../utils/constants/colors";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const MoneyIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={AppColors.white}
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_20" data-name="Layer 20">
      <Path
        d="M113.83 16.52a1.07 1.07 0 011.35-.71c2.82.87-2.27 3.67-1.35.71zM77.4 57.09a1.08 1.08 0 011.35-.71c2.82.87-2.27 3.67-1.35.71zM21 42.23a1.09 1.09 0 011.35-.72c2.77.88-2.35 3.67-1.35.72z"
        fill="none"
        stroke="#231f20"
        strokeMiterlimit={10}
      />
      <Path d="M52.57 66.76a29.16 29.16 0 0111.25-.84l5.39.49a29.31 29.31 0 005.19-.11c2.6-.21 5.2-.55 7.8-.84l6.89-.82c1.16-.14 2.25-.31 3.49-.43a21.18 21.18 0 013.65 0 11.83 11.83 0 017 2.6 7.45 7.45 0 011.31 1.51 2.82 2.82 0 01.36 2.37 3.6 3.6 0 01-1.38 1.73 9.53 9.53 0 01-1.67.92A30.46 30.46 0 0195.72 75c-2 .4-4.12.66-6.14.9-5.19.62-10.34 1.45-14.78 4-1.34.84-1.38.53-.47-.61a12.36 12.36 0 016.12-3.86c5.41-1.54 10.85-1.52 15.91-2.64a29.15 29.15 0 003.7-1 9.37 9.37 0 001.63-.74 2.85 2.85 0 001-.88c.13-.24.1-.23 0-.58a2.88 2.88 0 00-.4-.57 3.89 3.89 0 00-.56-.59 7.91 7.91 0 00-3-1.62 14.45 14.45 0 00-4.49-.53 20.15 20.15 0 00-2.33.2l-2.47.35c-3.29.47-6.59.92-9.89 1.28-1.81.2-3.62.39-5.45.53-.92.07-1.83.14-2.77.16h-1.47l-1.37-.11a67 67 0 00-10.71-.49 20.46 20.46 0 00-6.23 1.47A25.16 25.16 0 0045.91 73c-2.63 2-5.2 4.3-7.83 6.43s-5.28 4.27-8 6.28a122.65 122.65 0 01-13 8.67c-1 .54-2 1.12-3 1.64a27.3 27.3 0 01-4.22 1.68 6.09 6.09 0 01-2.08.24 4 4 0 01-.67-.06c-.25-.07 0-.34.64-.8a28.64 28.64 0 013-1.79A144.62 144.62 0 0034.3 79.46c2.8-2.27 5.54-4.62 8.36-7a28.64 28.64 0 019.88-5.79z" />
      <Path d="M69.31 93.87c3.47-.16 6.9-.26 10.28-.6 1.69-.17 3.37-.39 5-.68a21.35 21.35 0 002.44-.54l1.15-.33c.39-.1.76-.31 1.14-.45a38.61 38.61 0 006.37-3.58A92.25 92.25 0 00106 79.55a112.64 112.64 0 009.28-9.39 34.83 34.83 0 003.47-4.57 8.64 8.64 0 001.13-2.46 4.16 4.16 0 00.18-1.23 1.82 1.82 0 00-.2-.89.57.57 0 00-.36-.22 1.32 1.32 0 00-.53 0 7.13 7.13 0 00-1.57.57 28.82 28.82 0 00-3.13 1.85l-3.05 2.12-1.52 1.08c-.51.36-1.06.67-1.57 1-1.3.87-1.33.53-.61-.68a16.21 16.21 0 014.61-5.08 29.81 29.81 0 013.87-2.3 10.67 10.67 0 012.34-.87 4.22 4.22 0 01.75-.11 3.65 3.65 0 011 .07 2.66 2.66 0 011 .41 3.66 3.66 0 01.73.74 4.36 4.36 0 01.62 2.22 6.6 6.6 0 01-.24 1.78 10.49 10.49 0 01-1.29 2.9 39.1 39.1 0 01-3.44 4.69 84 84 0 01-7.89 8.12c-4.64 4.18-9.51 8.53-15.06 11.87a34.42 34.42 0 01-4.83 2.39 23.63 23.63 0 01-2.63.83 50 50 0 01-2.61.51 86.78 86.78 0 01-10.5 1c-4.29.21-8.56.32-12.78.8a24 24 0 00-4.54 1.2c-1.51.5-3 1.12-4.5 1.73-3 1.25-5.88 2.65-8.75 4.09-4.45 2.27-8.68 4.74-12.85 7.34-.93.57-1.8 1.16-2.72 1.75-3.39 2.18-4.45 2.81-5.47 2.92-.24 0-.51.11-.67.11-.53.07.39-1.57 2.84-3.38a108.57 108.57 0 0111.56-7.35c4-2.27 8.23-4.42 12.53-6.4a72.33 72.33 0 0110-3.82 11.5 11.5 0 011.4-.31 12.83 12.83 0 011.39-.22l2.61-.22c1.77-.14 3.52-.24 5.27-.33z" />
      <Path d="M31.57 102.47a19.39 19.39 0 01-2-1.11 16.62 16.62 0 01-1.82-1.36 16.53 16.53 0 01-1.26-1.1 16.05 16.05 0 01-3-4.92c-.14-.4-.3-.78-.46-1.17s-.26-.79-.4-1.18a9.38 9.38 0 01-.63-3.12c0-.34.38-.35.81-.16a2 2 0 011.12 1.12 45.17 45.17 0 002.26 5.4 9.51 9.51 0 001 1.46c.44.4.84.86 1.31 1.23a12.34 12.34 0 001.5 1.22 15.52 15.52 0 001.7 1 18.91 18.91 0 002.3 1 19.61 19.61 0 003.72 1 22.79 22.79 0 003 .14h.65c.82.06 1.06.26 1.19.88 0 .15.07.29.09.43 0 .47-.33.84-1 .95a15 15 0 01-5.83-.24 23.58 23.58 0 01-4.31-1.47z" />
      <Path d="M15.6 95.32a8.08 8.08 0 014 2.41 18.85 18.85 0 012.5 3.27c1.35 2.15 2.49 4.35 4 5.63a3.83 3.83 0 001.66.83l-1.79 2a13.67 13.67 0 00-.84-2.28 48.2 48.2 0 00-4.13-6.7c-.67-1-1.6-2-2.41-3.27a7.72 7.72 0 01-1-2.14 4.18 4.18 0 01.08-2.68l.33-.83.81.13a7.12 7.12 0 013.1 1.39 23.61 23.61 0 013.23 3.06c1 1.08 1.88 2.16 2.79 3.22a47.75 47.75 0 003.62 3.86 10.44 10.44 0 004 2.61c.84.17.93.83-.2 1.36a3.93 3.93 0 01-2.4.08 6.87 6.87 0 01-2.82-1.5 59.83 59.83 0 01-6-6.61 35.68 35.68 0 00-2.8-3 6.37 6.37 0 00-2.81-1.73l1.77-1.08a1.57 1.57 0 000 1.14 6.9 6.9 0 00.89 1.68c.56.84 1.32 1.69 2 2.72s1.31 1.81 2 2.75a22.76 22.76 0 013.5 6.32l.21.72.6 2.1-2.17-.39a7.2 7.2 0 01-3.76-2.16 18.83 18.83 0 01-2.31-3.07c-1.3-2-2.41-4.13-3.94-5.56a5.33 5.33 0 00-2.45-1.35l1.27-.85a3.51 3.51 0 00.48 2 15.12 15.12 0 001.39 2.29c1.23 1.68 2.65 3.29 4.08 4.89.72.8 1.45 1.6 2.17 2.44.35.42.71.85 1.06 1.34a4.61 4.61 0 01.51.91 1.47 1.47 0 010 1.08 1.38 1.38 0 01-.59.63 3.07 3.07 0 01-.52.14l.66-.36a3.17 3.17 0 01-.6.55 2 2 0 01-.81.33 3.12 3.12 0 01-1.9-.32 7.89 7.89 0 01-1.31-.81 21.42 21.42 0 01-2.13-1.85c-1.31-1.28-2.51-2.61-3.69-3.94L13.35 105a25.21 25.21 0 01-1.84-2.25 1.79 1.79 0 01-.31-1.21.34.34 0 00-.14-.25 1.27 1.27 0 00-.31-.08c-.19 0-.34-.08-.29-.36a.7.7 0 01.36-.47 1.45 1.45 0 01.86-.19 4.92 4.92 0 012.71 1.44c2 1.83 3.66 3.81 5.43 5.67a29.4 29.4 0 002.64 2.53 5.25 5.25 0 001.09.7h.05a1.31 1.31 0 010 .25 1.36 1.36 0 000 .36v.17a.06.06 0 000 .06c.09.33 0-.16-.46-.39l1.44.25a.69.69 0 000 .32.77.77 0 00.07.16v.08s0 .05.05.07a.21.21 0 00-.15 0h-.3a1 1 0 00-.38.11 1.07 1.07 0 01-.26.09l-.31.1-.3.13-.14.07a5.28 5.28 0 00-.3-.45c-.32-.42-.73-.9-1.14-1.37-1.58-1.79-3.3-3.62-4.89-5.63a28.4 28.4 0 01-2.3-3.28 11.6 11.6 0 01-1-2A5.27 5.27 0 0113 96.7l.43-2 1.87.49.3.08zM32.55 46.08a10.46 10.46 0 00.26 2.16 9.85 9.85 0 00.8 2 9.57 9.57 0 002.84 3.36 11.07 11.07 0 001.39.86c.49.22 1 .44 1.5.63a9.43 9.43 0 0010.53-2.77 10.54 10.54 0 002.28-4.7 12.37 12.37 0 00-.56-6.55c-.22-.64.26-.84 1-.47a4 4 0 011.89 3 12.75 12.75 0 01-1.57 7.88 12.13 12.13 0 01-2.55 3.15 11.38 11.38 0 01-3.46 2.14 13 13 0 01-4.82.8 12.11 12.11 0 01-4.74-1.16 13.06 13.06 0 01-4.18-3.27 12.2 12.2 0 01-2.33-4.75 11.5 11.5 0 01.33-6.39 12.37 12.37 0 016.38-7 11.65 11.65 0 017.33-1.1 12.81 12.81 0 011.62.41 5.52 5.52 0 011.93 1.09 1.43 1.43 0 01.5 1 1.72 1.72 0 010 .45c-.11.44-.94.26-2.1-.28a10.15 10.15 0 00-5.63-.65A10.56 10.56 0 0036 38.37 11.71 11.71 0 0034.51 40a11.15 11.15 0 00-1.09 1.89 8.9 8.9 0 00-.82 4.23zM92.63 43.72a14.64 14.64 0 0011.28-7.16 16.52 16.52 0 001.9-4.74 15.32 15.32 0 00-.42-8.89 14.94 14.94 0 00-5.54-7.06A16.76 16.76 0 0092.24 13a18.08 18.08 0 00-10.06 1.89c-1 .48-1.2-.06-.64-1.06a6.75 6.75 0 014.35-2.93 19 19 0 0111.89 1.2 17.73 17.73 0 018.76 8.09 18.12 18.12 0 01.84 14.27A17.61 17.61 0 0196.3 45.29a10 10 0 01-1.19.33 8.46 8.46 0 01-1.2.23l-2.42.29h-2.43a6.16 6.16 0 01-1.21-.15l-1.2-.2a17 17 0 01-6.69-3 17.3 17.3 0 01-4.88-5.41 17.1 17.1 0 01-1.25-2.54 27.12 27.12 0 01-.83-2.71c-.15-.92-.32-1.86-.39-2.8v-1.42a6.78 6.78 0 01.09-1.42 21 21 0 01.43-2.49 9.74 9.74 0 011.32-3 2.35 2.35 0 011.21-1 2.22 2.22 0 01.55-.16c.55 0 .27 1.24-.44 3.13a16.12 16.12 0 00-.48 9 15.47 15.47 0 004.55 7.81 16.23 16.23 0 002.74 2.06l1.54.76a13.6 13.6 0 001.62.58l.82.27.86.14a16.38 16.38 0 001.71.25h1.75a3.64 3.64 0 00.87 0l.87-.11z" />
      <Path d="M92.82 29.3c-1.39-.23-3.15.21-5 .35a7.21 7.21 0 01-2.25-.1 5.1 5.1 0 01-.55-.19 3.43 3.43 0 01-.56-.31 2.54 2.54 0 01-.86-1.1 3.18 3.18 0 01.16-2.31 9.17 9.17 0 012.22-3 14.42 14.42 0 012.56-1.95 7.15 7.15 0 012-.8 3.41 3.41 0 012.24.2c.45.22.16.54-.26.82a5 5 0 01-1.41.78 10.74 10.74 0 00-5.36 4 2 2 0 00-.41 1.52.61.61 0 00.38.33 3.46 3.46 0 00.9.19c1.52.13 3.31-.37 5.22-.43a5.07 5.07 0 013.55 1.06 4.89 4.89 0 01.94 1.09A2.94 2.94 0 0196.7 31a2.61 2.61 0 01-.58 1.48 5 5 0 01-1 1 16.88 16.88 0 01-3.54 1.9c-.27.11-.53.23-.8.32-1 .32-1.39.25-1.74-.22a2.52 2.52 0 01-.24-.33c-.21-.39.13-.83.82-1.15l3-1.39a10.61 10.61 0 001.34-.74 2.53 2.53 0 00.78-.73.35.35 0 000-.33 1.74 1.74 0 00-.41-.66 2.3 2.3 0 00-1.55-.8z" />
      <Path d="M88.18 21.61c.09 0 0 .11-.27.26a2.08 2.08 0 01-.38.18.9.9 0 01-.22 0s-.26-.17-.35-.22a.44.44 0 01-.17-.19c-.07-.16-.16-.3-.24-.45a.25.25 0 010-.12.49.49 0 00-.11-.38h-.06c-.06 0-.23-.32-.22-.37a2.66 2.66 0 000-.39v-.07c0-.07.06-.1 0-.14a.3.3 0 010-.16s0-.08.09-.12a.56.56 0 01.22-.11.58.58 0 00.19-.1h.07a1.57 1.57 0 01.45.12s.28.33.32.36 0 .05 0 .08.24.26.24.27.09.1 0 .21a1 1 0 01.12.33.48.48 0 00.08.16s.09.27.2.37 0 .22 0 .25 0 .23.04.23zM93.94 35.61c.09 0 0 .1-.28.26a3 3 0 01-.37.18h-.22a2.68 2.68 0 01-.35-.22.41.41 0 01-.17-.2l-.24-.45a.14.14 0 010-.11.48.48 0 00-.11-.38.06.06 0 00-.06 0c-.08 0-.23-.32-.22-.37s0-.27 0-.4v-.06c0-.06.06-.11.05-.14a.43.43 0 010-.16.76.76 0 01.1-.13.65.65 0 01.22-.11c.06 0 .12-.06.19-.09h.07a1.3 1.3 0 01.45.12 3.2 3.2 0 00.32.36v.08c0 .03.24.25.24.27s.09.1 0 .21a.87.87 0 01.12.33.6.6 0 00.08.16s.08.27.19.37 0 .22 0 .24-.05.23-.01.24zM45.21 46.76a20.43 20.43 0 00-4 .27A5.59 5.59 0 0139.4 47a2.25 2.25 0 01-1.58-1.31 2.57 2.57 0 01.12-1.86 7.25 7.25 0 011.79-2.39 11.13 11.13 0 012-1.56 5.54 5.54 0 011.58-.65 2.81 2.81 0 011.8.17c.36.18.11.45-.23.69a3.6 3.6 0 01-1.1.64 8.74 8.74 0 00-4.25 3.21 1.55 1.55 0 00-.33 1.18c0 .17.42.35 1 .4 1.21.1 2.64-.3 4.16-.34a4.08 4.08 0 012.84.85 4.22 4.22 0 01.76.88 4.75 4.75 0 01.25.56 2.76 2.76 0 01.1.66 2.9 2.9 0 01-.14.65 4.8 4.8 0 01-.32.54c-.14.14-.26.3-.4.43l-.43.35a14.44 14.44 0 01-2.83 1.53c-.21.09-.42.18-.64.25-.82.26-1.1.2-1.39-.2a1.65 1.65 0 01-.19-.27c-.17-.32.09-.69.64-.95L45 49.3a9.52 9.52 0 001.06-.58c.28-.2.57-.44.6-.57s0-.07.06-.1 0-.06 0-.13a2.35 2.35 0 01-.1-.22 3.15 3.15 0 01-.22-.29 1.75 1.75 0 00-1.2-.61z" />
      <Path d="M41.54 40.58c.08 0 0 .09-.23.22a1.71 1.71 0 01-.31.2h-.18a2.6 2.6 0 01-.29-.17.36.36 0 01-.14-.16l-.19-.36a.25.25 0 010-.09.37.37 0 00-.08-.3s-.19-.25-.18-.29a1.75 1.75 0 000-.32v-.05-.11A.28.28 0 0140 39a.35.35 0 01.08-.1.5.5 0 01.18-.09.6.6 0 00.16-.08h.06a1.25 1.25 0 01.37.09s.23.26.26.28 0 0 0 .07l.2.21c0 .05.07.09 0 .17a.73.73 0 01.09.26.45.45 0 00.06.12s.07.22.16.3 0 .17 0 .19-.11.16-.08.16zM46.13 51.74c.07 0 0 .08-.23.21a2.1 2.1 0 01-.31.15h-.19a2.62 2.62 0 01-.28-.17.36.36 0 01-.14-.16l-.19-.35a.16.16 0 010-.1.38.38 0 00-.08-.3h-.05c-.05 0-.19-.25-.18-.3s0-.21 0-.31v-.06-.11a.28.28 0 010-.13s0-.06.08-.1a.6.6 0 01.18-.09.6.6 0 00.16-.08h.06a1.43 1.43 0 01.37.09 3.06 3.06 0 00.26.29v.06c0 .06.19.2.19.21s.08.09 0 .17a1 1 0 01.09.26.75.75 0 00.06.13c.06.1.07.22.16.3s0 .18 0 .19.01.19.04.2z" />
    </G>
  </Svg>
);

export default MoneyIcon;
