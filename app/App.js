import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput,KeyboardAvoidingView,ScrollView } from 'react-native';

export default function App() {

  const [papan, setBoard] = useState([])
  const [triggerBtn, setTriggerBtn] = useState(true)


  

  function getText(text,x,y){
    console.log(text,x,y)
    let answer = papan;
    answer[x][y] = Number(text)
    setBoard(answer)
  }

  async function getBoard() {
    let response = await fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
    let data = await response.json();
    // console.log(data,'ini boardddd')
    setTriggerBtn(false)
    return setBoard(data.board)
  }

  async function submitAnswer(){
    console.log(papan)
    let response = await fetch('https://sugoku.herokuapp.com/validate', {
      method:"POST",
      data:{
        "board":papan
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    let data = await response.json()
    // let solution = await response.json()
    console.log(data,'ini data')
    if(data.status==='solved'){
      alert('Congrats you solved the problem')
    }else{
      alert('you submitted the wrong answer')
    }
    // console.log(solution,'ini solution')
    }

    async function getAnswer() {  
      let response = await fetch('https://sugoku.herokuapp.com/solve', {
      method:"POST",
      data:{
        "board":papan
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    let data = await response.json()
    setBoard(data.solution)
    console.log(data.solution,'ini answer')
    }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={{color:'blue'}}>welcome to Mobile Legend!</Text>
      {
        triggerBtn && 
        <Button title="Play!" onPress={getBoard}></Button>
      }
      <View >
        {papan && 
          <View>
            {
              papan.map((b,x) => {
                console.log(b,'ini array')
                let id = 0
                return (
                  <View key={x} style={{display:"flex", flexDirection:"row"}}>
                    {
                      b.map((value,y) => {
                        // console.log(idx,'ini idx')
                        id+=1
                        let answer = `answer${id}`

                          if(value > 0) {
                            return(
                              <TextInput className={answer} onChangeText={text => getText(text,x,y)} maxLength={1} key={y} style={styles.number} value={`${value}`}></TextInput>
                            )
                          }else{
                            return(
                              <TextInput className={answer} onChangeText={text => getText(text,x,y)} maxLength={1} key={y} style={styles.number}></TextInput>
                            )
                          }
                        })
                    }
                  </View>
                  
                  
                )
              })

            }
          <View style={{display:"flex", flexDirection:"row",padding:5}}>
          <Button  onPress={submitAnswer} title="Done"></Button>
          <Button  onPress={getAnswer} title="Get Answer"></Button>
          </View>
          </View>
        }

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number:{
    width:30,
    textAlign:"center",
    borderWidth: 1,
    borderColor: "#20232a",
  }
});
