import React, {useState, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { API } from "../../constants/GlobalAPI";
import axios from "axios";
const SERVER_STATE = API.CURRENT_STATE;

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/ios/50/000000/facebook-like--v1.png",
    likedImageUrl: "https://img.icons8.com/ios-filled/50/facebook-like.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/ios/50/comments--v1.png",
  },
  {
    name: "Share",
    imageUrl: "https://img.icons8.com/ios/50/right2.png",
  },
  {
    name: "Save",
    imageUrl: "https://img.icons8.com/ios/50/add-bookmark.png",
  },
];

// user_liked_posts is available in redux, have to import it to pass it from component.

const PostReactions = ({ post, navigation }) => {
  const { user_liked_posts, user } = useSelector((state) => state.userReducer);
  const [like, setLike] = useState("");
  const [likesCount, setLikesCount] = useState("");

  useEffect(() => {
    setLikesCount(post.fields.likes);
    if (user_liked_posts.indexOf(post.pk) >= 0) {
      setLike(1);
    } else {
      setLike(0);
    }
  }, [user_liked_posts, post.pk]);

  const HandleLike = (post) => {
    like == 0 ? setLikesCount(likesCount + 1) : setLikesCount(likesCount - 1);
    setLike(!like);

    try {
      let baseUrl = API[SERVER_STATE] + API.USER.postLike;
      const response = axios.post(baseUrl, {
        username: user.user_id,
        token: user.token,
        post: { post_id: post.pk },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.leftFooterIconsContainer}>
        <Icon
          imageStyle={styles.footerIcon}
          onPress={() => HandleLike(post)}
          imgUrl={
            like == 1
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl
          }
        />
        <Icon
          imageStyle={styles.footerIcon}
          onPress={() =>
            navigation.push("CommentScreen", { postDetails: post })
          }
          imgUrl={postFooterIcons[1].imageUrl}
        />
        <Icon
          imageStyle={styles.footerIcon}
          onPress={() => console.log("-------share-------")}
          imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Icon
          imageStyle={styles.footerIcon}
          onPress={() => console.log("-------save-------")}
          imgUrl={postFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  );
};

const Icon = ({ imageStyle, imgUrl, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={imageStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);



export default PostReactions;

const styles = StyleSheet.create({
  footerIcon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
