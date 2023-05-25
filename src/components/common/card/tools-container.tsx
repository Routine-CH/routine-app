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
        <View style={styles.test}>
            <View style={styles.container}>
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
    test: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    toolContainer: {
        height: 157.5,
        width: 157.5,
        backgroundColor: AppColors.blue100,
        borderRadius: 13,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 7.5,
    },
});
