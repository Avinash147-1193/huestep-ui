import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-picker-select";
import BackButtonHeader from "../components/commonElements/BackButtonHeader";
import { GlobalColors } from "../constants/GlobalColors";
import { API } from "../constants/GlobalAPI";
import { Divider } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import PostReactions from "../components/post/postReactions";
import { useSelector } from "react-redux";
import axios from "axios";
import SkeletonLoader from "../components/commonElements/SkeletonLoader";
import PostImage from "../components/post/postMedia";
import moment from 'moment';


const SERVER_STATE = API.CURRENT_STATE;

const handleLike = (comment, type, handler, stateVariable, likesCount, setLikesCountHandler) => {
    if(stateVariable){
      setLikesCountHandler(likesCount - 1)
    } else{
      setLikesCountHandler(likesCount + 1)
    }
     handler(!stateVariable)
}

const CommentScreen = ({ navigation }) => {
  const [sortingOption, setSortingOption] = useState("newest");
  const [comments, setComments] = useState([]);
  const [noCommentsPost, setNoCommentsPost] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const route = useRoute();
  const { postDetails } = route.params;
  const [likesCount, setLikesCount] = useState(postDetails.fields.likes);
  const scrollViewRef = useRef(); // Ref for ScrollView
  console.log("--------printing likes----", postDetails.fields.likes);
  let colorOfBackButton = GlobalColors.buttonColor.backButtonComment;
  let colorOfLikeButton = GlobalColors.buttonColor.commentLike;
  const likeButtonIconActive =
    "https://img.icons8.com/ios/50/" +
    colorOfLikeButton +
    "/facebook-like--v1.png";
  const inputRef = useRef(null);

  

    const likeButtonIconInActive = "https://img.icons8.com/ios-filled/50/facebook-like.png";

    const fetchCommentsOnPost = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.POST.comments;
        let response = await axios.get(baseUrl, {
          params: {
            username: user.user_id,
            token: user.token,
            post: {},
            post_id: postDetails.pk,
          },
        });
        setComments(response.data.post.comments);
        if (response.data.post.comments.length === 0) setNoCommentsPost(true);
        else setNoCommentsPost(false);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchCommentsOnPost();
  }, []);

  const handleSortingChange = (item) => {
    setSortingOption(item.value);
  };

  const handlePostComment = async () => {
    Keyboard.dismiss();
    console.log(commentInput.commentInput);
    if (commentInput.commentInput) {
      try {
        let baseUrl = API[SERVER_STATE] + API.POST.comments;
        console.log(baseUrl);
        await axios.post(baseUrl, {
          username: user.user_id,
          token: user.token,
          comment: {
            user_id: user.user_id,
            post_id: postDetails.pk,
            text: commentInput.commentInput,
            tagged_users: "1, 2, 3",
            comment_image:
              "https://www.pngfind.com/pngs/m/39-398349_computer-icons-user-profile-facebook-instagram-instagram-profile.png",
            comment_video:
              "https://www.pngfind.com/pngs/m/39-398349_computer-icons-user-profile-facebook-instagram-instagram-profile.png",
          },
        });

        fetchCommentsOnPost();

        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }, 150);
        // Scroll to the end of the comment section
       
      } catch (error) {
        console.log(error);
      }
    }

    setCommentInput("");
  };
  
  if (comments.length === 0 && !noCommentsPost) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.skeletonContainer}>
          <SkeletonLoader />
          <SkeletonLoader />
        </View>
      </SafeAreaView>
    );
  } else if (noCommentsPost) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            <BackButtonHeader
              style={styles.backButton}
              navigation={navigation}
              color={colorOfBackButton}
            />
            <ScrollView
              ref={scrollViewRef}
              style={{ flex: 1, minHeight: "75%" }}
            >
              {/* Image or video from the original post */}
              <View style={styles.postMedia}>
                <PostImage post={postDetails} />
              </View>
              <Text style={styles.noCommentText}>
                Be the first to comment on this post!
              </Text>

              {/* Input box for typing a comment */}
            </ScrollView>

            <View style={styles.commentInputContainer}>
              <TextInput
                onChangeText={(commentInput) =>
                  setCommentInput({ commentInput })
                }
                placeholder="Write a comment..."
                multiline={true}
                numberOfLines={3}
                style={styles.commentInput}
                value={commentInput}
              />
              <TouchableOpacity
                onPress={handlePostComment}
                style={styles.postButton}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <BackButtonHeader
            style={styles.backButton}
            navigation={navigation}
            color={colorOfBackButton}
          />
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1, minHeight: "75%" }}
          >
            {/* Image or video from the original post */}
            <View style={styles.postMedia}>
              <PostImage post={postDetails} />
            </View>

            {/* Dropdown for comment sorting */}
            <DropDownPicker
              items={[
                { label: "Newest First", value: "newest" },
                { label: "Most Relevant", value: "relevant" },
                { label: "My Own", value: "own" },
              ]}
              defaultValue={sortingOption}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              itemStyle={styles.dropdownItem}
              labelStyle={styles.dropdownLabel}
              onChangeItem={handleSortingChange}
            />
            <View style={styles.postReactionContainer}>
              <PostReactions
                post={postDetails}
                navigation={navigation}
                setLikesCount={setLikesCount}
                likesCount={likesCount}
                style={styles.reactionButtons}
              />
            </View>
            {/* Render comments and replies */}
            {comments.map((commentInstance) => (
              <View>
                <Comment
                  key={commentInstance.pk}
                  comment={commentInstance}
                  icon={likeButtonIconActive}
                  iconInactive={likeButtonIconInActive}
                  user={user}
                  inputRef={inputRef}
                />
                <Divider
                  width={1}
                  orientation="vertical"
                  style={styles.divider}
                />
              </View>
            ))}

            {/* Input box for typing a comment */}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={(commentInput) =>
                setCommentInput({ commentInput })
              }
              placeholder="Write a comment..."
              multiline={true}
              numberOfLines={3}
              style={styles.commentInput}
              value={commentInput}
            />
            <TouchableOpacity
              onPress={handlePostComment}
              style={styles.postButton}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// Comment component
