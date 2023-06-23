import React from "react";
import { Image, StyleSheet, View } from "react-native";

const AllBadgesView = () => {
  return (
    <View style={styles.badgesContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/misc/badge.png")}
      />
      <Image
        style={styles.image}
        source={require("../../assets/misc/badge.png")}
      />
      <Image
        style={[styles.image, styles.badgeNotYetCollected]}
        source={require("../../assets/misc/badge.png")}
      />
      <Image
        style={[styles.image, styles.badgeNotYetCollected]}
        source={require("../../assets/misc/badge.png")}
      />
      <Image
        style={[styles.image, styles.badgeNotYetCollected]}
        source={require("../../assets/misc/badge.png")}
      />
      <Image
        style={[styles.image, styles.badgeNotYetCollected]}
        source={require("../../assets/misc/badge.png")}
      />
    </View>
  );
};

export default AllBadgesView;

const styles = StyleSheet.create({
  badgesContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 15,
  },
  image: {
    height: 90,
    width: 90,
  },
  badgeNotYetCollected: {
    opacity: 0.5,
  },
});
