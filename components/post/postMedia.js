import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Video } from "expo-av";

const PostImage = ({
  post,
  scrollViewRef = "",
  videoInView = "",
  setVideoInView = "",
}) => {
  const postImages = post.fields.post_images;

  const handlePlaybackStatusUpdate = (status) => {
    const { isPlaying, positionMillis, durationMillis } = status;
    const isVideoInView = isPlaying && positionMillis < durationMillis / 2;
    setVideoInView(isVideoInView);
  };

  if (postImages.endsWith(".mp4")) {
    if (videoInView != "" && setVideoInView != "") {
      return (
        <View
          style={{
            width: "100%",
            height: 450,
          }}
        >
          <Video
            source={{ uri: postImages }}
            style={{ height: "100%", resizeMode: "cover" }}
            useNativeControls
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            height: 450,
          }}
        >
          <Video
            source={{ uri: postImages }}
            style={{ height: "100%", resizeMode: "cover" }}
            shouldPlay={videoInView}
            useNativeControls
          />
        </View>
      );
    }
  } else {
    return (
      <View
        style={{
          width: "100%",
          height: 450,
        }}
      >
        <Image
          source={{ uri: postImages }}
          style={{ height: "100%", resizeMode: "cover" }}
        />
      </View>
    ); // Handle other file types or unsupported formats
  }
};

export default PostImage;
