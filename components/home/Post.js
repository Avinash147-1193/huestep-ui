import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import PostHeader from "../post/header";
import PostImage from "../post/postMedia";
import PostReactions from "../post/postReactions";
import { Divider } from "react-native-elements";
import { GlobalColors } from "../../constants/GlobalColors";
import { POSTS } from "../../data/Posts";

const Post = ({ post, navigation }) => {
  const scrollViewRef = useRef(null);
  const [videoInView, setVideoInView] = useState(false);
  const [likesCount, setLikesCount] = useState(post.fields.likes);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const screenHeight =
      Dimensions.get("window").height - Constants.statusBarHeight;
    const isVideoInView = scrollPosition > 0 && scrollPosition < screenHeight;

    setVideoInView(isVideoInView);
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <PostImage
          post={post}
          scrollViewRef={scrollViewRef}
          videoInView={videoInView}
          setVideoInView={setVideoInView}
        />
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <PostReactions
            post={post}
            navigation={navigation}
            setLikesCount={setLikesCount}
            likesCount={likesCount}
          />
          <Likes post={post} likesCount={likesCount} />
          <Caption post={post} />
          <CommentSection post={post} />
          <Comments post={post} />
          <Divider width={1} orientation="vertical" style={styles.divider} />
        </View>
      </ScrollView>
    </View>
  );
};

const Likes = ({ post, likesCount }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: GlobalColors.text.postText, fontWeight: "600" }}>
      {likesCount} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: GlobalColors.text.postText }}>
      <Text style={{ fontWeight: 600 }}>{POSTS[0].user}</Text>
      <Text> {post.fields.text}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.fields.comments.length && (
      <Text style={{ color: GlobalColors.text.postText }}>
        View{post.fields.comments.length > 1 ? " all" : ""}{" "}
        {post.fields.comments.length}
        {post.fields.comments.length > 1 ? " comments" : " comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    <Text style={{ color: GlobalColors.text.postText }}>
      <Text style={{ fontWeight: "600" }}>{POSTS[0].comments[0].user}</Text>
      <Text>{POSTS[0].comments[0].comment}</Text>
    </Text>
  </View>
);

export default Post;

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
