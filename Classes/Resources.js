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
ScrollView
} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Payments from './Payments'
import Constants from './Constants'
import ZenUIStyles from './ZenUIStyles'
import FontAwesome, { Icons } from 'react-native-fontawesome'
//import YouTube from 'react-native-youtube'

export default class Resources extends Component{
       render(){
        return(
            <View style={{flex:1}}>
                <View style={[{flexDirection:'row'},{justifyContent:'center'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>
                </View>

                <View style={[ZenUIStyles.HeaderBarStyle,{alignItems:'center', justifyContent:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:10}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            onPress={()=>{this.props.navigator.push({name:"MainScreen",prevScreen:"Resources"})}}
                            activeOpacity={0.8}
                            
                        >
                            <FontAwesome style={ZenUIStyles.backButtonStyle}>{Icons.chevronLeft}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={ZenUIStyles.HeaderBarTextStyle}>Resources</Text>
                    </View>
                    </View>
                </View>
                <View>
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
            </View>
        )
    }
}
