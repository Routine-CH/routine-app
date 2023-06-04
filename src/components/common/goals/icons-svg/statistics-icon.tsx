import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import AppColors from "../../../../utils/constants/colors";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const StatisticsIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={AppColors.white}
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_10" data-name="Layer 10">
      <Path d="M21.55 80.68c.08-4.89.14-9.73.08-14.61l-.11-5.33c-.07-6.26-.16-12.52-.39-18.78-.1-2.78-.27-5.57-.5-8.31-.33-3.52-.62-7.07-.9-10.53-.07-1.08.21-1 .77-.19a10.42 10.42 0 011.64 4.58 107.94 107.94 0 01.86 10.9q.24 5.45.26 10.93c0 4.37.25 8.92.33 13.39.09 4.91.13 9.84.08 14.76 0 3-.06 6 0 9.06.05 4.57.13 9.16.5 13.67.29 3.51.81 6.92 1.4 10.34.14.75.27 1.49.41 2.24.49 2.82.54 3.73 0 4.45a3.13 3.13 0 01-.35.48c-.43.36-1-.72-1.54-2.78a104.72 104.72 0 01-2.42-19.44c-.23-4.94-.19-9.89-.18-14.82z" />
      <Path d="M49.41 104.67c4.89.25 9.8.35 14.7.3 1.79 0 3.57-.14 5.36-.17 6.3-.16 12.61-.54 18.87-1.26 2.78-.33 5.56-.77 8.29-1.27 1.75-.35 3.5-.69 5.24-1.1s3.5-.68 5.26-1c1.1-.18 1 .13.22.72A15 15 0 01103 103c-3.58.92-7.22 1.54-10.87 2.12s-7.33.88-11 1.08c-4.43.27-9 .68-13.55.81q-7.45.24-14.93 0c-3.06-.1-6.12-.23-9.18-.42l-13.84-1c-3.57-.25-7.07-.39-10.61-.67-.77-.07-1.54-.1-2.32-.19-2.9-.31-3.8-.63-4.32-1.38a2.82 2.82 0 01-.34-.51c-.2-.56 1-.81 3.14-.68 6.27.4 12.85.93 19.5 1.42 4.95.36 9.87.79 14.81 1zM34.75 75.38v8.17l.11 3c.09 3.5.14 7 .49 10.46 0 .36.09.73.16 1.07 0 .12 0 .19.07.28s.07.18.17.19a1.35 1.35 0 00.29 0 4.41 4.41 0 00.53 0h1.15c1-.07 1.94-.22 2.91-.35s2-.2 2.93-.31c.57-.06.62.25.18.72a5.16 5.16 0 01-2.47 1.39c-1 .17-1.94.32-2.93.43-.5 0-1 .09-1.52.1a7.6 7.6 0 01-.82 0 3.49 3.49 0 01-.66-.11c-.22-.06-.44-.11-.66-.19-.89-.41-1-2-1-2.27-.07-.56-.12-1.11-.16-1.66-.07-1.09-.1-2.17-.11-3.26 0-2.47-.22-5-.28-7.52C33 82.7 33 79.94 33 77.18l.07-5.09c0-1.29.07-2.58.14-3.87 0-.65.07-1.29.14-1.94a8.62 8.62 0 01.15-1.11c.08-.43.22-.9.67-1a3.41 3.41 0 011 0l.77.06 1.46.13a25.11 25.11 0 002.87 0c.41 0 .81 0 1.21-.09 1.47-.17 1.76-.28 2.26-.13.11 0 .25 0 .35.06s.18.25 0 .56a2.77 2.77 0 01-1.33.88 14.22 14.22 0 01-5.64.31l-1.38-.12h-.61c-.05.41-.09.86-.12 1.31-.15 2.67-.19 5.44-.19 8.18z" />
      <Path d="M44.13 80.37l-.1 3.7v1.35c0 1.58-.11 3.17-.13 4.75 0 .71 0 1.41.07 2.11l.1 1.34a7.93 7.93 0 01-.07 1.31.28.28 0 01-.08.12h-.06l-.13.05h-.06c.13 0 .07 0 0 0h-.11a.68.68 0 01-.23-.11 2 2 0 01-.85-1.17 30 30 0 01-.06-5.53c.09-1.11 0-2.25 0-3.39V78.87v-3.48c0-.89-.15-1.77-.22-2.66 0-.2 0-.39-.05-.59 0-.74.12-1 .61-1.11a2 2 0 01.33-.08c.37 0 .67.26.75.78a30 30 0 01.3 4.88v3.72zM56.93 68c0 3.21 0 6.43.09 9.64l.12 3.52c.09 4.13.17 8.27.41 12.38.06.92.13 1.83.24 2.73l.09.66.06.33v.18c0 .09 0 .23.14.27a1.12 1.12 0 00.32 0H59.97l1.72-.18c1.14-.16 2.31-.22 3.44-.35.68-.08.72.23.18.72a6.51 6.51 0 01-3 1.4 26 26 0 01-3.74.37h-.31a3.4 3.4 0 01-.45 0 4.21 4.21 0 01-.81-.23c-.1-.08-.27-.09-.32-.24a3.7 3.7 0 01-.28-.28 2.51 2.51 0 01-.31-.79l-.08-.43v-.25l-.01-.58-.12-.87c-.19-2.44-.24-4.84-.25-7.26 0-2.9-.21-5.9-.27-8.85q-.11-4.87-.13-9.74v-6c0-3 0-6.06.16-9.09a13 13 0 01.18-2 1.36 1.36 0 01.21-.54.89.89 0 01.49-.23 5.26 5.26 0 011.2 0c1.16.11 2.28.22 3.4.25h1.45a14.79 14.79 0 012.68-.15h.38c.11 0 .2.26-.07.61a3.06 3.06 0 01-1.62.93c-2.24.56-4.5.16-6.52 0a37 37 0 00-.17 4.31v9.72z" />
      <Path d="M65.74 73.72L65.67 79v1.92l-.09 6.73c0 1 0 2 .08 3l.11 1.9a14.12 14.12 0 01-.09 1.87.48.48 0 01-.07.18s0 .07-.29.14h.12-.14a.71.71 0 01-.24-.16 3.22 3.22 0 01-.85-1.67 61.8 61.8 0 01-.1-7.82c.09-1.57 0-3.19 0-4.8v-8.64-4.92c0-1.27-.17-2.51-.25-3.77 0-.27 0-.55-.06-.83 0-1 .12-1.39.6-1.58.11 0 .22-.1.33-.13.38-.07.67.36.75 1.09a60 60 0 01.37 6.93v5.28zM79.38 59.1q0 5.84.16 11.67l.15 4.23c.12 5 .25 10 .5 15 .11 2.21.3 4.45.58 6.59 0 .25 0 .29.07.4s0 .2.17.2h1.31c.58 0 1.16-.08 1.75-.15 1.17-.11 2.36-.2 3.53-.34.81-.11.83.21.16.73a8.66 8.66 0 01-3.63 1.45c-.59.08-1.18.14-1.79.19h-.94a6.43 6.43 0 01-.77-.05 7.69 7.69 0 01-.79-.21c-.1-.08-.23-.12-.29-.24a.7.7 0 01-.26-.28 2.43 2.43 0 01-.27-.77l-.09-.43v-.25l-.06-.45c-.08-.6-.15-1.18-.19-1.77-.1-1.17-.16-2.34-.22-3.5-.1-2.34-.16-4.67-.18-7 0-3.5-.26-7.13-.35-10.7-.1-3.92-.16-7.85-.2-11.78v-7.25c0-3.66 0-7.34.17-11 0-.88.07-1.75.14-2.64l.06-.66v-.34c0-.16.06-.32.09-.48a2.1 2.1 0 01.34-.84.79.79 0 01.77-.27c.92.13 1.29.18 1.83.24s1 .11 1.55.14 1.18.06 1.77.07a17.79 17.79 0 002.2-.09c.44 0 .65 0 .94-.08a1.79 1.79 0 00.39-.13c.09 0 .16 0 .18.13a.88.88 0 01-.18.6 3.11 3.11 0 01-2 1.06 14.18 14.18 0 01-3.37.15c-.56 0-1.11-.1-1.66-.17s-1.36-.2-1.17-.15v.66c-.07.7-.1 1.44-.14 2.19-.06 1.48-.09 3-.11 4.52v11.75z" />
      <Path d="M88.36 64.82l-.09 7.39v2.69c0 3.17-.07 6.34-.11 9.51 0 1.4 0 2.81.07 4.21 0 .89.07 1.79.1 2.69s0 1.82-.09 2.65a.61.61 0 01-.08.26l-.07.08-.17.06c.21-.07.08 0 .1 0h-.1a.89.89 0 01-.24-.24 5.47 5.47 0 01-.84-2.38c-.17-3.66-.23-7.32-.07-11 .09-2.21 0-4.5 0-6.76V61.87v-6.94c0-1.78-.17-3.53-.25-5.3 0-.39 0-.77-.06-1.17 0-1.45.12-1.94.6-2.23.12-.06.23-.15.34-.19.37-.11.65.48.74 1.53.29 3.13.35 6.46.37 9.79v7.46zM33.63 86.13l.1-2.6.15-2.6v-1.89c.14-2.24.31-4.47.38-6.71 0-1 0-2-.07-3a10.71 10.71 0 01.12-3.78c.11-.4.58-.38 1.14-.09a4.47 4.47 0 01.91.64 1.67 1.67 0 01.6 1 33.87 33.87 0 01.52 3.85 31.9 31.9 0 01-.13 3.9 36 36 0 00.15 4.75c0 1.75.06 3.5 0 5.25v3.23c0 1.63-.06 3.27 0 4.89.08 1.25.42 2.48.58 3.72a8.11 8.11 0 01.12.82 1.52 1.52 0 01-.32 1.11 1.75 1.75 0 01-1 .49 4.34 4.34 0 01-.6.14 1.65 1.65 0 01-1.64-1 11.41 11.41 0 01-.86-3.35c-.15-1.14-.21-2.31-.26-3.48-.06-1.73 0-3.48 0-5.23zM56 81.05l.08-3.42.14-3.42v-2.49c.12-2.94.28-5.87.34-8.81 0-1.3 0-2.6-.06-3.89a21.76 21.76 0 01.09-5c.09-.52.5-.48 1-.07a4.06 4.06 0 01.81.87 2.54 2.54 0 01.6 1.31c.2 1.69.4 3.38.47 5.08s0 3.4-.12 5.11c-.15 2.05.09 4.17.12 6.26v6.89l-.05 4.24c0 2.15 0 4.3.05 6.42.07 1.65.37 3.27.52 4.9 0 .36.1.71.11 1.08a2.53 2.53 0 01-.28 1.44 1.48 1.48 0 01-.83.64 4.25 4.25 0 01-.53.19c-.58.13-1.1-.42-1.45-1.38a36.15 36.15 0 01-1-9c-.05-2.29 0-4.59 0-6.89zM78.45 75.22l.09-4.47.15-4.48v-3.26c.13-3.83.29-7.66.36-11.5v-5.09a38 38 0 01.09-6.49c.09-.67.5-.62 1-.07a5.63 5.63 0 01.77 1.14 4.1 4.1 0 01.53 1.68c.2 2.21.4 4.42.46 6.64s0 4.44-.13 6.68c-.15 2.67.08 5.44.11 8.18v9l-.05 5.54c0 2.8-.06 5.61 0 8.39.07 2.16.37 4.27.52 6.4 0 .47.09.93.11 1.41 0 1.76-.35 2.33-1.11 2.71a3.59 3.59 0 01-.53.25c-.58.17-1.1-.55-1.45-1.82a61.48 61.48 0 01-1-11.85v-9zM113.37 98.22a.59.59 0 00.16-.08l.1-.08c.05 0 .05 0 0-.06l-.16-.08-.12-.06-.49-.17c-.61-.19-1.23-.34-1.83-.56-2.1-.77-4.14-1.67-6.17-2.59l-2.73-1.18a9 9 0 01-3.3-2.1c-.3-.35.06-.53.56-.62a3.06 3.06 0 011.75.11c2.21.93 4.5 2 6.8 3.07a36.68 36.68 0 004.38 1.55l.9.28.45.14.25.07.39.1c.53.11 1 .26 1.55.35l1.59.27v.27l-.3.42c-.21.28-.4.52-.6.77s-.49.59-.76.87l-.87.82c-.5.44-.86.72-1.3 1.08-1.29 1-2.62 1.94-3.87 2.93-1 .76-1.86 1.62-2.77 2.43-.2.18-.39.38-.59.55-.78.64-1.12.72-1.65.4a3.28 3.28 0 01-.37-.22c-.35-.29-.26-.84.24-1.42a32.47 32.47 0 015.13-4.56l2.06-1.52 1-.77.48-.39c.09-.06.05 0 .08 0zM72.14 35A81.06 81.06 0 0162 39.5c-1.27.44-2.51 1-3.78 1.38A102.21 102.21 0 0144.49 44l-3.1.45c-1 .14-2.07.23-3.1.33-1.32.11-2.65.19-4 .2a18.71 18.71 0 01-4-.32c-.84-.2-.66-.32.05-.42.35 0 .84-.13 1.44-.24s1.27-.17 2-.22c1.32-.05 2.64-.26 4-.4l2-.29c.66-.08 1.32-.16 2-.28 2.63-.4 5.26-.91 7.88-1.47A68.88 68.88 0 0059 38.42c1.67-.68 3.39-1.25 5-2.05s3.33-1.42 4.9-2.32l3-1.56c1-.49 1.9-1.15 2.85-1.72a73.78 73.78 0 008.24-5.84c1-.88 1.9-1.77 2.81-2.67l1.38-1.34c.46-.45.86-1 1.29-1.43s.73-.85 1.12-1.26c1.44-1.54 2-1.89 2.88-1.76a4.32 4.32 0 01.56.1c.55.21.27 1.14-.71 2.4a39.79 39.79 0 01-4.85 5.42c-.91.83-1.84 1.66-2.77 2.49s-2 1.51-3 2.27l-2.31 1.65c-.76.54-1.59 1-2.38 1.49-1.6 1-3.15 2-4.84 2.81z" />
      <Path d="M96.44 12.56V12.34v-.18c0-.07-.08 0-.13 0a1.44 1.44 0 00-.29.11c-.48.27-1 .57-1.46.81A20.77 20.77 0 0189 14.8c-.86.14-1.72.29-2.57.39a11.4 11.4 0 01-3.3.07c-.34 0-.29-.36 0-.7a2.31 2.31 0 011.38-.8c2.12-.29 4.17-.65 6.26-1.08a14.74 14.74 0 003.6-1.49l.74-.4 1.09-.62c.4-.22.78-.44 1.16-.63A11.33 11.33 0 0198.44 9l-.13 1.79-.13 2-.11 1.39a26.59 26.59 0 01-.72 4.22 18.25 18.25 0 01-1 3.19 5.79 5.79 0 01-.31.67c-.46.81-.78.95-1.28.82-.11 0-.23-.06-.34-.11-.35-.17-.4-.65-.14-1.19a22.76 22.76 0 001.68-5.18c.12-.69.24-1.39.31-2.11 0-.35.07-.72.1-1.08l.06-.87z" />
    </G>
  </Svg>
);

export default StatisticsIcon;
