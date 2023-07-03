import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from 'react-native';
import { GlobalColors } from '../../constants/GlobalColors';

const BackButtonHeader = ({navigation}) => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={{uri: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/back.png'}} style={{width: 30, height: 30}} />
      </TouchableOpacity>
    </View>
  )

export default BackButtonHeader;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerText: {
      color: GlobalColors.primary.white,
      fontWeight: '700',
      fontSize: 20,
      marginRight: 23,
    }
  })