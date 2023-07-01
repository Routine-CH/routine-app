export interface Mood {
  image: any;
  title: string;
}

export const moods: Mood[] = [
  {
    image: require("../../assets/moods/mood-anger.png"),
    title: "Wütend",
  },
  {
    image: require("../../assets/moods/mood-calm.png"),
    title: "Ruhig",
  },
  {
    image: require("../../assets/moods/mood-curios.png"),
    title: "Neugierig",
  },
  {
    image: require("../../assets/moods/mood-excitement.png"),
    title: "Aufgeregt",
  },
  {
    image: require("../../assets/moods/mood-fear.png"),
    title: "Ängstlich",
  },
  {
    image: require("../../assets/moods/mood-frustration.png"),
    title: "Traurig",
  },
  {
    image: require("../../assets/moods/mood-joy.png"),
    title: "Glücklich",
  },
  {
    image: require("../../assets/moods/mood-pride.png"),
    title: "Stolz",
  },
  {
    image: require("../../assets/moods/mood-rage.png"),
    title: "Frustration",
  },
  {
    image: require("../../assets/moods/mood-sadness.png"),
    title: "Bedrückt",
  },
  {
    image: require("../../assets/moods/mood-serenity.png"),
    title: "Gelangweilt",
  },
];
