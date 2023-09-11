import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { themeColor } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const registerAccount = () => {
    if (email === "" || password === "" || phoneNumber === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to continute",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancelled"),
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: () => console.log("Ok"),
            style: "destructive",
          },
        ]
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const uid = user.uid;
          setDoc(doc(db, "users", `${uid}`), {
            email: email,
            phoneNumber: phoneNumber,
          });
          Alert.alert(
            "Success",
            "Your account has been created successfully. Login to continute",
            [
              {
                text: "Ok",
                style: "cancel",
              },
            ]
          );
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage);
        });
    }
  };

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
          Signup
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "500", marginTop: 10 }}>
          Create New Account
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
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
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
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            gap: 15,
          }}
        >
          <Feather name="phone" size={24} color="black" />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
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
          onPress={registerAccount}
          style={{
            backgroundColor: themeColor.color,
            paddingHorizontal: 80,
            paddingVertical: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
            Register
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
        <Text>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text> Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
