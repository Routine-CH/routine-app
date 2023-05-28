import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";

const ProfileScreen = () => {
    return (
        <View style={styles.wrapper}>
            <IconButton iconName="pencil" />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 60,
        paddingHorizontal: 20,
    },
});
