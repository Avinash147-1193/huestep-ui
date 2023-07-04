import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-picker-select"; // Import DropDownPicker
import BackButtonHeader from "../components/commonElements/BackButtonHeader";
import { GlobalColors } from "../constants/GlobalColors";
import { Divider } from "react-native-elements";
// CommentSectionPage component
const CommentScreen = ({ post, navigation }) => {
  const [sortingOption, setSortingOption] = useState("newest");
  const [comment, setComment] = useState("");
  let colorOfButton = GlobalColors.buttonColor.comment;
  const likeButtonIcon =
    "https://img.icons8.com/ios/50/" + colorOfButton + "/facebook-like--v1.png";

  const posts = [
    {
      id: 1,
      text:
        "Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
      replies: [
        {
          id: 11,
          text:
            "Reply Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
        },
        {
          id: 12,
          text:
            "Reply Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
        },
      ],
    },
    {
      id: 2,
      text:
        "CommentTest comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
      replies: [],
    },
    {
      id: 1,
      text:
        "Comment djhsjldjs ndue bshyeisbnbhjdtyue bfgtgeyb Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
      replies: [
        {
          id: 11,
          text:
            "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
        },
        {
          id: 12,
          text: "Reply 2",
        },
      ],
    },
    {
      id: 1,
      text: "Comment 1",
      replies: [
        {
          id: 11,
          text: "Reply 1",
        },
        {
          id: 12,
          text: "Reply 2",
        },
      ],
    },
    {
      id: 1,
      text:
        "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
      replies: [
        {
          id: 11,
          text:
            "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
        },
        {
          id: 12,
          text: "Reply 2",
        },
      ],
    },
  ];

  const handleSortingChange = (item) => {
    setSortingOption(item.value);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handlePostComment = () => {
    // Logic to post the comment
    // ...
  };

  const handleGoBack = () => {
    // Logic to navigate back
    // ...
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButtonHeader style={styles.backButton} navigation={navigation} />
        <ScrollView>
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
          {posts.map((post) => (
            <View>
              <Comment key={post.id} post={post} icon={likeButtonIcon} />
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
            value={comment}
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
  );
};

// Comment component
const Comment = ({ post, icon }) => {
  const [showReplies, setShowReplies] = useState(false);

  console.log("----likeeee1211---", icon);
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
        <Text style={styles.commentText}>{post.text}</Text>
      </View>

      {/* Render likes and reply button */}

      <View style={styles.replyReactionsContainer}>
        <TouchableOpacity
          onPress={() => handleLike(post)}
          style={styles.actionButton}
        >
          <Image source={{ uri: icon }} style={styles.LikeButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleReplies} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {showReplies ? "Hide Replies" : "View Replies"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Render replies */}
      {showReplies && (
        <View style={styles.repliesContainer}>
          {post.replies.map((reply) => (
            <Reply key={reply.id} reply={reply} icon={icon} />
          ))}
        </View>
      )}
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
          <Text style={styles.actionButtonText}>Reply</Text>
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
    backgroundColor: GlobalColors.primary.white,
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
    minHeight: 60,
    flexDirection: "row",
    backgroundColor: GlobalColors.primary.black,
    marginTop: -65,
  },

  commentInput: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "75%",
    borderWidth: 1,
    borderColor: "#aaaaaa",
    backgroundColor: GlobalColors.primary.white,
    borderRadius: 8,
    fontSize: 13,
  },
  postButton: {
    backgroundColor: GlobalColors.primary.black,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 4,
    borderColor: GlobalColors.primary.white,
  },
  postButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: GlobalColors.primary.white,
  },
  commentContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalColors.primary.black,
  },
  commentText: {
    flex: 1,
    fontSize: 13,
    marginBottom: 8,
    color: GlobalColors.primary.white,
    marginLeft: 5,
    flexWrap: "wrap",
  },
  actionButton: {},
  actionButtonText: {
    width: 110,
    marginLeft: 5,
    fontSize: 13,
    color: GlobalColors.primary.white,
    flex: 1,
  },
  repliesContainer: {
    width: "100%",
    marginTop: 8,
    marginLeft: "15%",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: GlobalColors.primary.white,
  },
  replyContainer: {
    flexDirection: "column",
    marginBottom: 8,
    flex: 1,
  },
  replyText: {
    fontSize: 13,
    marginRight: 8,
    color: GlobalColors.primary.white,
    flexWrap: "wrap",
  },
  LikeButton: {
    height: 20,
    width: 20,
    flex: 1,
    marginLeft: 3,
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
});

export default CommentScreen;
