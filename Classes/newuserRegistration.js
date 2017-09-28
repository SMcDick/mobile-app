/**
 * Created by chicmic on 27/02/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    Keyboard,
    Modal,
    ActivityIndicator,
    Alert
} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Account from './account'
import NewUserRegistrationApi from './Apis/NewUserRegistrationApi'
import NewUserRegistrationResponse from './Apis/NewUserRegistrationResponse'
import ZenUIStyles from './ZenUIStyles'
import Constants from './Constants'

import LocalStorageApi from './LocalStorageSettingsApi'
export default class NewUserRegistration extends Component{
    constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      modalState:false
    }
    NewUserRegistrationResponse.getInstance().setReceiver(this);
  }

    validateEmail(email){
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        var passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        return passRegex.test(password);
    }

    onSubmit() {
        if (!this.validateEmail(this.state.email)  && (!this.validatePassword(this.state.password))) {
            this.setState({modalState:false})
            alert("invalid email and password")
        } else if(!this.validateEmail(this.state.email)) {
            this.setState({modalState:false})
            alert("Please enter a valid email address")
        } /*else if ( !this.validatePassword(this.state.password) ){
            this.setState({modalState:false})
            alert("Password must contain at least one Uppercase, one lowercase, one numeric character, one special character and have minimum of 8 characters")
        }*/else{
            //NewUserRegistrationApi.testCall(this.state.email,this.state.password)
            this.props.navigator.push({name:'Payments',prevScreen:'Back'})
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Modal
                    visible = {this.state.modalState}
                    transparent = {true}
                    onRequestClose={() => null}
                >
                    <TouchableOpacity
                        style={{flex:1,justifyContent:'center',backgroundColor:'rgba(20,20,20,0.6)'}}
                        activeOpacity={1}
                        onPress={() => this.setState({modalState:false})}
                    >
                        <ActivityIndicator size={"large"} color="black" />
                    </TouchableOpacity>
                </Modal>
                <View style={[{flexDirection:'row'},{justifyContent:'center'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>
                </View>
                <View style={{padding:10,alignItems:'center',backgroundColor:Constants.ZenBlue1}}>
                    <Text style={[{color:'white'}, styles.wordBoldStyle]}>Start your free trial</Text>
                    <Text style={{color:'white', fontSize:16}}>{'\u2022 Get 30 days or 100 scans free'}</Text>
                    <Text style={{color:'white', fontSize:16}}>{'\u2022 You won\'t be charged until the end of your trial'}</Text>
                </View>
                <View style={{flex:1,padding:50,alignItems:'center'}}>
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        style={styles.textInputStyles}
                        placeholder=" Email"
                        underlineColorAndroid={'white'}
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({email:text})}
                        keyboardType={"email-address"}
                    />
                    {/*<TextInput
                        autocorrect={false}
                        autoCapitalize={"none"}
                        style={styles.textInputStyles}
                        placeholder=" Password"
                        secureTextEntry={true}
                        underlineColorAndroid={'white'}
                        returnKeyLabel = {"next"}
         onChangeText={(text) => this.setState({password:text})}
                    />*/}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.registerTouchableStyles}
                         onPress={()=>{
                             this.setState({modalState:true})
                             this.onSubmit()
                             Keyboard.dismiss()
                             //NewUserRegistrationApi.testCall(this.state.email,this.state.password);
                                    }}
                    >
                        <Text style={styles.registerTextStyle}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
     registerResponseSucessCallBack(response){
         this.setState({modalState:false})
         LocalStorageApi.setIsUserLoggined("true");
         //this.props.navigator.popN(2)
         this.props.navigator.push({name:'Agreement', prevScreen: 'Back'})
    }
      registerResponseFailureCallBack(errorCode){
      //alert(" hello " + errorCode)
          Alert.alert(
              "Registartion Error",
              errorCode,
              [
                  {
                      text:"Ok",
                      //onPress: () => { this.setState({modalState:false}) }
                  }
              ]
          )
  }
}

const styles=StyleSheet.create({
    textInputStyles:{
        height:screenHeight/14,
        width:screenWidth-20,
        borderWidth:1,
        borderColor:'rgb(219,219,224)',
        marginBottom:10,
        backgroundColor:'white',
        borderRadius:5,
        padding:5
    },
    registerTouchableStyles:{
        height:screenHeight/14,
        width:screenWidth*0.4,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Constants.ZenBlue1
    },
    registerTextStyle:{
        color:'white',
        fontSize:Utility.getFontSize()*0.6,
        fontWeight:'600'
    },
    image:{
        flex:1,
        resizeMode:'contain',
        width:70,
        height:70,
    },
    wordBoldStyle:{
      fontWeight: 'bold',
      fontSize:20,
    }
});