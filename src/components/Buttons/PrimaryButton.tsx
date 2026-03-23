import {Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'

type PrimaryButtonProps={
  title:string,
  onPress:()=>void;
  className?:string,
  isLoading?:boolean,
}

const PrimaryButton = ({title,onPress,className='',isLoading=false}:PrimaryButtonProps) => {

  return (
       <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
      className={`w-full h-14 px-4 rounded-[15px] bg-primary items-center justify-center ${className}`}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-lg font-semibold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default PrimaryButton

