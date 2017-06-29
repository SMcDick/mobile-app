/**
 * Created by nidhitandon on 10/05/17.
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
    Image,
    Animated,
    Easing,
    KeyboardAvoidingView,
    ScrollView,
    Picker
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Stripe from 'react-native-stripe-api'
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icons from 'react-native-vector-icons/Entypo'
let tokenId=''
let customId=''
export default class StripePayment extends Component{
    constructor(props){
        super(props)
        this.state={
            modalState:false,
            monthModalState:false,
            selectedMonth:"Expiry Month",
            yearModalState:false,
            selectedYear:"Expiry Year",
            cardNumber: '',
            cardHolderName:'',
            cardHolderEmail:'',
            cardCvc:'',
            tokenId:'',
            customerId:'',
        }
    }

    makePayment(){
        if(this.state.cardNumber=='' || this.state.cardCvc=='' || this.state.selectedYear=='' || this.state.selectedMonth=='' ||this.state.cardHolderName=='')
        {
            alert("Please fill all the credentials")
            return
        }

        const apiKey = 'sk_test_f9r3pMzD3PKIelSCGydyOO7Q';
        const client = new Stripe(apiKey);
        // Create a Stripe token with new card infos
        const token =  client.createToken(this.state.cardNumber,this.state.selectedMonth,this.state.selectedYear,this.state.cardCvc).then((res)=> {
            console.log("****STRIPE" + JSON.stringify(res))

            if (res.hasOwnProperty('error')) {

                Alert.alert(
                    "Error",
                    res.error.message,
                    [
                        {
                            text: "Ok",
                            onPress: () => {
                                this.setState({modalState: false})
                            }
                        }
                    ]
                )
                return
            }

            tokenResponse = res.id
            tokenId = tokenResponse.toString()
            this.setState({tokenId: tokenId})

        }).then(()=>{
            //Create a new customer and link your new card
            const customer = client.createCustomer(this.state.tokenId, this.state.cardHolderEmail, 'support@zenarbitrage.com', this.state.cardHolderName, '').then((res) => {
                customerResponse = res.id
                customId = customerResponse.toString()
                this.setState({customerId: customId})

            }).then(()=>{
                //Create charge, 1 USD
                const charge = client.createCharge(1 * 100, this.state.customerId, 'Payment', 'USD').then((res) => {
                    console.log("*************success or not************* " + JSON.stringify(res.status))
                    if(res.status=="succeeded"){
                        Constants.isSubscriptionTaken==true
                    }
                });

            }).then(()=>{
                //console.log("payment successful" +JSON.stringify(res))
                this.props.navigator.popN(4);
                Alert.alert(
                    'Success',
                    'You have successfully purchased the subscription!',
                    [
                        {
                            text:'OK'
                        }
                    ]
                )

            })

        })

    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'rgb(233,234,238)'}} >
                <Modal
                    visible={this.state.monthModalState}
                    transparent={true}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,255,255,0.7)'}}>
                        <Picker
                            selectedValue={this.state.selectedMonth}
                            onValueChange={(value)=>this.setState({selectedMonth:value , monthModalState:false})}
                            style={{height:screenHeight/2,width:screenWidth/2}}
                            //style={[styles.expiryButtonStyles,{backgroundColor:'rgb(200,200,200)'}]}
                            mode="dropdown"
                        >
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                            <Picker.Item label="4" value="4"/>
                            <Picker.Item label="5" value="5"/>
                            <Picker.Item label="6" value="6"/>
                            <Picker.Item label="7" value="7"/>
                            <Picker.Item label="8" value="8"/>
                            <Picker.Item label="9" value="9"/>
                            <Picker.Item label="10" value="10"/>
                            <Picker.Item label="11" value="11"/>
                            <Picker.Item label="12" value="12"/>
                        </Picker>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.yearModalState}
                    transparent={true}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,255,255,0.7)'}}>
                        <Picker
                            selectedValue={this.state.selectedYear}
                            onValueChange={(value)=>this.setState({selectedYear:value , yearModalState:false})}
                            style={{height:screenHeight/2,width:screenWidth/2}}
                            //style={[styles.expiryButtonStyles,{backgroundColor:'rgb(200,200,200)'}]}
                            mode="dropdown"
                        >
                            <Picker.Item label="2017" value="2017" />
                            <Picker.Item label="2019" value="2019" />
                            <Picker.Item label="2020" value="2020" />
                            <Picker.Item label="2021" value="2021" />
                            <Picker.Item label="2023" value="2023" />
                            <Picker.Item label="2024" value="2024" />
                            <Picker.Item label="2025" value="2025" />
                            <Picker.Item label="2026" value="2026" />
                            <Picker.Item label="2027" value="2027" />
                            <Picker.Item label="2028" value="2028" />
                            <Picker.Item label="2029" value="2029" />
                            <Picker.Item label="2030" value="2030" />
                            <Picker.Item label="2031" value="2031" />
                            <Picker.Item label="2032" value="2032" />
                            <Picker.Item label="2033" value="2033" />
                            <Picker.Item label="2034" value="2034" />
                            <Picker.Item label="2035" value="2035" />
                            <Picker.Item label="2036" value="2036" />
                            <Picker.Item label="2037" value="2037" />
                            <Picker.Item label="2038" value="2038" />
                            <Picker.Item label="2039" value="2039" />
                            <Picker.Item label="2040" value="2040" />
                        </Picker>
                    </View>
                </Modal>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
                    <KeyboardAvoidingView behavior={'padding'}>
                            <Animatable.Image
                                source={require('../assets/credit-cards.png')}
                                style={styles.animatedSectionStyles}
                                animation="pulse" iterationCount= "infinite" duration={2000} delay={1000}
                            />
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                style={styles.textInputStyles}
                                placeholder="Card number"
                                underlineColorAndroid={'white'}
                                returnKeyLabel = {"next"}
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState({cardNumber:text})}
                                value={this.state.cardNumber}
                            />
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                style={styles.textInputStyles}
                                placeholder="Name on card"
                                underlineColorAndroid={'white'}
                                returnKeyLabel = {"next"}
                                onChangeText={(text) => this.setState({cardHolderName:text})}
                                value={this.state.cardHolderName}
                            />
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                style={styles.textInputStyles}
                                placeholder="Email"
                                underlineColorAndroid={'white'}
                                returnKeyLabel = {"next"}
                                onChangeText={(text) => this.setState({cardHolderEmail:text})}
                                value={this.state.cardHolderEmail}
                            />
                            <TextInput
                                    keyboardType="numeric"
                                    autoCorrect={false}
                                    autoCapitalize={"none"}
                                    style={styles.textInputStyles}
                                    placeholder="CVC"
                                    underlineColorAndroid={'white'}
                                    returnKeyLabel = {"next"}
                                    onChangeText={(text) => this.setState({cardCvc:text})}
                                    value={this.state.cardCvc}
                            />
                            <Text style={styles.sectionsHeadingStyles}>Expiration Date</Text>
                                {   Platform.OS == 'android' ?
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
                                        <Picker
                                            selectedValue={this.state.selectedMonth}
                                            onValueChange={(value)=>this.setState({selectedMonth:value})}
                                            style={[styles.androidPickerStyle,{backgroundColor:'rgb(200,200,200)'}]}
                                        >
                                            <Picker.Item label="1" value="1"/>
                                            <Picker.Item label="2" value="2"/>
                                            <Picker.Item label="3" value="3"/>
                                            <Picker.Item label="4" value="4"/>
                                            <Picker.Item label="5" value="5"/>
                                            <Picker.Item label="6" value="6"/>
                                            <Picker.Item label="7" value="7"/>
                                            <Picker.Item label="8" value="8"/>
                                            <Picker.Item label="9" value="9"/>
                                            <Picker.Item label="10" value="10"/>
                                            <Picker.Item label="11" value="11"/>
                                            <Picker.Item label="12" value="12"/>
                                        </Picker>
                                        < Picker
                                            selectedValue={this.state.selectedYear}
                                            onValueChange={(value)=>this.setState({selectedYear:value})}
                                            style={[styles.androidPickerStyle,{backgroundColor:'rgb(200,200,200)'}]}
                                        >
                                            <Picker.Item label="2017" value="2017" />
                                            <Picker.Item label="2019" value="2019" />
                                            <Picker.Item label="2020" value="2020" />
                                            <Picker.Item label="2021" value="2021" />
                                            <Picker.Item label="2023" value="2023" />
                                            <Picker.Item label="2024" value="2024" />
                                            <Picker.Item label="2025" value="2025" />
                                            <Picker.Item label="2026" value="2026" />
                                            <Picker.Item label="2027" value="2027" />
                                            <Picker.Item label="2028" value="2028" />
                                            <Picker.Item label="2029" value="2029" />
                                            <Picker.Item label="2030" value="2030" />
                                            <Picker.Item label="2031" value="2031" />
                                            <Picker.Item label="2032" value="2032" />
                                            <Picker.Item label="2033" value="2033" />
                                            <Picker.Item label="2034" value="2034" />
                                            <Picker.Item label="2035" value="2035" />
                                            <Picker.Item label="2036" value="2036" />
                                            <Picker.Item label="2037" value="2037" />
                                            <Picker.Item label="2038" value="2038" />
                                            <Picker.Item label="2039" value="2039" />
                                            <Picker.Item label="2040" value="2040" />
                                        </Picker>
                                    </View>
                                     :
                                    <View
                                        style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginTop:10}}
                                    >
                                        <TouchableOpacity
                                            style={styles.expiryButtonStyles}
                                            onPress={() => this.setState({monthModalState:true})}
                                        >
                                            <Text>{this.state.selectedMonth}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.expiryButtonStyles}
                                            onPress={() => this.setState({yearModalState:true})}
                                        >
                                            <Text>{this.state.selectedYear}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            <View style={styles.buttonSectionStyles}>
                                <TouchableOpacity
                                    style={styles.modalButtonsStyles}
                                    onPress={()=>{
                                        this.setState({modalState:true}, () => {this.makePayment()})
                                        //this.props.navigator.pop()
                                    }}
                                >
                                    <Text style={styles.modalButtonsTextStyles}>Start Free Trial</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    textInputStyles:{
        height:screenHeight/16,
        width:screenWidth,
        borderWidth:1,
        borderColor:'rgb(219,219,224)',
        marginBottom:10,
        backgroundColor:'white',
        padding:5,
        color:'rgb(80,80,80)'
    },
    modalButtonsStyles: {
        height:screenHeight/13,
        //height: Utility.getFontSize() == 50 ? 70 : 60,
        backgroundColor: 'rgb(233,234,238)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalButtonsTextStyles:{
        color:'rgb(0,133,248)',
        alignSelf:'center',
        fontWeight:'300',
        fontSize:Utility.getFontSize()===50?50*0.6:23*0.6
    },
    dividerCellStyles:{
        borderWidth:0.3,
        backgroundColor:'rgb(233,234,238)'
    },
    animatedSectionStyles:{
        height:Utility.getFontSize()===50?240:100,
        width:Utility.getFontSize()===50?240:120,
        alignSelf:'center',
        marginTop:10,
        marginBottom:10
    },
    sectionsHeadingStyles:{
        color:'rgb(30,30,30)',
        alignSelf:'flex-start',
        fontSize:Utility.getFontSize()===50?50*0.4:23*0.65,
        marginLeft:5
    },
    buttonSectionLayoutStyles:{
        height:screenHeight/6,
        marginTop:15
    },
    buttonSectionStyles:{
        justifyContent:'space-around',
        backgroundColor:'white',
        marginTop:20,
        height:screenHeight/9,
        paddingTop:screenHeight/20,
        paddingBottom:screenHeight/20,
        paddingRight:screenWidth/20,
        paddingLeft:screenWidth/20
    },
    expiryButtonStyles:{
        height:screenHeight/13,
        width:screenWidth/2.5,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:"rgb(200,200,200)",
        borderRadius:screenHeight/26,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    androidPickerStyle:{
        height:screenHeight/13,
        width:screenWidth/2.5,
        backgroundColor:'white'
    }
})