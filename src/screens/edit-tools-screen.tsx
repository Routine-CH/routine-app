import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import RoutineTool from "../components/card/tools/routine-tool";
import FlatButton from "../components/common/buttons/flat-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { setFavouriteToolsRequest } from "../data/edit-favourite-tools.ts/requests";
import useUserMe from "../hooks/use-user-me";
import AppColors from "../utils/constants/colors";
import { routineTools } from "../utils/utils";

const EditToolsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentUser, refetch } = useUserMe();
  const { t } = useTranslation();
  const [favouriteToolIds, setFavouriteToolIds] = useState<string[]>(
    currentUser?.userTools?.map((toolObj) => toolObj.tool.id) || []
  );
  // add state for initial favorite tool ids
  const [initialFavouriteToolIds, setInitialFavouriteToolIds] = useState<
    string[]
  >(currentUser?.userTools?.map((toolObj) => toolObj.tool.id) || []);

  // set favourite tool ids when user changes
  useEffect(() => {
    const newToolIds =
      currentUser?.userTools?.map((toolObj) => toolObj.tool.id) || [];
    setFavouriteToolIds(newToolIds);
    // set the initial favorite tool ids whenever the user changes
    setInitialFavouriteToolIds(newToolIds);
  }, [currentUser]);

  // refetching of data when changing tabs, so that favourite tools are updated
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // compare initialFavouriteToolIds with favouriteToolIds to determine if array has changed
  const arrayHasChanged =
    JSON.stringify(initialFavouriteToolIds) !==
    JSON.stringify(favouriteToolIds);

  const handleToolPress = (tool: any) => {
    setFavouriteToolIds((prevFavouriteIds) => {
      if (prevFavouriteIds.includes(tool.id)) {
        return prevFavouriteIds.filter((id) => id !== tool.id);
      } else {
        const newFavouriteIds = [...prevFavouriteIds, tool.id];
        return newFavouriteIds;
      }
    });
  };

  const handleChangeFavTools = async (favouriteToolIds: string[]) => {
    const response = await setFavouriteToolsRequest({
      favouriteToolsId: favouriteToolIds,
      currentUserId: currentUser?.id,
    });

    if (response?.success) {
      navigation.goBack();
    }
  };

  return currentUser ? (
    <ScrollViewScreenWrapper defaultPadding>
      <AppText fontStyle='heading3' colorStyle='black64'>
        {t("my-day.choose-your")}
      </AppText>
      <AppText fontStyle='heading3' colorStyle='black64'>
        {t("my-day.favourite-tools")}
      </AppText>
      <View style={styles.innerContainer}>
        {routineTools.map((tool) => {
          const isFavourite = favouriteToolIds.includes(tool.id);
          const IconComponent = isFavourite
            ? tool.favIconComponent
            : tool.IconComponent;
          return (
            <RoutineTool
              key={tool.titleKey}
              title={t(tool.titleKey)}
              isFavourite={isFavourite}
              favouriteOnPress={() => handleToolPress(tool)}
            >
              <IconComponent />
            </RoutineTool>
          );
        })}
      </View>
      {arrayHasChanged ? (
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='white'
          buttonStyle={styles.saveButton}
          onPress={() => {
            handleChangeFavTools(favouriteToolIds);
          }}
        >
          {t("general.save")}
        </FlatButton>
      ) : (
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='white'
          buttonStyle={styles.goBackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {t("general.back")}
        </FlatButton>
      )}
    </ScrollViewScreenWrapper>
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
    marginTop: 35,
  },
  saveButton: {
    backgroundColor: AppColors.blue100,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 13,
    marginVertical: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  goBackButton: {
    backgroundColor: AppColors.red,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 13,
    marginVertical: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
