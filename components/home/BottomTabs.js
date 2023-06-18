import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { GlobalColors } from "../../constants/GlobalColors";

export const bottomTabIcon = [
  {
    name: "Home",
    inactive: "https://img.icons8.com/windows/32/FFFFFF/home.png",
    active: "https://img.icons8.com/material-rounded/24/FFFFFF/home.png",
  },
  {
    name: "Search",
    inactive: "https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png",
    active:
      "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/FFFFFF/external-search-social-media-ui-tanah-basah-glyph-tanah-basah.png",
  },
  {
    name: "Reels",
    inactive: "https://img.icons8.com/ios/50/FFFFFF/instagram-reel.png",
    active: "https://img.icons8.com/ios-filled/50/FFFFFF/instagram-reel.png",
  },
  {
    name: "Shop",
    inactive:
      "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/FFFFFF/external-avatar-user-interface-anggara-basic-outline-anggara-putra.png",
    active:
      "https://img.icons8.com/external-anggara-glyph-anggara-putra/32/FFFFFF/external-avatar-interface-anggara-glyph-anggara-putra.png",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image source={{ uri: activeTab == icon.name ? icon.active : icon.inactive }} style={styles.icon} />
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
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 65,
    zIndex: 999,
    backgroundColor: GlobalColors.primary.black,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
