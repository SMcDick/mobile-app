/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

} from 'react-native';

import NavigationExperimental from 'react-native-deprecated-custom-components'

import MainScreen from './MainScreen'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import Settings from './settings'
import Download from './download'
import Mode from './mode'
import Account from './account'
import NewUserRegistration from './newuserRegistration'
import AmazonLoginWebView from './AmazonLoginWebView'
import Category from './category'
import Triggers from './Triggers'
import Constants from './Constants'
import DataBase from './Apis/DatabaseLocalApi'
import BuyTriggers from './BuyTriggers'
import Agreement from './Agreement'
import Payments from './Payments'
import AccountDetails from './AccountDetails'
import TriggersMainScreen from './TriggersMainScreen'
import IndividualTriggers from './IndividualTriggers'
import HistoricalAnalytics from './HistoricalAnalytics'
import StripePayment from "./stripePayment";
import Resources from './Resources'
import Video from './video'
import TradeInOnly from './TradeInOnly'
import StreamlineScreen from './StreamlineScreen'
import Swiper from 'react-native-swiper';


export default class FBAscanner extends Component{
    constructor(props) {
        super(props)
        this.state={
            isLoading:"true",
            isLoggedIn:"false",
            isPaid:"false",
            displayMode:null,
        }
        this.currentTime = Date.now()
        LocalStorageSettingsResponse.getInstance().setReceiver(this);
       //LoginResponse.getInstance().setReceiver(this);
        LocalStorageSettingsApi.getIsAppFirstTimeLaunch();
        LocalStorageSettingsApi.getIsUserLoggined();
        LocalStorageSettingsApi.getIsUserPaid();
        LocalStorageSettingsApi.getIsTrialPeriod();
        LocalStorageSettingsApi.getTotalScansDoneInTrial();
        LocalStorageSettingsApi.getDisplayValue();

    }

    localStorageSettingsResponseSuccessCallback(result, key) {
        switch (key) {
            case Constants.kKeyIsFirstTimeLaunch:
            {
                if (JSON.stringify(result) == Constants.kTrue) {
                    //console.log("****************************kKeyIsFirstTimeLaunch true")
                    DataBase.getInstance().openDatabaseFromLocation()
                    LocalStorageSettingsApi.setIsAppFirstTimeLaunch(Constants.kFalse)
                } else {
                    //console.log("****************************kKeyIsFirstTimeLaunch false")
                    DataBase.getInstance().openDatabase()
                }
                break;
            }
            //break;
            case Constants.KkeyforIsUserLoggined:
            {
                if (JSON.stringify(result) == Constants.kTrue) {
                    //console.log("############################################ yes loggined")
                    this.setState({isLoggedIn: "true", isLoading:"true"});
                } else {
                    //console.log("###########################################  not loggined")
                    this.setState({isLoggedIn: "false", isLoading:"true"});
                }
                break;
            }
            case Constants.KkeyforIsUserPaid:
             {
                 if (JSON.stringify(result) == Constants.kTrue) {
                     //console.log("############################################ yes loggined")
                     this.setState({isPaid: "true", isLoading:"true"});
                 } else {
                     //console.log("###########################################  not loggined")
                     this.setState({isPaid: "false", isLoading:"true"});
                 }
                 break;
             }
            //break;
            case Constants.kKeyForTrialPeriod:
            {
                    if (result == null) {
                        let currentTime = JSON.stringify(Date.now());
                        LocalStorageSettingsApi.setIsTrialPeriod(currentTime)
                    } else {
                        if ((this.currentTime - JSON.parse(LocalStorageSettingsApi.isTrialPeriod)) > 2592000000) {
                            Constants.IsTrialPeriodValid = false
                        }
                    }
            }
            case Constants.kKeyForDisplayValue:
             {
                //alert("display"+JSON.stringify(result));
                switch (result)
                {
                     case Constants.DisplayMode.kFullDataDisplay:
                          this.setState({displayMode: Constants.DisplayMode.kFullDataDisplay, isLoading: "false"});
                          break;
                     case Constants.DisplayMode.kStreamLineDisplay:
                          this.setState({displayMode: Constants.DisplayMode.kStreamLineDisplay, isLoading: "false"});
                          break;
                    case Constants.DisplayMode.kVisualDisplay:
                          this.setState({displayMode: Constants.DisplayMode.kVisualDisplay, isLoading: "false"});
                          break;
                    case Constants.DisplayMode.kTradeInDisplay:
                          this.setState({displayMode: Constants.DisplayMode.kTradeInDisplay, isLoading: "false"});
                          break;
                    default:
                          this.setState({isLoading: "true"});
                          break;
                }
             }
        }
    }

