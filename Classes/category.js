/**
 * Created by chicmic on 14/03/17.
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
    AsyncStorage,
    Dimensions,
    Animated,
    Keyboard,
    TouchableHighlight,
    Platform,
} from 'react-native';

import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import ZenUIStyles from './ZenUIStyles'
import Constants from './Constants'

import FontAwesome, { Icons } from 'react-native-fontawesome'


const screenWidth=Dimensions.get('window').width;

export default class Category extends Component{
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
                                onPress={()=>{this.props.navigator.push({name:"MainScreen",prevScreen:"Settings"})}}
                                activeOpacity={0.8}
                                style={ZenUIStyles.registerTouchableStyle}
                            >
                                <FontAwesome style={ZenUIStyles.backButtonStyle}>{Icons.chevronLeft}</FontAwesome>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={ZenUIStyles.HeaderBarTextStyle}>    Category</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"TriggersMainScreen",prevScreen:"Category",category:'Books', key:0 })}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Books</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"TriggersMainScreen",prevScreen:"Category", category:'Textbooks', key:1})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Textbooks</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"TriggersMainScreen",prevScreen:"Category",  category:'DVD/VHS',key:2})}
                        style={styles.touchableStyles}
                    >
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>DVD/VHS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"TriggersMainScreen",prevScreen:"Category", category:'Music', key:3})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Music</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"TriggersMainScreen",prevScreen:"Category",category:'Video Games',  key:4})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Video Games</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"TriggersMainScreen",prevScreen:"Category", category:'Software', key:5})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Software</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    touchableStyles:{
        padding:screenWidth/30
    },
    touchableViewStyles:{
        backgroundColor:Constants.PressableItemColor,
        flex:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:Constants.ZenGreen,
        padding:screenWidth/30
    },
    touchableContentStyles:{
        fontWeight:'300',
        fontSize:Utility.getFontSize() * 0.7,
        color:Constants.ZenGreen
    }
})
