import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput,KeyboardAvoidingView,ScrollView } from 'react-native';

export default function App() {

  const [papan, setBoard] = useState([])
  const [triggerBtn, setTriggerBtn] = useState(true)
  const [answer, setAnswer] = useState([])

  let answerBoard = {
    board:[
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]
  }

  function submitAnswer(){
    let board1 = document.querySelectorAll(".answer1")
    let answerBoard1 = []
    // console.log(board1)
    board1.forEach(i => {
      answerBoard1.push(i.value)
    })

    let board2 = document.querySelectorAll(".answer2")
    let answerBoard2 = []
    // console.log(board1)
    board2.forEach(i => {
      answerBoard2.push(i.value)
    })

    let board3 = document.querySelectorAll(".answer3")
    let answerBoard3 = []
    // console.log(board1)
    board3.forEach(i => {
      answerBoard3.push(i.value)
    })

    let board4 = document.querySelectorAll(".answer4")
    let answerBoard4 = []
    // console.log(board1)
    board4.forEach(i => {
      answerBoard4.push(i.value)
    })

    let board5 = document.querySelectorAll(".answer5")
    let answerBoard5 = []
    // console.log(board1)
    board5.forEach(i => {
      answerBoard5.push(i.value)
    })

    let board6 = document.querySelectorAll(".answer6")
    let answerBoard6 = []
    // console.log(board1)
    board6.forEach(i => {
      answerBoard6.push(i.value)
    })

    let board7 = document.querySelectorAll(".answer7")
    let answerBoard7 = []
    // console.log(board1)
    board7.forEach(i => {
      answerBoard7.push(i.value)
    })

    let board8 = document.querySelectorAll(".answer8")
    let answerBoard8 = []
    // console.log(board1)
    board8.forEach(i => {
      answerBoard8.push(i.value)
    })

    let board9 = document.querySelectorAll(".answer9")
    let answerBoard9 = []
    // console.log(board1)
    board9.forEach(i => {
      answerBoard9.push(i.value)
    })


    console.log(board1,board2,board3,board4,board5,board6)

    console.log(answerBoard1, 'ini1')
    console.log(answerBoard2 , 'ini 2')
    console.log(answerBoard3, 'ini3')
    console.log(answerBoard4, 'ini4')
    console.log(answerBoard5, 'ini 5')
    console.log(answerBoard6, 'ini 6')
    console.log(answerBoard7,'ini 7')
    console.log(answerBoard8, 'ini 8')
    console.log(answerBoard9,'ini 9')
  }

  function getText(text){
    let input = text
    console.log(text)
    return input
  }

  async function getBoard() {
    let response = await fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
    let data = await response.json();
    // console.log(data,'ini boardddd')
    setTriggerBtn(false)
    return setBoard(data)
  }


  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={{color:'blue'}}>welcome to Mobile Legend!</Text>
      {
        triggerBtn && 
        <Button title="Play!" onPress={getBoard}></Button>
      }
      <View >
        { papan.board && 
          <View>
            {
              papan.board.map((b,i) => {
                console.log(b,'ini array')
                let id = 0
                return (
                  <View key={i} style={{display:"flex", flexDirection:"row"}}>
                    {
                      b.map((value,idx) => {
                        // console.log(idx,'ini idx')
                        id+=1
                        let answer = `answer${id}`
                        // console.log(answer,'ini answer')
                          // return (
                          //   <TextInput className={answer} onChangeText={text => getText(text)} maxLength="1" key={idx} style={styles.number} { ...value != 0 ? value= {value} : ''}></TextInput>
                          // )
                          if(value > 0) {
                            return(
                              <TextInput className={answer} onChangeText={text => getText(text)} maxLength={1} key={idx} style={styles.number} value={`${value}`}></TextInput>
                            )
                          }else{
                            return(
                              <TextInput className={answer} onChangeText={text => getText(text)} maxLength={1} key={idx} style={styles.number}></TextInput>
                            )
                          }
                        })
                    }
                  </View>
                  
                  
                )
              })

            }
          <Button onPress={submitAnswer} title="Done"></Button>
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
