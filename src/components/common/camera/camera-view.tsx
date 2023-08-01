import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType, PermissionStatus } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../../../store/camera-image-store";
import CameraBackButton from "./camera-back-button";
import CaptureButton from "./capture-button";

export const CameraView: React.FC = () => {
  const [type, _] = useState(CameraType.back);
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const addImage = useStore((state) => state.addImage);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (permission !== PermissionStatus.GRANTED) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status);
      }
    })();
  }, [permission]);

  if (permission === PermissionStatus.UNDETERMINED) {
    return <View />;
  }

  if (permission === PermissionStatus.DENIED) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      await cameraRef.current
        .takePictureAsync(options)
        .then((data) => addImage(data.uri))
        .finally(() => navigation.goBack());
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <CameraBackButton />
        <CaptureButton onPress={takePicture} />
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    position: "relative",
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
