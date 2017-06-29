/**
 * Created by nidhitandon on 08/05/17.
 */
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
    Alert,
    NativeModules,
    ScrollView
} from 'react-native';

import PayPal from 'react-native-paypal-wrapper';
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;


export default class Payments extends Component{
    constructor(props) {
        super(props)
        this.state={
            isSelectedPaypal:false,
            isSelectedAmazon:false,
            isSelectedCredit:false
        }
    }

    onSubmit(){

        if(this.state.isSelectedAmazon){
            this.props.navigator.push({name: 'Amazon Login Page', prevScreen: 'Back'})
        }

        if(this.state.isSelectedPaypal) {
            PayPal.initialize(PayPal.SANDBOX, "AbEECyMq0thmQAcfWS0bwS0e-KKZBkFZSOpI5ot_dAz2Re-E8Mk3UlHcFssWee15eezHoF5rQidU7FhJ");
            PayPal.pay({
                price: '5.00',
                currency: 'USD',
                description: 'Subscription fee for this app.',
            }).then((res)=>{
                //console.log("payment successful" +JSON.stringify(res))
                this.props.navigator.popN(3);
                Alert.alert(
                        'Success',
                        'You have successfully purchased the subscription!',
                    [
                        {
                            text:'OK'
                        }
                    ]
                )
                Constants.isSubscriptionTaken==true
            })
                .catch(error => console.log("*****xyz" + JSON.stringify(error)));
        }

        if(this.state.isSelectedCredit) {
            this.props.navigator.push({name: "Card Payment"})
        }
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'rgb(233,234,238)'}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView>
                    <View style={{justifyContent:'center',alignItems:'center',height:40}}>
                        <Text style={styles.headingText}>Select a Payment Method</Text>
                    </View>
                    <View style={{padding:10}}>
                        <View style={{backgroundColor:"rgba(128,128,128,0.15)",padding:10,borderRadius:10}}>
                            <Text style={{color:"rgb(80,80,80)"}}>• No commitment</Text>
                            <Text style={{color:"rgb(80,80,80)"}}>• Month-to-month - no contracts</Text>
                            <Text style={{color:"rgb(80,80,80)"}}>• Cancel anytime</Text>
                            <Text style={{color:"rgb(80,80,80)"}} />
                            <Text style={{color:"rgb(80,80,80)"}}>You will receive 30 days and 100 scans for free. You will not be billed until the end of your free trial, and you can cancel anytime </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.touchableContentSectionStyles}
                        onPress={()=>{this.setState({isSelectedPaypal:true,isSelectedAmazon:false, isSelectedCredit:false })}}
                    >
                        <View style={styles.contentAdjustStyles}>
                            <View style={{flex:1}}>
                                {this.state.isSelectedPaypal ?
                                    <Icon name="radiobox-marked" size={16} color='black' style={styles.iconStyles}/>
                                    :
                                    <Icon name="radiobox-blank" size={16} color='black' style={styles.iconStyles}/>}
                            </View>
                            <View style={{flex:8}}>
                                <Text style={styles.sectionHeadingTextComponentsStyles}>Paypal</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dividerCellStyles}/>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.touchableContentSectionStyles}
                        onPress={()=>{this.setState({isSelectedPaypal:false ,isSelectedAmazon:true, isSelectedCredit:false })}}
                    >
                        <View style={styles.contentAdjustStyles}>
                            <View style={{flex:1}}>
                                {this.state.isSelectedAmazon ?
                                    <Icon name="radiobox-marked" size={16} color='black' style={styles.iconStyles}/>
                                    :
                                    <Icon name="radiobox-blank" size={16} color='black' style={styles.iconStyles}/>}
                            </View>
                            <View style={{flex:8}}>
                                <Text style={styles.sectionHeadingTextComponentsStyles}>Amazon</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dividerCellStyles}/>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.touchableContentSectionStyles}
                        onPress={()=>{this.setState({isSelectedPaypal:false ,isSelectedAmazon:false, isSelectedCredit:true})}}
                    >
                        <View style={styles.contentAdjustStyles}>
                            <View style={{flex:1}}>
                                {this.state.isSelectedCredit ?
                                    <Icon name="radiobox-marked" size={16} color='black' style={styles.iconStyles}/>
                                    :
                                    <Icon name="radiobox-blank" size={16} color='black' style={styles.iconStyles}/>}
                            </View>
                            <View style={{flex:8}}>
                                <Text style={styles.sectionHeadingTextComponentsStyles}>Credit Card</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.blankSectionStyles}/>
                    <View style={styles.buttonSectionLayoutStyles}>
                        <View style={styles.buttonSectionStyles}>
                            <TouchableOpacity style={styles.modalButtonsStyles} onPress={()=>{this.props.navigator.pop()}}>
                                <Text style={styles.modalButtonsTextStyles}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonsStyles} onPress={()=>{this.onSubmit()}}>
                                <Text style={styles.modalButtonsTextStyles}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >
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
    },
    dividerCellStyles:{
        borderWidth:0.2,
        //backgroundColor:'rgb(0,133,248)'
    },
    sectionHeadingTextComponentsStyles:{
        fontWeight:'300',
        color:'rgb(60,60,60)',
       // marginTop:15,
        marginLeft:20,
        alignItems:'center',
        fontSize:Utility.getFontSize()===50?50*0.5:23*0.75
    },
    headingText:{
        fontWeight:'300',
        color:'rgb(60,60,60)',
        fontSize:Utility.getFontSize()===50?50*0.5:23*0.8,
        alignSelf:"center"
    },
    sectionStyles:{
        flex:Utility.getFontSize()===50?1:2,
        backgroundColor:'white'
    },
    touchableSectionStyles:{
        paddingTop:20,
        flex:1,
        flexDirection:'row'
    },
    touchableContentSectionStyles:{
        flexDirection:'row',
        backgroundColor:'white',
        width:screenWidth,
        height:50,
        alignItems:'center'
    },
    contentAdjustStyles:{
        flex:1,
        flexDirection:'row',
        //alignItems:'center'
    },
    iconStyles:{
        paddingLeft:20,
        //paddingTop:5,

    },
    blankSectionStyles:{
        height:20,
        backgroundColor:'rgb(233,234,238)'
    },
    buttonSectionStyles:{
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'white',
        alignItems:'center',
        height: Utility.getFontSize() == 50 ? 90 : 80
    },
    buttonSectionLayoutStyles:{
        flex:3.5,
        backgroundColor:'blue'
    }
})
