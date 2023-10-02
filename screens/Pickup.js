import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Pickup() {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("2023-09-9");
  const [selectedPickupTime, setSelectedPickupTime] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const proceedToCart = () => {
    if (!address || !selectedDate || !selectedPickupTime || !selectedDelivery) {
      Alert.alert(
        "Empty Fields",
        "Please Select All The Fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: () => console.log("Pressed To Continue"),
          },
        ],
        { cancelable: true }
      );
    }

    if (address && selectedDate && selectedPickupTime && selectedDelivery) {
      navigation.navigate("Cart", {
        selectedDate: selectedDate.toString(),
        selectedDelivery: selectedDelivery,
        selectedPickupTime: selectedPickupTime,
        address: address,
      });
    }
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20 }}
      >
        <View>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Enter Your Address
          </Text>
          <TextInput
            autoCorrect={false}
            onChangeText={(e) => setAddress(e)}
            style={{
              borderWidth: 1,
              height: 100,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderColor: "gray",
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>Pickup Date</Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date("2023-09-9")}
            endDate={new Date("2023-9-31")}
            initialSelectedDate={new Date("2023-09-9")}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>Pickup Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {times.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPickupTime(data.time)}
                  style={
                    selectedPickupTime.includes(data.time)
                      ? {
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderWidth: 1,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          borderRadius: 10,
                          borderColor: "red",
                        }
                      : {
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderWidth: 1,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          borderRadius: 10,
                          borderColor: "gray",
                        }
                  }
                >
                  <Text>{data.time}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>Delivery Time</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {deliveryTime.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDelivery(data.name)}
                  style={
                    selectedDelivery.includes(data.name)
                      ? {
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderWidth: 1,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          borderRadius: 10,
                          borderColor: "red",
                        }
                      : {
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderWidth: 1,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          borderRadius: 10,
                          borderColor: "gray",
                        }
                  }
                >
                  <Text>{data.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      {total === 0 ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{
            backgroundColor: "#088f8f",
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <View>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                {cart.length} Item(s) | ₹{total}
              </Text>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
              >
                extra charges might apply
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={proceedToCart}>
                <Text>Proceed to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
