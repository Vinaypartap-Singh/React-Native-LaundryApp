import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Hero() {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Image
        style={{ borderRadius: 10, width: "100%", objectFit: "cover" }}
        height={250}
        resizeMode="cover"
        source={require("../assets/images/heroImage.jpeg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
