import React from 'react'
import { StyleSheet, Text, View, Button, TextInput,KeyboardAvoidingView,Modal } from 'react-native';


export default function ResultPage(props){
  console.log(props,'ini props result')
  return (
    <View style={styles.container}>
     {
       props.route.params.warning  &&
       <View style={{alignItems:"center"}}>
        <Text>Too Bad {props.route.params.playerName},</Text>
        <Text> {props.route.params.warning}</Text>
        <Text> but still you beat {props.route.params.difficulty} difficulty, effortlessly</Text>
        <Button onPress={() => props.navigation.navigate('Home')} title="I'll try again later :("></Button>
      </View>
     }
     {
      !props.route.params.warning &&
       <View style={{alignItems:"center"}}>
         <Text>Congratulations {props.route.params.playerName}</Text>
          <Text>You Beat the {props.route.params.difficulty} difficulty, with your own Power!</Text>
          <Button onPress={() => props.navigation.navigate('Home')} title="Yay"></Button>
       </View>
     }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
