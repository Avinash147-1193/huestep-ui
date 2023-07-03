import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { GlobalColors } from "../../constants/GlobalColors";

const height = Platform.OS === "android" ? 50 : 65;

export const bottomTabIcon = [
  {
    name: "Home",
    inactive: "https://img.icons8.com/material-outlined/100/home--v2.png",
    active: "https://img.icons8.com/ios-filled/100/home.png",
  },
  {
    name: "Search",
    inactive: "https://img.icons8.com/material-outlined/100/search--v1.png",
    active: "https://img.icons8.com/ios-filled/100/search--v1.png",
  },
  {
    name: "Reels",
    inactive: "https://img.icons8.com/material-outlined/100/lawyer.png",
    active: "https://img.icons8.com/material/100/lawyer.png",
  },
  {
    name: "Shop",
    inactive:
      "https://img.icons8.com/material-outlined/100/user-male-circle.png",
    active: "https://img.icons8.com/ios-filled/100/user-male-circle.png",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab == icon.name ? icon.active : icon.inactive }}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: height,
    zIndex: 999,
    backgroundColor: GlobalColors.primary.black,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    marginTop: 5,
  },
  icon: {
    width: 27,
    height: 27,
  },
});
