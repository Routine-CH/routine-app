import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";

type NotesIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  [x: string]: any;
};

const NotesIcon = ({
  width = 100,
  height = 100,
  fill = "#ffffff",
  ...props
}: NotesIconProps) => (
  <Svg
    width={width}
    height={height}
    fill={fill}
    viewBox='0 0 130 128'
    {...props}
  >
    <Defs></Defs>
    <G id='Layer_22' data-name='Layer 22'>
      <Path d='m72.82 47.25-5 .85-1.82.36-6.46 1.15-2.85.57a21.28 21.28 0 0 1-3.71.6c-.42 0-.34-.23 0-.5a3.43 3.43 0 0 1 1.51-.7c2.45-.51 4.93-1 7.45-1.39 1.5-.23 3-.6 4.58-.89l5-.92 3.12-.54 4.74-.75c1.22-.18 2.4-.45 3.63-.6l.8-.12c1-.08 1.35 0 1.57.3a1.37 1.37 0 0 1 .15.21c.09.24-.31.46-1 .55l-6.63 1-5 .83ZM29.23 65.73q2.91 1.48 5.85 2.91l2.17 1 7.59 3.65c1.12.54 2.27 1.06 3.39 1.57a23.71 23.71 0 0 1 4.25 2.25c.42.29.24.42-.23.4a5.25 5.25 0 0 1-.9-.14 5 5 0 0 1-1.18-.37c-2.92-1.33-5.93-2.54-8.84-4-1.75-.87-3.64-1.64-5.46-2.46q-3-1.38-6-2.81l-3.64-1.83c-1.84-.9-3.67-1.87-5.49-2.79-1.4-.74-2.83-1.38-4.22-2.13a8.11 8.11 0 0 1-.92-.49c-1.1-.71-1.37-1.05-1.38-1.52a1.17 1.17 0 0 1 0-.32c0-.29.65-.24 1.5.15 2.51 1.17 5 2.59 7.67 3.91 1.94 1 3.89 2 5.86 3ZM52.24 59.45l-.29 3c0 .37 0 .74-.06 1.12l-.36 3.92c0 .58-.06 1.16-.07 1.74a13.71 13.71 0 0 1-.11 2.22c-.07.46-1-.13-1.05-1a26.79 26.79 0 0 1 .21-4.56c.13-.91.1-1.86.15-2.8l.2-3.08.14-1.84c.06-1 .15-1.92.17-2.87V52.61a1.8 1.8 0 0 1 .11-.64.44.44 0 0 1 .14-.16.35.35 0 0 1 .25-.19.16.16 0 0 1 .17.07c0 .09-.06-.12 0 0a.73.73 0 0 0 .09.19.19.19 0 0 0 .23.07c.08-.09.1 0 .13.09a1.37 1.37 0 0 1 .07.29 23.85 23.85 0 0 1 .13 4.07c0 1-.1 2.05-.17 3.08ZM32.66 53.09q0 1.41-.06 2.82v1l-.06 3.65v1.62a7.17 7.17 0 0 1-.09 2.11c-.05.22-.3.15-.52-.06a1.28 1.28 0 0 1-.46-.9c0-1.36-.09-2.76 0-4.18.06-.84 0-1.72-.05-2.59s0-1.91 0-2.86v-1.76l.09-2.67v-2.06a3.46 3.46 0 0 1 0-.45c.06-.56.16-.73.44-.81l.19-.06c.21 0 .36.22.4.63a32.49 32.49 0 0 1 .09 3.71l-.05 2.83ZM58.76 20.26a20.1 20.1 0 0 1 2.1-.52c.26-.06.5-.16.76-.2.91-.15 1.84-.22 2.75-.33.41-.05.81-.13 1.21-.19a9.14 9.14 0 0 1 1.57-.11c.17 0 .14 0 0 0s-.33.27-.59.43a8.33 8.33 0 0 1-2.93 1.26c-.62.11-1.22.39-1.85.55s-1.37.34-2.06.5c-.42.1-.85.2-1.25.32a2.1 2.1 0 0 0-.71.29 1.21 1.21 0 0 0-.32.7c-.08.46 0 1-.07 1.47v.34a2.28 2.28 0 0 1-.17.65s0 .05 0 .06a1.25 1.25 0 0 0-.11-.43c-.24-.89-1-1.7-.57-3.18a2 2 0 0 1 .52-.78 2.67 2.67 0 0 1 .66-.44 10.28 10.28 0 0 1 1.07-.45ZM49.45 33.47c0 .1 0 0 0 0h-.37l-.7-.05a4.74 4.74 0 0 1-.55 0c-.67 0-1.39-.19-2.1-.24h-.94a3.48 3.48 0 0 1-1.28-.18c-.12-.06-.1 0 0-.06s.25-.31.43-.48a3.17 3.17 0 0 1 2.17-1.18 13.2 13.2 0 0 0 1.46-.32 7 7 0 0 1 1.82 0 2.28 2.28 0 0 1 1.43.7 3.22 3.22 0 0 1 .62 1.79 4.25 4.25 0 0 1 .08 1.17v.26c0 .31-.13.45-.12.52a1.73 1.73 0 0 0-.29-.26c-.27-.29-.59-.61-.89-.9s-.53-.56-.7-.74a.5.5 0 0 0-.19-.13h-.06.05a.87.87 0 0 0 .17-.16.35.35 0 0 0 .06-.09c0 .07.2-.61.11-.32v.06l-.07.2a3 3 0 0 0-.08.43ZM18.57 87.83c2.94 1.85 5.89 3.69 8.87 5.49 1.08.66 2.21 1.25 3.29 1.91l11.45 7c1.7 1 3.44 2 5.16 3 2.21 1.23 4.41 2.51 6.5 4 .65.46.41.66-.34.62a9.91 9.91 0 0 1-3.33-.92c-2.36-1.09-4.62-2.33-6.88-3.6s-4.5-2.57-6.72-4c-2.65-1.64-5.52-3.15-8.28-4.76q-4.54-2.66-9-5.39a358.05 358.05 0 0 1-5.53-3.41c-.69-.43-1.38-.88-2.07-1.34-.35-.22-.69-.46-1-.7-.19-.15-.48-.32-.68-.5l-.17-.14a1.66 1.66 0 0 1-.06-.21 3.25 3.25 0 0 1-.11-.42 12.87 12.87 0 0 1-.19-1.4l-.1-1.24-.18-2.45c-.19-2.52-.49-5-.63-7.48 0-.55-.08-1.09-.1-1.65a7.37 7.37 0 0 1 .17-2.19 2.26 2.26 0 0 1 .61-1 2 2 0 0 1 .3-.29c.16-.1.3.06.49.43a5.16 5.16 0 0 1 .54 1.68c.34 2.21.62 4.48.84 6.78s.34 4.65.56 6.93l.11 1c.65.47 1.42.93 2.13 1.4l4.44 2.76Z' />
      <Path d='M54.62 95.86v3.48c0 .43.06.85.06 1.27l-.06 4.5c0 .67 0 1.33.08 2a8.11 8.11 0 0 1 0 2.6c-.06.28-.46.2-.85 0a1.64 1.64 0 0 1-.84-1.08 31.32 31.32 0 0 1-.19-5.14 26.26 26.26 0 0 0-.13-3.19l-.09-3.52V91.33c0-.85-.18-1.68-.19-2.54v-.56c0-.71.21-1 .65-1a1.59 1.59 0 0 1 .3-.06c.34 0 .6.29.69.76.16.71.33 1.45.43 2.21s.15 1.53.21 2.3l.1 1.74v1.75ZM117.31 96l-15 3.75c-1.82.45-3.62 1-5.44 1.4l-19.32 4.5-8.55 2.07a81.54 81.54 0 0 1-11 2.21c-1.21.07-1-.29-.15-.83a16.16 16.16 0 0 1 4.64-1.87c7.37-1.86 14.77-3.67 22.28-5.33 4.49-1 9.09-2.31 13.65-3.49l15-3.84c3.09-.8 6.17-1.6 9.23-2.45l1.85-.53.52-.15c.06 0 .22 0 .19-.13V80.73c0-3.73-.15-7.38-.12-11.08v-2.44c.16-3 .47-4 1.17-4.61a2.21 2.21 0 0 1 .48-.37c.52-.22.75 1 .77 3.21.09 6.52.11 13.44.11 20.39v6.09l-.17.51-.09.25v.19c.18.13-.25-.18-.21-.14l-.27.42c-.07.16-.3.22-.44.33a8.92 8.92 0 0 1-1.13.39l-.62.18-2.44.67-4.87 1.31ZM97.39 67.57 86.12 70 82 71l-14.46 3.19c-2.13.48-4.28 1-6.38 1.55-2.72.65-5.43 1.39-8.19 1.85-.85.16-.78 0-.12-.34.32-.2.8-.47 1.38-.76a10.68 10.68 0 0 1 2-.86l4.1-1.27c1.37-.41 2.76-.77 4.14-1.13q4.16-1.11 8.38-2c3.38-.71 6.83-1.67 10.26-2.49l11.32-2.64 7-1.61c3.52-.81 7.07-1.59 10.55-2.44 2.71-.65 5.34-1.41 8-2.1.59-.16 1.16-.33 1.76-.47a8.44 8.44 0 0 1 2.41-.27 2.19 2.19 0 0 1 1.16.33 2.5 2.5 0 0 1 .38.26c.28.28-.55.82-2.11 1.45-4.7 1.5-9.74 2.68-14.82 3.83l-11.35 2.54ZM26.58 65.24q3 1.55 6.11 3l2.26 1 7.93 3.79c1.18.56 2.37 1.09 3.55 1.62A22.82 22.82 0 0 1 50.88 77c.43.31.22.47-.29.48a6.33 6.33 0 0 1-1-.09 4.54 4.54 0 0 1-1.25-.35c-3-1.36-6.2-2.59-9.24-4.15-1.82-.92-3.81-1.68-5.71-2.54-2.09-.94-4.18-1.91-6.25-2.9l-3.83-1.85c-1.92-.94-3.83-2-5.73-2.92-1.47-.77-3-1.42-4.42-2.23-.32-.17-.65-.33-1-.53-1.13-.79-1.39-1.19-1.34-1.72a1.94 1.94 0 0 1 0-.36c.1-.34.75-.29 1.61.13 2.58 1.24 5.21 2.71 7.94 4.09 2 1 4.06 2.09 6.11 3.1Z' />
      <Path d='M112.9 50.15v3.1c0 .37.08.74.09 1.12v4a17.16 17.16 0 0 0 .11 1.77 7 7 0 0 1 0 2.28c0 .24-.36.22-.71 0a1.71 1.71 0 0 1-.87-.94 10.26 10.26 0 0 1-.37-2.26 13.68 13.68 0 0 1 0-2.31 19.41 19.41 0 0 0-.19-2.83l-.2-3.08-.07-1.93c0-1 0-1.95-.11-2.92-.06-.75-.25-1.48-.34-2.23a4.15 4.15 0 0 1 0-.49 2.15 2.15 0 0 1 0-.4 1 1 0 0 1 .18-.26 1 1 0 0 1 .47-.29l.25-.09c.26-.06.55.19.86.62.12.33.25.65.36 1s.12.66.18 1c.1.67.16 1.36.22 2 .08 1 .14 2.06.18 3.09ZM79.56 47.85c-4 .7-8 1.39-12 2.13l-4.34.9c-2.54.51-5.11 1-7.58 1.65l-.93.23-.79.26-.19.06h-.1v.64l-.2 3.9c-.11 2.31-.17 4.64-.21 6.93 0 3 0 5.92-.27 8.86-.13 1.83-1.69-.51-1.72-3.93 0-3 0-6 .11-9.05 0-1.51.11-3 .19-4.53l.14-2.28v-.33a1.48 1.48 0 0 1 .12-.47 4 4 0 0 1 .31-.83l-.1-.12.08-.07.17-.14a.92.92 0 0 1 .4-.23l.83-.28c1.84-.54 3.64-1 5.47-1.4s3.66-.87 5.48-1.24c4-.83 8-1.58 12.06-2.33l7.42-1.36c3.75-.7 7.52-1.37 11.21-2.16 2.87-.61 5.66-1.35 8.46-2.06l1.84-.5c2.31-.56 3-.67 3.69-.27a2 2 0 0 1 .43.26c.34.33-.5.93-2.19 1.53a132.67 132.67 0 0 1-15.74 4c-4 .81-8 1.57-12.07 2.33Z' />
      <Path d='m60.94 32.79 10.28-1.7c1.25-.2 2.49-.46 3.74-.65 2.22-.33 4.44-.63 6.68-.88 1.12-.1 2.24-.21 3.4-.23h1.44a4.25 4.25 0 0 1 .62.12c.53-.05.55.5.71.87.06.19.17.42.2.57l.1.43a27.17 27.17 0 0 1 .53 6c0 2.55-.12 5.06-.13 7.54 0 .78-.3.71-.66.07a8.08 8.08 0 0 1-.85-3.28c-.09-2.61-.11-5.16-.34-7.6-.06-.6-.16-1.2-.27-1.78-.06-.29-.14-.58-.21-.86v-.13h-1c-.61 0-1.24.06-1.88.11-3 .23-6.21.89-9.33 1.43l-10.3 1.85-6.35 1.15c-3.2.59-6.43 1.14-9.6 1.75-2.48.47-4.87 1.08-7.33 1.53-.54.11-1.07.22-1.62.3a8.5 8.5 0 0 1-2.19.15 1.67 1.67 0 0 1-1-.49 1.75 1.75 0 0 1-.33-.34c-.23-.37.54-.87 2-1.23 4.28-1.06 8.85-1.95 13.46-2.82 3.29-.67 6.77-1.34 10.21-1.94ZM34 52.34l-.1 3.33v1.22l-.18 4.29v1.91a7.44 7.44 0 0 1-.14 2.48c-.07.27-.43.17-.78-.08a1.47 1.47 0 0 1-.69-1.07 42.46 42.46 0 0 1 .09-4.9 28.08 28.08 0 0 0 0-3v-8.57c0-.81-.14-1.6-.13-2.41V45c.05-.67.19-.88.6-1 .1 0 .19 0 .29-.06.31 0 .55.26.64.72a21.39 21.39 0 0 1 .3 2.15c0 .73.07 1.47.08 2.21v3.34ZM25.88 44.25l-.12 4.48v1.63l-.21 5.76v2.56a12 12 0 0 1-.1 3.32c-.09.35-.5.23-.89-.09a2 2 0 0 1-.78-1.42 63.8 63.8 0 0 1 .09-6.62c.12-1.34 0-2.72 0-4.09V38.29c0-1.09-.16-2.15-.17-3.23v-.72c0-.89.22-1.19.68-1.33a1.7 1.7 0 0 1 .32-.1c.35 0 .62.34.71 1 .14.94.31 1.9.36 2.89s.09 2 .11 3v4.5ZM53.15 26.46l-6.79 1.13-2.46.49-8.74 1.51c-1.29.23-2.58.51-3.85.8a43.24 43.24 0 0 1-4.92 1c-1 .12 0-1.46 1.85-1.92 3.31-.8 6.65-1.52 10.05-2.05 2-.3 4.12-.83 6.19-1.23l6.83-1.28 4.21-.76c2.13-.38 4.27-.72 6.37-1.14 1.64-.32 3.22-.75 4.84-1.11.35-.08.7-.18 1.06-.25 1.33-.25 1.78-.18 2.15.32a2.53 2.53 0 0 1 .25.35c.19.41-.3.84-1.25 1.12A84.58 84.58 0 0 1 60 25.33l-6.84 1.18Z' />
      <Path d='m58.74 19.13 2.59-.4c.32-.05.62-.14.94-.18l3.32-.38c.5-.06 1-.16 1.47-.23a6.4 6.4 0 0 1 1.94-.15c.22 0 .17.28 0 .54a1.35 1.35 0 0 1-.74.64 18.38 18.38 0 0 1-3.74.63 16.68 16.68 0 0 0-2.3.45l-2.53.52c-.52.11-1 .23-1.53.37l-.71.21a1 1 0 0 0-.24.1c-.08.06 0 .16-.06.24v.44a13.81 13.81 0 0 0 .24 1.84 2.79 2.79 0 0 1 .07.38c0 .24 0 .38-.12.49a2.52 2.52 0 0 1-.52.26l-.26.13a.48.48 0 0 1-.46 0c-.18-.09-.43-.25-.47-.47a4.51 4.51 0 0 1-.3-1.63v-1.48a2.6 2.6 0 0 1 0-.4 1.66 1.66 0 0 1 .12-.51c.21-.1.14-.38.34-.47a2.71 2.71 0 0 1 .52-.33c.21-.07.41-.16.62-.21l.38-.11c.45-.12.89-.21 1.33-.3ZM50.52 32c-.85.07-1.72.18-2.59.3-.32 0-.63.14-1 .19-1.12.15-2.25.31-3.37.51-.5.09-1 .22-1.47.33a8.79 8.79 0 0 1-1.92.35c-.21 0-.22-.25-.11-.53a1.3 1.3 0 0 1 .7-.74 16 16 0 0 1 3.83-.9c.8-.09 1.58-.36 2.38-.53s1.76-.34 2.65-.48l.83-.12a7.86 7.86 0 0 1 1.1-.09 1 1 0 0 1 .68.17c.22.11.23.38.31.61.13.75.2 1.1.3 1.58.15.63.39 1.22.59 1.85a2 2 0 0 1 .13.42.8.8 0 0 1-.08.6 1.17 1.17 0 0 1-.54.31 1 1 0 0 1-.28.06.91.91 0 0 1-.44-.1c-.16-.07-.4-.17-.46-.34a10.48 10.48 0 0 1-.76-3.31c0-.09 0 0 0 0h-.46ZM97.9 91.32c-2 .44-3.91.83-5.87 1.21-.71.13-1.41.33-2.13.45-1.26.22-2.53.42-3.8.59q-1 .14-1.92.24l-1 .08h-1.17a2.35 2.35 0 0 1-.6-.1.44.44 0 0 1-.15 0l-.09-.11-.2-.23a4 4 0 0 1-.54-1.12 7.14 7.14 0 0 1-.27-1.85 18.07 18.07 0 0 1 .06-2.22c.07-.71.19-1.4.25-2.08 0-.41.35-.43.73-.06a3.26 3.26 0 0 1 .84 2c.06.75 0 1.46 0 2.12a6.46 6.46 0 0 0 .1.93 2.47 2.47 0 0 0 .09.41 1 1 0 0 0 0 .18c0 .06 0 0 0 0v.08H82.64c.7-.07 1.42-.15 2.15-.2a47.13 47.13 0 0 0 5.29-1c2-.4 3.89-.8 5.82-1.25a83.6 83.6 0 0 0 3.55-.88 33 33 0 0 0 5.16-1.76l.42-.23.25-.18a.44.44 0 0 0 .18-.47c0-.11-.05-.58-.09-.9l-.12-1c0-.29-.12-.57-.17-.85-.15-1.06 0-1.28.47-1.73l.31-.33c.31-.38 1 0 1.45 1a8 8 0 0 1 .48 2.05c0 .35.08.69.1 1a11.26 11.26 0 0 1 0 1.33 2.16 2.16 0 0 1-.86 1.62 6.08 6.08 0 0 1-.81.55l-.54.27a18.76 18.76 0 0 1-2 .82c-2 .67-3.94 1.14-5.89 1.64ZM9.93 80.19s-5.11-1.51-8.22.93c-2.76 2.16 8.48 13.4 31.5 17.34L10.42 84.63ZM94.64 66.54l-10.07 2.29-3.65.9L68 72.75c-1.92.46-3.83 1-5.71 1.46-2.43.6-4.84 1.29-7.31 1.74-.76.15-.69 0-.11-.3.3-.17.72-.41 1.23-.68a10 10 0 0 1 1.82-.77c2.43-.81 4.88-1.57 7.36-2.22s5-1.31 7.48-1.85c3-.67 6.1-1.55 9.16-2.32L92 65.34l6.24-1.49c3.14-.76 6.31-1.48 9.42-2.26 2.42-.61 4.77-1.3 7.16-1.94.52-.15 1-.3 1.56-.43a8.42 8.42 0 0 1 2.15-.29 2 2 0 0 1 1 .27 1.53 1.53 0 0 1 .34.21c.26.24-.49.72-1.88 1.29-4.2 1.37-8.71 2.47-13.25 3.53l-10.08 2.35ZM72.2 37.48l1.62-.2c.2 0 .39-.08.58-.1l2.09-.24a9.09 9.09 0 0 0 .91-.15 4.26 4.26 0 0 1 1.17-.18c.25 0 .09.79-.34.93a10.59 10.59 0 0 1-2.39.42 10.58 10.58 0 0 0-1.46.24l-1.62.26-1 .16c-.56.09-1 .07-1.53.17a10.41 10.41 0 0 0-1.13.3l-.25.07c-.31.07-.42 0-.54-.27 0-.06 0-.12-.07-.19a.43.43 0 0 1 .26-.52 7.5 7.5 0 0 1 2.12-.53c.27 0 .6 0 .78-.07l.79-.12ZM68.8 43.4l2.89-.4 1-.2 3.72-.6c.55-.09 1.1-.22 1.64-.34a14.87 14.87 0 0 1 2.09-.42c.45 0 .06.81-.73 1a32.15 32.15 0 0 1-4.28.88c-.87.1-1.76.34-2.64.5l-2.91.51-1.8.31c-.91.15-1.82.29-2.71.47-.7.14-1.37.34-2.05.51l-.45.11c-.56.12-.76.08-.93-.18a.93.93 0 0 1-.11-.19c-.1-.21.1-.43.51-.57a26.55 26.55 0 0 1 3.79-.91l2.91-.5Z' />
    </G>
  </Svg>
);

export default NotesIcon;
