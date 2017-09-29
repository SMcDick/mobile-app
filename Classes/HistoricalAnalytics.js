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
//import PieChart from 'react-native-pie-chart';


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
                    <View style={styles.dataRow}>
                        <View style={styles.CircleDataContainerStyle}>
                        </View>
                        <View>
                           <View style={styles.GraphContainerStyle}>
                                <View>
                                <Text style={[{flex:1},ZenUIStyles.SubheaderTextStyle]}>12 months average</Text>
                                </View>
                           </View>
                        </View>
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.CircleDataContainerStyle}>
                            <Text style={[ZenUIStyles.SubheaderTextStyle]}>Sales Rank</Text>
                            <View style={styles.dataCircleStyle}>
                                <Text>1.2 million</Text>
                            </View>
                        </View>
                        <View>

                            <View style={styles.GraphContainerStyle}>
                                <View>
                                    <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text> </Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:25, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text>1</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>2</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:10, padding:3, borderBottomWidth:2}}/>
                                    <Text>3</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:40, padding:3, borderBottomWidth:2}}/>
                                    <Text>4</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                    <Text>5</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:32, padding:3, borderBottomWidth:2}}/>
                                    <Text>6</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>7</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>8</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:85, padding:3, borderBottomWidth:2}}/>
                                    <Text>9</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:80, padding:3, borderBottomWidth:2}}/>
                                    <Text>10</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>11</Text>
                                </View>
                                <View>
                                   <View style={{backgroundColor:Constants.ZenOrange, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                   <Text>12</Text>
                               </View>
                               <View>
                                   <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                   <Text> </Text>
                               </View>
                            </View>

                        </View>

                    </View>
                    <View style={styles.dataRow}>
                        <View style={styles.CircleDataContainerStyle}>
                            <Text style={[ZenUIStyles.SubheaderTextStyle]}>Used</Text>
                        </View>
                        <View>
                            <View style={styles.GraphContainerStyle}>
                                <View>
                                    <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text> </Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:25, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text>1</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>2</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:10, padding:3, borderBottomWidth:2}}/>
                                    <Text>3</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:40, padding:3, borderBottomWidth:2}}/>
                                    <Text>4</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                    <Text>5</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:32, padding:3, borderBottomWidth:2}}/>
                                    <Text>6</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>7</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>8</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:85, padding:3, borderBottomWidth:2}}/>
                                    <Text>9</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:80, padding:3, borderBottomWidth:2}}/>
                                    <Text>10</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>11</Text>
                                </View>
                                <View>
                                   <View style={{backgroundColor:Constants.ZenOrange, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                   <Text>12</Text>
                               </View>
                               <View>
                                   <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                   <Text> </Text>
                               </View>
                            </View>

                        </View>

                    </View>
                    <View style={styles.dataRow}>
                        <View style={styles.CircleDataContainerStyle}>
                            <Text style={[{flex:1},ZenUIStyles.SubheaderTextStyle]}>New</Text>
                        </View>
                        <View>

                            <View style={styles.GraphContainerStyle}>
                                <View>
                                    <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text> </Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:25, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text>1</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>2</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:10, padding:3, borderBottomWidth:2}}/>
                                    <Text>3</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:40, padding:3, borderBottomWidth:2}}/>
                                    <Text>4</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                    <Text>5</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:32, padding:3, borderBottomWidth:2}}/>
                                    <Text>6</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>7</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>8</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:85, padding:3, borderBottomWidth:2}}/>
                                    <Text>9</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:80, padding:3, borderBottomWidth:2}}/>
                                    <Text>10</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>11</Text>
                                </View>
                                <View>
                                   <View style={{backgroundColor:Constants.ZenOrange, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                   <Text>12</Text>
                               </View>
                               <View>
                                   <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                   <Text> </Text>
                               </View>
                            </View>

                        </View>

                    </View>
                    <View style={styles.dataRow}>
                        <View style={styles.CircleDataContainerStyle}>
                            <Text style={[{flex:1},ZenUIStyles.SubheaderTextStyle]}>Trade In</Text>
                        </View>
                        <View>

                            <View style={styles.GraphContainerStyle}>
                                <View>
                                    <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text> </Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:25, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                    <Text>1</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>2</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:10, padding:3, borderBottomWidth:2}}/>
                                    <Text>3</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:40, padding:3, borderBottomWidth:2}}/>
                                    <Text>4</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                    <Text>5</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:32, padding:3, borderBottomWidth:2}}/>
                                    <Text>6</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:60, padding:3, borderBottomWidth:2}}/>
                                    <Text>7</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>8</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenOrange, width:20, height:85, padding:3, borderBottomWidth:2}}/>
                                    <Text>9</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenBlue2, width:20, height:80, padding:3, borderBottomWidth:2}}/>
                                    <Text>10</Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor:Constants.ZenGreen2, width:20, height:70, padding:3, borderBottomWidth:2}}/>
                                    <Text>11</Text>
                                </View>
                                <View>
                                   <View style={{backgroundColor:Constants.ZenOrange, width:20, height:50, padding:3, borderBottomWidth:2}}/>
                                   <Text>12</Text>
                               </View>
                               <View>
                                   <View style={{width:6, padding:3, borderBottomWidth:2, paddingLeft:10}}/>
                                   <Text> </Text>
                               </View>
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </View >
        )
    }
}

const styles=StyleSheet.create({
   dataRow:{
        flexDirection:'row',
        padding:10
   },
   GraphContainerStyle:{
        flexDirection:'row',
        alignItems:'flex-end',
        flex:2,


   },
   GraphLineStyle:{
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:2
   },
   CircleDataContainerStyle:{
        flex:1
   }
})
