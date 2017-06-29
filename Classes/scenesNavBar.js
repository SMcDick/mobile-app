/**
 * Created by chicmic on 21/02/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Image,
    Dimenisons,
Platform,
Keyboard
} from 'react-native';
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import Utility from './Utility'
import Icon from 'react-native-vector-icons/Entypo';

export default class ScenesNavBar extends Component{

    removeNavigationScene(){
        if(this.props.route.name==='Download')
            this.props.popScreenFunction()
        else{
            Keyboard.dismiss()
            this.props.navigator.pop()
        }

    }

    render(){
        return(
            <View style = {styles.mainViewStyles}>
                <TouchableOpacity onPress={this.removeNavigationScene.bind(this)} style={styles.leftButtonStyles}>
                    <View style={{flex:1}}/>
                    <View style={{flex:10}}>
                            <Icon name='chevron-thin-left' style={{fontSize:Utility.getFontSize()===50?50*0.6:23*0.9}} color='rgb(0,133,248)'/>
                    </View>
                </TouchableOpacity>
                <View style={styles.headingContainerStyle}>
                    <Text style={styles.headingTextStyles}>{this.props.route.name}</Text>
                </View>
                <View style={{flex:1}}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
   mainViewStyles:{
       paddingTop:Platform.OS == 'ios' ? 18 : 5,
       flex:1,
       flexDirection:'row',
       backgroundColor:'rgb(247,247,248)',
       justifyContent:'space-between',
       borderBottomWidth:1,
       borderBottomColor:'rgb(219,219,224)'
   },
   leftButtonStyles:{
       justifyContent:'space-around',
       flex:1,
       flexDirection:'row',
       alignItems:'center',
       //backgroundColor:'yellow'
   },
    leftButtonIconStyles:{
        flex:1,
        alignItems:'flex-end',
       //backgroundColor:'cyan'
    },

    headingContainerStyle:{
        flex:4,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
       //backgroundColor:'green'
    },
    headingTextStyles:{
        color:'rgb(80,80,80)',
        fontWeight:'200',
        fontSize:Utility.getFontSize()===50?50*0.55:23*0.8
    }

});