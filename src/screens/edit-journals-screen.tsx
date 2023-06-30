import React from "react";
import { View } from "react-native";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { StatusBarColor } from "../utils/types/enums";

const EditJournalScreen = () => {
  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View>
        <AppText>Edit Journal</AppText>
      </View>
    </ScrollViewScreenWrapper>
  );
};

export default EditJournalScreen;
