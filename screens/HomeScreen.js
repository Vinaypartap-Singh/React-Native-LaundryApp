import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Hero from "../components/Hero";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/productSlice";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  // console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Loading");
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        //title
        "Location service not enabled",
        //body
        "Please Enable location service to procees",
        [
          { text: "Yes", onPress: () => console.log("Yes Pressed") },
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } else {
      setLocationServiceEnabled(true);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response);

      for (let item of response) {
        let address = `${item.region} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = () => {
      dressServices.map((service) => dispatch(getProducts(service)));
    };

    fetchProducts();
  }, []);

  // console.log(product);

  // DressItem Services

  const dressServices = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "Shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "Dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "Jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "Shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/* Location and Header Profile Icon */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="location-on" size={30} color="#fb5c63" />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Hello</Text>
              <Text>{displayCurrentAddress}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              width={50}
              height={50}
              style={{ borderRadius: 50 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo",
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Search Bar  */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 15,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            justifyContent: "space-between",
            borderColor: "#C0C0C0",
          }}
        >
          <TextInput
            placeholder="Search for Items or More"
            style={{ fontSize: 18 }}
          />
          <Feather name={"search"} size={28} color={"#fb5c63"} />
        </View>
        {/* Hero Image Component */}
        <Hero />
        {/* Services Component */}
        <Services />
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
                  {cart.length} Items | ₹{total}
                </Text>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
                >
                  extra charges might apply
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("Pickup")}>
                  <Text>Proceed to Pickup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {product.map((data, index) => {
          return <DressItem data={data} key={index} />;
        })}
      </ScrollView>
    </>
  );
}
