/**
 * Created by chicmic on 31/05/17.
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
    ScrollView,
    WebView
} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Payments from './Payments'
//import YouTube from 'react-native-youtube'
import Resources from './Resources'

export default class Video extends Component{
    constructor(){
        super();
        this.state={
            webViewSpinner:true
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Modal
                    visible={this.state.webViewSpinner}
                    transparent={true}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size="small" />
                    </View>
                </Modal>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                {/*<View style={{paddingHorizontal:screenWidth/50}} >
                    <YouTube

                        apiKey="AIzaSyCZs5LGQYP8EL8uQvvpO6SA-cFZs8kHw30"
                        videoId={this.props.route.videoId}           // The YouTube video ID
                        //playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
                        play={true}                     // control playback of video with true/false
                        fullscreen={false}               // control whether the video should play in fullscreen or inline
                        loop={true}                     // control whether the video should loop when ended

                        onError={e => alert(e.error )}
                        style={{height: screenHeight/3, backgroundColor: 'black', marginVertical: 10 }}
                    />
                </View>*/}
                    <View style={{height:screenHeight/2,width:screenWidth}}>
                            <WebView
                                scalesPageToFit={true}
                                source={{uri:this.props.route.videoId}}
                                onLoad={() => this.setState({webViewSpinner:false})}
                                //onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                            />
                    </View>

            </View>
        )
    }
}