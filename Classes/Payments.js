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
    Image,
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
import ZenUIStyles from './ZenUIStyles'
import Constants from './Constants'


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
            debugger;
            //PayPal.initialize(PayPal.SANDBOX, "AbEECyMq0thmQAcfWS0bwS0e-KKZBkFZSOpI5ot_dAz2Re-E8Mk3UlHcFssWee15eezHoF5rQidU7FhJ");
            PayPal.initialize(PayPal.SANDBOX, "AaTUWCYMTD6U9xRbSsKziBSy0JaVHt1foyAWLsNpIDz2RfQMwHD6Wasd2eH-BKZ7iF5e3JE3ouqnx8Wq");
            PayPal.pay({
                price: '5.00',
                currency: 'USD',
                description: 'Subscription fee for this app.',
            }).then((res)=>{
                //console.log("payment successful" +JSON.stringify(res))
                debugger;
                this.props.navigator.popN(3);
                Alert.alert(
                        'Success',
                        'You have successfully purchased the subscription!',
                        [
                            {text:'OK'}
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

    popIfExists() {
      if (navigator.getCurrentIndex() > 0) {
        navigator.pop()
        return true // do not exit app
      } else {
        return false // exit app
      }
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={[{flexDirection:'row'},{justifyContent:'center'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>
                </View>
                <ScrollView>
                    <View style={{padding:10,alignItems:'center',backgroundColor:Constants.ZenBlue1}}>
                        <Text style={[{color:'white'},styles.wordBoldStyle]}>{'Two steps and you\'re done'}</Text>
                        <Text style={{color:'white',fontSize:16}}>{'\u2022 Unlimited database downloads'}</Text>
                        <Text style={{color:'white',fontSize:16}}>{'\u2022 Unlimited scans'}</Text>
                        <Text style={{color:'white',fontSize:16}}>{'\u2022 Full access'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', padding:20}}>
                        <View style={{borderWidth: 0.5,
                                          borderColor: 'rgb(60,60,60)',width:50, height:50, borderRadius:50,backgroundColor:Constants.ZenBlue1,alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:36}}>1</Text>
                        </View>
                        <View style={{flexDirection:'column', justifyContent:'flex-start',paddingHorizontal:10}}>
                            <Text style={styles.wordBoldStyle}>{'Activate your subscription'}</Text>
                            <Text style={{fontSize:16}}>{'Enter a payment preference'}</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'column', padding:10, justifyContent:'space-around', alignItems:'center',height:125}}>
                    <View style={{justifyContent:'space-around'}}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            //style={styles.touchableContentSectionStyles}
                            onPress={()=>{this.setState({isSelectedPaypal:false,isSelectedAmazon:true, isSelectedCredit:false }, this.onSubmit())}}
                        >
                            <Image source={require('../assets/AmazonPay.png')} style={styles.PayLogoStyle}/>
                        </TouchableOpacity>
                        </View>
                        <View style={{justifyContent:'space-around'}}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            //style={styles.touchableContentSectionStyles}
                            onPress={()=>{this.setState({isSelectedPaypal:true ,isSelectedAmazon:false, isSelectedCredit:false }, this.onSubmit())}}
                        >
                            <Image source={require('../assets/PayPalButton.png')} style={styles.PayLogoStyle}/>
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
    },
    PayLogoStyle:{
        width:148,
        height:30,
    },
    wordBoldStyle:{
      fontWeight: 'bold',
      fontSize:20,
    }
})
