import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DressItem from "../components/DressItem";
import { themeColor } from "../theme";
import { Entypo } from "@expo/vector-icons";

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const products = route?.params.product;
  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <ScrollView
      automaticallyAdjustContentInsets
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={{ marginHorizontal: 20, marginBottom: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-small-left" size={30} color="black" />
      </TouchableOpacity>
      <View
        style={{
          marginHorizontal: 20,
          borderWidth: 1,
          paddingVertical: 15,
          borderRadius: 10,
          paddingHorizontal: 10,
          borderColor: "gray",
        }}
      >
        <TextInput
          onChangeText={(text) => setSearchInput(text)}
          placeholder="Search Here"
          placeholderTextColor={"black"}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {filteredProducts.map((data, index) => {
        return <DressItem data={data} key={index} />;
      })}
    </ScrollView>
  );
}
