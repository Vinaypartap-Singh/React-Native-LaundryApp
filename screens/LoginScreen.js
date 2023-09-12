import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { themeColor } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const loginUser = () => {
    if (email === "" || password === "") {
      Alert.alert("Invalid Details", "Please fill all the details to login", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          style: "default",
        },
      ]);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage, [
            {
              text: "Ok",
              style: "cancel",
            },
          ]);
        });
    }
  };
  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={25} color={themeColor.color} />
        </View>
      ) : (
        <View>
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
            <Text
              style={{ textAlign: "center", fontWeight: "500", marginTop: 10 }}
            >
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
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
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
              onPress={loginUser}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
