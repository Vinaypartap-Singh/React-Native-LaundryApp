import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Hero() {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Image
        style={{ borderRadius: 10 }}
        height={250}
        source={{
          uri: "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
