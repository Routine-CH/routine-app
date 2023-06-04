import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { LinearGradient, Rect, Stop } from "react-native-svg";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface GoalProps {
    // image: any;
    title: string;
    description: string;
}

const GoalsCard: React.FC<GoalProps> = ({
    /* image, */
    title,
    description,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Svg width="72" height="72">
                    <LinearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                    >
                        <Stop offset="0%" stopColor="rgba(41, 104, 121, 1)" />
                        <Stop
                            offset="100%"
                            stopColor="rgba(111, 153, 165, 1)"
                        />
                    </LinearGradient>
                    <Rect
                        x="0"
                        y="0"
                        width="72"
                        height="72"
                        rx="10"
                        fill="url(#gradient)"
                    />
                </Svg>
                <View style={styles.textfields}>
                    <AppText fontStyle="heading4" style={{ marginBottom: 10 }}>
                        {title}
                    </AppText>
                    <AppText fontStyle="body">{description}</AppText>
                </View>
            </View>
        </View>
    );
};

export default GoalsCard;

const styles = StyleSheet.create({
    container: { alignItems: "center" },
    card: {
        width: 330,
        height: 125,
        backgroundColor: AppColors.blueMuted40,
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        marginBottom: 30,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    textfields: {
        width: 210,
        marginLeft: 15,
    },
});