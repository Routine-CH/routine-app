import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { UserBadge } from "../../utils/types/profile/types";

type AllBadgesViewProps = {
  profileBadges: UserBadge[] | [];
};

const windowWidth = Dimensions.get("window").width;

const AllBadgesView: React.FC<AllBadgesViewProps> = ({ profileBadges }) => {
  return profileBadges.length > 0 ? (
    <View style={styles.badgesContainer}>
      {profileBadges.map((badge) => {
        return (
          <Pressable
            key={badge.badge.id}
            style={styles.badgePressable}
            onPress={() => console.log(badge.badge.id)}
          >
            <Image
              style={styles.image}
              source={{ uri: badge.badge.imageUrl }}
            />
          </Pressable>
        );
      })}
    </View>
  ) : (
    <></>
  );
};

export default AllBadgesView;

const styles = StyleSheet.create({
  badgesContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badgePressable: {
    width: "50%",
    alignItems: "center",
  },
  image: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
  },
  badgeNotYetCollected: {
    opacity: 0.5,
  },
});
