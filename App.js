import { StatusBar } from "expo-status-bar";
import {
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import StackNavigation from "./StackNavigation";

export default function App() {
  const { StatusBarManager } = NativeModules;
  return (
    // When ever use scrollview with safe area view always use contentInsetAdjustmetBehaviour="automatic"
    <Provider store={store}>
      <SafeAreaView
        style={{
          backgroundColor: "#f0f0f0",
          flex: 1,
          marginTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        }}
      >
        <StatusBar style="auto" />
        {/* <HomeScreen /> */}
        <StackNavigation />
      </SafeAreaView>
    </Provider>
  );
}
