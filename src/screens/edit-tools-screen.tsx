import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import RoutineTool from "../components/card/tools/routine-tool";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import useUserMe from "../hooks/use-user-me";
import { routineTools } from "../utils/utils";

const EditToolsScreen: React.FC = () => {
  const { currentUser } = useUserMe();
  const { t } = useTranslation();
  const [favouriteTools, setFavouriteTools] = useState(
    currentUser?.userTools || []
  );

  useEffect(() => {
    setFavouriteTools(currentUser?.userTools || []);
  }, [currentUser]);

  const handleToolPress = (tool: any) => {
    setFavouriteTools((prevFavourites) => {
      if (prevFavourites.includes(tool)) {
        // remove tool from favorites
        return prevFavourites.filter((t) => t.tool.id !== tool.id);
      } else {
        // add tool to favorites
        return [...prevFavourites, tool];
      }
    });
  };

  return currentUser ? (
    <ScreenWrapper defaultPadding>
      <AppText fontStyle='heading3' colorStyle='black64'>
        Wähle deine
      </AppText>
      <AppText fontStyle='heading3' colorStyle='black64'>
        Lieblings-Tools an
      </AppText>
      <BackButton />
      <View style={styles.innerContainer}>
        {routineTools.map((tool) => {
          const isFavourite = favouriteTools.some(
            (favourite) => favourite.tool.id === tool.id
          );
          const IconComponent = isFavourite
            ? tool.favIconComponent
            : tool.IconComponent;
          return (
            <RoutineTool
              key={tool.titleKey}
              title={t(tool.titleKey)}
              isFavourite={favouriteTools.some(
                (favourite) => favourite.tool.id === tool.id
              )}
              favouriteOnPress={() => handleToolPress(tool)}
            >
              <IconComponent />
            </RoutineTool>
          );
        })}
      </View>
    </ScreenWrapper>
  ) : (
    <Text>Loading...</Text>
  );
};

export default EditToolsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
