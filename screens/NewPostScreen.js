import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import AddNewPost from '../components/newPost/AddNewPost'
import { GlobalColors } from '../constants/GlobalColors'

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: GlobalColors.primary.black, flex:1}}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default NewPostScreen

const styles = StyleSheet.create({})