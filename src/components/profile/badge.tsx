import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { UserBadge } from "../../utils/types/profile/types";
import AppText from "../common/typography/app-text";

type BadgeProps = {
  badges: UserBadge[];
};

const windowWidth = Dimensions.get("window").width;

const Badge: React.FC<BadgeProps> = ({ badges }) => {
  return badges.length > 0 ? (
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
  ) : (
    <View style={styles.noBadgesContainer}>
      <AppText fontStyle='bodyMedium' colorStyle='black60'>
        Noch keine Badges erhalten
      </AppText>
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
  noBadgesContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
  },
});
