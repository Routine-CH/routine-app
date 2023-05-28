import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

type ButtonProps = {
    iconName: string;
};

const IconButton: React.FC<ButtonProps> = ({ iconName }) => {
    return (
        <View style={styles.button}>
            <Icon name={iconName} size={25} color={AppColors.blue100} />
        </View>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: AppColors.blueMuted30,
        justifyContent: "center",
        alignItems: "center",
    },
});
