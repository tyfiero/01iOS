import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  if (!permission) {
    // Component is waiting for permission
    return <View />;
  }

  if (!permission.granted) {
    // No permission granted, request permission
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // function toggleCameraFacing() {
  //   setFacing((current) => (current === "back" ? "front" : "back"));
  // }

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    alert(`Scanned URL: ${data}`);
    navigation.navigate("Main", { scannedData: data });
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        facing={"back"}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      >
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
          {scanned && (
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.button}
            >
              <Text style={styles.text}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
