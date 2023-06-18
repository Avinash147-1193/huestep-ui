import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/home/Header';
import { GlobalColors } from '../constants/GlobalColors';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import BottomTabs, { bottomTabIcon } from '../components/home/BottomTabs';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUserProfile, setAuthUserPost } from '../redux/actions';
import { API } from '../constants/GlobalAPI';
import axios from 'axios';

const SERVER_STATE = API.CURRENT_STATE;

const HomeScreen = ({ navigation }) => {
  const { user_profile } = useSelector(state => state.userReducer);
  const { user_post } = useSelector(state => state.userReducer);
  const { user } = useSelector(state => state.userReducer);
  const authToken = user.token;
  const username = user.user_id;
  const dispatch = useDispatch();
  console.log('-------user-----', username, authToken)


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.USER.profile;
       // console.log(baseUrl, '---username1--', username, '---token----',authToken);
        const response = await axios.post(baseUrl, {
          username: username,
          token: authToken,
        });
        dispatch(setAuthUserProfile(response.data))
        //console.log(response.data)
      } catch (error) {
        //console.log(error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        let baseUrl = API[SERVER_STATE] + API.USER.post;
        //console.log(baseUrl, '---username2--', username, '---token----', authToken);
        const response2 = await axios.get(baseUrl, {
          params: {
            username: username,
            token: authToken,
            post: {}
          },
        });
        dispatch(setAuthUserPost(response2.data.post.data));
        console.log(response2.data.post.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, []);

  if (!user_post || user_post.length === 0) {
    return null; // Return null or a placeholder component
    
  }

  //console.log('---------------user profile ----user post---------',user_post, user_post[0].fields.post_images)
  const posts = Object.values(user_post).map(item => item.fields);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories style={styles.storySection}/>
      <ScrollView style={{ marginTop: 5}}>
        {posts.map((post, index) => (
          <View key={index}>
            <Post post={post} />
          </View>
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primary.white,
    flex: 1,
  },
  storySection: {
    backgroundColor: GlobalColors.primary.black
  }
});

export default HomeScreen;
