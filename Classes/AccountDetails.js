/**
 * Created by chicmic on 14/03/17.
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
    ScrollView,
    Linking,
    WebView,
    AsyncStorage,
    Dimensions,
    Animated,
    Keyboard,
    TouchableHighlight,
    Platform,
} from 'react-native';

import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Constants from './Constants'
import ZenUIStyles from './ZenUIStyles'
import FontAwesome, { Icons } from 'react-native-fontawesome'

const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

export default class AccountDetails extends Component{
    render(){
        return(

            <View style={{height:screenHeight, width:screenWidth, flex:50, justifyContent:'flex-start', alignItems:'center'}}>
                <View style={[{flexDirection:'row'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>
                </View>
                <View style={[ZenUIStyles.HeaderBarStyle,{alignItems:'center', justifyContent:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:10}}>
                        <View style={{flex:1}}>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigator.push({name:"MainScreen",prevScreen:"Settings"})}}
                                activeOpacity={0.8}
                                style={ZenUIStyles.registerTouchableStyle}
                            >
                                <FontAwesome style={ZenUIStyles.backButtonStyle}>{Icons.chevronLeft}</FontAwesome>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={ZenUIStyles.HeaderBarTextStyle}> Account</Text>
                        </View>
                    </View>
                </View>

                <View style={{justifyContent:'space-around', alignItems:'center'}}>

                    <View style={{flex:4, justifyContent:'center'}}>
                    <View style={[styles.UserDataRowStyle]}>
                        <View style={{alignItems:'flex-start'}}>
                            <View style={{height:screenHeight*0.07, width:150}}>
                                <Text style={[styles.UserDataDescriptionTextStyle]}>Email</Text>
                            </View>
                            <View style={{height:screenHeight*0.07, width:150}}>
                                <Text style={[styles.UserDataDescriptionTextStyle]}>Pin</Text>
                            </View>
                            <View style={{height:screenHeight*0.07, width:150}}>
                                <Text style={[styles.UserDataDescriptionTextStyle]}>Device ID</Text>
                            </View>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <View style={{height:screenHeight*0.07}}>
                                <View style={[ZenUIStyles.TextBoxStyle]}>
                                    <Text style={styles.UserDataTextStyle}></Text>
                                </View>
                            </View>
                            <View style={{height:screenHeight*0.07}}>
                                <View style={[ZenUIStyles.TextBoxStyle]}>
                                    <Text style={styles.UserDataTextStyle}></Text>
                                </View>
                            </View>
                            <View style={{height:screenHeight*0.07}}>
                                <View style={[ZenUIStyles.TextBoxStyle]}>
                                    <Text style={styles.UserDataTextStyle}></Text>
                                </View>
                            </View>
                         </View>
                    </View>
                    </View>

                    <View style={{flex:4}}>
                        <View style={ZenUIStyles.FramedBoxStyle}>

                                <Text style={[ZenUIStyles.SubheaderTextStyle]}>MWS Info</Text>

                            <View style={[styles.UserDataRowStyle]}>
                                <View style={{justifyContent:'flex-start', justifyContent:'space-around', alignItems:'flex-start'}}>
                                    <View style={{height:screenHeight*0.07}}>
                                        <Text style={[styles.UserDataDescriptionTextStyle, {width:150}]}>Seller ID</Text>
                                    </View>
                                    <View style={{height:screenHeight*0.07}}>
                                        <Text style={[styles.UserDataDescriptionTextStyle, {width:150}]}>Token</Text>
                                    </View>

                                </View>
                                <View style={{justifyContent:'flex-start', justifyContent:'space-around', alignItems:'flex-start'}}>
                                    <View style={{height:screenHeight*0.07}}>
                                        <View style={[ZenUIStyles.TextBoxStyle]}>
                                            <Text style={styles.UserDataTextStyle}></Text>
                                        </View>
                                    </View>
                                    <View style={{height:screenHeight*0.07}}>
                                        <View style={[ZenUIStyles.TextBoxStyle]}>
                                            <Text style={styles.UserDataTextStyle}></Text>
                                        </View>
                                    </View>

                                 </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({


    UserDataRowStyle:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    UserDataDescriptionTextStyle:{
        color: Constants.ZenBlue1,
    },
    UserDataContainerStyle:{
        backgroundColor:Constants.DataFieldColor,
        width:150,
        height:30,
    },
    UserDataTextStyle:{
    },
})
