import { View } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import AppColors from "../../utils/constants/colors";

interface PillarDiagramProps {
  data: number[];
  labels: string[];
  color: string[];
}

const WeekCard: React.FC<PillarDiagramProps> = ({ data, labels, color }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 268,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 0.07,
          marginRight: 2,
        }}
      >
        <YAxis
          data={data}
          contentInset={{ top: 20, bottom: 50 }}
          svg={{ fontSize: 18, fill: AppColors.black64 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />
      </View>
      <View style={{ flex: 0.8 }}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          svg={{ fill: `${color}` }}
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
          svg={{
            fontSize: 18,
            fill: AppColors.black64,
          }}
        />
      </View>
    </View>
  );
};

export default WeekCard;
