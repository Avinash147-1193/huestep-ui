import React from 'react'
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native'
import { GlobalColors } from '../../constants/GlobalColors'
const paddingTop = Platform.OS === 'android' ? 20 : 35;
const Header = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/logo.png')}></Image>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: paddingTop,
        backgroundColor: GlobalColors.primary.black,
    },
    logo: {
        width: 110,
        height: 55,
        resizeMode: 'contain',
    },
    iconsContainer: {
        flexDirection: 'row',
        marginRight: 15,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        resizeMode: 'contain',
        borderTopRightRadius: 10
    },
    unreadBadge: {
        backgroundColor: GlobalColors.primary.white,
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
        color: GlobalColors.primary.black,
        fontWeight: '600'
    }
})

export default Header