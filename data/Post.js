import { View, Text } from 'react-native'
import React from 'react'
import { USERS } from './Users'

export const POSTS = [
    {
        imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
        user: USERS[0].user,
        likes: 7870,
        caption: 'Train Ride to Hogwarts. 🚂...😂.. ',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'BoyMan',
                comment: 'Wow! This looks a nice app, will be very useful'
            },
            {
                user: 'DumbGenius',
                comment: 'App is LiIiTtt bro 🤟'
            },
        ]
    },
    {
        imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
        user: USERS[0].user,
        likes: 7870,
        caption: 'Its been very fun in CERN 🚀..🍙 ',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'BoyMan',
                comment: 'This looks so good.  😮 😮 😮'
            },
        ]
    },
]