const Comment = ({ comment, icon, iconInactive, user, inputRef }) => {
  console.log("----main---", comment.fields.replies);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [fetchedReplies, setFetchedReplies] = useState([]);
  const [commentLiked, setCommentLiked] = useState(false);
  const [commentLikesCount, setCommentLikesCount] = useState(comment.fields.likes);
  const [showFullComment, setShowFullComment] = useState(false);
  const commentText = comment.fields.text;
  const truncatedComment = commentText.substring(0, 60);
  const isCommentLong = commentText.length > 60;

  let current = new Date().toISOString().slice(0, 19);

  const toggleCommentText = () => {
    setShowFullComment(!showFullComment);
  };

  const handleButtonClick = () => {
    inputRef.current.focus();
  };

  const toggleReplies = async () => {
    if (!fetchedReplies.includes(comment.pk)) {
      setFetchedReplies(comment.pk, ...fetchedReplies);
      let fetchCommentsOnPost = async () => {
        try {
          let baseUrl = API[SERVER_STATE] + API.POST.replysOnComment;
          console.log(
            "---now hitting: ",
            baseUrl,
            "----params:  ",
            user.user_id,
            user.token,
            comment.pk
          );
          let response = await axios.get(baseUrl, {
            params: {
              username: user.user_id,
              token: user.token,
              comment_id: comment.pk,
            },
          });
          console.log("----replies loading----", response.data.replies.data);
          setReplies(response.data.replies.data, ...replies);
        } catch (error) {
          console.log("---error", error);
        }
      };
      fetchCommentsOnPost();
    }

    setShowReplies(!showReplies);
  };

  const ReplyToggleView = () => {
    console.log("----Tiggle---", comment.fields.replies);
    return (
      <TouchableOpacity onPress={toggleReplies} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>
          {showReplies ? "Hide Replies" : "View Replies"}
        </Text>
      </TouchableOpacity>
    );
  };

  const NoReplyView = () => {
    console.log("----No reply,----", comment.fields.replies);
    return <Text></Text>;
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.replyReactionsContainer}>
        <Image
          source={{
            uri: "https://xsgames.co/randomusers/assets/avatars/male/74.jpg",
          }}
          style={styles.story}
        />
        <Text style={styles.commentText}>
          {showFullComment ? commentText : truncatedComment}
          {isCommentLong && (
            <Text
              style={styles.viewMoreButton}
              onPress={toggleCommentText}
            >
              {showFullComment ? " View Less" : "... View More"}
            </Text>
          )}
        </Text>
        <Text style={styles.createdAtText}>
          {moment(comment.fields.created_at).fromNow()}
        </Text>
      </View>

      {/* Render likes and reply button */}

      <View style={styles.replyReactionsContainer}>
        <Text>{commentLikesCount} Likes</Text>
        <TouchableOpacity
          onPress={() => handleLike(comment, "comment", setCommentLiked, commentLiked, commentLikesCount, setCommentLikesCount)}
          style={styles.actionButton}
        >
          <Image source={{ uri: commentLiked ? iconInactive : icon  }} style={styles.LikeButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleReplies} style={styles.actionButton}>
          {comment.fields.replies > 0 ? <ReplyToggleView /> : <NoReplyView />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleButtonClick}>
          <Text style={styles.actionButtonText}>Reply to comment</Text>
        </TouchableOpacity>
      </View>
      {/* Render replies */}
      {showReplies && (
        <View style={styles.repliesContainer}>
          {replies.map((reply) => (
            <Reply key={reply.pk} reply={reply.fields} icon={icon} iconInactive={iconInactive}/>
          ))}
        </View>
      )}
    </View>
  );
};

