import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const Badge = () => {
    return (
        <ScrollView horizontal>
            <View style={styles.badgesContainer}>
                <Image
                    style={[styles.image, { marginLeft: 20 }]}
                    source={require("../../assets/misc/badge.png")}
                />
                <Image
                    style={styles.image}
                    source={require("../../assets/misc/badge.png")}
                />
                <Image
                    style={styles.image}
                    source={require("../../assets/misc/badge.png")}
                />
                <Image
                    style={styles.image}
                    source={require("../../assets/misc/badge.png")}
                />
                <Image
                    style={[styles.image, { marginRight: 20 }]}
                    source={require("../../assets/misc/badge.png")}
                />
            </View>
        </ScrollView>
    );
};

export default Badge;

const styles = StyleSheet.create({
    badgesContainer: {
        flexDirection: "row",
    },
    image: {
        height: 90,
        width: 90,
        marginHorizontal: 12.5,
    },
});
