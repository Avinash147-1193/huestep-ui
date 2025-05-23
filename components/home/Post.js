import  React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Divider } from 'react-native-elements'
import { GlobalColors } from '../../constants/GlobalColors'
import { API } from '../../constants/GlobalAPI'
import { POSTS } from '../../data/Posts'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUserProfile, setAuthUserPost, setAuthUserLikedPost } from '../../redux/actions';

const SERVER_STATE = API.CURRENT_STATE;

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/ios/50/000000/facebook-like--v1.png',
    likedImageUrl: 'https://img.icons8.com/ios-filled/50/facebook-like.png'
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/ios/50/comments--v1.png'
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/ios/50/right2.png'
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/ios/50/add-bookmark.png'
  }
]



const Post = ({post}) => {
  const [like, setLike] = useState('');
  const [likesCount, setLikesCount] = useState('');
  const { user_liked_posts, user } = useSelector(state => state.userReducer);
  //const dispatch = useDispatch();


  useEffect(() => {
    setLikesCount(post.fields.likes)
    if (user_liked_posts.indexOf(post.pk) >= 0) {
      setLike(1);
      console.log('----usereffect if----', post.fields.likes,'--------likes---',post.fields.likes,'---------post.pk----',post.pk,'------user_liked_posts----', user_liked_posts)
    } else {
      setLike(0);
    }

  }, [user_liked_posts, post.pk]);

  const HandleLike =  (post, user_liked_posts) => {
    let updatedLikedPosts = []

    like == 0 ? setLikesCount(likesCount + 1 ) : setLikesCount(likesCount - 1 )
    setLike(!like);

    try {
      let baseUrl = API[SERVER_STATE] + API.USER.postLike;
       console.log(baseUrl, '---username1--', user.user_id, '---token----',user.token);
      const response = axios.post(baseUrl, {
          username: user.user_id,
          token: user.token,
          post: {post_id: post.pk}
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={{marginBottom: 30}}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter post={post} user_liked_posts={user_liked_posts} HandleLike={HandleLike} like={like}/>
        <Likes post={post} likesCount={likesCount}/>
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
        <Divider width={1} orientation="vertical" style={styles.divider}/>
      </View>
      
    </View>
  )
}



const PostHeader = ({post}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}
  >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={{uri: post.fields.profile_picture}} style={styles.story}/>
      <Text style={{color: GlobalColors.text.postText, marginLeft:5, fontWeight: '700'}}>{post.fields.username}</Text>
    </View>
    <TouchableOpacity>
      <Text style={{color:  GlobalColors.text.postText, fontWeight: '900'}}>...</Text>
    </TouchableOpacity>
  </View>
)

const PostImage = ({ post }) => {
  const postImages = post.fields.post_images;

  if (postImages.endsWith('.jpg') || postImages.endsWith('.png') || postImages.endsWith('.gif')) {
    return (
      <View style={{
        width: '100%',
        height: 450,
      }}>
        <Image source={{ uri: postImages }} style={{ height: '100%', resizeMode: 'cover' }} />
      </View>
    );
  } else if (postImages.endsWith('.mp4')) {
    return (
      <View style={{
        width: '100%',
        height: 450,
      }}>
        <Video
          source={{ uri: postImages }}
          style={{ height: '100%', resizeMode: 'cover' }}
          shouldPlay
          useNativeControls
        />
      </View>
    );
  } else {
    return null; // Handle other file types or unsupported formats
  }
};



const PostFooter = ( {post, user_liked_posts, HandleLike, like} ) => (

  <View style={{flexDirection: 'row',}}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon imageStyle={styles.footerIcon} onPress={() => HandleLike(post, user_liked_posts)} imgUrl={ like == 1 ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl} />
      <Icon imageStyle={styles.footerIcon} onPress={() => console.log('-------comment-------')} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imageStyle={styles.footerIcon} onPress={() => console.log('-------share-------')} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View style={{flex:1, alignItems:'flex-end'}}>
      <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
  
)

const Icon = ({imageStyle, imgUrl, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={imageStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
)

const Likes = ({post, likesCount}) => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color:  GlobalColors.text.postText, fontWeight: '600'}} >{likesCount} likes</Text>
  </View>
)

const Caption = ({post}) => (
  <View style={{marginTop:5}}>
    <Text style={{color:  GlobalColors.text.postText}}>
      <Text style={{fontWeight: 600}}>{POSTS[0].user}</Text>
      <Text> {post.fields.text}</Text>
    </Text>
  </View>
)

const CommentSection = ({post}) => (
  <View style={{marginTop: 5}}>
    {!!post.fields.comments.length && (
      <Text style={{color:GlobalColors.text.postText}}>
        View{post.fields.comments.length > 1 ? ' all' : ''} {post.fields.comments.length}
        {post.fields.comments.length > 1 ? ' comments' : ' comment'}
      </Text>
    )}
  </View>
)

const Comments = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 5}}>
    <Text style={{color: GlobalColors.text.postText}}>
      <Text style={{fontWeight: '600'}}>{POSTS[0].comments[0].user}</Text>
      <Text>{POSTS[0].comments[0].comment}</Text>
    </Text>
  </View>
)

export default Post

const styles = StyleSheet.create({
  story: {
      width: 35,
      height: 35,
      borderRadius: 50,
      marginLeft: 10,
      borderWidth: 1.5,
      borderColor: GlobalColors.elements.storyBorderColor
  },
  footerIcon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 10,
  }
})