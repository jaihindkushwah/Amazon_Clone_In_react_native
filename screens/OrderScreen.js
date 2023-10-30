import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 1800);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <LottieView
        style={{
          width: 300,
          height: 260,
          backgroundColor: "white",
        }}
        source={require("../assets/thumbs.json")}
        autoPlay
        speed={0.7}
        loop={false}
      />
      <Text
        style={{
          fontSize: 19,
          textAlign: "center",
          marginTop: 20,
          fontWeight: "600",
        }}
      >
        Your Order has been received
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          width: 300,
          position: "absolute",
          top: 100,
          alignSelf: "center",
        }}
        autoPlay
        speed={0.7}
        loop={false}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
