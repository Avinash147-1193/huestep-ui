import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import DropDownPicker from "react-native-picker-select"; // Import DropDownPicker
import BackButtonHeader from "../components/commonElements/BackButtonHeader";
import { GlobalColors } from "../constants/GlobalColors";
import { Divider } from "react-native-elements";
// CommentSectionPage component
const CommentScreen = ({ post, navigation }) => {
  const [sortingOption, setSortingOption] = useState("newest");
  const [comment, setComment] = useState("");

  const posts = [
    {
      id: 1,
      text: "Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
      replies: [
        {
          id: 11,
          text: "Reply Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
        },
        {
          id: 12,
          text: "Reply Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
        },
      ],
    },
    {
      id: 2,
      text: "CommentTest comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
      replies: [],
    },
    {
        id: 1,
        text: "Comment djhsjldjs ndue bshyeisbnbhjdtyue bfgtgeyb Test comment one with a very long text, also there might be some media attached to this text as well. Not sure as of now. ",
        replies: [
          {
            id: 11,
            text: "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
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
        text: "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
        replies: [
          {
            id: 11,
            text: "Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is ",
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
    <View style={styles.container}>
    <ScrollView >
      <BackButtonHeader style={styles.backButton} navigation={navigation} />

      {/* Image or video from the original post */}
      <View style={styles.postMedia}>
        <Text>Original Post Image/Video</Text>
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
            <Comment key={post.id} post={post} />
            <Divider width={1} orientation="vertical" style={styles.divider} />
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
        <TouchableOpacity onPress={handlePostComment} style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Comment component
const Comment = ({ post }) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{post.text}</Text>
      {/* Render likes and reply button */}
      <TouchableOpacity
        onPress={() => handleLike(post)}
        style={styles.actionButton}
      >
        <Image source={{ uri: 'https://img.icons8.com/ios/50/000000/facebook-like--v1.png'}} />
        <Text style={styles.actionButtonText}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleReplies} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>
          {showReplies ? "Hide Replies" : "View Replies"}
        </Text>
      </TouchableOpacity>

      {/* Render replies */}
      {showReplies && (
        <View style={styles.repliesContainer}>
          {post.replies.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </View>
      )}
    </View>
  );
};

// Reply component
const Reply = ({ reply }) => {
  return (
    <View style={styles.replyContainer}>
      <Text style={styles.replyText}>{reply.text}</Text>
      {/* Render likes and reply button for the reply */}
      <TouchableOpacity
        onPress={() => handleLike(reply)}
        style={styles.actionButton}
      >
        <Text style={styles.actionButtonText}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleReply(reply)}
        style={styles.actionButton}
      >
        <Text style={styles.actionButtonText}>Reply</Text>
      </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  postMedia: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: "#e0e0e0",
  },
  dropdownContainer: {
    width: 150,
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 0,
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownLabel: {
    fontSize: 16,
    color: "#333333",
  },
  commentInputContainer: {
    position:'absolute',
    width: '100%', 
    marginTop: '210%',
    marginLeft: 14,
    flex: 1,
    flexDirection: 'row'
  },

  commentInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '75%',
    height: 85, 
    borderWidth: 1,
    borderColor: "#aaaaaa",
    backgroundColor: GlobalColors.primary.white,
    borderRadius: 8,
    fontSize: 16,
  },
  postButton: {
    backgroundColor: GlobalColors.primary.black,
    alignItems: "center",
    justifyContent: "center",
    width: '25%',
    height: 85,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalColors.primary.white,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalColors.primary.white,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalColors.primary.black,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
    color: GlobalColors.primary.white,
  },
  actionButton: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: GlobalColors.primary.white,
  },
  repliesContainer: {
    marginTop: 8,
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderColor: GlobalColors.primary.white,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  replyText: {
    fontSize: 16,
    marginRight: 8,
    color: GlobalColors.primary.white
  },
});

export default CommentScreen;
