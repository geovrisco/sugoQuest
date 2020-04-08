import React, {useState,useEffect} from 'react'
import { Text,View } from 'react-native'


export default function Timer(props){
  console.log(props)


  return (
    <View>
      <Text>{props.timer}</Text>
    </View>
  )
}