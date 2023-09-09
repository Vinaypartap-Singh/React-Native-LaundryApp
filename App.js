import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
import StackNavigation from "./StackNavigation";

export default function App() {
  return (
    // When ever use scrollview with safe area view always use contentInsetAdjustmetBehaviour="automatic"
    <Provider store={store}>
      <SafeAreaView style={{ backgroundColor: "#f0f0f0", flex: 1 }}>
        <StatusBar style="auto" />
        {/* <HomeScreen /> */}
        <StackNavigation />
      </SafeAreaView>
    </Provider>
  );
}
