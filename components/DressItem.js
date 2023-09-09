import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../store/cartSlice";
import { decrementQty, increamentQty } from "../store/productSlice";

export default function DressItem({ data }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  function addItemToCart() {
    dispatch(addToCart(data)); // Add Item to cart
    dispatch(increamentQty(data)); // Increment Product Quantity
    console.log(cartItems);
  }

  return (
    <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <View>
          <Image
            source={{ uri: data.image }}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data.name}</Text>
          <Text style={{ fontWeight: "bold" }}>$ {data.price}</Text>
        </View>

        {cartItems.some((c) => c.id === data.id) ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => addItemToCart()}
              style={{
                borderWidth: 1,
                paddingHorizontal: 13,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
