import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { GlobalColors } from '../../constants/GlobalColors'
import axios from 'axios';
import { API } from '../../constants/GlobalAPI'
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUserPost } from '../../redux/actions'

const SERVER_STATE = API.CURRENT_STATE;

const PLACEHOLDER_IMG = 'https://img.freepik.com/premium-vector/gallery-icon-picture-landscape-vector-sign-symbol_660702-224.jpg'

const uploadPostSchema = Yup.object().shape({
  post_images: Yup.string().url().required('A URL is required'),
  text: Yup.string().max(2200, 'Caption has reached the character limit!')
})

const FormikPostUploader = ({navigation}) => {
  const { user } = useSelector(state => state.userReducer);
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
  const dispatch = useDispatch()

  console.log('-------user-------',user)
  return (
    <Formik
      initialValues={{text: '', post_images: '' }}
      onSubmit={values => { 
        const createUserPost = async () => {
          console.log('---------vals-----', values)
          try {
            let baseUrl = API[SERVER_STATE] + API.USER.post;
           // console.log(baseUrl, '---username1--', username, '---token----',authToken);
            const response = await axios.post(baseUrl, {
              username: user.user_id,
              token: user.token,
              post: {
                "text": values.text,
                "tagged_users": null,
                "post_images": values.post_images,
                "post_videos": "https: //www.pngfind.com/pngs/m/39-398349_computer-icons-user-profile-facebook-instagram-instagram-profile.png",
                "tagged_location": "google.maps/locations/city=blr&place=vanshee"
            }
            });
            console.log(response.data)
          } catch (error) {
            //console.log(error);
          }
        }

        const fetchUserPosts = async () => {
          try {
            let baseUrl = API[SERVER_STATE] + API.USER.post;
            //console.log(baseUrl, '---username2--', username, '---token----', authToken);
            const response2 = await axios.get(baseUrl, {
              params: {
                username: user.user_id,
                token: user.token,
                post: {}
              },
            });
            dispatch(setAuthUserPost(response2.data.post.data));
            console.log(response2.data.post.data);
          } catch (error) {
            console.log(error);
          }
        };
        
        createUserPost()
        fetchUserPosts()
        navigation.goBack()
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 30,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Image 
              source={{uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG}}
              style={{width:100, height: 100}}
            />

            <View style={{flex: 1, marginLeft: 12}}>
              <TextInput 
                style={{color: GlobalColors.primary.white, fontSize: 20}}
                placeholder='Write a caption...'
                placeholderTextColor='gray'
                multiline={true}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
              />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)} 
            style={{color: GlobalColors.primary.white, fontSize: 18}}
            placeholder='Enter Image Url'
            placeholderTextColor='gray'
            onChangeText={handleChange('post_images')}
          />
          {errors.text && (
            <Text style={{fontSize: 10, color: 'red'}}>
              {errors.text}
            </Text>
          )}
          {errors.post_images && (
            <Text style={{fontSize: 10, color: 'red'}}>
              {errors.post_images}
            </Text>
          )}

          <Button onPress={handleSubmit} title='share' disabled={!isValid} />
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader

const styles = StyleSheet.create({})