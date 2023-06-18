import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { GlobalColors } from '../../constants/GlobalColors'
import { POSTS } from '../../data/Posts'

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/ios/50/ffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/color/48/null/hearts.png'
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/FFFFFF/external-comment-chat-flatart-icons-outline-flatarticons-1.png'
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/ios/50/FFFFFF/paper-plane--v1.png'
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/FFFFFF/external-bookmark-social-media-interface-anggara-basic-outline-anggara-putra-2.png'
  }
]

const Post = ({post}) => {
  console.log(post)
  return (
    <View style={{marginBottom: 30}}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter />
        <Likes post={post}/>
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
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
      <Image source={{uri: post.profile_picture}} style={styles.story}/>
      <Text style={{color: GlobalColors.text.postText, marginLeft:5, fontWeight: '700'}}>{post.username}</Text>
    </View>
    <TouchableOpacity>
      <Text style={{color:  GlobalColors.text.postText, fontWeight: '900'}}>...</Text>
    </TouchableOpacity>
  </View>
)

const PostImage = ({post}) => (
  <View style={{
    width: '100%',
    height: 450,
  }}>
    <Image source={{uri: post.post_images}} style={{ height: '100%', resizeMode: 'cover'}} />
  </View>
)

const PostFooter = ( ) => (
  <View style={{flexDirection: 'row',}}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
      <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View style={{flex:1, alignItems:'flex-end'}}>
      <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
  
)

const Icon = ({imageStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imageStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
)

const Likes = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color:  GlobalColors.text.postText, fontWeight: '600'}}>{post.likes.toLocaleString('en')} likes</Text>
  </View>
)

const Caption = ({post}) => (
  <View style={{marginTop:5}}>
    <Text style={{color:  GlobalColors.text.postText}}>
      <Text style={{fontWeight: 600}}>{POSTS[0].user}</Text>
      <Text> {post.text}</Text>
    </Text>
  </View>
)

const CommentSection = ({post}) => (
  <View style={{marginTop: 5}}>
    {!!post.comments.length && (
      <Text style={{color:GlobalColors.text.postText}}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}
        {post.comments.length > 1 ? ' comments' : ' comment'}
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
})