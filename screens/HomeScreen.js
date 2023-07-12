import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Animated, Platform, Dimensions  } from 'react-native';
import Header from '../components/home/Header';
import { GlobalColors } from '../constants/GlobalColors';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import BottomTabs, { bottomTabIcon } from '../components/home/BottomTabs';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUserProfile, setAuthUserPost, setAuthUserLikedPost } from '../redux/actions';
import { API } from '../constants/GlobalAPI';
import axios from 'axios';
import { Divider } from "react-native-elements";
import SkeletonLoader from '../components/commonElements/SkeletonLoader';

const SERVER_STATE = API.CURRENT_STATE;
const HEADER_HEIGHT = 50; // Customize the header height here
const marginTop = Platform.OS === 'android' ? 19 : 0;

const HomeScreen = ({ navigation }) => {
  const { user_profile } = useSelector(state => state.userReducer);
  const { user_post } = useSelector(state => state.userReducer);
  const { user_liked_posts } = useSelector(state => state.userReducer);
  const { user } = useSelector(state => state.userReducer);
  const [videoInView, setVideoInView] = useState(false);

  const authToken = user.token;
  const username = user.user_id;
  const dispatch = useDispatch();
  const scrollY = new Animated.Value(0);
  const headerOpacity = new Animated.Value(1);
  const headerContainerRef = useRef(null);

  useEffect(() => {
    let fetchUserProfile = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.USER.profile;
        console.log(baseUrl)
        let response = await axios.post(baseUrl, {
          username: username,
          token: authToken,
        });
        dispatch(setAuthUserProfile(response.data))
      } catch (error) {
        console.log(`failed url: ${baseUrl}`,error);
      }
    };

    let fetchUserPosts = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.USER.post;
        let response2 = await axios.get(baseUrl, {
          params: {
            username: username,
            token: authToken,
            post: {}
          },
        });
        dispatch(setAuthUserPost(response2.data.post.data));
      } catch (error) {
        console.log(`failed url: ${baseUrl}`,error);
      }
    };

    let fetchUserLikedPosts = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.USER.postLike;
        let response3 = await axios.get(baseUrl, {
          params: {
            username: username,
            token: authToken,
          },
        });
        if (response3.data.post.data.length > 0) {
          let user_liked_post_temp = Object.values(response3.data.post.data).map(item => item.fields.post)
          dispatch(setAuthUserLikedPost(user_liked_post_temp))
        } else {
          dispatch(setAuthUserLikedPost([]))
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
    fetchUserLikedPosts();
  }, []);

  const posts = Object.values(user_post).map(item => item);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const screenHeight = Dimensions.get('window').height;
  
    if (scrollPosition > 0 && scrollPosition < screenHeight) {
      setVideoInView(true);
    } else {
      setVideoInView(false);
    }
  };
  

  if (!user_post || user_post.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.skeletonContainer}>
          <SkeletonLoader />
          <SkeletonLoader />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        ref={headerContainerRef}
        style={[
          styles.headerContainer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_HEIGHT],
                  outputRange: [0, -HEADER_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
            opacity: headerOpacity,
          },
        ]}
      >
        <Header navigation={navigation} />
        <Divider width={1} orientation="vertical" />
      </Animated.View>
      <View style={styles.postContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {posts.map((post, index) => (
            <View key={index}>
              <Post post={post} navigation={navigation} videoInView={videoInView} />
            </View>
          ))}
        </ScrollView>
      </View>
      <BottomTabs icons={bottomTabIcon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primary.black,
    flex: 1,
  },
  postContainer: {
    backgroundColor: GlobalColors.primary.white,
    marginTop: marginTop,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: GlobalColors.primary.black,
    height: HEADER_HEIGHT,
    paddingTop: 0,
  },
  scrollViewContent: {
    paddingTop: HEADER_HEIGHT,
  },
  skeletonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