// Reply component
const Reply = ({ reply, icon, iconInactive }) => {
  console.log("-----inside-replies----", reply);
  const [replyLiked, setReplyLiked] = useState(false);
  const [replyLikesCount, setReplyLikesCount] = useState(reply.likes);

  return (
    <View style={styles.replyContainer}>
      <View style={styles.replyReactionsContainer}>
        <Image
          source={{
            uri: "https://xsgames.co/randomusers/assets/avatars/male/74.jpg",
          }}
          style={styles.story}
        />
        <Text style={styles.commentText}>{reply.text}</Text>
      </View>
      {/* Render likes and reply button for the reply */}
      <View style={styles.replyReactionsContainer}>
        <Text style={styles.actionButton}>{replyLikesCount} likes</Text>
        <TouchableOpacity
          onPress={() => handleLike(reply, "reply", setReplyLiked, replyLiked, replyLikesCount, setReplyLikesCount)}
          style={styles.actionButton}
        >
          <Image source={{ uri: replyLiked ? iconInactive : icon }} style={styles.LikeButton} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReply(reply)}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: GlobalColors.primary.black,
  },
  backButton: {
    marginTop: 16,
    paddingTop: 20,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  postMedia: {},
  dropdownContainer: {
    width: 150,
  },
  dropdown: {
    backgroundColor: GlobalColors.primary.black,
    borderWidth: 0,
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownLabel: {
    fontSize: 13,
    color: "#333333",
  },
  postReactionContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: GlobalColors.primary.white,
    maxHeight: 35,
  },
  reactionButtons: {
    flex: 1,
    alignContent: "space-between",
  },
  commentInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: GlobalColors.primary.black,
    maxHeight: 55,
    paddingHorizontal: 16,
  },

  commentInput: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "75%",
    height: 50,
    borderWidth: 1,
    borderColor: GlobalColors.text.postText,
    backgroundColor: GlobalColors.primary.white,
    borderRadius: 8,
    fontSize: 13,
  },
  postButton: {
    backgroundColor: GlobalColors.primary.white,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 4,
    borderColor: GlobalColors.primary.black,
  },
  postButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: GlobalColors.primary.black,
  },
  commentContainer: {
    padding: 16,
    backgroundColor: GlobalColors.primary.white,
  },
  commentText: {
    flex: 1,
    fontSize: 13,
    marginBottom: 8,
    color: GlobalColors.text.postText,
    marginLeft: 5,
    flexWrap: "wrap",
  },
  actionButton: {},
  actionButtonText: {
    marginLeft: 10,
    fontSize: 13,
    color: GlobalColors.text.postText,
    flex: 1,
    marginRight: 8,
  },
  noCommentText: {
    marginLeft: 10,
    fontSize: 17,
    color: GlobalColors.text.storyText,
    flex: 1,
    marginRight: 8,
    textAlign: "center",
  },
  repliesContainer: {
    width: "100%",
    marginTop: 8,
    marginLeft: "15%",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: GlobalColors.primary.black,
  },
  replyContainer: {
    padding: 5,
    backgroundColor: GlobalColors.primary.white,
    flex: 1,
    maxWidth: "90%",
  },
  replyText: {
    fontSize: 13,
    color: GlobalColors.text.postText,
  },
  createdAtText: {
    fontSize: 10,
    marginBottom: 8,
    color: GlobalColors.text.postText,
    flexWrap: "wrap",
  },
  LikeButton: {
    height: 20,
    width: 20,
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    marginTop: -3,
  },
  replyReactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  postArea: {
    height: 300,
    resizeMode: "cover",
  },
  story: {
    width: 35,
    height: 35,
    marginVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: GlobalColors.elements.storyBorderColor,
  },
  keyboardAvoidingView: {
    flex: 1,
    width:'100%'
  },
  skeletonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewMoreButton: {
    color: GlobalColors.text.viewMoreButton,
  },
});

export default CommentScreen;
