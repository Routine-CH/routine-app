import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { UserBadge } from "../../utils/types/profile/types";

type BadgeProps = {
  badges: UserBadge[];
};

const Badge: React.FC<BadgeProps> = ({ badges }) => {
  return (
    <View style={styles.badgesContainer}>
      {badges.slice(0, 3).map((badge) => {
        return (
          <Image
            key={badge.badge.id}
            style={[styles.image]}
            source={{ uri: badge.badge.imageUrl }}
          />
        );
      })}
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badgesContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 15,
    justifyContent: "space-around",
  },
  image: {
    height: 130,
    width: 130,
  },
});