    render() {
        if(this.state.isLoading=="true" || this.state.displayMode===null)
            return  (<View><Text style={{padding:100}}></Text></View>)

        else{
            var initialRoute1 = "";
            var mainScreen = "MainScreen";
            //console.log("****************************render " + LocalStorageSettingsApi.isUserLoggined)
            if (this.state.isLoading== "false") {
                if (LocalStorageSettingsApi.isUserLoggined == "false") {
                    //console.log("************************" + this.state.isLoading + "**********************" + this.state.isLoggedIn + "initialRoute = Account")
                    //initialRoute1 = "NewUserRegistration";
                    //initialRoute1 = "HistoricalAnalytics";
                    //initialRoute1 = "TradeInOnly";
                    initialRoute1 = "MainScreen";

                }
                else {
                    //console.log("************************" + this.state.isLoading + "**********************" + this.state.isLoggedIn+ "initialRoute = MainScreen")
                    //console.log("************************" + this.state.isLoading + "**********************" + this.state.isPaid + "initialRoute = Account")
                    
                    // Different DisplayValue values (set in settings) go to different screens
                    initialRoute1 = "MainScreen"
                    switch (this.state.displayMode) {
                        case Constants.DisplayMode.kFullDataDisplay:
                        alert("main screen");
                            mainScreen = "MainScreen";
                            break;
                        case Constants.DisplayMode.kStreamLineDisplay:
                        alert("streamline");
                            mainScreen = "StreamlineScreen";
                            break;
                        case Constants.DisplayMode.kVisualDisplay:
                            mainScreen = "VisualScreen";
                            break;
                        case Constants.DisplayMode.kTradeInDisplay:
                        alert("streamline");
                            mainScreen = "TradeInOnly";
                            break;
                        default:
                            mainScreen = "MainScreen";
                            break;
                    }
                    
                }
            }
            else{
                //console.log("****************** delay in set state")
            }

            return (
                <NavigationExperimental.Navigator
                    initialRoute={{name: initialRoute1}}
                    renderScene={(route, navigator) => {
                        if (route.name === 'Account')
                            return (<Account navigator={navigator} route={route}/>)
                        if (route.name === 'NewUserRegistration')
                            return (<NewUserRegistration navigator={navigator} route={route}/>)
                        if (route.name === 'MainScreen'){
                            switch (this.state.displayMode) {
                                case Constants.DisplayMode.kFullDataDisplay:
                                    return (<Swiper style={styles.wrapper} showsButtons={false}>
                                                <View style={styles.slideStyle}>
                                                  <MainScreen navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <HistoricalAnalytics navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <MainScreen navigator={navigator} route={route}/>
                                                </View>

                                            </Swiper>
                                            );
                                case Constants.DisplayMode.kStreamLineDisplay:
                                    return (<Swiper style={styles.wrapper} showsButtons={false}>
                                                <View style={styles.slideStyle}>
                                                  <StreamlineScreen navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <HistoricalAnalytics navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <MainScreen navigator={navigator} route={route}/>
                                                </View>

                                            </Swiper>
                                            );

                                case Constants.DisplayMode.kVisualDisplay:
                                    return (<Swiper style={styles.wrapper} showsButtons={false}>
                                                <View style={styles.slideStyle}>
                                                  <VisualScreen navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <HistoricalAnalytics navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <MainScreen navigator={navigator} route={route}/>
                                                </View>

                                            </Swiper>
                                            );
                                case Constants.DisplayMode.kTradeInDisplay:
                                    return (<Swiper style={styles.wrapper} showsButtons={false}>
                                                <View style={styles.slideStyle}>
                                                  <TradeInOnly navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <MainScreen navigator={navigator} route={route}/>
                                                </View>
                                                <View style={styles.slideStyle}>
                                                  <HistoricalAnalytics navigator={navigator} route={route}/>
                                                </View>

                                            </Swiper>
                                                  );

                                default:
                                alert("default");
                                    return (<View><Text style={{padding:100}}></Text></View>);
                            }

                        }
                        if (route.name === 'TradeInOnly')
                            return (<TradeInOnly navigator={navigator} route={route}/>)
                        if (route.name === 'Settings')
                            return (<Settings navigator={navigator} route={route}/>)
                        if (route.name === 'Download')
                            return (<Download navigator={navigator} route={route}/>)
                        if (route.name === 'Operating Mode')
                            return (<Mode navigator={navigator} route={route}/>)
                        if (route.name === 'Accounts')
                            return (<Account navigator={navigator} route={route}/>)
                        if (route.name === 'New User Registration')
                            return (<Registration navigator={navigator} route={route}/>)
                        if (route.name === 'Amazon Login Page')
                            return (<AmazonLoginWebView navigator={navigator} route={route}/>)
                        if (route.name === 'Category')
                            return (<Category navigator={navigator} route={route}/>)
                        if (route.name === 'Triggers')
                            return (<Triggers navigator={navigator} route={route}/>)
                        if (route.name === 'Buy Triggers')
                            return (<BuyTriggers navigator={navigator} route={route}/>)
                        if (route.name === 'Agreement')
                            return (<Agreement navigator={navigator} route={route}/>)
                        if (route.name === 'Payments')
                            return (<Payments navigator={navigator} route={route}/>)
                        if (route.name === 'AccountDetails')
                            return (<AccountDetails navigator={navigator} route={route}/>)
                        if (route.name === 'TriggersMainScreen')
                            return (<TriggersMainScreen navigator={navigator} route={route}/>)
                        if (route.name === 'IndividualTriggers')
                            return (<IndividualTriggers navigator={navigator} route={route}/>)
                        if (route.name === 'HistoricalAnalytics')
                            return (<HistoricalAnalytics navigator={navigator} route={route}/>)
                        if(route.name == "Card Payment")
                            return ( <StripePayment navigator={navigator} route={route}/> )
                        if(route.name == "Resources")
                            return ( <Resources navigator={navigator} route={route} />)
                        if( route.name == "Video" )
                            return( <Video navigator={navigator} route={route} />)
                    }}
                    configureScene={(route, routeStack) => NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom}
                />
            )
        }
    }
}

var styles = StyleSheet.create({
  wrapper: {
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});