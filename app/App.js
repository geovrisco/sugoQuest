import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput,KeyboardAvoidingView, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Game from './pages/game'
import gambar from './test.gif'
import Home from './pages/home'
import Result from './pages/result'

const Stack = createStackNavigator()


export default function App() {

  const [name, setName]= useState('')
  function getName(text){
    setName(text)
    console.log(name)
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component={Home}/>
        <Stack.Screen name = "Game" component = {Game}/>
        <Stack.Screen name = "Result" component = {Result}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    marginTop:10,
    height:50,
    width:150,
    alignContent:'center',
    borderWidth:2,
    borderRadius:5,
    borderColor:'rgb(95, 255, 40 )'
  }
});
