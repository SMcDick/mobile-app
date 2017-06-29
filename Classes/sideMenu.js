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


const screenWidth=Dimensions.get('window').width;
export default class SideMenu extends Component{
    constructor(){
        super();
        this.state={
            modalVisible:false,
            marginOfModal: new Animated.Value(-screenWidth)
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
                toValue:-screenWidth,
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
                    this.props.navigator.push({name: 'Accounts', prevScreen: 'Back'})
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
                    style={{flex:1,transform:[{translateX:this.state.marginOfModal}]}}
                >
                    <TouchableOpacity
                        style={{height:70}}
                        onPress={()=>this.closeSideMenu()}
                    />
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View
                            style={styles.sideMenuStyles}
                        >
                            <View style={{flex:3}}>
                                <TouchableOpacity
                                    style={styles.touchableStyles}
                                    onPress={()=>{
                                        this.closeSideMenu()
                                        this.props.navigator.push({name:'Download',prevScreen:'Back'})
                                    }}
                                >
                                    <Text style={styles.touchableContentStyles}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.touchableStyles}
                                    onPress={()=>{
                                        this.closeSideMenu()
                                        this.props.navigator.push({name:'Operating Mode',prevScreen:'Back'})
                                    }}
                                >
                                    <Text style={styles.touchableContentStyles}>Operating Mode</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.touchableStyles}
                                    onPress={()=>{
                                        this.props.navigator.push({name:'Settings',prevScreen:'Back'})
                                        this.closeSideMenu()
                                    }}
                                >
                                    <Text style={styles.touchableContentStyles}>Settings</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:2}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.props.navigator.push({name:'Category',prevScreen:'Back'})
                                        this.closeSideMenu()
                                    }}
                                    style={styles.touchableStyles}>
                                    <Text style={styles.touchableContentStyles}>FBA X-Ray</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.touchableStyles}
                                    onPress={()=>{
                                        this.props.navigator.push({name:'Buy Triggers',prevScreen:'Back'})
                                        this.closeSideMenu()
                                    }}
                                >
                                    <Text style={styles.touchableContentStyles}>Triggers</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:4}}>
                                <TouchableOpacity
                                    style={styles.touchableStyles}
                                    onPress={()=>{
                                    this.closeSideMenu()
                                    this.props.navigator.push({name:'Resources',prevScreen:'Back'})
                                }}
                                >
                                    <Text style={styles.touchableContentStyles}>Resources</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.touchableStyles}
                                onPress = {()=>{
                                     return(Linking.openURL(Constants.storeLink))
                                }}
                            >
                                <Text style={styles.touchableContentStyles}>Review</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=> this.validateToken()}
                            >
                                <Text style={styles.touchableContentStyles}>Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableStyles} onPress={()=>this.closeSideMenu()}>
                                <Text style={styles.touchableContentStyles}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={()=>this.closeSideMenu()}
                    />
                    </View>
                </Animated.View>
            </Modal>
        )
    }
}

var styles=StyleSheet.create({
    sideMenuStyles:{
        flex:2,
        backgroundColor:'rgb(0,163,238)'
    },
    touchableStyles:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    touchableContentStyles:{
        color:'white',
        fontWeight:'500',
        fontSize:Utility.getFontSize()*0.6
    },
});
