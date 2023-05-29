import { StyleSheet, View } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import AppColors from "../../utils/constants/colors";

interface PillarDiagramProps {
    data: number[];
    labels: string[];
}

const WeekCard: React.FC<PillarDiagramProps> = ({ data, labels }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", height: 268 }}>
                <YAxis
                    data={data}
                    contentInset={{ top: 20, bottom: 50 }}
                    svg={{ fontSize: 10, fill: "grey" }}
                    numberOfTicks={7}
                    formatLabel={(value) => `${value}`}
                />
                <View style={{ flex: 0.9, marginLeft: 10 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        svg={{ fill: AppColors.green200 }}
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.6}
                    >
                        <Grid />
                    </BarChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: 30 }}
                        data={labels}
                        formatLabel={(value, index) => labels[index]}
                        contentInset={{ left: 19, right: 18 }}
                        svg={{ fontSize: 10, fill: AppColors.black64 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default WeekCard;

const styles = StyleSheet.create({
    textColor: {
        color: AppColors.black64,
    },
    container: {
        marginTop: 30,
        width: "100%",
        height: 264,
        backgroundColor: AppColors.blueMuted30,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
    },
});
