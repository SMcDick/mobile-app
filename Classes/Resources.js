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
ScrollView
} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Payments from './Payments'
import YouTube from 'react-native-youtube'

export default class Resources extends Component{
       render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView contentContainerStyle={{paddingHorizontal:screenWidth/50}}>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 1</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 2</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 3</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 4</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 5</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 6</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 7</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 8</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 9</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 10</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 11</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 12</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height:screenHeight/12,flexDirection:'row',borderBottomColor:'rgb(219,219,224)',borderBottomWidth:1}}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigator.push({name:"Video",videoId:"https://www.youtube.com/embed/2Y3xf79r2oE"})}
                    >
                        <View style={{flex:4,justifyContent:'center',paddingLeft:5}}><Text>Video 13</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Icon name="chevron-right" size={20} style={{paddingLeft:0}}/></View>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        )
    }
}
