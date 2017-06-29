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
    Picker,
    Modal
} from 'react-native';

import NavigationBar from './scenesNavBar'
import Utility from './Utility'
import Icons from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Ionicons'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import CustomModal from './CustomModal'
const screenWidth=Dimensions.get('window').width

let saveButtonPressed = true;

export default class Trigger extends Component{
    constructor(){
        super();
            animated1=new Animated.Value(0),
            animated2=new Animated.Value(0),
            animated3=new Animated.Value(0),
            animated4=new Animated.Value(0),
            animated5=new Animated.Value(0),
        this.localArray=[false, false, false, false, false]
        this.state={
            selectedPercentValue:'25',
            salesRankValue:'100000',
            costOfBook:'free',
            netProfit:'0',
            averageSalesRankValue:'0',
            netProfitValue:'0',
            baseProfitValue:'0',
            xRayPercentageValue:'0',
            expanded:[false, false, false, false, false],
            animation:[animated1,animated2,animated3,animated4,animated5],
            icon_name:'chevron-small-down',
            checked:false,
            pickerArrayOfCostOfBook:["free","0.50","1","1.50","2","2.5","3","3.5","4","4.5","5","Enter Custom Value"],
            pickerArrayOfNetProfit:["1","1.5", "2", "2.5", "3", "4", "5", "10", "15","Enter Custom Value"],
            modalVisible:false,
            modalTextOfCostOfBook:"",
            modalTextOfNetProfit:"",
            modalIndex:0
        }
    }

