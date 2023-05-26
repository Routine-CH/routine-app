import React from "react";
import { View } from "react-native";
import GoalsCard from "./goals-card";

interface GoalsContainerProps {}

const GoalsContainer: React.FC<GoalsContainerProps> = () => {
    const goals = [
        {
            // image: require(""),
            title: "Abgabe",
            description: "Abgabe vorbereiten",
        },
        {
            // image: require(""),
            title: "Lorem",
            description: "Lorem Ipsum",
        },
    ];

    return (
        <View>
            {goals.map((goal, index) => (
                <GoalsCard
                    key={index}
                    // image={goal.image}
                    title={goal.title}
                    description={goal.description}
                />
            ))}
        </View>
    );
};

export default GoalsContainer;
