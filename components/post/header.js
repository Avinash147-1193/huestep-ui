import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { GlobalColors } from "../../constants/GlobalColors";

const PostHeader = ({ post }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: post.fields.profile_picture }}
          style={styles.story}
        />
        <Text
          style={{
            color: GlobalColors.text.postText,
            marginLeft: 5,
            fontWeight: "700",
          }}
        >
          {post.fields.username}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={{ color: GlobalColors.text.postText, fontWeight: "900" }}>
          ...
        </Text>
      </TouchableOpacity>
    </View>
  );

  export default PostHeader;

  const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 10,
        borderWidth: 1.5,
        borderColor: GlobalColors.elements.storyBorderColor,
      },
  });
