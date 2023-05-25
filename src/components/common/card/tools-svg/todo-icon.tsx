import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const TodoIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        fill="#ffffff"
        viewBox="0 0 128 138"
        {...props}
    >
        <Defs></Defs>
        <G id="Layer_31" data-name="Layer 31">
            <Path d="M21.6 58.94a.71.71 0 0 1 .78-.65c1.97.18-.98 2.71-.78.65Z" />
            <Path d="M53 58c-2.4 0-4.8 0-7.22-.23a27.2 27.2 0 0 1-7.31-1.47 6.48 6.48 0 0 1-1.07-.5 7 7 0 0 1-1.15-.84 3.27 3.27 0 0 1-.58-1.2c-.08-.37-.11-.6-.16-.89-.08-.55-.13-1.08-.18-1.61-.49-6.19-.62-12.26-.97-18.26-.14-2.69-.35-5.39-.61-8-.34-3.42-.81-6.81-.94-10.24-.05-1.06.29-1 .86-.16a13 13 0 0 1 1 1.76 11.43 11.43 0 0 1 .77 2.64 160.58 160.58 0 0 1 1.5 21c0 2.12.15 4.28.3 6.44s.31 4.36.59 6.38l.07.37c0 .06 0 .13.09.16s.2.18.39.31.4.22.6.35a5.77 5.77 0 0 0 .66.32 3.91 3.91 0 0 0 .7.27 12.35 12.35 0 0 0 1.51.38c.5.12 1 .2 1.55.28a50.84 50.84 0 0 0 6.44.46c2.9.05 5.82 0 8.73-.21 4.41-.26 8.84-.66 13.21-1.21 3.39-.43 6.69-1 10-1.58l2.2-.37a11 11 0 0 1 3-.2 2.54 2.54 0 0 1 1.38.45 2.19 2.19 0 0 1 .42.33c.13.19-.08.38-.54.58a15.07 15.07 0 0 1-2.22.71c-5.93 1.18-12.27 2.13-18.67 2.8-4.76.5-9.57.83-14.4.94ZM88.43 36.9l.1-4.2v-1.53c0-1.8.09-3.61.07-5.42 0-.8-.1-1.6-.14-2.39a17.26 17.26 0 0 1-.11-3.05c0-.32.4-.32.81-.09a2 2 0 0 1 1 1.27 24.12 24.12 0 0 1 .41 6.29c-.07 1.27.12 2.57.16 3.86s.08 2.84.07 4.26v6.62c0 1 .2 2 .27 3.06v.68c0 .86-.28 1.14-.89 1.24a3.2 3.2 0 0 1-.41.07c-.46 0-.82-.36-1-.93a29.68 29.68 0 0 1-.43-5.48v-4.22ZM67.1 10.76q-3.9.21-7.82.49c-1 .07-1.9.21-2.86.27-3.37.24-6.75.4-10.15.43h-4.52c-1 0-1.93 0-2.9-.13a14.06 14.06 0 0 1-2.85-.61c-.58-.19-.43-.41.11-.59a9.51 9.51 0 0 1 2.56-.42c3.77.2 7.62 0 11.51-.15 2.33-.06 4.75-.4 7.14-.64 2.62-.25 5.26-.49 7.9-.68 1.63-.12 3.26-.2 4.89-.28 2.47-.12 5-.13 7.43-.11 1.91 0 3.8 0 5.72.07.42 0 .83.05 1.26.1 1.57.2 2 .49 2.25 1.11a2.07 2.07 0 0 1 .13.43c0 .47-.64.73-1.74.68-3.29-.11-6.72-.24-10.21-.21-2.6 0-5.21.12-7.83.3Z" />
            <Path d="M79 26.71c-2.16 2.63-4.21 5.39-6.15 8.23-.71 1-1.32 2.13-2 3.18l-2 3.15-1 1.6-1.57 2.53a3.36 3.36 0 0 1-1.23 1.07.36.36 0 0 1-.33.07 1.4 1.4 0 0 1-.33-.15 3.42 3.42 0 0 1-.63-.47 8 8 0 0 1-1.22-1.75c-.19-.33-.38-.66-.56-1l-.39-.73a49.11 49.11 0 0 0-3.09-5c-.72-1-1.47-2-2.26-2.9a13.1 13.1 0 0 0-2.48-2.37c-.52-.3-.43-.82.46-1a4.51 4.51 0 0 1 3.65 1.29 31.75 31.75 0 0 1 5 6.35c.35.55.69 1.12 1 1.68l.5.84v.19a3.18 3.18 0 0 0 .11.39s.07.24.11.19l.13-.07.08-.07a1.88 1.88 0 0 0 .19-.2l.1-.13.27-.46c.39-.65.77-1.31 1.16-2 .77-1.31 1.53-2.64 2.36-3.92Q71.8 30.8 75 26.56c1.32-1.73 2.68-3.43 4.1-5.08a76.57 76.57 0 0 1 7-7.11 34.6 34.6 0 0 1 6.2-4.72 9.87 9.87 0 0 1 1.6-.78c2.13-.79 3-.55 3.52.25a3.52 3.52 0 0 1 .36.56.9.9 0 0 1-.31 1 5.6 5.6 0 0 1-1.39.86 38.82 38.82 0 0 0-10.21 7.62 85.59 85.59 0 0 0-6.78 7.63Z" />
            <Path d="M51 59.1a56.49 56.49 0 0 1-6.61-.47 26.37 26.37 0 0 1-6.54-1.69c-.38-.19-.78-.34-1.14-.56l-.53-.38-.29-.18a1.84 1.84 0 0 1-.35-.34 3.48 3.48 0 0 1-.66-1.4 11.57 11.57 0 0 1-.28-1.24 84.1 84.1 0 0 1-.73-8.44l-.41-8.4c-.12-2.47-.28-5-.5-7.4-.29-3.15-.68-6.28-.89-9.42-.07-1 .17-.9.6-.12a13.48 13.48 0 0 1 .75 1.64 13 13 0 0 1 .58 2.47 177.92 177.92 0 0 1 1.35 19.43c0 1.94.17 3.92.35 5.9.08 1 .19 2 .33 3a14.9 14.9 0 0 0 .58 2.73 1.76 1.76 0 0 0 .12.24.26.26 0 0 0 .1.11l.62.4c.43.26.89.5 1.35.73a11 11 0 0 0 1.48.56 15.12 15.12 0 0 0 1.54.41 37.74 37.74 0 0 0 6.4.84 76.81 76.81 0 0 0 8 0c4.06-.19 8.14-.55 12.15-1.07 3.12-.4 6.16-.95 9.24-1.44l2-.33c2.55-.39 3.44-.17 4 .14A2.61 2.61 0 0 1 84 55c.22.27-.75.47-2.58.89-5.45 1-11.28 1.92-17.17 2.51a116.76 116.76 0 0 1-13.25.74ZM54 118.93c-2.39 0-4.8 0-7.21-.23a27.35 27.35 0 0 1-7.32-1.47 8.84 8.84 0 0 1-1.35-.66l-.74-.58a.88.88 0 0 1-.34-.42 1.92 1.92 0 0 1-.24-.5 2.38 2.38 0 0 1-.15-.51c0-.12-.05-.26-.07-.37l-.1-.68c-.06-.45-.11-.88-.14-1.32-.45-6.14-.58-12.18-.93-18.26-.14-2.69-.35-5.39-.61-8-.35-3.42-.82-6.81-.94-10.24-.05-1.06.28-1 .85-.16a14 14 0 0 1 1 1.76 11.43 11.43 0 0 1 .77 2.64A162.31 162.31 0 0 1 37.94 101c0 2.12.15 4.28.3 6.44s.3 4.36.58 6.38c.11.6 0 .4.43.75a8.49 8.49 0 0 0 1.34.74 13.75 13.75 0 0 0 3.25.86 47.64 47.64 0 0 0 7 .55c2.9.05 5.82 0 8.73-.21 4.41-.26 8.85-.66 13.21-1.21 3.4-.43 6.7-1 10-1.58l2.2-.37a11 11 0 0 1 3-.2 2.67 2.67 0 0 1 1.39.45 2.55 2.55 0 0 1 .41.33c.14.19-.07.38-.54.58a14.67 14.67 0 0 1-2.22.71c-5.92 1.18-12.26 2.13-18.67 2.8-4.76.5-9.56.84-14.39.95ZM89.42 97.89l.1-4.21v-1.53c0-1.8.1-3.61.07-5.42 0-.8-.1-1.59-.14-2.39a16.35 16.35 0 0 1-.1-3c0-.31.4-.32.81-.09a2 2 0 0 1 1 1.27 23.7 23.7 0 0 1 .41 6.29c-.07 1.27.12 2.57.17 3.86s.07 2.84.06 4.26v6.57c0 1 .19 2 .27 3.06v.68c-.06.86-.28 1.14-.89 1.24a3.07 3.07 0 0 1-.42.07c-.46 0-.82-.36-1-.93a28 28 0 0 1-.43-5.48v-4.22ZM68.1 71.74q-3.9.21-7.82.49c-1 .08-1.91.21-2.86.27-3.37.24-6.76.41-10.15.43h-4.53c-1 0-1.93 0-2.9-.12a15.12 15.12 0 0 1-2.84-.62c-.58-.19-.43-.41.12-.59a9.5 9.5 0 0 1 2.55-.42c3.77.2 7.62 0 11.51-.15 2.34-.06 4.75-.4 7.14-.64 2.63-.25 5.26-.49 7.91-.68 1.62-.12 3.26-.2 4.89-.28 2.47-.11 5-.12 7.42-.11 1.92 0 3.81 0 5.72.07.42 0 .84 0 1.26.1 1.57.2 2 .49 2.25 1.11a3 3 0 0 1 .14.43c0 .47-.64.73-1.75.68-3.28-.11-6.72-.24-10.21-.21-2.59 0-5.21.12-7.83.3Z" />
            <Path d="M80 87.69c-2.16 2.63-4.21 5.39-6.15 8.23-.7 1-1.32 2.13-2 3.18L70 101.89l-.89 1.41-.44.7-.67 1.18a10.58 10.58 0 0 1-.7 1.11l-.36.48a2.13 2.13 0 0 1-.18.22l-.18.12-.35.25-.31.16c-.33 0-.52-.16-.77-.31a5.12 5.12 0 0 1-1.43-1.76c-.44-.72-.93-1.65-1.13-2a47.39 47.39 0 0 0-3.09-5 36.09 36.09 0 0 0-2.25-2.9 13.46 13.46 0 0 0-2.49-2.37c-.52-.3-.43-.82.46-1a4.5 4.5 0 0 1 3.65 1.29 31.75 31.75 0 0 1 5 6.35c.35.56.69 1.12 1 1.68l.49.84c.06.1 0 .08 0 .09v.1a1.84 1.84 0 0 0 .1.39s.08.24.12.19l.13-.07a1 1 0 0 0 .18-.18l.11-.12v-.07l.07-.12 1.22-2.07c.81-1.39 1.62-2.79 2.49-4.14 1.91-3 3.93-5.88 6.07-8.69q2-2.61 4.11-5.09a75.22 75.22 0 0 1 6.95-7.11 34.68 34.68 0 0 1 6.21-4.72 9.13 9.13 0 0 1 1.6-.78c2.12-.79 3-.55 3.52.25a3.43 3.43 0 0 1 .35.56.89.89 0 0 1-.31 1 5.51 5.51 0 0 1-1.38.86 38.86 38.86 0 0 0-10.06 7.48 85.5 85.5 0 0 0-6.77 7.63Z" />
            <Path d="M53.41 120c-4.5 0-9.07-.2-13.53-1.67l-.79-.27-.77-.37a11.41 11.41 0 0 1-1.52-.88 2.55 2.55 0 0 1-.73-1.08 7 7 0 0 1-.28-.93 62.08 62.08 0 0 1-.91-8.69l-.45-8.6c-.13-2.54-.31-5.09-.53-7.6-.3-3.23-.7-6.44-.93-9.66-.07-1 .17-.92.6-.12a13.41 13.41 0 0 1 .77 1.68 14.08 14.08 0 0 1 .61 2.5 189.71 189.71 0 0 1 1.39 19.93c.07 2 .2 4 .4 6 .1 1 .22 2 .38 3 .09.48.18 1 .3 1.41a2.18 2.18 0 0 0 .39.94l.09.06a15.16 15.16 0 0 0 6 2.22 47 47 0 0 0 6.62.64c2.74.08 5.49 0 8.24-.14 4.17-.24 8.35-.66 12.47-1.2 3.2-.43 6.32-1 9.47-1.51l2.08-.33c2.61-.41 3.52-.2 4.1.12a1.79 1.79 0 0 1 .38.24c.12.14-.09.26-.54.39s-1.17.32-2.11.52c-5.59 1-11.56 2-17.6 2.63-4.48.49-9 .83-13.57.88Z" />
            <Path d="M103.47 17.66a.71.71 0 0 1 .78-.65c1.97.18-.98 2.72-.78.65ZM104.94 86.7a.72.72 0 0 1 .79-.65c1.97.18-.98 2.72-.79.65Z" />
            <Path d="M95.21 29.43a.63.63 0 0 1 .35.8c-.56 1.56-1.99-1.43-.35-.8Z" />
        </G>
    </Svg>
);
export default TodoIcon;
