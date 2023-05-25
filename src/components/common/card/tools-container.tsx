import { StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import ToolCard from "./tool-card";
import GoalsIcon from "./tools-svg/goals-icon";
import JournalIcon from "./tools-svg/journal-icon";
import NotizIcon from "./tools-svg/notes-icon";
import TimerIcon from "./tools-svg/timer-icon";
import TodoIcon from "./tools-svg/todo-icon";

const ToolsContainer: React.FC = () => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.toolContainer}>
                    <ToolCard title="Timer">
                        <TimerIcon />
                    </ToolCard>
                </View>
                <View style={styles.toolContainer}>
                    <ToolCard title="Journal">
                        <JournalIcon />
                    </ToolCard>
                </View>
                <View style={styles.toolContainer}>
                    <ToolCard title="Todo">
                        <TodoIcon />
                    </ToolCard>
                </View>
                <View style={styles.toolContainer}>
                    <ToolCard title="Notizen">
                        <NotizIcon />
                    </ToolCard>
                </View>
                <View style={styles.toolContainer}>
                    <ToolCard title="Ziele">
                        <GoalsIcon />
                    </ToolCard>
                </View>
            </View>
        </View>
    );
};

export default ToolsContainer;

const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 30,
        width: "100%",
        alignItems: "center",
    },
    innerContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    toolContainer: {
        height: 157.5,
        width: 157.5,
        borderRadius: 13,
        marginVertical: 7.5,
        backgroundColor: AppColors.blue100,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
});
