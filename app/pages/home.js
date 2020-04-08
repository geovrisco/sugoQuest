import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput,KeyboardAvoidingView, Image, Picker} from 'react-native';
import gambar from '../test.gif'

export default function Home(props) {
  // console.log(props, 'ini props')
  const [name, setName]= useState('')
  function getName(text){
    setName(text)
    console.log(name)
  }

  const [diffSelector,setDiffSelector] = useState('medium')


  return(
    <KeyboardAvoidingView style={styles.container}>
      <Image 
        
        source={gambar}/>
        <Text >SudoQuest!</Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={(text) => getName(text)}
          textAlign="center"
          placeholder="Hello Stranger!"/>
          <View style={{display:'flex',alignItems:'center'}}>
            <Text>Select Difficulity:</Text>
            <View style={styles.Picker}>
              <Picker
              mode="dropdown"
              selectedValue={diffSelector}
              onValueChange={(itemValue,itemIndex) => setDiffSelector(itemValue)}
              style={{width:200}}
              >
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
              </Picker>
            </View>
          </View>
          <Button title="Play" onPress={() => props.navigation.navigate('Game', {
            playerName:name,
            difficulty:diffSelector
          })}></Button>
    </KeyboardAvoidingView>
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
    borderColor:'rgb(95, 255, 40 )',
    marginBottom:20,
    marginTop:20
  },
  Picker:{
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius:5,
    marginTop:20,
    marginBottom:40
  }
});
