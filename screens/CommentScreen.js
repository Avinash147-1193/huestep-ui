import React, { useState, useEffect, useLayoutEffect } from "react";
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
} from "react-native";
import DropDownPicker from "react-native-picker-select"; // Import DropDownPicker
import BackButtonHeader from "../components/commonElements/BackButtonHeader";
import { GlobalColors } from "../constants/GlobalColors";
import { API } from "../constants/GlobalAPI"
import { Divider } from "react-native-elements";
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from "axios";
import SkeletonLoader from "../components/commonElements/SkeletonLoader";

const SERVER_STATE = API.CURRENT_STATE;
// CommentSectionPage component
const CommentScreen = ({ navigation }) => {
  const [sortingOption, setSortingOption] = useState("newest");
  const [comments, setComment] = useState([]);
  
  const { user } = useSelector(state => state.userReducer);
  const route = useRoute();
  const { postDetails } = route.params;
  console.log('-----post passed data---------',postDetails);
  
  let colorOfBackButton = GlobalColors.buttonColor.backButtonComment;
  let colorOfLikeButton = GlobalColors.buttonColor.commentLike;
  const likeButtonIcon =
    "https://img.icons8.com/ios/50/" + colorOfLikeButton + "/facebook-like--v1.png";

  // const posts = [
  //   {
  //     id: 1,
  //     text:
  //       "Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
  //     replies: [
  //       {
  //         id: 11,
  //         text:
  //           "Reply Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
  //       },
  //       {
  //         id: 12,
  //         text:
  //           "Reply Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     text:
  //       "CommentTest comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
  //     replies: [],
  //   },
  //   {
  //     id: 1,
  //     text:
  //       "Comment djhsjldjs ndue bshyeisbnbhjdtyue bfgtgeyb Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
  //     replies: [
  //       {
  //         id: 11,
  //         text:
  //           "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
  //       },
  //       {
  //         id: 12,
  //         text: "Reply 2",
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     text: "Comment 1",
  //     replies: [
  //       {
  //         id: 11,
  //         text: "Reply 1",
  //       },
  //       {
  //         id: 12,
  //         text: "Reply 2",
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     text:
  //       "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
  //     replies: [
  //       {
  //         id: 11,
  //         text:
  //           "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
  //       },
  //       {
  //         id: 12,
  //         text: "Reply 2",
  //       },
  //     ],
  //   },
  // ];

  useLayoutEffect(() => {
    let fetchCommentsOnPost = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.POST.comments;
        let response = await axios.get(baseUrl, {
          params: {
            username: user.user_id,
            token: user.token,
            post: { },
            post_id: postDetails.pk,
          },
        });
        setComment(response.data.post.comments)
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsOnPost()
  }, []);

  const handleSortingChange = (item) => {
    setSortingOption(item.value);
  };

  const handleCommentChange = (text) => {
    // setComment(text);
  };

  const handlePostComment = () => {
    // Logic to post the comment
    // ...
  };

  const handleGoBack = () => {
    // Logic to navigate back
    // ...
  };
  
  if(comments.length === 0 ){
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.skeletonContainer}>
        <SkeletonLoader />
        <SkeletonLoader />
      </View>
      </SafeAreaView>
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}>
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <BackButtonHeader style={styles.backButton} navigation={navigation} color={colorOfBackButton} />
        <ScrollView style={{ flex: 1 , minHeight: '75%'}}>
          {/* Image or video from the original post */}
          <View style={styles.postMedia}>
            <Image
              source={{
                uri:
                  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
              }}
              style={styles.postArea}
            />
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

          {/* Render comments and replies */}
          {comments.map((commentInstance) => (
            <View>
              <Comment key={commentInstance.pk} comment={commentInstance} icon={likeButtonIcon} />
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
            value={comments}
            onChangeText={handleCommentChange}
            placeholder="Write a comment..."
            multiline={true}
            numberOfLines={3}
            style={styles.commentInput}
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
const Comment = ({ comment, icon }) => {
  const [showReplies, setShowReplies] = useState(false);
  const toggleReplies = () => {
    setShowReplies(!showReplies);
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
        <Text style={styles.commentText}>{comment.fields.text}</Text>
      </View>

      {/* Render likes and reply button */}

      <View style={styles.replyReactionsContainer}>
        <Text >
          {comment.fields.likes} Likes
        </Text>
        <TouchableOpacity
          onPress={() => handleLike(comment)}
          style={styles.actionButton}
        >
          <Image source={{ uri: icon }} style={styles.LikeButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleReplies} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {showReplies ? "Hide Replies" : "View Replies"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
          Reply to comment
          </Text>
        </TouchableOpacity>
      </View>
      {/* Render replies */}
      {/* {showReplies && (
        <View style={styles.repliesContainer}>
          {comment.map((reply) => (
            <Reply key={reply.id} reply={reply} icon={icon} />
          ))}
        </View>
      )} */}
    </View>
  );
};

// Reply component
const Reply = ({ reply, icon }) => {
  return (
    <View style={styles.replyContainer}>
      <Text style={styles.replyText}>{reply.text}</Text>
      {/* Render likes and reply button for the reply */}
      <View style={styles.replyReactionsContainer}>
        <TouchableOpacity
          onPress={() => handleLike(reply)}
          style={styles.actionButton}
        >
          <Image source={{ uri: icon }} style={styles.LikeButton} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReply(reply)}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Reply to comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  commentInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: GlobalColors.primary.black,
    maxHeight: 55,
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
  repliesContainer: {
    width: "100%",
    marginTop: 8,
    marginLeft: "15%",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: GlobalColors.primary.black,
  },
  replyContainer: {
    flexDirection: "column",
    marginBottom: 8,
    flex: 1,
  },
  replyText: {
    fontSize: 13,
    marginRight: 8,
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
  },
  skeletonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentScreen;
