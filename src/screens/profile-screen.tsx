import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import BadgesView from "../components/profile/badges-view";
import AppColors from "../utils/constants/colors";

const ProfileScreen = () => {
    const { t } = useTranslation();

    /*     const { currentUser, loading } = useUserMe();

    useEffect(() => {
        if (!loading && currentUser) {
            console.log(currentUser);
        }
    }, [currentUser, loading]);

    if (loading) {
        console.log("Fail");
        return <AppText>Loading...</AppText>;
    } */

    return (
        <View style={styles.wrapper}>
            <ScrollView>
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
            </ScrollView>
        </View>
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
        right: 0,
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
