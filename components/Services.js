import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

export default function Services() {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  return (
    <View style={{ padding: 10, marginTop: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        Services Available
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {services.map((data, index) => {
          return (
            <Pressable
              key={index}
              style={{
                backgroundColor: "white",
                margin: 10,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: data.image }}
                style={{ width: 70, height: 70 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                {data.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
