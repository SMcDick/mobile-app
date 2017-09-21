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
                    <View style={{flex:1,flexDirection:'column',backgroundColor:'#007eaf', justifyContent:'center', align:'center', padding:10}}>
                            
                        <View style={{flex:1, flexDirection: 'row'}}>
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
                                    this.closeSideMenu()
                                    this.props.navigator.push({name:'Operating Mode',prevScreen:'Back'})
                                }}
                            >
                                <FontAwesome style={styles.fontAwesomeStyles}>{Icons.wrench}</FontAwesome>
                                <Text style={styles.touchableContentStyles}>Operating Mode</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row', flex:1}}>
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
                                onPress={()=>{
                                    this.props.navigator.push({name:'Category',prevScreen:'Back'})
                                    this.closeSideMenu()
                                }}
                                style={styles.touchableStyles}>
                                <FontAwesome style={styles.fontAwesomeStyles}>{Icons.lineChart}</FontAwesome>
                                <Text style={styles.touchableContentStyles}>FBA X-Ray</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', flex:1}}>
                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=>{
                                    this.props.navigator.push({name:'Buy Triggers',prevScreen:'Back'})
                                    this.closeSideMenu()
                                }}
                            >
                                <FontAwesome style={styles.fontAwesomeStyles}>{Icons.playCircle}</FontAwesome>
                                <Text style={styles.touchableContentStyles}>Triggers</Text>
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
                        </View>

                        <View style={{flexDirection: 'row', flex:1}}>
                            <TouchableOpacity
                                style={styles.touchableStyles}
                            onPress = {()=>{
                                 return(Linking.openURL(Constants.storeLink))
                            }}
                            >
                                <FontAwesome style={styles.fontAwesomeStyles}>{Icons.pencil}</FontAwesome>
                                <Text style={styles.touchableContentStyles}>Review</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.touchableStyles}
                                onPress={()=> this.validateToken()}
                            >
                                <FontAwesome style={styles.fontAwesomeStyles}>{Icons.user}</FontAwesome>
                                <Text style={styles.touchableContentStyles}>Account</Text>
                            </TouchableOpacity>
                        </View>
    
                    </View>
                </Animated.View>
            </Modal>
        )
    }
}

var styles=StyleSheet.create({
    touchableStyles:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#0092cc',
        borderRadius:10,
        //marginTop: 15,
        margin:10
    },
    touchableContentStyles:{
        color:'white',
        fontWeight:'500',
        fontSize:Utility.getFontSize()*0.6
    },
    fontAwesomeStyles:{
        color:'white',
        fontSize:Utility.getFontSize()*1.5
    },
});
