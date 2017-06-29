/**
 * Created by chicmic on 27/02/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    ScrollView,
    Switch,
    Dimensions,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Platform,
    InteractionManager,
    Keyboard,
    Modal,
    ActivityIndicator,
    Alert,
} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import LoginApi from './Apis/LoginApi'
import LoginResponse from './Apis/LoginResponse'
import LocalStorageApi from './LocalStorageSettingsApi'

export default class Account extends Component{
 constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      modalState:false
    }
    LoginResponse.getInstance().setReceiver(this);
 }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Modal
                    visible = {this.state.modalState}
                    transparent = {true}
                >
                    <TouchableOpacity
                        style={{flex:1,justifyContent:'center',backgroundColor:'rgba(20,20,20,0.6)'}}
                        activeOpacity={1}
                        onPress={() => this.setState({modalState:false})}
                    >
                        <ActivityIndicator size={"large"} color="black" />
                    </TouchableOpacity>
                </Modal>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <View style={styles.inputViewStyles}>
                    <TouchableOpacity
                        onPress={()=>{Keyboard.dismiss();this.props.navigator.push({name:"New User Registration",prevScreen:"Account"})}}
                        activeOpacity={0.8}
                        style={styles.registerTouchableStyle}
                    >
                        <Text style={styles.registerTextStyle}>New User? Register here</Text>
                    </TouchableOpacity>
                    <TextInput
                        autoCorrect={false}
                        style={styles.textInputStyles}
                        placeholder=" Email"
                        underlineColorAndroid={'white'}
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({email:text})}
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                    />
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        style={styles.textInputStyles}
                        placeholder=" Password"
                        secureTextEntry={true}
                        underlineColorAndroid={'white'}
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({password:text})}
                    />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.loginTouchable}
                            onPress={()=>{
                                      Keyboard.dismiss()
                                      this.setState({modalState:true})
                                      LoginApi.testCall(this.state.email,this.state.password);
                                    }}
                        >
                            <Text style={styles.loginTextStyles}>Login</Text>
                       </TouchableOpacity>
                </View>
            </View>
        )
    }
    loginResponseSucessCallBack(response){
        console.log("12345login" + JSON.stringify(response))
        LocalStorageApi.setAccessToken(response.token)
        LocalStorageApi.setUserID(response.user.uid)
        console.log("12345keylogs" + LocalStorageApi.accessToken)
        console.log("12345keylogs" + LocalStorageApi.userID)
        this.setState({modalState:false})
        LocalStorageApi.setIsUserLoggined("true");
        this.props.navigator.push({name:'Agreement', prevScreen: 'Back'})
    }
    loginResponseFailureCallBack(errorCode){
        console.log("***************************************.")
        Alert.alert(
            "Account not found",
            "Please check email or password, or create an account",
            [
                {
                    text:"Ok",
                    onPress:() => { this.setState({modalState:false}) }
                }
            ]
        )
    
  }
}
const styles=StyleSheet.create({
    inputViewStyles:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    registerTouchableStyle:{
        height:screenHeight/14,
        width:screenWidth-20,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'steelblue',
        marginBottom:10
    },
    registerTextStyle:{
        color:'white',
        fontSize:Utility.getFontSize()*0.6,
        fontWeight:'600'
    },
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
    loginTouchable:{
        height:screenHeight/13,
        borderRadius:5,
        paddingLeft:screenWidth/20,
        paddingRight:screenWidth/20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'steelblue'
    },
    loginTextStyles:{
        color:'white',
        fontSize:Utility.getFontSize()*0.6,
        fontWeight:'600'
    },
});
