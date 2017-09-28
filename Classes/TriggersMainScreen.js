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
import Icon from 'react-native-vector-icons/Ionicons'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import CustomModal from './CustomModal'
import ZenUIStyles from './ZenUIStyles'

const screenWidth=Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height*0.98;

import FontAwesome, { Icons } from 'react-native-fontawesome'



let saveButtonPressed = true;

export default class TriggersMainScreen extends Component{
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
                            <Text style={ZenUIStyles.HeaderBarTextStyle}> Triggers</Text>
                        </View>
                    </View>
                </View>

                <View style={{flex:2}}>
                    <View style={{padding:10}}>
                        <View style={[ZenUIStyles.FramedBoxStyle,{height:screenHeight*0.33}]}>
                            <Text style={[ZenUIStyles.SubheaderTextStyle]}>Global Settings</Text>
                            <View style={{flexDirection:'row', JustifyContent:'center', alignItems:'center', height:30}}>
                                <View style={{flex:2}}>
                                    <Text style={styles.checkBoxTextStyles}> Ignore Acceptable</Text>
                                </View>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity style={{height:40, width:100, justifyContent:'center', alignItems:'center'}} activeOpacity={1} onPress={this.changeCheckBoxState.bind(this)}>
                                        {!this.state.checked ?
                                            <Icon name='ios-checkmark-outline' size={40} color='rgb(219,219,224)' style={styles.checkBoxStyles}/>
                                            :
                                            <Icon name='ios-checkmark-outline' size={40} color='#007AFF' style={styles.checkBoxStyles}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', height:30}}>
                                <View style={{flex:2}}>
                                    <Text style={styles.checkBoxTextStyles}> If no FBA, underprice Amazon by</Text>
                                </View>
                                <View style={ZenUIStyles.NumberBoxStyle}>
                                    <TextInput style={styles.sectionDataStyles}
                                        //autoFocus={false}
                                        placeholder="10%"
                                        underlineColorAndroid={'white'}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', height:30}}>
                                <View style={{flex:2}}>
                                    <Text style={styles.checkBoxTextStyles}> If no offers, assign this value</Text>
                                </View>
                                <View style={ZenUIStyles.NumberBoxStyle}>
                                    <TextInput style={styles.sectionDataStyles}
                                        //autoFocus={false}
                                        placeholder="$100"
                                        underlineColorAndroid={'white'}
                                               keyboardType='numeric'
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row', height:30}}>
                                <View style={{flex:2}}>
                                    <Text style={styles.checkBoxTextStyles}> Cost of item</Text>
                                </View>
                                <View style={ZenUIStyles.NumberBoxStyle}>
                                    <TextInput style={styles.sectionDataStyles}
                                        //autoFocus={false}
                                        placeholder="1"
                                        underlineColorAndroid={'white'}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{padding:10}}>
                    <View style={[ ZenUIStyles.FramedBoxStyle,{height:screenHeight*0.42}]}>

                        <View style={[ZenUIStyles.horizontalCellstyle,{height:40,flexDirection:'row', justifyContent:'flex-start'}]}>
                          <View style={{width:10, alignItems:'center'}}>
                          </View>
                          <View style={{flex:2, alignItems:'center'}}>
                            <Text style={ZenUIStyles.SubheaderTextStyle}>{this.state.productUsedOffers} Rank</Text>
                          </View>
                          <View style={{flex:2, alignItems:'center'}}>
                                <Text style={ZenUIStyles.SubheaderTextStyle}>{this.state.productFBAOffers} Profit Base </Text>
                          </View>
                          <View style={{flex:2, alignItems:'center'}}>
                            <Text style={ZenUIStyles.SubheaderTextStyle}>{this.state.productNewOffers} Profit</Text>
                          </View>


                            {/*<TouchableOpacity style={styles.tradeValueStyle}><Text style={styles.amazonOfferLinks}>TRADE IN</Text></TouchableOpacity>*/}

                        </View>
                        <View>
                        <ScrollView>
                            <View style={[ZenUIStyles.horizontalCellStyle,{width:(screenWidth*0.9)}]}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>1</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={0.85}
                                              onPress={()=>this.props.navigator.push({name:"IndividualTriggers",prevScreen:"IndividualTriggers",category:'Books', key:0 })}
                                              style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>2</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>3</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>4</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>5</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>6</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>7</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>8</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>9</Text>
                                </View>
                            </View>
                            <View style={ZenUIStyles.horizontalCellStyle}>
                                <View style={ZenUIStyles.rowNumberContainerStyle}>
                                    <Text style={ZenUIStyles.SubheaderTextStyle}>10</Text>
                                </View>
                            </View>

                        </ScrollView>
                        </View>
                      </View>
                </View>
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
        //paddingLeft:65

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
})
