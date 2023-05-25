import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../typography/app-text";

interface ToolCardProps {
    title: string;
    children: ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({ children, title }) => {
    return (
        <>
            <View style={styles.iconPlacement}>{children}</View>
            <AppText
                fontStyle="bodyMedium"
                colorStyle="white"
                style={styles.textPlacement}
            >
                {title}
            </AppText>
        </>
    );
};

export default ToolCard;

const styles = StyleSheet.create({
    iconPlacement: {
        bottom: 10,
    },
    textPlacement: {
        bottom: 15,
        position: "absolute",
    },
});
