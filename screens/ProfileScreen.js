import {
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const fetchData = async () => {
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        setOrderDetails(data.orders);
        setLoading(false);
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
              {typeof orderDetails === "object" ? (
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 20,
                    textAlign: "left",
                    marginTop: 20,
                  }}
                >
                  Your Order
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 20,
                    textAlign: "left",
                    marginTop: 20,
                  }}
                >
                  No Order(s) Found
                </Text>
              )}

              {typeof orderDetails === "object" ? (
                Object.keys(orderDetails).map((key, index) => {
                  const value = orderDetails[key];
                  return value.cart?.map((data, index) => {
                    return (
                      <View
                        key={(index += 1)}
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
                          source={{ uri: data.image }}
                          style={{ height: 70, width: 70 }}
                        />
                        <Text
                          style={{ fontWeight: "500", fontSize: 18 }}
                        >{`${data.name}`}</Text>
                        <View>
                          <Text style={{ fontSize: 18, fontWeight: "500" }}>
                            Quantity: {data.quantity}
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              marginTop: 10,
                              fontWeight: "500",
                            }}
                          >
                            Price: ₹{data.price}
                          </Text>
                        </View>
                      </View>
                    );
                  });
                })
              ) : (
                <View>
                  {typeof orderDetails === "object" ? (
                    <ActivityIndicator
                      size={"large"}
                      color={themeColor.color}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigation.replace("Home")}
                      style={{
                        borderWidth: 1,
                        marginVertical: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        backgroundColor: themeColor.color,
                        borderColor: themeColor.color,
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontWeight: 600 }}>
                        Order Now
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              {loading ? (
                <View style={{ marginTop: 20 }}>
                  <ActivityIndicator size={"large"} color={themeColor.color} />
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 18 }}>No Order(s) Found</Text>
                </View>
              )}
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
