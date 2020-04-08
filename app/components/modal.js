import React, {useState, useEffect} from 'react'
import {Modal,Text,View,Button,StyleSheet} from 'react-native'


export default function ModalManual (props){
  console.log('modal')
  const [toggle,setToggle]=useState(false)

  useEffect(() => {
    setToggle(props.toggle)
  },[])

  function closeModal(){
    setToggle(false)
  }


  return(
    <Modal style={styles.container} visible={toggle} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}> 
              <Text>Selamat</Text>
              <Button title="Close" onPress={closeModal} ></Button>
            </View>
        </View>
      </Modal>
  )


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