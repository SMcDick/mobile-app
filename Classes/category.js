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

const screenWidth=Dimensions.get('window').width;

export default class Category extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"Triggers",prevScreen:"Category",category:'Books', key:0 })}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Books</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"Triggers",prevScreen:"Category", category:'Textbooks', key:1})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Textbooks</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"Triggers",prevScreen:"Category",  category:'DVD/VHS',key:2})}
                        style={styles.touchableStyles}
                    >
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>DVD/VHS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"Triggers",prevScreen:"Category", category:'Music', key:3})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Music</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"Triggers",prevScreen:"Category",category:'Video Games',  key:4})}
                        style={styles.touchableStyles}>
                        <View style={styles.touchableViewStyles}>
                            <Text style={styles.touchableContentStyles}>Video Games</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>this.props.navigator.push({name:"Triggers",prevScreen:"Category", category:'Software', key:5})}
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
        backgroundColor:'rgb(35,150,221)',
        flex:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'rgb(194,194,194)',
        padding:screenWidth/30
    },
    touchableContentStyles:{
        fontWeight:'300',
        fontSize:Utility.getFontSize() * 0.7,
        color:'white'
    }
})
