import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../common/typography/app-text";

interface ToolCardProps {
  title: string;
  isFavourite?: boolean;
  children: ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  children,
  isFavourite,
}) => {
  return (
    <>
      <View style={styles.iconPlacement}>{children}</View>
      <AppText
        fontStyle='bodyMedium'
        colorStyle={isFavourite ? "blue100" : "white"}
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
