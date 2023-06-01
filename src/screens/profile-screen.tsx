import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import Badge from "../components/profile/badge";
import BadgesView from "../components/profile/badges-view";
import WeekView from "../components/profile/week-view";
import YearCard from "../components/profile/year-card";
import AppColors from "../utils/constants/colors";

const ProfileScreen = () => {
    const { t } = useTranslation();

    //     const currentUser = useUserMe();
    //     console.log(currentUser);

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <View style={styles.iconContainer}>
                    <IconButton iconName="pencil" />
                </View>
                {/*       <View style={styles.userInformation}>
                <Image
                    source={require("../assets/misc/stones.jpg")}
                    style={styles.profilePicture}
                />
                {currentUser ? (
                    <AppText>Hi, {currentUser.username}</AppText>
                ) : (
                    <AppText>No User Data</AppText>
                )}
            </View> */}
                <View style={styles.userInformation}>
                    <Image
                        source={require("../assets/misc/stones.jpg")}
                        style={styles.profilePicture}
                    />
                    <AppText
                        fontStyle="bodyMedium"
                        style={[styles.textColor, { marginBottom: 10 }]}
                    >
                        {t("profile.hi")} Alex 😄
                    </AppText>
                    <AppText fontStyle="body" style={styles.textColor}>
                        {t("profile.since")} Juni 2023 {t("profile.here")}
                    </AppText>
                </View>
                <AchievementCard />
                <BadgesView />
            </View>
            <Badge />
            <View style={styles.wrapper}>
                <YearCard />
            </View>
            <WeekView />
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    iconContainer: {
        position: "absolute",
        right: 20,
        top: 60,
    },
    userInformation: {
        alignItems: "center",
    },
    textColor: {
        color: AppColors.black64,
    },
    profilePicture: {
        height: 125,
        width: 125,
        borderRadius: 100,
        marginBottom: 30,
    },
});
