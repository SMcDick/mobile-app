import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Modal,
    KeyboardAvoidingView
} from 'react-native';
import Utility from './Utility'
const screenWidth=Dimensions.get('window').width
export default class CustomModal extends Component{
  static propTypes = {
       customModalVisible: React.PropTypes.bool.isRequired,
       customGetModalData:React.PropTypes.func.isRequired,
       customCloseModal:React.PropTypes.func.isRequired,
       customModalIndex:React.PropTypes.number.isRequired
   };

   constructor(){
     super();
     this.state={
         customEnteredText:''
     }
   }

  render(){
    return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.customModalVisible}
        >

         <KeyboardAvoidingView behavior={'height'} style={styles.modalContainerStyles}>
             <View style={styles.modalInnerContainerStyles}>
              <View style={styles.textConatinerStyles}><Text style={styles.modalHeadingStyles}>Enter amount</Text></View>
              <TextInput
                autoFocus={true}
                keyboardType='numeric'
                  style={styles.modalTextInputStyles}
                  onChangeText={(text) => this.setState({customEnteredText:text})}
                />
                <View style={styles.modalButtonsContainerStyles}>
                  <TouchableOpacity onPress={this.props.customGetModalData.bind(this,this.state.customEnteredText)} style={[styles.modalButtonsStyles, {height:35}]}>
                    <Text style={styles.modalButtonsTextStyles}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.customCloseModal.bind(this)}style={[styles.modalButtonsStyles, {height:35}]}>
                    <Text style={styles.modalButtonsTextStyles}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
      </Modal>
    )
  }
}

      const styles=StyleSheet.create({

        modalContainerStyles:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'rgba(77,77,77,0.8)',
          paddingHorizontal: 20,
          paddingTop: 20,

        },
        modalInnerContainerStyles:{
          backgroundColor:'rgb(255,255,255)',
          height:160,
          width:300,
          justifyContent:'space-around',
          borderRadius:6.5

        },
        textConatinerStyles:{
          alignSelf:'center',
          height:40,
          width:290,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:6.5
        },
        modalHeadingStyles:{
          fontSize:Utility.getFontSize()==50?50*0.45:23*0.85,
          color:'#404040',
          fontWeight:'300',
        },
        modalTextInputStyles:{
          height:40,
          borderColor: 'rgb(220,220,225)',
          borderWidth: 0.7,
          width:275,
          alignSelf:'center',
          borderRadius:5.5
        },
        modalButtonsContainerStyles:{
          flexDirection:'row',
          justifyContent:'space-around',
          marginTop:8,
          marginBottom:10,
          alignItems:'center'
        },
        modalButtonsStyles:{
          flex:1,
          backgroundColor:'rgb(233,234,238)',
          marginRight:screenWidth/30,
          marginLeft:screenWidth/30,
          borderRadius:5,
          justifyContent:'center',
          alignItems:'center'
        },
        modalButtonsTextStyles:{
          color:'rgb(0,133,248)',
          alignSelf:'center',
          fontWeight:'500',
          fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
        }
    })
