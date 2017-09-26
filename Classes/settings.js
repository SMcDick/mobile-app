
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
    Image,
    TouchableOpacity,
Alert
} from 'react-native';
import NavigationBar from './scenesNavBar'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import Constants from './Constants'
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import Utility from './Utility'
import NetworkConnectivity from './NetworkConnectivity'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import RadioButton from 'radio-button-react-native';
import RadioForm from 'radio-button-react-native';
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
            scanningModeValue: 0,
            dataLevelValue: 0,
            displayValue:0,


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

    handleScanningModeOnPress(value){
        this.setState({scanningModeValue:value})
        //alert('value:'+this.state.scanningModeValue);
    }

    handleDataLevelOnPress(value){
        this.setState({dataLevelValue:value})
        //alert('data level value:'+this.state.dataLevelValue);
    }
    handleDisplayOnPress(value){
        this.setState({displayValue:value})
        //alert('display value:'+this.state.displayValue);
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
                <View style={[{flexDirection:'row'},{justifyContent:'center'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={styles.ZenLogoStyle}/>
                </View>

                <View style={[styles.HeaderBarStyle,{alignItems:'center', justifyContent:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:10}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            onPress={()=>{this.props.navigator.push({name:"MainScreen",prevScreen:"Settings"})}}
                            activeOpacity={0.8}
                            style={styles.registerTouchableStyle}
                        >
                            <FontAwesome style={styles.fontAwesomeStyles}>{Icons.chevronLeft}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.HeaderBarTextStyle}> Settings</Text>
                    </View>
                    </View>
                </View>

                <View style={styles.scrollviewContainer}>
                    <ScrollView>
                        <View style={styles.grayCellstyles}>
                            <Text style={styles.SubheaderTextStyle}>Preferences</Text>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Autoshow FBA Mode</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    tintColor={Constants.ZenGreen}
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
                                    tintColor={Constants.ZenGreen}
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
                                <Text style={styles.cellTextStyle}>Alert If Restricted</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <Switch
                                    tintColor={Constants.ZenGreen}
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
                                    tintColor={Constants.ZenGreen}
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
                                    tintColor={Constants.ZenGreen}
                                    onValueChange={(value)=> {
                                    this.onValueChangeCallback(JSON.stringify(value),Constants.kKeyForDisplayCondition)
                                    //this.changeState(value,Constants.kKeyForDisplayCondition)
                                    }}
                                    value={this.state.productCondition}
                                />
                            </View>
                        </View>
                            <View style={styles.grayCellstyles}>
                                <Text style={styles.SubheaderTextStyle}>Scanning mode</Text>
                            </View>
                            <View style={styles.cellStyles}>
                                <View style={styles.cellInnerLeftViewStyle}>
                                    <Text style={styles.cellTextStyle}>Download</Text>
                                </View>
                                <View style={styles.switchViewStyle}>
                                    <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.scanningModeValue} value={0} onPress={this.handleScanningModeOnPress.bind(this)}/>
                                </View>
                            </View>
                            <View style={styles.cellStyles}>
                                <View style={styles.cellInnerLeftViewStyle}>
                                    <Text style={styles.cellTextStyle}>Live</Text>
                                </View>
                                <View style={styles.switchViewStyle}>
                                    <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.scanningModeValue} value={1} onPress={this.handleScanningModeOnPress.bind(this)}/>
                                </View>
                            </View>
                            <View style={styles.cellStyles}>
                                <View style={styles.cellInnerLeftViewStyle}>
                                    <Text style={styles.cellTextStyle}>Download+Live</Text>
                                </View>
                                <View style={styles.switchViewStyle}>
                                    <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.scanningModeValue} value={2} onPress={this.handleScanningModeOnPress.bind(this)}/>
                                </View>
                            </View>

                        <View style={styles.grayCellstyles}>
                            <Text style={styles.SubheaderTextStyle}>Data Level</Text>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Full Data</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.dataLevelValue} value={0} onPress={this.handleDataLevelOnPress.bind(this)}/>
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Stream Line (essential only)</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.dataLevelValue} value={1} onPress={this.handleDataLevelOnPress.bind(this)}/>
                            </View>
                        </View>
                        <View style={styles.grayCellstyles}>
                            <Text style={styles.SubheaderTextStyle}>Display</Text>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Data Display</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.displayValue} value={0} onPress={this.handleDisplayOnPress.bind(this)}/>
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Visual Display</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.displayValue} value={1} onPress={this.handleDisplayOnPress.bind(this)}/>
                            </View>
                        </View>
                        <View style={styles.cellStyles}>
                            <View style={styles.cellInnerLeftViewStyle}>
                                <Text style={styles.cellTextStyle}>Trade In Only</Text>
                            </View>
                            <View style={styles.switchViewStyle}>
                                <RadioButton innerCircleColor={Constants.ZenSwitchesColor} outerCircleColor={Constants.ZenSwitchesBackColor} currentValue={this.state.displayValue} value={2} onPress={this.handleDisplayOnPress.bind(this)}/>
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
    ZenLogoStyle:{
        width:250,
        height:30,
    },
    HeaderBarStyle:{
        height:70,
        backgroundColor:Constants.ZenBlue1,
        width:screenWidth,
        alignItems:'center',
        //flexDirection:'row'
    },
    HeaderBarTextStyle:{
        color:'white',//'skyblue',
        fontWeight:'700',
        fontSize:Utility.getFontSize()
    },
    SubheaderTextStyle:{
        color:Constants.ZenGreen,
        padding:10,
        fontSize:Utility.getFontSize()*0.7
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
    },
    fontAwesomeStyles:{
        color:'white',
        fontSize:Utility.getFontSize()*0.7
    },
});

