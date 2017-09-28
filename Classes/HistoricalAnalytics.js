/**
 * Created by nidhitandon on 08/05/17.
 */
/**
 * Created by nidhitandon on 08/05/17.
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
    Dimensions,
    Platform,
    Keyboard,
    Modal,
    ActivityIndicator,
    Alert,
    NativeModules,
    ScrollView
} from 'react-native';

import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ZenUIStyles from './ZenUIStyles'
import Constants from './Constants'


const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;


export default class HistoricalAnalytics extends Component{
    constructor(props) {
        super(props)
        this.state={
        }
    }


    popIfExists() {
      if (navigator.getCurrentIndex() > 0) {
        navigator.pop()
        return true // do not exit app
      } else {
        return false // exit app
      }
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={[{flexDirection:'row'},{justifyContent:'center'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>
                </View>
                <View style={[ZenUIStyles.HeaderBarStyle,{alignItems:'center', justifyContent:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:10}}>
                        {/*<View style={{flex:1}}>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigator.push({name:"MainScreen",prevScreen:"Settings"})}}
                                activeOpacity={0.8}
                                style={ZenUIStyles.registerTouchableStyle}
                            >
                                <FontAwesome style={ZenUIStyles.backButtonStyle}>{Icons.chevronLeft}</FontAwesome>
                            </TouchableOpacity>
                        </View>*/}
                        <View style={{flex:2, alignItems:'center'}}>
                            <Text style={ZenUIStyles.HeaderBarTextStyle}>Historical Analytics</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                        <Text style={[{flex:1},ZenUIStyles.SubheaderTextStyle]}>Sales Rank</Text>
                        <Text style={[{flex:1},ZenUIStyles.SubheaderTextStyle]}>12 months average</Text>
                    </View>
                <View style={styles.dataRow}>
                    <View style={styles.CircleDataContainerStyle}>
                    </View>
                    <View style={styles.GraphContainerStyle}>
                    </View>
                </View>
                </ScrollView>
            </View >
        )
    }
}

const styles=StyleSheet.create({
   dataRow:{
    flexDirection:'row'
   }
})
