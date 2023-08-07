import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { UserBadge } from "../../utils/types/profile/types";
import { AuthenticatedStackParamList } from "../../utils/types/routes/types";

type AllBadgesViewProps = {
  profileBadges: UserBadge[] | [];
};

const windowWidth = Dimensions.get("window").width;

const AllBadgesView: React.FC<AllBadgesViewProps> = ({ profileBadges }) => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const navigateToBadgesDetailView = (id: string) => {
    navigation.navigate("SubRoutes", {
      screen: "ProfileBadgesDetailView",
      params: { id: id },
    });
  };

  return profileBadges.length > 0 ? (
    <View style={styles.badgesContainer}>
      {profileBadges.map((badge) => {
        return (
          <Pressable
            key={badge.badge.id}
            style={styles.badgePressable}
            onPress={() => navigateToBadgesDetailView(badge.badge.id)}
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
    position: "relative",
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
