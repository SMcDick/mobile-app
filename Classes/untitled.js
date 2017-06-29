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
    Picker
} from 'react-native';

import NavigationBar from './scenesNavBar'
import Utility from './Utility'

export default class Trigger extends Component{
    constructor(){
        super();
        this.state={
            selectedPercentValue:'25',
            salesRankValue:'100000',
            Animation:new.Animated.value(),
            expanded:false
            maxHeight:
            minHeight:
        }
    }
    _setMaxHeight(event){
    this.setState({
        maxHeight : event.nativeEvent.layout.height
    });
}

    _setMinHeight(event){
        this.setState({
            minHeight : event.nativeEvent.layout.height
        });
    }
    toggle(){
    let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
        expanded : !this.state.expanded  
    });

    this.state.animation.setValue(initialValue);  
    Animated.spring( 
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start(); 
}
    render(){
        return(
            <View style={{flex:1,backgroundColor:'rgb(233,234,238)'}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView>
                    <View style={styles.subHeadingContainerstyle}>
                        <Text style={styles.subHeadingStyles}>FBA X-Ray: {this.props.route.category}</Text>
                    </View>
                    <View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingBottom:5,backgroundColor:'rgb(245,245,245)',paddingLeft:5}}>
                            <TouchableOpacity
                            <Text style={styles.sectionHeadingStyles}>Calculate the percentage of likelihood that there is an FBA offer this amount above the lowest merchant fulfilled (non-FBA) offer</Text>
                        </View>
                        <Animated.View>
                        <Picker
                            selectedValue={this.state.selectedPercentValue}
                            onValueChange={(value) => this.setState({selectedPercentValue: value})}
                            style={{backgroundColor:'rgb(250,250,250)'}}
                        >
                            <Picker.Item label="$5" value="5" />
                            <Picker.Item label="$6" value="6" />
                            <Picker.Item label="$7" value="7" />
                            <Picker.Item label="$8" value="8" />
                            <Picker.Item label="$9" value="9" />
                            <Picker.Item label="$10" value="10" />
                            <Picker.Item label="$12" value="12" />
                            <Picker.Item label="$15" value="15" />
                            <Picker.Item label="$20" value="20" />
                            <Picker.Item label="$25" value="25" />
                            <Picker.Item label="$35" value="35" />
                            <Picker.Item label="No FBA offers" value="nil" />
                        </Picker>
                        </Animated.View>
                    </View>
                    <View style={styles.dividerCellStyles}/>
                    <View>
                        <View style={{paddingBottom:5,backgroundColor:'rgb(245,245,245)',paddingLeft:5}}>
                            <Text style={styles.sectionHeadingStyles}>Do not calculate for sales rank worse than:</Text>
                        </View>
                        <Picker
                            selectedValue={this.state.salesRankValue}
                            onValueChange={(value) => this.setState({salesRankValue: value})}
                            style={{backgroundColor:'rgb(241,241,241)'}}
                        >
                            <Picker.Item label="100000" value="100000" />
                            <Picker.Item label="250000" value="250000" />
                            <Picker.Item label="500000" value="500000" />
                            <Picker.Item label="750000" value="750000" />
                            <Picker.Item label="1 million" value="1000000" />
                            <Picker.Item label="1.2 million" value="1200000" />
                            <Picker.Item label="1.5 million" value="1500000" />
                        </Picker>
                    </View>
                    <View style={styles.dividerCellStyles}/>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    subHeadingContainerstyle:{
        backgroundColor:'rgb(233,234,238)',
        height:60,
        alignItems:'center',
        justifyContent:'center'
    },
    subHeadingStyles:{
        fontWeight:'500',
        fontSize:Utility.getFontSize() * 0.7
    },
    dividerCellStyles:{
        backgroundColor:'rgb(233,234,238)',
        height:20
    },
    sectionHeadingStyles:{
        fontWeight:'600',
        fontSize:Utility.getFontSize() * 0.65
    }
})
