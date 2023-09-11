import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { themeColor } from "../theme";
import { doc, getDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { width, height } = Dimensions.get("window");
  const [orderDetails, setOrderDetails] = useState(null);
  const navigation = useNavigation();
  const user = auth.currentUser;
  //   console.log(user);
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        setOrderDetails(data.orders);
      } else {
        console.log("No Document");
      }
    };

    fetchData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Email: {user.email}
          </Text>
          <TouchableOpacity
            onPress={signOutUser}
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              borderWidth: 1,
              paddingVertical: 18,
              borderRadius: 10,
              position: "absolute",
              top: 0,
              right: 20,
              borderColor: themeColor.color,
            }}
          >
            <AntDesign name="logout" size={24} color={themeColor.color} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              borderWidth: 1,
              paddingVertical: 18,
              borderRadius: 10,
              position: "absolute",
              top: 0,
              left: 20,
              borderColor: themeColor.color,
            }}
          >
            <AntDesign name="home" size={24} color={themeColor.color} />
          </TouchableOpacity>
          {orderDetails !== null ? (
            <View>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  textAlign: "left",
                  marginTop: 20,
                }}
              >
                Your Orders
              </Text>
              {typeof orderDetails === "object" ? (
                Object.keys(orderDetails).map((key, index) => {
                  const value = orderDetails[key];
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: width - 60,
                        marginTop: 20,
                        backgroundColor: "white",
                        paddingHorizontal: 20,
                        paddingVertical: 18,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={{ uri: value.image }}
                        style={{ height: 70, width: 70 }}
                      />
                      <Text
                        style={{ fontWeight: "500", fontSize: 18 }}
                      >{`${key}: ${value.name}`}</Text>
                      <View>
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>
                          Quantity: {value.quantity}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            marginTop: 10,
                            fontWeight: "500",
                          }}
                        >
                          Price: ${value.price}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text>No Orders</Text>
              )}
            </View>
          ) : (
            <View>
              <Text>No Orders</Text>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Login To View Profile
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              marginTop: 20,
              paddingHorizontal: 40,
              borderWidth: 1,
              paddingVertical: 18,
              borderRadius: 10,
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});