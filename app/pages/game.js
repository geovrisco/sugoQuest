import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput,KeyboardAvoidingView,Modal } from 'react-native';
import ModalManual from '../components/modal'


export default function Game(props) {
  // console.log(props)
  const [board, setBoard] = useState([])
  const [triggerBtn, setTriggerBtn] = useState(true)
  const [modalVisible,setModalVisible] = useState(false)
  const [message,setMessage] = useState('')
  const [btnNext,setBtnNext] = useState(false)
  const [autoSolveMsg,setAutoSolveMsg]=useState('')

  function toggleModal(){
    setModalVisible(!modalVisible)
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  function getText(text,x,y){
    console.log(text,x,y)
    let answer = board;
    answer[x][y] = Number(text)
    setBoard(answer)
  }

  async function getBoard() {
    let response = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${props.route.params.difficulty}`)
    let data = await response.json();
    // console.log(data,'ini boardddd')
    setTriggerBtn(false)
    return setBoard(data.board)
  }
    function submitAnswer(){
      let data ={
        board:board
      }
      fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        if(response.status==='solved'){
          setModalVisible(true)
          setBtnNext(true)
          setMessage('You Nailed It')
        }else{
          setModalVisible(true)
          setMessage('Wrong Answer')
        }
      })
      .catch(err=>{
        alert('something wrong with server')
      })
    }

    function getAnswer(){
      let data = {
        board:board
      }
      fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        setBoard(response.solution)
        setAutoSolveMsg('You should feel ashamed by using auto solve')
      })
      .catch(console.warn)
    }
    function finished(){
      console.log('finished')
      setModalVisible(false)
      props.navigation.navigate('Result', {
        playerName:props.route.params.playerName,
        message:message,
        warning:autoSolveMsg,
        difficulty:props.route.params.difficulty
      })

    }

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <ModalManual toggle={modalVisible} toggleModal={toggleModal}></ModalManual> */}
       <Modal style={styles.container} visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={{alignSelf:'center',flexWrap:"wrap",marginBottom:10}}>
                <Text textAlign="center">{message}</Text>
              </View>
              <View style={{alignSelf:"center",width:100,paddingTop:40}}>
                  
                  {
                    btnNext &&
                    <Button title="Ok" onPress={() => finished()} ></Button>
                  }
                  {
                    !btnNext &&
                    <Button title="Close" onPress={() => setModalVisible(false)} ></Button>
                  }
              </View> 
            </View>
        </View>
      </Modal> 
  <View style={styles.container}>

      <Text style={{color:'blue'}}> Welcome {props.route.params.playerName} </Text>
      {
        triggerBtn && 
        <Button title="Play!" onPress={getBoard}></Button>
      }
      <View >
        {board && 
          <View>
            {
              board.map((b,x) => {
                // console.log(b,'ini array')
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
          {
            !triggerBtn &&
              <View style={{display:"flex", flexDirection:"row",padding:5, justifyContent:"center"}}>
                <View style={{padding:5}}>
                  <Button  onPress={submitAnswer} title="Done !"></Button>
                </View>
                <View style={{padding:5}}>
                  <Button  onPress={getAnswer} title="Auto SOlve :("></Button>
                </View>
            </View>
          }
          </View>
        }

      </View>
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
  },
  modalOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center'
  },
  modalContent:{
    width:250,
    height:250,
    backgroundColor:'white',
    alignSelf:'center',
    justifyContent:'center',
    
  }

});
