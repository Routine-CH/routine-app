import React from "react";
import { View } from "react-native";
import AudioCard from "./audio-card";

interface AudioContainerProps {}

const AudioContainer: React.FC<AudioContainerProps> = () => {
    const audio = [
        {
            image: require("../../../assets/misc/waves.jpg"),
            title: "Progressive Muskelrelaxion",
            time: "10 Minuten",
        },
        {
            image: require("../../../assets/misc/stones.jpg"),
            title: "Achtsamkeitsmeditation",
            time: "5 Minuten",
        },
        {
            image: require("../../../assets/misc/threads.jpg"),
            title: "Visualisierungsmeditation",
            time: "15 Minuten",
        },
    ];

    return (
        <View>
            {audio.map((audio, index) => (
                <AudioCard
                    key={index}
                    image={audio.image}
                    title={audio.title}
                    time={audio.time}
                />
            ))}
        </View>
    );
};

export default AudioContainer;
