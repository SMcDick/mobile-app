/**
 * Created by nidhitandon on 08/05/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Payments from './Payments'

export default class Agreement extends Component{
    constructor(props) {
        super(props)
                this.state={
                   isSelected: false
                }
    }

    render(){
        return(
        <View style={{flex:1,backgroundColor:'rgb(233,234,238)'}}>
            <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
            <View style={{marginTop:20, backgroundColor:'white', padding:10}}>
                <Text>terms and conditions. terms and conditions.terms and conditions.terms and conditions.
                    terms and conditions.terms and conditions.terms and conditions.terms and conditions.
                    terms and conditions.terms and conditions.terms and conditions.terms and conditions.</Text>

            </View>
            <TouchableOpacity style={{width:screenWidth, height:80}} activeOpacity={1} onPress={()=>{this.setState({isSelected:!this.state.isSelected})}}>
            <View style={{paddingTop:20, height:60,flexDirection:'row', backgroundColor:'white', marginTop:20}}>
                <View style={{flex:1}}>

                    {this.state.isSelected ?
                <Icon name="radiobox-marked" size={20} color='black' style={{paddingLeft:0}}/>
                        :
                    <Icon name="radiobox-blank" size={20} color='black' style={{paddingLeft:0}}/>}

                </View>
                <View style={{flex:12}}>
                <Text style={{paddingTop:2}}>
                    I accept the terms and conditions.
                </Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style={{height:(Utility.getFontSize() == 50 ? 90 : 80), marginTop:40, backgroundColor:'white',justifyContent:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <TouchableOpacity style={styles.modalButtonsStyles} onPress={()=>{this.props.navigator.pop()}}>
                        <Text style={styles.modalButtonsTextStyles}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButtonsStyles}
                        onPress={()=> {
                            if (this.state.isSelected) {
                                this.props.navigator.push({name: 'Payments', prevScreen: 'Back'})
                            }
                        }}
                    >
                        <Text style={styles.modalButtonsTextStyles}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
}

const styles=StyleSheet.create({
    modalButtonsStyles: {
        height: Utility.getFontSize() == 50 ? 70 : 60,
        flex: 1,
        backgroundColor: 'rgb(233,234,238)',
        marginRight: screenWidth / 30,
        marginLeft: screenWidth / 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalButtonsTextStyles:{
        color:'rgb(0,133,248)',
        alignSelf:'center',
        fontWeight:'300',
        fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
    }
})
