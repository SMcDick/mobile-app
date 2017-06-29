import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TouchableOpacity, Dimensions, Platform} from 'react-native';
import NavigationBar from './scenesNavBar'
import LocalStorageApiSetting from './LocalStorageSettingsApi'


const screenWidth=Dimensions.get('window').width;
import Utility from './Utility'
import Icons from 'react-native-vector-icons/Ionicons'

export default class passingPropsExample extends Component {
    constructor(props) {
        super(props)
        this.defaultArray = ['DB(Database Only)', 'LV(Live Only)']
    }
    state={
        isSelected:LocalStorageApiSetting.OperatingMode
    }

    _changeIcon(index){
        this.setState({isSelected: index})
        LocalStorageApiSetting.setOpratingMode(JSON.stringify(index))
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor:'rgb(233,234,238)'}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView>
                    <View style={{height:40}}/>
                    {this.defaultArray.map((element,index)=>{
                        return(
                            <TouchableOpacity style={styles.TouchableOpacityStyles} activeOpacity={1} key={index}
                                              onPress={this._changeIcon.bind(this,index)}>
                                <View style={styles.ViewInner1}>
                                    <Text style={styles.TextStyle}>{element}</Text>
                                </View>
                                <View style={styles.ViewInner2}>
                                    {this.state.isSelected == index ?
                                        <Icons name='ios-checkmark-outline' size={40} color='#007AFF'/>
                                        : null}
                                </View>
                            </TouchableOpacity>
                        )})
                    }
                </ScrollView>
            </View>


        )
    }
}
const styles=StyleSheet.create(
    {
        TouchableOpacityStyles: {
            height:50,
            flexDirection:'row',
            borderWidth:0.4,
            borderColor:'rgb(219,219,224)'
        },
        ViewInner1:{
            flex:6,
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'flex-start',
            paddingLeft:screenWidth/20
        },
        ViewInner2:{
            flex:1,
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center'
        },
        TextStyle:{
            fontWeight:'300',
            color:'rgb(60,60,60)',
            //padding:15,
            fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
        }
    }
)