    changeCheckBoxState(){
    this.setState({checked:!this.state.checked})
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


      storePickerValues(value,pickerIndex){
          if(this.state.expanded[0] && pickerIndex==0) {

            this.setState({costOfBook:value, modalIndex:0}, ()=>{
              if(this.state.costOfBook=="Enter Custom Value")
              this.setState({modalVisible:true})
            })}

          if(this.state.expanded[2] && pickerIndex==2){
            this.setState({netProfit:value, modalIndex:2}, ()=>{
              if(this.state.netProfit=="Enter Custom Value")
              this.setState({modalVisible:true})
          })}
          }


      pushDataOnPicker(value){
          saveButtonPressed = false;
          this.setState({modalVisible:false},()=>{
              if(value!=''){
          if(this.state.modalIndex==0){
          this.setState({modalTextOfCostOfBook:value},()=>{
          x=this.state.modalTextOfCostOfBook
          this.state.pickerArrayOfCostOfBook.pop("Enter Custom Value")
          let newLocalPickerValueArray = [ ...this.state.pickerArrayOfCostOfBook ];
          newLocalPickerValueArray[newLocalPickerValueArray.length] = x;
          newLocalPickerValueArray[newLocalPickerValueArray.length]="Enter Custom Value"
          this.setState({pickerArrayOfCostOfBook:newLocalPickerValueArray, costOfBook:this.state.modalTextOfCostOfBook}, ()=>{
          LocalStorageSettingsApi.setCustomEnteredCostOfBook(this.state.modalTextOfCostOfBook)
            })
            })}

          if(this.state.modalIndex==2)
          {
            this.setState({modalTextOfNetProfit:value},()=>{
            x=this.state.modalTextOfNetProfit
            this.state.pickerArrayOfNetProfit.pop("Enter Custom Value")
            let newArray = [...this.state.pickerArrayOfNetProfit];
            newArray[newArray.length] = x;
            newArray[newArray.length]="Enter Custom Value"
            this.setState({ pickerArrayOfNetProfit:newArray ,netProfit:this.state.modalTextOfNetProfit}, ()=>{
            LocalStorageSettingsApi.setCustomEnteredNetProfit(this.state.modalTextOfNetProfit)
                })
              })
            }
          }})
        }

      closeModal(){
          this.setState({modalVisible:false, costOfBook:this.state.modalTextOfCostOfBook, netProfit:this.state.modalTextOfNetProfit})
        }

      resetData(){
          let newPickerArray = this.state.pickerArrayOfCostOfBook.slice(0,11)
          newPickerArray=[...newPickerArray,"Enter Custom Value"]
          let newPickerArrayValues=this.state.pickerArrayOfNetProfit.slice(0,9)
          newPickerArrayValues=[...newPickerArrayValues,"Enter Custom Value"]
          this.setState({pickerArrayOfNetProfit:newPickerArrayValues,pickerArrayOfCostOfBook: newPickerArray })
          LocalStorageSettingsApi.setSelectedPickerCostOfBook('0')
          LocalStorageSettingsApi.setCustomEnteredCostOfBook('0')
          LocalStorageSettingsApi.setPickerSelectedNetProfit('0')
          LocalStorageSettingsApi.setCustomEnteredNetProfit('0')
          LocalStorageSettingsApi.setPickerSelectedAverageSalesRank('0')
          LocalStorageSettingsApi.setSelectedPickerValueForBaseProfit('0')
          LocalStorageSettingsApi.setSelectedPickerValueForXrayPercentage('0')
        }
      saveData(){
          LocalStorageSettingsApi.setSelectedPickerCostOfBook(this.state.costOfBook)
          LocalStorageSettingsApi.setPickerSelectedNetProfit(this.state.netProfit)
          LocalStorageSettingsApi.setPickerSelectedAverageSalesRank(this.state.averageSalesRankValue)
          LocalStorageSettingsApi.setSelectedPickerValueForBaseProfit(this.state.baseProfitValue)
          LocalStorageSettingsApi.setSelectedPickerValueForXrayPercentage(this.state.xRayPercentageValue)
          this.props.navigator.pop();
        }

      componentDidMount(){
          if(LocalStorageSettingsApi.customCostOfBook != '0')
          {
            this.state.pickerArrayOfCostOfBook.pop("Enter Custom Value")
          this.setState({pickerArrayOfCostOfBook: [ ...this.state.pickerArrayOfCostOfBook , LocalStorageSettingsApi.customCostOfBook, "Enter Custom Value"],
                         costOfBook:LocalStorageSettingsApi.costOfBook})
          }
          else{
              this.state.pickerArrayOfCostOfBook.pop("Enter Custom Value")
              this.setState({pickerArrayOfCostOfBook: [ ...this.state.pickerArrayOfCostOfBook , "Enter Custom Value"],
                  costOfBook:LocalStorageSettingsApi.costOfBook})
          }
          if(LocalStorageSettingsApi.customNetProfit !='0') {
              this.state.pickerArrayOfNetProfit.pop("Enter Custom Value")
                         this.setState({pickerArrayOfNetProfit: [ ...this.state.pickerArrayOfNetProfit , LocalStorageSettingsApi.customNetProfit, "Enter Custom Value"],
                         netProfit:LocalStorageSettingsApi.netProfit,
                         averageSalesRankValue:LocalStorageSettingsApi.averageSalesRankValue,
                         baseProfitValue:LocalStorageSettingsApi.baseProfitValue,
                         xRayPercentageValue:LocalStorageSettingsApi.xRayPercentageValue})
                       }
          else{
              this.state.pickerArrayOfNetProfit.pop("Enter Custom Value")
              this.setState({pickerArrayOfNetProfit: [ ...this.state.pickerArrayOfNetProfit , "Enter Custom Value"],
                  netProfit:LocalStorageSettingsApi.netProfit,
                  averageSalesRankValue:LocalStorageSettingsApi.averageSalesRankValue,
                  baseProfitValue:LocalStorageSettingsApi.baseProfitValue,
                  xRayPercentageValue:LocalStorageSettingsApi.xRayPercentageValue})
          }
         }


    render(){
      let modal = (
        <CustomModal customModalVisible={this.state.modalVisible}
                     customModalIndex={this.state.modalIndex}
                     customGetModalData={this.pushDataOnPicker.bind(this)}
                     customCloseModal={this.closeModal.bind(this)}
                      />
                    )
        return(
            <View style={{flex:1,backgroundColor:'rgb(239,239,244)'}}>
              { this.state.modalVisible ?  modal : null }
                <View style={{height:Platform.OS=='ios'?75:60}}><NavigationBar navigator={this.props.navigator} route={this.props.route}/></View>
                <ScrollView>


                    <View style={{height:50,flex:7,justifyContent:'center',paddingLeft:screenWidth/30}} >
                        <Text style={[styles.sectionHeadingStyles, {fontSize:Utility.getFontSize()==50?50* 0.3:23*0.6,color:'gray'}]}>We will tell you when to buy an item and when to pass based on these settings</Text>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,0)}
                            activeOpacity={0.85}
                        >

                            <View style={{height:50,flex:7,justifyContent:'center'}} >
                                <Text style={styles.sectionHeadingStyles}>Cost of Book</Text>
                            </View>

                            <View style={{flex:1}}>
                                {this.state.expanded[0]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.8:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.8:23*1.2}/>}

