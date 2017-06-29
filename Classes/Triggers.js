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
import TriggerData from './TriggersData'
import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icons from 'react-native-vector-icons/Entypo'
//const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

export default class Trigger extends Component{
    constructor(){
        animated1 = new Animated.Value(0),
        animated2 = new Animated.Value(0),
        animated3 = new Animated.Value(0)
        super();
        this.localArray=[false , false , false]
       this.state={
            selectedPercentValue:'25',
            salesRankValue:'100000',
           selectedCategory:'New',
            expanded:[false, false , false],
            animation:[animated1,animated2,animated3],
           icon_name:'chevron-small-down'
        }
    }


    toggle(index){
    let finalValue = this.state.expanded[index] ? 0: ((Platform.OS=='ios')?240:60);
        this.localArray.splice(index,1,!this.localArray[index])
    this.setState({
     expanded:this.localArray
    }, ()=>{
        Animated.spring(
        this.state.animation[index],
        {
            toValue: finalValue
        }
    ).start();
    }
)}

    render(){
        return(
            <View style={{flex:1,backgroundColor:'rgb(239,239,244)'}}>
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView>
                    <View style={styles.subHeadingContainerstyle}>
                        <Text style={styles.subHeadingStyles}>FBA X-Ray: {this.props.route.category}</Text>
                    </View>
                    <View >
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,0)}
                            activeOpacity={0.85}
                        >
                            <View style={{flex:7}} >
                                <Text style={styles.sectionHeadingStyles}>Calculate the percentage of likelihood that there is an FBA offer<Text style={{color:'black',fontWeight:'400',textDecorationLine:'underline'}}> this amount above </Text>the lowest merchant fulfilled (non-FBA) offer</Text>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[0]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.8:23*1.2}/>:
                                <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.8:23*1.2}/>}
                            </View>
                        </TouchableOpacity>
                        <Animated.View style={{height:this.state.animation[0]}}>
                                {this.state.expanded[0]?
                                        <Picker
                                            selectedValue={this.state.selectedPercentValue}
                                            onValueChange={(value) => this.setState({selectedPercentValue: value})}
                                            style={{backgroundColor:'rgb(255,255,255)'}}
                                        >
                                            <Picker.Item label="$5 above" value="5"/>
                                            <Picker.Item label="$6" value="6"/>
                                            <Picker.Item label="$7" value="7"/>
                                            <Picker.Item label="$8" value="8"/>
                                            <Picker.Item label="$9" value="9"/>
                                            <Picker.Item label="$10" value="10"/>
                                            <Picker.Item label="$12" value="12"/>
                                            <Picker.Item label="$15" value="15"/>
                                            <Picker.Item label="$20" value="20"/>
                                            <Picker.Item label="$25" value="25"/>
                                            <Picker.Item label="$35" value="35"/>
                                            <Picker.Item label="No FBA offers" value="nil"/>
                                        </Picker>
                                :null}
                        </Animated.View>
                    </View>
                        <View style={styles.dividerCellStyles}/>
                    <View>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,1)}
                            activeOpacity={0.85}
                        >

                            <View style={{height:50,flex:7,justifyContent:'center'}} >
                            <Text style={styles.sectionHeadingStyles}>Do not calculate for sales rank worse than</Text>

                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[1]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>}
                            </View>
                        </TouchableOpacity>

                              <Animated.View style={{height:this.state.animation[1]}}>
                                {this.state.expanded[1]?
                                    <Picker
                                        selectedValue={this.state.salesRankValue}
                                        onValueChange={(value) => this.setState({salesRankValue: value})}
                                        style={{backgroundColor:'rgb(255,255,255)'}}
                                    >
                                        {Object.keys(TriggerData.data[this.props.route.key]).map((key) => {
                                        return(
                                        <Picker.Item label={TriggerData.data[this.props.route.key][key]} value={key} />
                                        )})}
                                    </Picker>
                                : null}
                            </Animated.View>
                    </View>
                    <View style={styles.dividerCellStyles}/>
                    <View>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,2)}
                            activeOpacity={0.85}
                        >
                            <View style={{flex:7}} >
                                <Text style={styles.sectionHeadingStyles}>Condition</Text>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[2]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.8:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.8:23*1.2}/>}

                            </View>
                        </TouchableOpacity>
                        <Animated.View style={{height:this.state.animation[2]}}>
                            {this.state.expanded[2]?
                                <Picker
                                    selectedValue={this.state.selectedCategory}
                                    onValueChange={(value) => this.setState({selectedCategory: value})}
                                    style={{backgroundColor:'rgb(255,255,255)'}}
                                >
                                    <Picker.Item label="New(compare against new only)" value="New"/>
                                    <Picker.Item label="Used(compare against used only)" value="Used"/>
                                </Picker>
                                : null}
                        </Animated.View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}



const styles=StyleSheet.create({
    subHeadingContainerstyle:{
        height:Utility.getFontSize()==50?50*1.8:23*2,
        alignItems:'center',
        justifyContent:'center'
    },
    subHeadingStyles:{
        fontWeight:'400',
        fontSize:Utility.getFontSize()*0.7,
        color:'rgb(80,80,80)'
    },
    dividerCellStyles:{
        //backgroundColor:'yellow',
        height:10,
    },
    sectionHeadingContainerStyles:{
        height:60,
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
        backgroundColor:'rgb(255,255,255)',
        paddingLeft:5,
    },
    sectionHeadingStyles:{
        color:'rgb(90,90,90)',
        fontWeight:'300',
        fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
    }
})
