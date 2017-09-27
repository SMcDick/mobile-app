/**
 * Created by chicmic on 21/02/17.
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
    Platform,
    Dimensions,
    Animated,
    Modal,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import Utility from './Utility'
import Constants from './Constants'
import ElasticSearch from './Apis/ElasticSearch'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import AccoutDetails from './AccountDetails'
import TriggersMainScreen from './TriggersMainScreen'


const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
export default class SideMenu extends Component{
    constructor(){
        super();
        this.state={
            modalVisible:false,
            marginOfModal: new Animated.Value((screenWidth))
        }
    }
    componentWillMount(){
        this.setState({modalVisible:true});
        Animated.timing(
            this.state.marginOfModal,
             {
                 toValue:0,
                 duration:300
             }
        ).start();
    }
    closeSideMenu(){
        Animated.timing(
            this.state.marginOfModal,
            {
                toValue:(screenWidth),
                duration:300
            }
        ).start(()=>{
            this.setState({modalVisible:false})
            this.props.setShowSideMenuState()
        });


    }

    validateToken(){
        this.closeSideMenu();
        fetch('http://zen-mobile-backend.herokuapp.com/users/' + LocalStorageSettingsApi.userID , {
            method: "GET",
            headers: {
                'X_AUTH_TOKEN': LocalStorageSettingsApi.accessToken
            }
        }).then((response) => {
            response = response['_bodyInit']
            response = JSON.parse(response)
            //console.log("12345" + JSON.stringify(response))
                if (response.status == 200) {
                    this.props.navigator.push({name: 'Agreement', prevScreen: 'Back'})
                } else {
                    this.props.navigator.push({name: 'AccountDetails', prevScreen: 'Back'})
                }
            //console.log("Login Response" + JSON.stringify(response))
        });
        //this.props.navigator.push({name:'Accounts',prevScreen:'Back'})
    }

    render(){
        return(
            <Modal
                animationType={'none'}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose = {()=>{}}
            >
                <Animated.View
                    style={[{transform:[{translateX:this.state.marginOfModal}]}, {flex:1}]}
                >
                    <View style={{flex:1, zIndex:1, height:screenHeight, width:screenWidth}}>
                    <TouchableOpacity

                        style={{flex:1, zIndex:1, height:screenHeight, width:screenWidth}}
                        onPress={()=>this.closeSideMenu()}
                    />
                    </View>
                    <View style={{backgroundColor:'floralwhite', position:'absolute', zIndex:2, top:40, right:0, borderWidth:0, borderColor:'purple', justifyContent:'flex-start', padding:10}}>
                            

                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=>{
                                    this.closeSideMenu()
                                    this.props.navigator.push({name:'Download',prevScreen:'Back'})
                                }}>
                                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.download}</FontAwesome>
                                    <Text style={styles.touchableContentStyles}>Download</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=>{
                                    this.props.navigator.push({name:'Settings',prevScreen:'Back'})
                                    this.closeSideMenu()
                                }}
                            >
                                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.gears}</FontAwesome>
                                    <Text style={styles.touchableContentStyles}>Settings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=>{
                                    this.props.navigator.push({name:'TriggersMainScreen',prevScreen:'Back'})
                                    this.closeSideMenu()
                                }}
                            >
                                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.playCircle}</FontAwesome>
                                    <Text style={styles.touchableContentStyles}>Triggers</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigator.push({name:'Category',prevScreen:'Back'})
                                    this.closeSideMenu()
                                }}
                                style={styles.touchableStyles}>
                                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.lineChart}</FontAwesome>
                                    <Text style={styles.touchableContentStyles}>FBA X-Ray</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{
                                this.props.navigator.push({name:'AccountDetails',prevScreen:'Back'})
                                this.closeSideMenu()
                            }}
                            style={styles.touchableStyles}>
                                <FontAwesome style={styles.fontAwesomeStyles}>{Icons.user}</FontAwesome>
                                <Text style={styles.touchableContentStyles}>Account</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=>{
                                this.closeSideMenu()
                                this.props.navigator.push({name:'Resources',prevScreen:'Back'})
                            }}
                            >
                                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.youtube}</FontAwesome>
                                    <Text style={styles.touchableContentStyles}>Resources</Text>
                            </TouchableOpacity>



                            <TouchableOpacity
                                style={[styles.touchableStyles, {borderBottomWidth:1, borderBottomColor:Constants.ZenBlue1}]}
                            onPress = {()=>{
                                 return(Linking.openURL(Constants.storeLink))
                            }}
                            >
                                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.bullseye}</FontAwesome>
                                    <Text style={styles.touchableContentStyles}>   Source</Text>
                            </TouchableOpacity>

    
                    </View>
                </Animated.View>
            </Modal>
       )
    }
}

var styles=StyleSheet.create({
    touchableStyles:{
        //flex:1,
        //justifyContent:'center',
        //alignItems:'center',
        flexDirection: 'row',
        justifyContent:'flex-start',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor: 'floralwhite',
        padding:10,
        width:screenWidth*0.6,
        //borderRadius:10,
        //marginTop: 15,
        borderTopWidth:1,
        borderTopColor:Constants.ZenBlue1,
        //margin:10
    },
    touchableContentStyles:{
        color:'darkorchid',
        fontWeight:'500',
        fontSize:Utility.getFontSize()*0.6
    },
    fontAwesomeStyles:{
        color:'darkorchid',
        fontSize:Utility.getFontSize()*1.5
    },
});
