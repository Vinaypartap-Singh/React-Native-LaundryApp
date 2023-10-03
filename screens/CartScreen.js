import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  cleanCart,
  decreaseQuantity,
  increaseQuantity,
} from "../store/cartSlice";
import { decrementQty, increamentQty } from "../store/productSlice";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function CartScreen() {
  const route = useRoute();
  console.log(route.params);
  const user = auth.currentUser.uid;
  const addressdata = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const placeOrder = async () => {
    try {
      const docRef = doc(db, "users", `${user}`);
      const orderSnap = await getDoc(docRef);

      if (orderSnap.exists()) {
        const existingOrderDetails = orderSnap.data().orders || [];

        existingOrderDetails.push({ cart, pickUpDetails: route?.params });

        await setDoc(
          docRef,
          {
            orders: existingOrderDetails,
          },
          { merge: true }
        );

        Alert.alert(
          "Order Placed",
          "Your order has been placed successfully.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              style: "default",
            },
          ],
          { cancelable: true }
        );

        navigation.replace("Profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {total === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            paddingVertical: 50,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Your Cart is Empty
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{
                borderWidth: 1,
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 10,
                marginTop: 30,
              }}
            >
              <Text>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Your Bucket</Text>
          </View>
          <View>
            {cart.map((data, index) => {
              return (
                <View key={index} style={{ marginTop: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      paddingHorizontal: 20,
                      paddingVertical: 25,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {data.name}
                    </Text>
                    {/* Button & Quantity */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(decreaseQuantity(data));
                          dispatch(decrementQty(data));
                        }}
                        style={{
                          borderWidth: 1,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 50,
                        }}
                      >
                        <Text>-</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text>{data.quantity}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(increaseQuantity(data));
                          dispatch(increamentQty(data));
                        }}
                        style={{
                          borderWidth: 1,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 50,
                        }}
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                    {/* Total */}
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      ₹{data.price * data.quantity}
                    </Text>
                  </View>
                </View>
              );
            })}
            <View style={{ alignItems: "flex-start" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 40,
                  paddingVertical: 15,
                  borderRadius: 10,
                  marginTop: 30,
                }}
              >
                <Text style={{ textAlign: "center" }}>Shop More</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  marginTop: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Item Total</Text>
                  <Text style={{ fontSize: 16 }}> ${total} </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Delivery Fee</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fb5c63",
                      fontWeight: "bold",
                    }}
                  >
                    Free
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
                    Free Delivery on your order
                  </Text>
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderRadius: 10,
                    marginTop: 10,
                    borderColor: "lightgrey",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Selected Date</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fb5c63",
                      fontWeight: "bold",
                    }}
                  >
                    {addressdata.selectedDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Delivery Date</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fb5c63",
                      fontWeight: "bold",
                    }}
                  >
                    {addressdata.selectedDelivery}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Pickup Date</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fb5c63",
                      fontWeight: "bold",
                    }}
                  >
                    {addressdata.selectedPickupTime}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderRadius: 10,
                    borderColor: "lightgrey",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Total Amount To Pay</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fb5c63",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{total}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: "auto",
                marginTop: 20,
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={placeOrder}
                style={{
                  backgroundColor: "#fb5c63",
                  paddingHorizontal: 40,
                  paddingVertical: 15,
                  borderRadius: 10,
                  shadowColor: "red",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Place Order Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
