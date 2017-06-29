/**
 * Created by chicmic on 21/02/17.
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
    InteractionManager,
    Platform,
Alert
} from 'react-native';
import NavigationBar from './scenesNavBar'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import Constants from './Constants'
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import Utility from './Utility'
import NetworkConnectivity from './NetworkConnectivity'
const screenWidth=Dimensions.get('window').width;
export default class Settings extends Component{
    constructor(){
        super()
        this.state = {
            automaticFBAPage : LocalStorageSettingsApi.showFBAAutomatically,
            allOffersPage: LocalStorageSettingsApi.showAllOffers,
            landedPriceWithShipping  :LocalStorageSettingsApi.ShowLandedPriceWithShipping,
            productQuantity  : LocalStorageSettingsApi.DisplayProductQuantity,
            productCondition : LocalStorageSettingsApi.DisplayProductCondition,
            tradeValue : LocalStorageSettingsApi.DisplayTradeValueInColumn,
            enableTriggers : LocalStorageSettingsApi.EnableTriggers,
            alertIfRestricted : LocalStorageSettingsApi.ShowAlertIfRestricted,

            //automaticFBAPage : LocalStorageSettingsApi.showFBAAutomatically,
            //landedPriceWithShipping  :false,
            //productQuantity  : false,
            //productCondition : false,
            //tradeValue : false,
            //enableTriggers : false,
            //alertIfRestricted :false,
        }
        LocalStorageSettingsResponse.getInstance().setReceiver(this);

    }

    componentWillMount(){
       /* InteractionManager.runAfterInteractions(()=>{
         LocalStorageSettingsResponse.getInstance().setReceiver(this);
         this.fetchUserDefaults();})*/
        //setTimeout(()=>{LocalStorageSettingsResponse.getInstance().setReceiver(this);
        //this.fetchUserDefaults();},100)
    }

    onValueChangeCallback(result,key){
        switch (key){
            case Constants.kKeyForFBAOffersPageAutomatically:{
                LocalStorageSettingsApi.setShowFBAOffersPageAutomatically(result)
                break;
            }
            case Constants.kKeyForAllAmazonOffersPage:{
                LocalStorageSettingsApi.setAllAmazonOffersPage(result)
                break;
            }
            case Constants.kKeyForDisplayCondition:{
                LocalStorageSettingsApi.setDisplayProductCondition(result)
                break;
            }
            case Constants.kKeyForDisplayQuantity:{
                LocalStorageSettingsApi.setDisplayProductQuantity(result)
                break;
            }
            case Constants.kKeyForDisplayTradeValue:{
                LocalStorageSettingsApi.setDisplayTradeValueInColumn(result)
                break;
            }
            case Constants.kKeyForEnableTriggers:{
               LocalStorageSettingsApi.setEnableTriggers(result)
                break;
            }
            case Constants.kKeyForRestricted:{
                LocalStorageSettingsApi.setShowAlertIfRestricted(result)
                break;
            }
            case Constants.kKeyForLandedPrice:{
                LocalStorageSettingsApi.setShowLandedPriceWithShipping(result)
                break;
            }
            default:
                break

        }

    }


     localStorageSettingsResponseSuccessCallback(result,key){
        switch (key){
            case Constants.kKeyForFBAOffersPageAutomatically:{
                this.setState({automaticFBAPage:result})
                break;
            }
            case Constants.kKeyForAllAmazonOffersPage:{
                this.setState({allOffersPage:result})
                break;
            }
            case Constants.kKeyForDisplayCondition:{
                this.setState({productCondition:result})
                break;
            }
            case Constants.kKeyForDisplayQuantity:{
                this.setState({productQuantity:result})
                break;
            }

            case Constants.kKeyForEnableTriggers:{
                this.setState({enableTriggers:result})
                break;
            }
            case Constants.kKeyForRestricted:{
                this.setState({alertIfRestricted:result})
                break;
            }
            case Constants.kKeyForLandedPrice:{
                this.setState({landedPriceWithShipping:result})
                break;
            }

            default:
                break

        }
    }

    /*changeState(result,key){
        switch (key){
            case Constants.kKeyForFBAOffersPageAutomatically:{
                this.setState({automaticFBAPage:result})
                break;
            }
            case Constants.kKeyForDisplayCondition:{
                this.setState({productCondition:result})
                break;
            }
            case Constants.kKeyForDisplayQuantity:{
                this.setState({productQuantity:result})
                break;
            }
            case Constants.kKeyForDisplayTradeValue:{
                this.setState({tradeValue:result})
                break;
            }
            case Constants.kKeyForEnableTriggers:{
                this.setState({enableTriggers:result})
                break;
            }
            case Constants.kKeyForRestricted:{
                this.setState({alertIfRestricted:result})
                break;
            }
            case Constants.kKeyForLandedPrice:{
                this.setState({landedPriceWithShipping:result})
                break;
            }
            default:
                break

        }
    }*/

   /* localStorageSettingsResponseSuccessCallback(result, key)
    {
        switch (key) {
            case Constants.kKeyIsFirstTimeLaunch:
            {
                if (JSON.stringify(result) == Constants.kTrue) {
                    DataBase.getInstance().openDatabaseFromLocation()
                    LocalStorageSettingsApi.setIsAppFirstTimeLaunch(Constants.kFalse)
                }else{
                    DataBase.getInstance().openDatabase()
                }
            }

        }
    }*/



    alertFunction(){
        if( NetworkConnectivity.getInstance().internetAvailable==false)
            alert("No Internet Connection")
                Alert.alert(
                    'Restricted Item Notification',
                    'Login to your Amazon account so program can notify you if an item is restricted on your account. You can enable or disable this feature in\n' +
                    'Menu->Settings->Show',
                    [
                        {
                            text: 'Cancel', onPress: () => {
                            this.onValueChangeCallback('false', Constants.kKeyForRestricted)
                        }
                        },
                        {
                            text: 'Login', onPress: () => {
                            this.props.navigator.push({name: 'Amazon Login Page', prevScreen: 'Back'})
                        }
                        }
                    ]
                )
    }

    alertFunctionForFBAandOffers(key){
        Alert.alert(
            " ",
            'Please choose either "Autoshow FBA Mode" or "Autoshow All Amazon Offers Page", not both',
                [
                    {
                    text: 'OK', onPress: () => {
                    this.onValueChangeCallback('false', key)
                    }
                    }
                ]
            )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <View style={styles.scrollviewContainer}>
                    <ScrollView>
                        <View style={styles.grayCellstyles}/>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Autoshow FBA Mode</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForFBAOffersPageAutomatically)
                                     //this.changeState(value,Constants.kKeyForFBAOffersPageAutomatically)
                                        if(JSON.stringify(value) === 'true'){
                                            if(LocalStorageSettingsApi.showAllOffers === true){
                                                this.alertFunctionForFBAandOffers(Constants.kKeyForFBAOffersPageAutomatically)
                                            }
                                        }
                                    }}
                                    value={this.state.automaticFBAPage}
                                />
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Autoshow All Amazon Offers Page</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                        this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForAllAmazonOffersPage)
                                        //this.changeState(value,Constants.kKeyForAllAmazonOffersPage)
                                        if(JSON.stringify(value) === 'true'){
                                            if(LocalStorageSettingsApi.showFBAAutomatically === true){
                                                this.alertFunctionForFBAandOffers(Constants.kKeyForAllAmazonOffersPage)
                                            }
                                        }
                                    }}
                                    value={this.state.allOffersPage}
                                />
                            </View>
                        </View>

                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Landed Price (Add Shipping)</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForLandedPrice)
                                    //this.changeState(value,Constants.kKeyForLandedPrice)
                                    }}
                                    value={this.state.landedPriceWithShipping}
                                />
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Alert If Restricted</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForRestricted)
                                    //this.changeState(value,Constants.kKeyForRestricted)
                                    if(JSON.stringify(value) === 'true'){

                                        if(LocalStorageSettingsApi.IsAmazonSellerLoggedIn === false){
                                            //alert('IsAmazonSellerLoggedIn = '+ LocalStorageSettingsApi.IsAmazonSellerLoggedIn)
                                             this.alertFunction()
                                        }
                                    }

                                    }}
                                    value={this.state.alertIfRestricted}
                                />
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Enable Triggers</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForEnableTriggers)
                                    //this.changeState(value,Constants.kKeyForEnableTriggers)
                                    }}
                                    value={this.state.enableTriggers}
                                />
                            </View>
                        </View>

                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Display Condition</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForDisplayCondition)
                                    //this.changeState(value,Constants.kKeyForDisplayCondition)
                                    }}
                                    value={this.state.productCondition}
                                />
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Display Item Quantity</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForDisplayQuantity)
                                   // this.changeState(value,Constants.kKeyForDisplayQuantity)
                                    }}
                                    value={this.state.productQuantity}
                                />
                            </View>
                        </View>


                    </ScrollView>
                </View>
            </View>
        )
    }

    componentWillUnmount(){
        //alert("unmounting Settings")
        LocalStorageSettingsResponse.getInstance().removeReceiver(this)
    }
}
const styles=StyleSheet.create({
    scrollviewContainer:{
        flex:1,
        backgroundColor:'rgb(233,234,238)'
    },
    grayCellstyles:{
        height:50,
        backgroundColor:'rgb(233,234,238)',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)'
    },
    cellStyles:{
        height:50,
        flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)',
        backgroundColor:'rgb(255,255,255)'
    },
    cellInnerLeftViewStyle:{
        flex:2,
        justifyContent:'center',
        paddingLeft:screenWidth/20
    },
    cellTextStyle:{
        fontWeight:'300',
        color:'rgb(60,60,60)',
        fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
    },
    switchViewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