                            </View>
                        </TouchableOpacity>
                        <Animated.View style={{height:this.state.animation[0]}}>
                            {this.state.expanded[0]?
                                <Picker
                                    selectedValue={this.state.costOfBook}
                                    onValueChange={(value) => {
                                        if(value == "free" && saveButtonPressed == false) {
                                            saveButtonPressed = true;
                                            return;
                                        }
                                        this.storePickerValues(value,0)}}
                                    style={{backgroundColor:'rgb(255,255,255)'}}
                                >
                                  {this.state.pickerArrayOfCostOfBook.map((element)=>{
                                    return(
                                      <Picker.Item label={element} value={element} />
                                    )})}

                                </Picker>
                            :null}
                        </Animated.View>
                    </View>
                    <View style={styles.checkBoxContainerCellStyles}>
                        <View style={{flex:1, flexDirection:'row', height:30}}>
                            <View>
                                <Text style={styles.checkBoxTextStyles}> Ignore Acceptable</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={{height:40, width:95}} activeOpacity={1} onPress={this.changeCheckBoxState.bind(this)}>
                                    {!this.state.checked ?
                                        <Icon name='ios-checkmark-outline' size={40} color='rgb(219,219,224)' style={styles.checkBoxStyles}/>
                                        :
                                        <Icon name='ios-checkmark-outline' size={40} color='#007AFF' style={styles.checkBoxStyles}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', height:30}}>
                            <View>
                                <Text style={styles.checkBoxTextStyles}> If no offers, assign this value</Text>
                            </View>
                            <View style={styles.underLineStyles}>
                                <TextInput style={styles.sectionDataStyles}
                                    //autoFocus={false}
                                    placeholder="$100"
                                    underlineColorAndroid={'white'}
                                           keyboardType='numeric'
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.dividerCellStyles}/>
                    <View>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,1)}
                            activeOpacity={0.85}
                        >
                            <View style={{height:50,flex:7,justifyContent:'center'}} >
                                <Text style={styles.sectionHeadingStyles}>When rank is this</Text>
                                <Text style={[styles.sectionHeadingStyles, {fontSize:Utility.getFontSize()==50?50* 0.35:23*0.6}]}>(or average rank when available)</Text>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[1]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>}
                            </View>
                        </TouchableOpacity>
                        <Animated.View style={{height:this.state.animation[1]}}>
                            {this.state.expanded[1]?
                                <Picker
                                    selectedValue={this.state.averageSalesRankValue}
                                    onValueChange={(value) => this.setState({averageSalesRankValue: value})}
                                    style={{backgroundColor:'rgb(255,255,255)'}}
                                >
                                    <Picker.Item label="1,000" value="1000" />
                                    <Picker.Item label="5,000" value="5000" />
                                    <Picker.Item label="10,000" value="10000" />
                                    <Picker.Item label="50,000" value="50000" />
                                    <Picker.Item label="100,000" value="100000" />
                                    <Picker.Item label="250,000" value="250000" />
                                    <Picker.Item label="350,000" value="350000" />
                                    <Picker.Item label="500,000" value="500000" />
                                    <Picker.Item label="750,000" value="750000" />
                                    <Picker.Item label="1 million" value="1000000" />
                                    <Picker.Item label="1.5 million" value="1500000" />
                                    <Picker.Item label="2.5 million or better" value="2500000" />
                                    <Picker.Item label="No Rank" value="No Rank" />
                                </Picker>
                            : null}
                        </Animated.View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,2)}
                            activeOpacity={0.85}
                        >
                            <View style={{height:50,flex:7,justifyContent:'center'}} >
                                <Text style={styles.sectionHeadingStyles}>Net profit must be this</Text>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[2]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>}
                            </View>
                        </TouchableOpacity>
                        <Animated.View style={{height:this.state.animation[2]}}>
                            {this.state.expanded[2]?
                              <Picker
                                  selectedValue={this.state.netProfit}
                                  onValueChange={(value) =>
                                  {if(value == "1" && saveButtonPressed == false) {
                                      saveButtonPressed = true;
                                      return;
                                  }
                                  this.storePickerValues(value,2)}}
                                  style={{backgroundColor:'rgb(255,255,255)'}}
                              >
                                {this.state.pickerArrayOfNetProfit.map((element)=>{
                                  return(
                                    <Picker.Item label={element} value={element} />
                                  )})}
                              </Picker>
                            : null}
                        </Animated.View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,3)}
                            activeOpacity={0.85}
                        >
                            <View style={{height:50,flex:7,justifyContent:'center'}} >
                                <Text style={styles.sectionHeadingStyles}>Base profit on this</Text>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[3]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>}
                            </View>
                        </TouchableOpacity>


                        <Animated.View style={{height:this.state.animation[3]}}>
                            {this.state.expanded[3]?
                                <Picker
                                    selectedValue={this.state.baseProfitValue}
                                    onValueChange={(value) => this.setState({baseProfitValue: value})}
                                    style={{backgroundColor:'rgb(255,255,255)'}}
                                >
                                    <Picker.Item label="Lowest of all" value="Lowest of all" />
                                    <Picker.Item label="2nd used" value="2nd used" />
                                    <Picker.Item label="3rd used" value="3rd used" />
                                    <Picker.Item label="Lowest new" value="Lowest new" />
                                    <Picker.Item label="2nd new" value="2nd new" />
                                    <Picker.Item label="3rd new" value="3rd new" />
                                    <Picker.Item label="Lowest visible FBA" value="Lowest visible FBA" />
                                    <Picker.Item label="2nd visible FBA" value="2nd visible FBA" />
                                    <Picker.Item label="3rd visible FBA" value="3rd visible FBA" />
                                    <Picker.Item label="6 month average - new" value="6 month average - new" />
                                    <Picker.Item label="6 month average - used" value="6 month average - used" />
                                </Picker>
                                : null}
                        </Animated.View>
                    </View>


                    <View>
                        <TouchableOpacity
                            style={styles.sectionHeadingContainerStyles}
                            onPress={this.toggle.bind(this,4)}
                            activeOpacity={0.85}
                        >
                            <View style={{height:50,flex:7,justifyContent:'center'}} >
                                <Text style={styles.sectionHeadingStyles}>If no visible FBA, X-RAY percentage must be</Text>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.expanded[4]?<Icons name='chevron-small-up' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>:
                                    <Icons name='chevron-small-down' color='rgb(199,199,204)' size={Utility.getFontSize()===50?50*0.85:23*1.2}/>}
                            </View>
                        </TouchableOpacity>
                        <Animated.View style={{height:this.state.animation[4]}}>
                            {this.state.expanded[4]?
                                <Picker
                                    selectedValue={this.state.xRayPercentageValue}
                                    onValueChange={(value) => this.setState({xRayPercentageValue: value})}
                                    style={{backgroundColor:'rgb(255,255,255)'}}
                                >
                                    <Picker.Item label="90% or better" value="90% or better" />
                                    <Picker.Item label="75%" value="75%" />
                                    <Picker.Item label="50%" value="50%" />

                                </Picker>
                                : null}
                        </Animated.View>
                    </View>

                    <View style={styles.dividerCellStyles}/>

                    <View style={{height:100, backgroundColor:'white'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-around',paddingTop:20,backgroundColor:'white'}}>
                          <TouchableOpacity style={styles.modalButtonsStyles} onPress={this.saveData.bind(this)}>
                            <Text style={styles.modalButtonsTextStyles}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.modalButtonsStyles} onPress={this.resetData.bind(this)}>
                            <Text style={styles.modalButtonsTextStyles}>Reset</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.dividerCellStyles}/>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    subHeadingContainerstyle:{
        height:Utility.getFontSize()==50?50*1:23*1,
        alignItems:'center',
        justifyContent:'center'
    },
    subHeadingStyles:{
        fontWeight:'500',
        fontSize:Utility.getFontSize()*0.7
    },
    checkBoxContainerCellStyles:{
        height:Utility.getFontSize()==50?60:80,
        flex:1,
        backgroundColor:'rgb(255,255,255)',
        alignItems:'center'
    },
    dividerCellStyles:{
        height:Utility.getFontSize()==50?60:20,
    },
    upperSectionHeadingContainerStyles:{
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
        backgroundColor:'rgb(255,255,255)',
        paddingLeft:5,
        width:160
    },
    sectionHeadingContainerStyles:{
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
        color:'rgb(60,60,60)',
        fontWeight:'300',
        fontSize:Utility.getFontSize()==50?50* 0.5:23*0.7
    },
    checkBoxTextStyles:{
        paddingTop:8,
        paddingLeft:15,
        fontSize:Utility.getFontSize()==50?50*0.3:23*0.6,

    },
    checkBoxStyles:{
        paddingLeft:65

    },
    sectionDataStyles:{
        width:50,
        fontSize:12,
        marginLeft:10,
        height:40,
        color:'#007AFF',
        justifyContent:'center',
        borderRadius:0.4
    },
    underLineStyles:{
        borderBottomWidth:0.5,
        height:(Platform.OS=='android')?40:30,
        borderBottomColor:'rgb(141,141,141)',
        marginLeft:10,
        width:70,
    },
    modalContainerStyles:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(77,77,77,0.8)'
    },
    modalInnerContainerStyles:{
      backgroundColor:'rgb(255,255,255)',
      height:160,
      width:300,
      justifyContent:'space-around',
      borderRadius:6.5
    },
    textConatinerStyles:{
      alignSelf:'center',
      height:40,
      width:290,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:6.5
    },
    modalHeadingStyles:{
      fontSize:Utility.getFontSize()*0.85
    },
    modalTextInputStyles:{
      height:40,
      borderColor: 'rgb(220,220,225)',
      borderWidth: 0.7,
      width:275,
      alignSelf:'center',
      borderRadius:5.5
    },
    modalButtonsContainerStyles:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:10,
      alignItems:'center'
    },
    modalButtonsStyles:{
      height:Utility.getFontSize()==50?70:60,
      flex:1,
      backgroundColor:'rgb(233,234,238)',
      marginRight:screenWidth/30,
      marginLeft:screenWidth/30,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    },
    modalButtonsTextStyles:{
      color:'rgb(0,133,248)',
      alignSelf:'center',
      fontWeight:'300',
      fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
    }

})
