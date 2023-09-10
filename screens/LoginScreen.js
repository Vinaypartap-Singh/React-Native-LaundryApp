import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { themeColor } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ marginTop: 200 }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: themeColor.color,
            fontSize: 25,
          }}
        >
          Login
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "500", marginTop: 10 }}>
          Sign In to your account
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            gap: 15,
          }}
        >
          <AntDesign name="mail" size={24} color={"black"} />
          <TextInput
            placeholder="Email"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
              width: "85%",
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            gap: 15,
          }}
        >
          <AntDesign name="key" size={24} color="black" />
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
              width: "85%",
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: themeColor.color,
            paddingHorizontal: 80,
            paddingVertical: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text> Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
