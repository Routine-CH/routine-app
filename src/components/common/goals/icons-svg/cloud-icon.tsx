import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import AppColors from "../../../../utils/constants/colors";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const CloudIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={AppColors.white}
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_52" data-name="Layer 52">
      <G id="Layer_51" data-name="Layer 51">
        <Path d="M63.33 76.53A3.66 3.66 0 0166 78c1.15 1.92 2.78 22.55 2.49 24-.08.42-3.33.55-3 1.16a50 50 0 006.24 5l-2.06 2.45L59.21 101l6.69-.78zM51.6 23.64a30.07 30.07 0 0115-2.62c.94 0 1.85.22 2.78.33a25 25 0 012.72.63 34.38 34.38 0 0116 10.51 35 35 0 014.76 7.08c.4.82.79 1.65 1.14 2.49s.68 1.7.9 2.59a15.4 15.4 0 01.52 2.69c0 .45.11.9.12 1.36v1.36c0 1.13-.21 1-.64.09-.23-.44-.47-1.08-.84-1.81A23.73 23.73 0 0193 45.85a31.31 31.31 0 00-4.55-9.28 34.86 34.86 0 00-7.24-7.52 25.59 25.59 0 00-5.53-3.25 27 27 0 00-6.16-1.93 27.66 27.66 0 00-14 .88 29.62 29.62 0 00-7.87 3.94 31.84 31.84 0 00-9.16 9.69A27 27 0 0036.26 43a30 30 0 00-1.4 4.89c-.14.73-.26 1.45-.35 2.19-.34 2.75-.51 3.62-1.15 4.23a3.76 3.76 0 01-.39.4c-.21.14-.38-.08-.58-.62a6.29 6.29 0 01-.31-2.49A31.05 31.05 0 0139.4 33a34.54 34.54 0 0112.17-9.41z" />
        <Path d="M11.26 71.7a25 25 0 00-1.4 3.89l-.47 2-.27 2.05a22.38 22.38 0 00.77 8.18l.47 1.44c.18.47.42.92.63 1.38a21.22 21.22 0 001.47 2.63 19 19 0 007.86 7A22.78 22.78 0 0031 102a49.62 49.62 0 009.73-1.58c4.11-1 8.14-2.44 12.39-3.09 1.33-.17 1.21.1.22.76a18.23 18.23 0 01-5.18 2.39 96.49 96.49 0 01-12.81 3.1c-1.11.14-2.21.33-3.34.38l-1.68.11h-1.71a28.16 28.16 0 01-3.41-.28c-.56-.07-1.12-.24-1.69-.35a12 12 0 01-1.66-.45 21.07 21.07 0 01-7.32-4.07L13 97.48c-.5-.5-.91-1.07-1.37-1.6-.23-.28-.46-.54-.67-.82l-.57-.9a15.72 15.72 0 01-1.08-1.81 24.58 24.58 0 01-1.7-17.93 28 28 0 015.18-9.89 26 26 0 016.3-5.63 30.88 30.88 0 017.6-3.58 28.21 28.21 0 0112.84-1 27.24 27.24 0 012.8.57 13.72 13.72 0 013.48 1.49 3.88 3.88 0 01.81.65 4.1 4.1 0 01.42.64c.1.18.25.37.3.49s-.23.21-.9.17a4.07 4.07 0 01-1.17-.23c-.47-.11-1-.25-1.58-.42a36.79 36.79 0 00-5.31-1.1 28.55 28.55 0 00-5.47-.09 28 28 0 00-5.41 1 28.49 28.49 0 00-5.12 2.19 27.13 27.13 0 00-6.56 5 25.57 25.57 0 00-4.5 6.93zM117.35 81.6a15.8 15.8 0 001.65-6.46 18.57 18.57 0 00-3-11.38 18.17 18.17 0 00-2.79-3.46 19.18 19.18 0 00-3.56-2.7 21.41 21.41 0 00-8.59-2.6 22.73 22.73 0 00-8 .78c-3.34.95-6.34 2.84-9.59 4.29-1 .42-1 .17-.38-.62a11.29 11.29 0 013.73-3.08A30.64 30.64 0 0192 54.13a24.68 24.68 0 015.63-1A23.47 23.47 0 01108.77 55a21.23 21.23 0 0110.13 9.42 21.65 21.65 0 012.22 7.35 19.54 19.54 0 01-.5 7.68 18.48 18.48 0 01-4.85 8.06 23.65 23.65 0 01-12.46 6.32A104.67 104.67 0 0192.77 95c-.76.05-1.49.16-2.25.22a17 17 0 01-1.78.15 10.77 10.77 0 01-1.21 0 4.54 4.54 0 01-.82-.08 3.39 3.39 0 01-.6-.25c-.16-.08-.37-.14-.46-.2s0-.28.49-.61a6.69 6.69 0 012.35-.87 76.26 76.26 0 019.62-1 30.46 30.46 0 009.16-1.86 19.49 19.49 0 0010-8.87z" />
        <Path
          d="M89.63 17.53a1.61 1.61 0 012.22-.41c3.06 2.53-5.37 4.23-2.22.41zM20.87 67.09a1.6 1.6 0 012.21-.4c3.06 2.52-5.37 4.22-2.21.4zM97 33.66a1.6 1.6 0 012.21-.4c3.04 2.52-5.39 4.23-2.21.4z"
          fill="none"
          stroke="#231f20"
          strokeMiterlimit={10}
          strokeWidth="1.2px"
        />
        <Path d="M109.39 26.74a1.6 1.6 0 012.21-.4c3.06 2.52-5.37 4.22-2.21.4zM96.82 108.92a1.6 1.6 0 012.21-.4c3.06 2.48-5.37 4.23-2.21.4zM19 35.77a1.59 1.59 0 012.21-.41c3.07 2.53-5.36 4.23-2.21.41zM65.53 101.4l-4 .25H60.73l.21.22.13.13.07.07.34.3 2.8 2.41 2.94 2.62c.91.82 2.23 2 2.33 2.12l.34-.37.86-1 1.7-2c1.27-1.45 2.5-3 3.71-4.44l.62-.77.26-.34.47-.61a11.06 11.06 0 01-1.73 0c-.37 0-.64-.5.23-1a8.74 8.74 0 012.3-.82 26.27 26.27 0 013.69-.52h.19l-4.37 5.2-2.44 2.83-2.49 2.81c-1.06 1.17-2.11 2.35-3.17 3.53l-2.43-2.18-1.75-1.53-3.54-3-5.8-5.06 6.26-.43 2-.12-.06-1.12-.12-1.79c-.22-3.17-.41-6.36-.68-9.5-.22-2.44-.53-4.83-.81-7.24l-.18-1.58c-.19-2-.12-2.63.35-3.1a3 3 0 01.31-.31c.37-.22.75.57 1 2 .68 4.29 1.08 8.84 1.45 13.41.26 3.64.52 7.3.79 10.94l-1 .08z" />
        <Path d="M70.1 90c0-1.29 0-2.58-.09-3.87 0-.47-.09-.94-.1-1.41 0-1.66 0-3.33-.06-5 0-.74-.1-1.47-.19-2.2a9.82 9.82 0 01-.2-2.81c.1-.59 2.21 0 2.32 1.06a32.65 32.65 0 01.1 5.77 35 35 0 00.12 3.53c.06 1.3.09 2.61.14 3.91 0 .8 0 1.6.08 2.4.06 1.21.09 2.43.22 3.62.1.93.32 1.83.48 2.75 0 .2.09.4.12.6.1.75 0 1-.58 1.21a2.92 2.92 0 01-.38.14c-.44.11-.82-.17-1-.72a23 23 0 01-.84-5.09c-.1-1.29-.15-2.6-.23-3.9zM29 103.49c-1.06 0-2.13-.11-3.2-.16s-2.12-.27-3.17-.48c-.76-.19-1.54-.31-2.29-.52a19.3 19.3 0 01-7.22-3.94 8.74 8.74 0 01-1.31-1.27c-.4-.46-.82-.9-1.19-1.38l-1.27-2c-.31-.71-.61-1.43-.88-2.15-.16-.45.06-.46.41-.17a4.94 4.94 0 011.22 1.62 16.54 16.54 0 006.2 6.28 7.31 7.31 0 001.22.61 11.89 11.89 0 001.28.53l1.35.4.67.2.69.13 1.51.31c.5.09 1 .13 1.53.2 1 .16 2.06.19 3.09.25.64.06 1.28 0 1.92 0h1.92a56.15 56.15 0 005.8-.61c1.49-.2 2.93-.54 4.38-.83.33-.06.64-.15 1-.22 1.2-.25 1.6-.25 1.91-.1a1.29 1.29 0 01.2.09c.15.12-.3.38-1.16.69a42.25 42.25 0 01-8.14 2.12l-1.59.19-1.61.11c-1.07.1-2.15.1-3.22.11zM108.16 92.77a32.74 32.74 0 01-4.65 1.4c-.58.12-1.15.25-1.73.34-2 .32-4.09.46-6.13.61l-2.71.24c-1.16.11-2.31.25-3.47.26-.72 0 .13-.78 1.46-.93 2.35-.24 4.69-.43 7-.61a42.13 42.13 0 004.29-.6 29.39 29.39 0 004.57-1.23 26.4 26.4 0 002.7-1.11 20 20 0 003.78-2.26 15.18 15.18 0 002.38-2.36c.17-.18.3-.38.46-.57.59-.71.74-1 1-1a.61.61 0 01.14-.07c.13 0 0 .34-.31 1a13.46 13.46 0 01-4.44 4.7 21.85 21.85 0 01-4.36 2.29z" />
      </G>
    </G>
  </Svg>
);

export default CloudIcon;
