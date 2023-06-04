import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import AppColors from "../../../../utils/constants/colors";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const SettingsIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={AppColors.white}
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_53" data-name="Layer 53">
      <Path
        d="M94.44 13.5a1.61 1.61 0 012.22-.39c3.05 2.55-5.4 4.19-2.22.39zM16.32 42.47a1.62 1.62 0 01-2.22-.41c-1.96-3.46 6.53-2.06 2.22.41z"
        fill="none"
        stroke="#231f20"
        strokeMiterlimit={10}
        strokeWidth="1.2px"
      />
      <Path d="M108.41 27.78a1.61 1.61 0 012.22-.39c3.04 2.55-5.4 4.19-2.22.39zM75.73 29.84c.56.14 1.11.3 1.66.47l.81.26h.15L89.41 24l11.34 9.46 2 1.61q-1.93 4.7-3.88 9.37l-.6 1.42.46.71c.27.43.53.87.79 1.31s.5.88.74 1.33l.32.63.09.2 12.27 2.23 2.27 17-2.28 1.2L108 73.1l-4.47 2.4-.06.35-.15.74q-.15.73-.33 1.47c-.12.49-.25 1-.39 1.46l-.37 1.23-.07.2 7.38 9-3.38 4.56q-1.48 2-3 3.87c-1.4 1.75-1.72 1.14-1.08-.74a26.89 26.89 0 011.7-3.64c.4-.72.85-1.49 1.35-2.28l.8-1.22.21-.3.1-.15-6.91-8.54.53-1.51.25-.81c.15-.49.29-1 .42-1.48s.25-1 .36-1.49l.16-.76.29-1.53 6.41-3.37 2.87-1.56 1.44-.75.36-.18h.16l-1.47-12.08-.11-1.32v-.43h-.31l-.33-.06-1.5-.27-3-.54-6.76-1.23-.55-1.14-.36-.68c-.23-.42-.46-.84-.71-1.25s-.49-.82-.75-1.22l-.45-.68-.71-1 2.67-6.42 1.66-3.94-10.69-8.91-7.5 4.48-3.08 1.84-1.07-.38-.69-.22-1.38-.4-1.39-.34-.71-.15-1.1-.21L67.53 23c-.44-.8-.89-1.59-1.34-2.39l-13.48 1.81c-.51 3.11-1 6.19-1.5 9.25-.14.91-.29 1.82-.43 2.71l-1 .49-.69.36c-.44.24-.87.49-1.29.74s-.84.52-1.25.79l-.62.43-.91.64-11.44-3.49-.13.18L30.89 38c-3.52 4.64-4.78 6-6.05 6.62A4.7 4.7 0 0124 45c-.73.14.39-2 2.88-5.47.85-1.19 1.72-2.38 2.59-3.59l1.31-1.81 1.94-2.59 11.94 3.68.61-.41c.44-.29.89-.56 1.34-.83s.91-.54 1.38-.79l.65-.34c.64-4.06 1.3-8.18 2-12.31v-.18L67.48 18l6.36 11.32.59.12 1.31.31zM53.67 104.24l-.75-.24h-.07l-10 7.41-9.7-8-3.58-2.92 2.94-5.91 2.39-4.7-.57-.91c-.3-.5-.6-1-.89-1.5s-.57-1-.84-1.54l-.4-.78-.14-.3L20 82.27l-1.1-8.08c-.34-2.43-.67-4.86-1-7.27l7.1-4.18 3.75-2.24.05-.33.15-.76a32.377 32.377 0 01.75-3l.31-1-1.85-2.71c-.7-1-1.4-2.1-2.07-3.16-1-1.57-.4-1.75.94-.85a16.18 16.18 0 012.48 2.13c.47.47 1 1 1.45 1.59a29.07 29.07 0 012 2.59l-.33 1-.3.91-.19.63c-.12.42-.24.85-.34 1.27s-.21.86-.3 1.28l-.14.71-.24 1.35L25 65.64l-2.7 1.55L21 68l-.34.19c-.1.06 0 0-.06 0 .26 2 .51 4 .77 6l.44 3.54c.13 1.06.35 2.8.29 2.57h.32l1.33.29 2.66.59 3.28.71 3.9.8.62 1.26.38.73c.26.49.54 1 .82 1.46s.57 1 .87 1.44l.48.74.82 1.2-4.51 9.09-.55 1.07 10.4 8.62 6-4.46 3.5-2.61 1.31.44.87.28 1.76.5 1.78.45.89.21 1.31.26 2 4.32 3 6.57c3.91-.5 10.69-1.41 14.58-2v-.08l1.78-11.82 1-.54.69-.37c.43-.24.86-.49 1.28-.75l1.25-.8.62-.43 1-.72h.09l4.25 1.28c4.74 1.49 6.19 2.13 7 3.07a4.05 4.05 0 01.54.63c.3.62-1.75.39-5.26-.59L88 99.54l-.08.09-.63.43c-.43.29-.88.58-1.33.86s-.91.54-1.37.8l-.66.36v.06l-.09.65-.23 1.48c-.15 1-.31 2-.46 3q-.57 3.58-1.15 7.2l-9.33 1.3-8.79 1.23-5.21-11.4-.65-.14-1.46-.35c-1-.25-1.92-.51-2.87-.8z" />
      <Path d="M29 99.05l2.82-6 1-2.21.28-.61.07-.15V90l-1.76-3.9-.28-.1-.57-.1-1.15-.21c-1.24-.23-2.5-.42-3.74-.59a40.69 40.69 0 01-4.78-.78c-1-.26.51-1.48 2.35-1.21q2.18.33 4.35.72l2.17.41 1.09.22.54.11 1 .19.41.86.22.49c.25.57.53 1.14.81 1.71l1 2-1.05 2.37L31 98.33l-1.11 2.38.55.48c1.57 1.36 3.14 2.74 4.73 4.06 1.24 1 2.51 2 3.77 2.93l.83.64c1 .82 1.26 1.16 1.22 1.65a1.76 1.76 0 010 .33c-.11.31-.68.17-1.47-.38-2.34-1.63-4.65-3.53-6.95-5.46L28 101.13 29 99zM17.21 65.65l5.15-2.71 1.79-1 3.11-1.61s.13 0 .12-.1l.05-.28c.08-.31.16-.62.25-.91q.27-.88.6-1.74l.63-1.69-.56-.61a31.19 31.19 0 01-2.53-3.2c-.46-.72 1.22-.68 2.2.53l1.08 1.34 1.38 1.75c-.37.91-.73 1.82-1.09 2.73a20.88 20.88 0 00-.75 2.23c0 .17-.06.36-.09.53s0 .21-.08.23l-.25.13-.73.39-1.13.61-2.26 1.2-5 2.65-1.14.6.16 1.54c.21 1.74.39 3.49.63 5.22.19 1.34.45 2.64.68 4l.16.87c.16 1.09.12 1.45-.2 1.73-.08.06-.15.14-.22.19-.26.14-.55-.28-.73-1.07-.55-2.34-.9-4.84-1.23-7.35q-.34-2.91-.71-5.82l.67-.37zM47.48 31.76l.46-2.26c.05-.27.07-.55.13-.82.22-1 .47-1.93.7-2.89.11-.42.18-.86.25-1.29a5 5 0 01.41-1.64c.18-.31 1.31.46 1.17 1.05a27.77 27.77 0 01-.87 3.24 15.37 15.37 0 00-.42 2c-.14.75-.29 1.5-.43 2.26l-.25 1.39-.15 1a9.54 9.54 0 00-1.43.7 8 8 0 00-1.24 1l-.25.24c-.33.28-.49.3-.79.08l-.21-.14a.53.53 0 010-.76 7.56 7.56 0 012.53-2l.16-.08v-.31l.13-.83zM83.34 103.05v-.46c.19-.14.36-.23.56-.36l.28-.17.15-.1c.18-.12.38-.27.57-.42.38-.32.75-.66 1.12-1s.54-.6.82-.89l.46-.47.3-.34.37-.41c1 .18 1.33.28 1.85.41l1.49.39 1.89.52a5.39 5.39 0 012.36 1.11c.22.21 0 .43-.42.58a1.56 1.56 0 01-1.18.11c-1.4-.59-3-1-4.59-1.53a6.29 6.29 0 00-.62-.17h-.28l-.36.42c-.2.23-.4.46-.61.67a16.35 16.35 0 01-2.61 2.31c-.07.06-.2 0-.2.11v1.36c0 1.08-.18 2.15-.33 3.21-.13.83-.2 1.65-.41 2.47a4.94 4.94 0 01-.15.55c-.22.66-.44.83-.8.8a2.11 2.11 0 01-.26 0c-.27-.08-.36-.42-.25-.86a37.68 37.68 0 00.71-4.21c0-.54.11-1.08.13-1.63V103zM56.88 61.05A11.84 11.84 0 0055 71.9a12.09 12.09 0 002 3.67 11.73 11.73 0 002.7 2.56 11.48 11.48 0 003.38 1.63 12.43 12.43 0 007.51-.11 11.77 11.77 0 005.52-3.85 14.49 14.49 0 002.89-8c.06-.89.68-.87 1.31 0a5.3 5.3 0 01.53 4.54 14.59 14.59 0 01-16.53 10.03 15.11 15.11 0 01-10.21-6.89 14.26 14.26 0 01-2-6.59 14.7 14.7 0 011.31-6.71 15.62 15.62 0 012.34-3.5A14.73 14.73 0 0159 56a14.26 14.26 0 0112.2-1.09 15.46 15.46 0 017.62 5.79l.58.91c.17.31.33.64.5 1a7.11 7.11 0 01.73 2.78 1.74 1.74 0 01-.44 1.33 2.46 2.46 0 01-.41.39c-.5.27-.87-.71-1.46-2.26a13.46 13.46 0 00-4.52-5.88 12.75 12.75 0 00-7-2.53 12.06 12.06 0 00-5.47 1.11 11.85 11.85 0 00-4.36 3.56z" />
      <Path d="M61 66.76a11.09 11.09 0 01.88-2.68A11.73 11.73 0 0163.15 62 10.1 10.1 0 0165 60a8.77 8.77 0 014.46-2.13 5.78 5.78 0 011.86.06 5.32 5.32 0 01.75.22c.24.06.35.34.37.66a1.58 1.58 0 01-.58 1.2 1.73 1.73 0 01-.5.33 4.09 4.09 0 00-1.32.4c-.29.14-.58.3-.88.48a8 8 0 00-.92.55A4 4 0 0066.92 63c-.23.41-.47.72-.73 1.1a3 3 0 00-.52 1.24 19.4 19.4 0 00-.43 2.53 9 9 0 00.41 3.13 8.12 8.12 0 00.47.76 4.1 4.1 0 01.16.39 1.19 1.19 0 00.24.36 3.64 3.64 0 001.15.65 5.82 5.82 0 002.11.5c.21 0 .41-.11.61-.1a6.45 6.45 0 00.76 0 2 2 0 00.89-.39v-.13c0-.04.19-.42.34-.58a3.89 3.89 0 01.52-.48 6.75 6.75 0 001.43-1.77 4.85 4.85 0 00.25-4.89c-.14-.32-.34-.7-.48-1a1.24 1.24 0 00-.19-.28 1.21 1.21 0 00-.75-.3 2.68 2.68 0 00-1.32.24l-.09.06c-.09.07-.33 0-.19.36 0 .14-.06.1-.11.11s-.17 0 0 .19 0 .09-.07.07a.94.94 0 00-.5-.1c-.12 0-.2.12-.06.31s-.1.08-.1.14c0 .3-.3.4.05.7.11.09-.15.17-.23.3s-.1.09 0 .14c.24.17.22.33.16.55s.15.53.27.74l.19.28a2.2 2.2 0 01.2.23c.16.16.29.35.38.31s.1-.1.12-.09.1-.1.19-.16.15.07.2 0a2.49 2.49 0 001.18-.93v-.06h.1a2.24 2.24 0 00.66.07h.12l-.79.31.26-.12c.16-.08.37-.26.45-.28.5-.37.45-.55.43-.36a.28.28 0 000 .13.71.71 0 000 .2 2.51 2.51 0 00.13.42 3.51 3.51 0 00.18.34c.08.11 0 0 0 0h-.06a2.62 2.62 0 00-.41-.25 1.69 1.69 0 00-.9-.18c-.1 0 0 0 0 0l-.09.07a2.48 2.48 0 01-.55.36 1.64 1.64 0 01-1.33.09c-.41-.17-.66-.46-.64-.61a3.89 3.89 0 011.51-2.75 4 4 0 011.23-.57 3.76 3.76 0 01.8-.18 3.24 3.24 0 011 .08 3.12 3.12 0 011.67 1.07 3 3 0 01.46.7 3.26 3.26 0 01.33.8 4.57 4.57 0 01-.34 3.07 6.87 6.87 0 01-1.27 1.87A6.73 6.73 0 0174.12 73a7.46 7.46 0 01-1.41.35 6 6 0 01-1.52 0 5.52 5.52 0 01-2.72-1.23 7.28 7.28 0 01-2.16-2.84 8.58 8.58 0 01-.58-3.43 7.69 7.69 0 01.53-3 1.92 1.92 0 01.25-.38c.11-.15.23-.3.33-.46l.48-.69c.06-.1.14-.17.2-.27s0-.19.1-.21a5.06 5.06 0 00.87-.44l.76-.54c.12-.08.27-.1.38-.19a5 5 0 014.09-1.07 1.35 1.35 0 00.89 0 .61.61 0 01.57.07 6.14 6.14 0 001.27.6 3.72 3.72 0 011.24.74 11 11 0 011 1.08l.21.29.13.21a4.54 4.54 0 01.21.45c.25.63.74 1.19 1 1.86a20 20 0 01.7 2.45 10.46 10.46 0 01.13 2.9 10.32 10.32 0 01-.56 2.22 12.91 12.91 0 01-2.68 4.3 19.54 19.54 0 01-2.12 2 8.94 8.94 0 01-3.3 1.54 9.88 9.88 0 01-3.8 0A10.37 10.37 0 0162.76 76a7.73 7.73 0 01-1.1-1.68 9.35 9.35 0 01-.57-1.6 11.5 11.5 0 01-.38-2.86 18.55 18.55 0 01.29-3.1z" />
      <Path d="M70 67.07s-.25-1.36-.78-1.54a.84.84 0 00-.94.19 2.67 2.67 0 00-.34.37c-.08.1-.11.19-.12.19s-.17.07-.4 0a1.74 1.74 0 01-1-.38c-.14-.14-.25-.3-.23-.41a3 3 0 01.54-1.22 3.19 3.19 0 011.64-1.08 4.25 4.25 0 011.74 0c.94.13 1.47.87 2.06 1.37a4.49 4.49 0 011.1 2 4.58 4.58 0 01-.27 3.29 4 4 0 01-.49 1 5 5 0 01-1.13.91 4.56 4.56 0 01-1.85.82 3.65 3.65 0 01-3.49-1.41 3 3 0 01-.57-.84 3.57 3.57 0 01-.22-1.12 10.16 10.16 0 01-.13-1.56.82.82 0 00-.06-.19 2.7 2.7 0 010-.94 5.8 5.8 0 01.34-.87 5.73 5.73 0 012.27-2.19 8.75 8.75 0 011.71-.61c.36-.09.77-.19 1-.28s.25-.11.23-.05h.09c.07 0 .11 0 .23-.33a1.87 1.87 0 00.07-.59.8.8 0 00-.1-.41s.08-.16-.23 0c-.11.06-.06 0-.05 0s.07-.11-.13 0-.06 0 0 0c.19-.26.31-.57 0-.36-.1.06 0-.07-.08-.07-.23 0-.25-.27-.6-.07-.11.07-.07-.17-.11-.27s0-.11-.07-.08c-.2.13-.31.07-.38-.09s-.35-.12-.53-.17l-.61-.08a2.15 2.15 0 00-.72-.15c-.08 0-.18.08-.26.08s-.46.06-.68.06-.2-.11-.31-.13a13.39 13.39 0 00-1.56-.28c-.2 0-.4.07-.6 0a1.29 1.29 0 00-1 0c-.22.11-.47-.12-.7-.17a4.05 4.05 0 00-.7-.1 4.36 4.36 0 01-.58-1.95 4.42 4.42 0 01-.09-1.89c.25 0 1.61-.43 3-.59a13.79 13.79 0 013-.14c.69.16 1.38.37 2.07.58.47.15 1 .23 1.45.43s.95.51 1.44.76.84.35 1.27.6c.07 0 .11.1.16.16a1.24 1.24 0 00.19.21c.11.09.23.16.35.26l.14.11h.14a1.66 1.66 0 00.48 1c.05.07.06.17.11.24a2.73 2.73 0 01.8 2.35c0 .17-.07.31.09.47a.21.21 0 010 .29c-.31.41-.06.87-.22 1.27a4.27 4.27 0 01-.57 1.35c-.36.42-.56 1-1 1.3a8 8 0 01-1.49.91c-.57.26-1 .42-1.22.49s-.54.13-.74.21a2.46 2.46 0 00-.51.22c-.06 0-.07 0-.06.06s0 .2.07.3 0 .12 0 .1a1.6 1.6 0 00-.45.23.82.82 0 00-.36.27c-.08 0 0 .12 0-.35v-.3c0-.1 0 0 0 0a.24.24 0 00.17 0 1.16 1.16 0 00.74-.64 1.18 1.18 0 01.07-.2 1 1 0 010-.18.31.31 0 00-.03-.17z" />
    </G>
  </Svg>
);

export default SettingsIcon;
