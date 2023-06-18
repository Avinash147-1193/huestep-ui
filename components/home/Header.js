import React from 'react'
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { GlobalColors } from '../../constants/GlobalColors'

const Header = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.logo} source={{uri: 'https://www.pngmart.com/files/21/Instagram-PNG-Transparent.png'}}></Image>
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image style={styles.icon} source={require('../../assets/post.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../assets/like.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>2</Text>
                    </View>
                    <Image style={styles.icon} source={require('../../assets/message.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: GlobalColors.primary.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 8,
    },
    logo: {
        width: 100,
        height: 35,
        marginLeft: -30,
        resizeMode: 'contain',
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        resizeMode: 'contain',
        borderTopRightRadius: 10
    },
    unreadBadge: {
        backgroundColor: 'red',
        position: 'absolute',
        left: 20,
        bottom: 18,
        height: 18,
        width: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: GlobalColors.primary.white,
        fontWeight: '600'
    }
})

export default Header