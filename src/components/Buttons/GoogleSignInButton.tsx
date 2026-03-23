import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

type GoogleSignInButtonProps={
    title:string,
    onPress:()=>void,
}
const GoogleSignInButton = ({title,onPress}:GoogleSignInButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}
     className='flex-row h-14 w-full bg-gray-100 items-center justify-center rounded-[15px] border border-gray-200'
    >
    <Image source={require('../../assets/images/google-icon.png')}
     resizeMode='contain'
     className='w-6 h-6 mr-4'
    />
      <Text className='text-base font-semibold'>{title}</Text>
    </TouchableOpacity>
  )
}

export default GoogleSignInButton
