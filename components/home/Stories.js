import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { USERS} from '../../data/Users'
import { GlobalColors } from '../../constants/GlobalColors'

const Stories = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal showHorizontalScrollIndicator={false}>
            {USERS.map((story, index) => (

                <View key={index} style={{alignItems: 'center'}}>
                    <Image style={styles.story} source={{uri: story.image}} />
                    <Text style={styles.storyUser}>{story.user.length > 9 ? story.user.slice(0, 9)+'...' : story.user}</Text>
                </View>

            ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 7,
        backgroundColor: GlobalColors.primary.black,
    },
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: GlobalColors.elements.storyBorderColor
    },
    storyUser: {
        color: GlobalColors.text.storyText,
    }
})

export default Stories