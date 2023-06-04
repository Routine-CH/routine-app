import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import AppColors from "../../../../utils/constants/colors";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const MailIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={AppColors.white}
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_11" data-name="Layer 11">
      <Path d="M109.29 31.71a1.36 1.36 0 011.52-1.19c3.72.48-2.01 5.09-1.52 1.19z" />
      <Path d="M84.83 27.93a1.37 1.37 0 011.53-1.19c3.72.46-2.01 5.09-1.53 1.19z" />
      <Path d="M75.43 9.24A1.38 1.38 0 0177 8.05c3.68.46-2 5.09-1.57 1.19z" />
      <Path d="M68.47 119.51c-4.21.26-8.43.46-12.66.49h-4.64c-5.38-.21-10.81-.33-16.22-.72-2.4-.18-4.81-.35-7.19-.65-1.53-.19-3.06-.42-4.58-.74a22.15 22.15 0 01-2.25-.64 13.06 13.06 0 01-2.13-1c-.84-.51-.62-.58.21-.44s2.3.21 3.95.62a65.53 65.53 0 009.13 1.23c3.09.24 6.21.39 9.34.54 3.75.18 7.69.09 11.52.16 4.2 0 8.42-.15 12.64-.41 2.6-.17 5.19-.35 7.78-.58 3.93-.33 7.88-.69 11.77-1.14 3-.35 6-.82 9-1.24l2-.28c2.46-.31 3.26-.25 3.85.22a2.55 2.55 0 01.38.32c.28.39-.69.82-2.48 1.13-5.31.91-11 1.58-16.62 2.15-4.22.43-8.47.78-12.71 1.09zM70 85.77a31 31 0 00-7.11-3.69 10.93 10.93 0 00-7.45.27 24.68 24.68 0 00-5.1 2.79c-1.45 1-2.85 2-4.26 3.14s-2.86 2.16-4.22 3.28c-2.74 2.24-5.36 4.65-7.91 7.13-2.27 2.21-4.49 4.51-6.65 6.79-2.75 3-5.38 6-8.1 9-.83.93-1 .57-.71-.54a14.57 14.57 0 012.72-4.77c2.73-3.14 5.64-6.13 8.56-9s5.94-5.84 9.17-8.53c1.93-1.62 4-3.21 6-4.79a56.24 56.24 0 016.33-4.55 23.8 23.8 0 014-1.84 15.17 15.17 0 014.4-.77 13.22 13.22 0 014.4.8 30.17 30.17 0 013.91 1.81 53 53 0 018.58 6c4 3.41 7.74 7.11 11.48 10.7 2.91 2.8 5.81 5.48 8.73 8.19l1.92 1.77c2.37 2.25 3 3 3.19 3.92a2.8 2.8 0 01.1.59c0 .51-1.28-.13-3.12-1.69-5.44-4.66-10.73-10-16.17-15.17-4.12-3.92-8.14-7.79-12.69-10.8zM14.91 95.8c0-2.46 0-4.9.05-7.37 0-.9 0-1.8.06-2.69.19-3.17.61-6.29.91-9.4.13-1.39.2-2.78.24-4.15 0-1.77 0-3.53.18-5.29.06-.55.41-.49.78 0a4.2 4.2 0 01.87 2.34 65.52 65.52 0 01-.73 10.94c-.29 2.16-.34 4.42-.44 6.63-.1 2.43-.1 4.88-.09 7.33 0 1.51 0 3 .09 4.53.08 2.28.19 4.57.44 6.82.19 1.75.52 3.45.85 5.15.07.37.15.74.23 1.12.25 1.4.2 1.87-.23 2.26a1.69 1.69 0 01-.28.26c-.32.2-.76-.32-1.05-1.35a53.23 53.23 0 01-1.55-9.7c-.2-2.47-.29-5-.36-7.43zM102.12 94.89c-.05-2.28-.15-4.58-.28-6.88 0-.83-.17-1.67-.22-2.51-.18-3-.24-6-.19-9v-4-2.53c0-.84.15-1.68.29-2.52.09-.52.39-.44.72 0a4.89 4.89 0 01.83 2.24c.13 3.42.14 6.8 0 10.23a55.86 55.86 0 00.4 6.27q.27 3.48.44 7c.07 1.43.1 2.87.13 4.31 0 2.18 0 4.38-.1 6.55-.07 1.69-.07 3.36-.26 5.06 0 .37-.09.74-.15 1.12a6.89 6.89 0 01-.23.86 2.5 2.5 0 01-.32.55 1.16 1.16 0 01-.72.47 1.76 1.76 0 01-.37.08c-.38 0-.56-.63-.53-1.6.24-2.83.47-5.82.52-8.88 0-2.28 0-4.58-.08-6.88zM86.63 70.08c2-1.23 3.88-2.47 5.77-3.77.7-.48 1.34-1 2-1.49 1.2-.85 2.39-1.71 3.51-2.63.56-.46 1.1-.93 1.59-1.42a7 7 0 00.59-.68c.09-.13.19-.32.09-.48l-.14-.19-.26-.42c-.21-.26-.39-.53-.59-.79L98 56.68l-3.12-4c-.65-.82 1-.5 2.37.88a75.19 75.19 0 013.64 3.72c.14.16.29.32.42.5l.5.65a2.06 2.06 0 01.47 1.07 2.43 2.43 0 01-.28 1.2c-.08.18-.2.35-.29.52s-.17.22-.25.33-.33.39-.49.56a12.87 12.87 0 01-1 1c-1.68 1.35-3.34 2.75-5.08 4C93 68.43 91 69.73 89.09 71l-3.63 2.34c-1.82 1.18-3.69 2.32-5.48 3.52-1.4.93-2.7 1.94-4 2.91-.29.22-.57.44-.88.65-1.12.77-1.59.85-2.14.52a3.25 3.25 0 01-.37-.21c-.32-.27-.07-.92.7-1.57a83 83 0 017.5-5.33L86.6 70zM30.76 73.59q-3.37-2-6.67-4.21c-.8-.53-1.63-1-2.42-1.58a32.25 32.25 0 01-4-3.29c-.16-.17-.32-.34-.47-.53a4.08 4.08 0 01-.54-.81 1.85 1.85 0 01-.2-.92 1.72 1.72 0 01.4-.85 13.12 13.12 0 011.06-1.1l.93-.86 3.3-3c1.38-1.3 2.79-2.58 4.11-3.9.4-.4.56-.21.44.35a6 6 0 01-1.28 2.3c-1.26 1.51-2.56 3-3.88 4.38-.66.71-1.39 1.35-2.06 2-.85.9-.92.68-.86 1a.29.29 0 00.08.14 3.36 3.36 0 00.24.29 7.93 7.93 0 00.58.58c.41.37.87.73 1.33 1.08.94.7 1.93 1.36 2.91 2 2.16 1.45 4.37 2.85 6.61 4.21q2.07 1.26 4.17 2.47c2.12 1.21 4.25 2.44 6.41 3.55 1.68.86 3.39 1.59 5.09 2.35.38.17.75.32 1.12.5 1.4.65 1.75 1 1.79 1.69a2.1 2.1 0 010 .43c0 .43-.79.52-1.86.13a76.09 76.09 0 01-9.45-4.45C35.31 76.3 33 75 30.73 73.64z" />
      <Path d="M34.68 39.07c4.64-.63 9.32-1.07 13.91-1.44 1.69-.14 3.38-.33 5.07-.44 6-.41 11.94-.6 17.92-.7 2.65 0 5.32-.11 8-.11 1.7 0 3.4 0 5.11.14.85.07 1.7.16 2.56.31a10.36 10.36 0 012.56.72c.55.26.73.62.61.67s-.43 0-.87 0c-.89 0-2.48.18-4.38.15-6.76-.19-13.64 0-20.55.19-4.15.11-8.44.49-12.67.83-4.64.36-9.29.77-13.91 1.34a83 83 0 00-8.42 1.36c-.26.07-.52.13-.76.21l-.36.11-.29.1a.84.84 0 00-.36.22 1.21 1.21 0 00-.06.43v3.21c.06 2.17.14 4.35.23 6.5.15 3.36.43 6.64.61 10 0 .73.08 1.45.12 2.19.09 2.74-.06 3.64-.64 4.22a2.21 2.21 0 01-.39.37c-.44.21-.71-.86-.85-2.84-.43-5.89-.89-12.13-1.13-18.42l-.1-3.53v-1.94a3.6 3.6 0 01.14-.82 1.58 1.58 0 01.36-.72 3.19 3.19 0 011.4-.88 26.77 26.77 0 013.64-.9c1.18-.22 2.35-.4 3.52-.58zM91.82 49.46l.06 3.54c0 .43.08.85.09 1.28 0 1.53 0 3 .14 4.57a19 19 0 00.23 2 8.53 8.53 0 01.22 2.57c0 .28-.39.29-.79.12a1.79 1.79 0 01-1-1 28.31 28.31 0 01-.51-5.29c0-1.07-.21-2.16-.31-3.24s-.17-2.39-.21-3.59l-.07-2.22c0-1.12-.07-2.24-.11-3.35 0-.86-.22-1.71-.22-2.57v-.56c0-.71.18-.93.6-1.07a1.52 1.52 0 01.28-.09c.31-.06.57.23.72.73a18 18 0 01.54 2.28c.11.78.19 1.56.25 2.35l.15 3.54z" />
      <Path d="M61.68 24.41a7.59 7.59 0 00-2.8 1.05 30.57 30.57 0 00-3 1.86c-.72.49-1.38 1.06-2.09 1.57q-3.75 2.71-7.42 5.65c-1.08.87-2.13 1.78-3.18 2.68-.68.56-1.36 1.14-2.08 1.68a9.4 9.4 0 01-2.43 1.39c-.34.1-.55 0-.54-.12a2.06 2.06 0 01.23-.61 5.74 5.74 0 011.38-1.91c2.59-2.38 5.36-4.71 8.28-6.9 1.76-1.29 3.42-2.85 5.23-4.19a31.64 31.64 0 016.47-3.91 7.36 7.36 0 011.27-.36 4 4 0 01.71-.06 2.81 2.81 0 01.73.09 7.73 7.73 0 012.26 1.05 38.39 38.39 0 015.38 4.44c1.3 1.21 2.62 2.36 3.87 3.61.28.27.56.52.82.82.94 1.11 1.1 1.58.84 2.18a2.22 2.22 0 01-.19.41c-.27.39-.92.17-1.7-.52-2.32-2-4.51-4.38-6.89-6.49a31.81 31.81 0 00-2.7-2.18 12.14 12.14 0 00-1.38-.84 4.82 4.82 0 00-.63-.25l-.27-.08a.38.38 0 01-.15 0zM65.52 51.77l-5.73.23-2.09.12c-2.46.1-4.93.09-7.39.13l-3.31.04a16.14 16.14 0 01-4.25-.23c-.46-.14-.29-.3.11-.43a6.44 6.44 0 011.8-.34c2.79-.11 5.62-.38 8.47-.45 1.71-.06 3.48-.24 5.22-.36l5.77-.35 3.55-.2c1.79-.12 3.59-.19 5.37-.32 1.39-.1 2.73-.32 4.11-.45.3 0 .6-.08.9-.1 1.15-.05 1.51.07 1.75.57a1.74 1.74 0 01.2.37c.11.39-.35.72-1.16.84-2.4.38-5 .57-7.53.73-1.92.12-3.85.17-5.77.27zM63.81 59.55h-2.18c-.27 0-.53.05-.8 0-.94 0-1.89-.1-2.83-.15h-1.25a5 5 0 01-1.59-.07c-.33-.09.13-1.22.72-1.25a22.55 22.55 0 013.18.07 11.87 11.87 0 002-.09l2.15-.06h1.35c.68 0 1.37 0 2-.07s1-.18 1.58-.26c.12 0 .23-.05.35-.06.43 0 .57.09.65.56v.31a.69.69 0 01-.46.75 10.56 10.56 0 01-2.81.35l-2.16.05zM69.77 120.29c-3.45.21-6.9.38-10.36.49-1.27 0-2.53.11-3.79.12-4.47 0-8.9-.21-13.33-.39l-5.9-.22a40.37 40.37 0 01-7.52-.67c-.77-.17-.65-.35 0-.57.34-.12.82-.24 1.39-.38a8.12 8.12 0 01.93-.17h1l15.32.53c3.09.14 6.27 0 9.4-.14 3.45-.15 6.91-.3 10.37-.53 2.12-.15 4.25-.3 6.38-.48 3.21-.27 6.45-.55 9.63-1 2.47-.31 4.88-.76 7.31-1.18.53-.09 1-.2 1.59-.28 2-.31 2.66-.25 3.18.31a2.33 2.33 0 01.34.37c.26.45-.51 1-2 1.28a116.57 116.57 0 01-13.61 2c-3.46.36-6.94.63-10.42.89zM34.52 75.06l-4.38-2.72c-.53-.34-1.09-.62-1.62-1-1.85-1.22-3.68-2.47-5.45-3.81-.8-.56-1.57-1.2-2.35-1.79-.48-.41-1-.77-1.45-1.23l-.69-.66c-.22-.24-.42-.5-.62-.76s0-.43.4-.36a4.26 4.26 0 011.57.65c1 .67 2.13 1.27 3.21 1.9s2.07 1.41 3.09 2.17A41.65 41.65 0 0030.16 70q2.19 1.36 4.39 2.69l2.73 1.62c1.4.79 2.78 1.61 4.2 2.33 1.11.55 2.25 1 3.38 1.46l.74.31c.92.41 1.12.72 1.06 1.31a2.45 2.45 0 010 .39c-.09.4-.64.57-1.35.35a36.85 36.85 0 01-6.31-2.8c-1.53-.81-3-1.69-4.53-2.55zM84.61 70.52c1.4-.87 2.8-1.76 4.18-2.67.5-.34 1-.72 1.47-1 1.76-1.18 3.52-2.37 5.23-3.62.73-.58 1.48-1.15 2.16-1.77a16.12 16.12 0 001.24-1.24 3 3 0 00.77-1.23c0-.11.14-.43.53-.11a1.19 1.19 0 01.22.9 2.58 2.58 0 01-.36 1.05 17.8 17.8 0 01-2.42 3.08 21.59 21.59 0 01-3 2.3c-1.28.8-2.47 1.8-3.73 2.67s-2.79 1.88-4.2 2.79l-2.62 1.63c-1.31.85-2.65 1.66-3.93 2.54-1 .68-1.9 1.45-2.85 2.18-.21.16-.41.33-.63.48-.8.57-1.16.58-1.63.23a2.78 2.78 0 01-.31-.23c-.29-.29-.17-.84.36-1.33a42.49 42.49 0 015.3-4l4.19-2.73zM37.56 93.21l-2.66 2.22-2.6 2.31-1.82 1.76c-2.16 2-4.33 4.11-6.37 6.29-.9 1-1.78 2-2.61 3a48.23 48.23 0 01-3.29 3.86c-.37.37-.57.13-.56-.42a4.35 4.35 0 01.81-2.26 74.7 74.7 0 017.07-7.73c1.52-1.44 3-3.06 4.57-4.51.85-.82 1.73-1.61 2.62-2.38S34.5 93.79 35.4 93c1.1-1 2.26-1.84 3.39-2.75 1.73-1.35 3.52-2.65 5.31-3.9 1.36-1 2.74-1.95 4.12-2.92l.94-.59c1.2-.7 1.64-.83 2.1-.59a1.43 1.43 0 01.3.16c.27.22-.09.74-.9 1.31-2.45 1.65-5 3.43-7.54 5.23l-2.79 2.08-2.74 2.18z" />
      <Path d="M25.58 63v-2.27-.83c0-1 .09-1.93.1-2.9 0-.43 0-.86-.06-1.28a7.4 7.4 0 01-.08-1.63c0-.35 1 0 1.06.63a17.15 17.15 0 01.21 3.36c0 .68.08 1.38.1 2.06l.09 2.24v1.39c0 .7.07 1.41.16 2.1.09.53.24 1 .36 1.56 0 .12.05.23.07.35 0 .43-.05.59-.38.73a1.07 1.07 0 01-.22.1.57.57 0 01-.67-.37 6.52 6.52 0 01-.73-3c-.06-.77-.06-1.54-.08-2.3z" />
    </G>
  </Svg>
);

export default MailIcon;
