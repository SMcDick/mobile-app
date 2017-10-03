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
  Alert,
  NetInfo,
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
} from 'react-native';

import AWSApi from './Apis/AWSApi'
import MWSApi from './Apis/MWSApi'
import DatabaseSeverApi from './Apis/DatabaseServerApi'
import AWSResponse from './Apis/AWSResponse'
import MWSResponse from './Apis/MWSResponse'
import DatabaseServerResponse from  './Apis/DatabaseServerResponse'
import Constants from './Constants'
import Product from './Product'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import DatabaseLocalApi from './Apis/DatabaseLocalApi'
import DatabaseLocalResponse from './Apis/DatabaseLocalResponse'
import SideMenu from './sideMenu'
import BarCodeScanner from  './BarCodeScanner'
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import Utility from './Utility'
import ElasticSearch from './Apis/ElasticSearch'
import ElasticSearchResponse from './Apis/ElasticSearchResponse'
import AnylineScanner from  './anyLineScanner'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
//import Icons from 'react-native-vector-icons/FontAwesome';
import Icon_min from 'react-native-vector-icons/MaterialCommunityIcons'
import NetworkConnectivity from './NetworkConnectivity'
import FontAwesome, { Icons } from 'react-native-fontawesome'
//import Anyline from 'anyline-ocr-react-native-module';
//import config from '../config';
import ZenUIStyles from './ZenUIStyles'


let asinMissing = false
let productObject= null;
let kTextNotFound = "Not Found";
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height*0.98;
const data=[];
let asin;
export default class MainScreen extends Component{

   constructor(props){
        super(props);


        NetworkConnectivity.getInstance().internetAvailable
        LocalStorageSettingsResponse.getInstance().setReceiver(this);
        DatabaseLocalResponse.getInstance().setReceiver(this)
        ElasticSearchResponse.getInstance().setReceiver(this);
        AWSResponse.getInstance().setReceiver(this);
        AnylineScanner.getInstance().setReceiver(this)
        MWSResponse.getInstance().setReceiver(this);
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

        console.disableYellowBox = true;


        this.state = {
         buyRejectColor:Constants.ZenGreen,
         productCategory : null,
         productTitle : null,
         productFBAOffersPercent :null,
         productAmazonPrice : null,
         productNetProfit : null,
         productBuyBox : null,
         productSalesRank :null,
         productAmazonRank :null,
         productTopPercent : null,
         productFBAOffers : null,
         productUsedOffers:null,
         productNewOffers :null,
         productAmazonURL:null,
         productCode:null,
         productImage:null,//require('../assets/defaultProductImage.png'),
         codeEnteredByUser:null,
         fbaAvg:null,
         nonFbaUsedAvg:null,
         nonFbaNewAvg:null,
         fbaOffersArray:[],
         nonFbaUsedArray:[],
         nonFbaNewArray:[],
         headingText:'Buy/Reject',
         productOffersPageURL:'https://www.google.com',
         showSideMenu:false,
         styleForProductDescriptionView :{
         opacity:1,
         flex:40
          },
        displayProductCondition:false,
        displayProductQuantity:false,
        displayTradeValue:true,
        showFBAOffersAutomatically:false,
        FBAXRayThreshold:null,
        FBAXRayNewOrUsed:null,
        showAllOffers:false,
        showFBAFullScreen:false,
        expandFBAOffersValue: new Animated.Value(0),
        positionYOfFBAOffersPage:new Animated.Value(screenHeight),
        heightOfFBaOffersPage:new Animated.Value(screenHeight * 0.5),
        bluetoothMode:false,
        // openCamera:false,
        isConnected: null,
        selectedIndexOfOffer:0,
        selectedOffer:"used",
        webViewModal:false,
        esResult:false,
            productCondition:null
      };



       //this.getUserSettingsUserDefaults();

   }

   componentDidMount() {
       this.getUserSettingsUserDefaults();
       //ElasticSearch.getESDataSize();
       //DatabaseLocalApi.getInstance().
   }
    getUserSettingsUserDefaults(){
        LocalStorageSettingsApi.getShowFBAOffersPageAutomatically()
        LocalStorageSettingsApi.getFBAXRayThreshold()
        LocalStorageSettingsApi.getFBAXRayNewOrUsed()
        LocalStorageSettingsApi.getAllAmazonOffersPage()
        LocalStorageSettingsApi.getDisplayProductCondition()
        LocalStorageSettingsApi.getDisplayProductQuantity()
        LocalStorageSettingsApi.getEnableTriggers()
        LocalStorageSettingsApi.getDisplayValue()
        LocalStorageSettingsApi.getShowAlertIfRestricted()
        LocalStorageSettingsApi.getDisplayTradeValueInColumn()
        LocalStorageSettingsApi.getShowLandedPriceWithShipping()
        LocalStorageSettingsApi.getIsAmazonSellerLoggedIn()
        LocalStorageSettingsApi.getDownloadState()
        LocalStorageSettingsApi.getDownloadComplete()
        LocalStorageSettingsApi.getScrollid()
        LocalStorageSettingsApi.getOpratingMode()
        LocalStorageSettingsApi.getTotalProductsOnES()
        LocalStorageSettingsApi.getPrevBytesWritten()
        LocalStorageSettingsApi.getDownloadStartTime()
        LocalStorageSettingsApi.getCustomEnteredCostOfBook()
        LocalStorageSettingsApi.getSelectedPickerCostOfBook()
        LocalStorageSettingsApi.getCustomEnteredNetProfit()
        LocalStorageSettingsApi.getPickerSelectedNetProfit()
        LocalStorageSettingsApi.getPickerSelectedAverageSalesRank()
        LocalStorageSettingsApi.getSelectedPickerValueForBaseProfit()
        LocalStorageSettingsApi.getSelectedPickerValueForXrayPercentage()
        LocalStorageSettingsApi.getAccessToken()
        LocalStorageSettingsApi.getUserID()
    }

  setShowSideMenuState(){
      Keyboard.dismiss();
      this.setState({showSideMenu:!this.state.showSideMenu})
      if(this.state.bluetoothMode){
          this.refs.bluetoothMode.focus()
      }
  }


    removeIndicatorOnInvalidCode(){
        this.setState({webViewModal:false})
    }

  closeWebView(){
    Animated.timing(
        this.state.positionYOfFBAOffersPage,
        {
          toValue:0,
          duration:400
        }
    ).start();
  }

    updateMainScreenToInitialState(){
        this.setState({
            productCategory : null,
            productTitle : null,
            productFBAOffersPercent :null,
            productAmazonPrice : null,
            productNetProfit : null,
            productBuyBox : null,
            productSalesRank :null,
            productAmazonRank :null,
            productTopPercent : null,
            productFBAOffers : null,
            productUsedOffers:null,
            productNewOffers :null,
            productAmazonURL:null,
            productCode:null,
            productImage:null,//require('../assets/defaultProductImage.png'),
            codeEnteredByUser:null,
            fbaAvg:null,
            nonFbaUsedAvg:null,
            nonFbaNewAvg:null,
            fbaOffersArray:[],
            nonFbaUsedArray:[],
            nonFbaNewArray:[],
            headingText:'Buy/Reject',
            productOffersPageURL:null,
            showSideMenu:false,
            styleForProductDescriptionView :{
                opacity:1,
                flex:40
            },
            showFBAFullScreen:false,
            expandFBAOffersValue: new Animated.Value(0),
            positionYOfFBAOffersPage:new Animated.Value(screenHeight),
            heightOfFBaOffersPage:new Animated.Value(screenHeight * 0.4),
            selectedOffer:"used",
            NewUrl:null,
            UsedUrl:null,
            FBAUrl:null,
            AllOffersUrl:null,
            productCondition:null
        })
    }


   expandCollapseWebView(webViewIsFullScreen,option,company=false,ExCol=true){
      if(NetworkConnectivity.getInstance().internetAvailable == false) {
          alert("No Internet Connection")
            return;
      }

      if((option === Constants.kOffersType.kFBAOffers) & (company==false)){
          var url = this.state.FBAUrl;
      }else if((option === Constants.kOffersType.kNewOffers) & (company==false)){
          var url = this.state.NewUrl;
      }else if((option === Constants.kOffersType.kUsedOffers) & (company==false)){
          var url = this.state.UsedUrl;
      }else if((option === Constants.kOffersType.kAllOffers) & (company==false)){
          var url = this.state.AllOffersUrl;
      }else if(option === Constants.Company.KCompanyCamel){
          var url = 'https://camelcamelcamel.com/product/'+ this.state.productCode
      }else if(option ===  Constants.Company.KCompanyAmazon){
          var url = "https://www.amazon.com/dp/" + this.state.productCode + "/ref=olp_product_details?_encoding=UTF8&me="
      }else if( option === Constants.Company.KCompanyBookFinder){
          var url =  'http://www.bookfinder.com/search/?author=&title=&lang=en&isbn='+ this.state.productCode+'&new=1&used=1&ebooks=1&destination=us&currency=USD&mode=basic&st=sr&ac=qr'
      }else if( option === Constants.Company.KCompanyBookScouter){
         var url = 'https://bookscouter.com/prices.php?isbn='+this.state.productCode+'&searchbutton=Sell'
      }else if( option === Constants.Company.KCompanyEbay ){
          var url = 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313.TR0.TRC0.H0.X'+ this.state.productCode+'.TRS0&_nkw='+this.state.productCode+'&_sacat=0'
      }else if(option === Constants.Company.KCompanyKeepa){
          var url = 'https://keepa.com/#!product/1-' + this.state.productCode

      }
            if(option){
                  //alert(productObject.productCode)
                  //this.setState({webViewModal:true})
          this.setState({productOffersPageURL:null},()=>{
              setTimeout(()=>{
                  this.setState({productOffersPageURL:{uri:url}})
              },1)
          })

      }

      if(webViewIsFullScreen){
          Animated.timing(
              this.state.positionYOfFBAOffersPage,
              {
                  toValue:-screenHeight,
                  duration:200
              }

          ).start();

          /*Animated.timing(
              this.state.heightOfFBaOffersPage,
              {
                  toValue:screenHeight,
                  duration:200
              }
          ).start();*/

          this.setState({showFBAFullScreen:webViewIsFullScreen})


      }else{
          Animated.timing(
              this.state.positionYOfFBAOffersPage,
              {
                  toValue:-screenHeight * 0.45,
                  duration:200
              }
          ).start(() => { ExCol == true ? this.setState({webViewModal:true}) : null });

          /*Animated.timing(
              this.state.heightOfFBaOffersPage,
              {
                  toValue:screenHeight * 0.7,
                  duration:200
              }
          ).start();*/

          this.setState({showFBAFullScreen:webViewIsFullScreen})
      }
  }

    cameraAlert(){
        Alert.alert(
            'Camera Scanning Options',
            '',
            [
                {
                    text:'Scan Barcode',
                    onPress:()=>{
                          AnylineScanner.getInstance().openBarCodeScanner(Constants.kScanType.kBarCode)
                    }
                },
                {
                    text:'Scan Text',
                    onPress:()=>{
                            AnylineScanner.getInstance().openOCRScanner(Constants.kScanType.kOcr)
                    }
                }
            ]
        )
    }



 changeAmazonPriceToOffersPrice(value, index, name){

        let val =  productObject.calculateNetProfit(value)
     if(this.state.productAmazonRank == "-" || this.state.productAmazonRank== null ||LocalStorageSettingsApi.netProfit=="No Rank"){
         this.setState({productNetProfit:"$" +val, selectedIndexOfOffer:index, selectedOffer:name}, ()=>{
             this.setState({headingText: ((parseInt(val)>parseInt(LocalStorageSettingsApi.netProfit)))
                 ? 'Buy' :'Reject'},()=>
             {this.setState(
                 {buyRejectColor:(this.state.headingText=='Buy') ? Constants.ZenGreen : 'rgb(255,50,50)'}
             )
             })})
     }
     else{
         this.setState({productNetProfit:"$" +val, selectedIndexOfOffer:index, selectedOffer:name}, ()=>{
             this.setState({headingText: ((parseInt(val)>parseInt(LocalStorageSettingsApi.netProfit)) &&
             (parseInt(this.state.productAmazonRank)<parseInt(LocalStorageSettingsApi.averageSalesRankValue)))
                 ? 'Buy' :'Reject'},()=>
             {this.setState(
                 {buyRejectColor:(this.state.headingText=='Buy') ? Constants.ZenGreen : 'rgb(255,50,50)'}
             )
             })})}

 }


  render(){
  let navigationBar =  (
        <View style={styles.navBar}>
            <View style= {{flexGrow:1}}>
                <TouchableOpacity
                    onPress = {()=>{
                        this.cameraAlert()
                    }}
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}
                >
                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.camera}</FontAwesome>
                </TouchableOpacity>
           </View>
            <View style= {{justifyContent:'center',flexGrow:20}}>

                <TextInput
                    ref="bluetoothMode"
                    keyboardAppearance="dark"
                    clearButtonMode="while-editing"
                    keyboardType="numeric"
                    style={styles.navBarTxtInput}
                    returnKeyType ="search"
                    returnKeyLabel="Search"
                    placeholder={this.state.bluetoothMode ? 'Scan through bluetooth scanner' : 'Enter number'}
                    underlineColorAndroid={'white'}
                    enablesReturnKeyAutomatically = {true}
                    autoCorrect={false}
                    onSubmitEditing={()=>this.searchProduct(this.state.codeEnteredByUser)}
                    value= {this.state.codeEnteredByUser}
                    onChangeText = {(codeEnteredByUser)=>{
                        this.setState({codeEnteredByUser})
                        if(codeEnteredByUser == '' && (this.state.productCode == null)){
                            this.updateMainScreenToInitialState();
                        }
                    }}
                />
            </View>
            <View style= {{flexGrow:1}}>
                <TouchableOpacity
                    onPress = {()=>this.searchProduct(this.state.codeEnteredByUser)}
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <FontAwesome style={styles.fontAwesomeStyles}>{Icons.search}</FontAwesome>
                </TouchableOpacity>
            </View>


    </View>);
    let buyRejectBar = (
        <TouchableOpacity
            onPress={()=>{
                      Keyboard.dismiss();
                      this.setState({bluetoothMode:false},()=>{this.refs.bluetoothMode.blur()});
                    }
                  }
            style={[styles.buyReject , {backgroundColor:this.state.buyRejectColor} ]}
            activeOpacity={1}
            //onPress={()=>Keyboard.dismiss()}
        >

            <View
                style={{flex:7,alignItems:'center'}}
            >
                <Text style={styles.BRcontent}>{this.state.headingText}</Text>
            </View>
        </TouchableOpacity>
    );

    let productDescriptionComponent = (
        <View style={{height:screenHeight*0.35}}>
        <TouchableOpacity
            style={[{flex:7}]}
            activeOpacity={1}
            onPress={()=>{
                Keyboard.dismiss();
                this.setState({bluetoothMode:false},()=>{this.refs.bluetoothMode.blur()});
            }
            }
        >
        <View style={[this.state.styleForProductDescriptionView,{height:screenHeight*0.8}]}>
            <View style={{flex:15}}>
                <View style={[styles.itemInfoContainer, {backgroundColor:Constants.ZenBlue1}]}>
                     <TouchableOpacity style={this.state.productImage?styles.touchableImage:null} onPress= {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyAmazon)}>
                            {this.state.productImage?<Image source={this.state.productImage?this.state.productImage:null} style={this.state.productImage?styles.image:null}/>:null}
                        </TouchableOpacity>
                        <View style={styles.itemInfo}>
                            <View style={{flex:2,justifyContent:'center'}}><Text style={styles.itemInfoCategory}>{this.state.productCategory!=null?('Category:'+this.state.productCategory):null}</Text></View>
                                <View style={{flex:3}}>
                                    <TouchableOpacity style={{flex:1}} onPress= {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyAmazon)}>
                                        <Text style={styles.itemInfoTitle} ellipsizeMode="tail" numberOfLines={2}>{this.state.productTitle!=null?('Title:'+this.state.productTitle):null}</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                </View>
            </View>
            <View style={styles.itemInfoContainer}>
                <View style={{flex:1,padding:5}}>
                    <View style={styles.dataFieldWithoutBorder}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productBuyBox}</Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Trade</Text>
                    </View>
                </View>
                <View style={{flex:2,padding:5}}>
                    <View style={[styles.dataField]}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productBuyBox}</Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Buy Box</Text>
                    </View>
                </View>
                <View style={{flex:1,padding:5}}>
                    <View style={styles.dataField}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productFBAOffersPercent}</Text>
                      <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]}> X-Ray </Text>
                    </View>
                </View>

            </View>
            <View style={styles.itemInfoContainer}>
                <View style={[{flex:1,padding:5}]}>
                    <View style={styles.dataFieldWithoutBorder}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]}>
                            {this.state.productSalesRank}
                        </Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Rank</Text>
                    </View>
                </View>
                <View style={{flex:2,padding:5}}>
                    <View style={styles.dataField}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productAmazonRank}</Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Average Rank</Text>
                    </View>
                </View>
                <View style={{flex:1,padding:5}}>
                    <View style={styles.dataField}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productTopPercent}</Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Rank %</Text>
                    </View>
                </View>

            </View>
            <View style={styles.itemInfoContainer}>
                <View style={{flex:1,padding:5}}>
                    <TouchableOpacity style={{flex:1}} onPress={this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyAmazon)}>
                    <View style={styles.dataFieldWithoutBorder}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productAmazonPrice}</Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Amazon</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:2,padding:5}}>
                    <View style={[styles.dataField]}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productNetProfit}</Text>
                        <Text style={[styles.productSearchIndicators, styles.fontColorsBottom]} >Net Profit</Text>
                    </View>
                </View>

                <View style={{flex:1,padding:5}}>
                    <View style={styles.dataField}>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsTop]} >{this.state.productPricePercent}</Text>
                        <Text style={[styles.productSearchIndicators,styles.fontColorsBottom]} >Price %</Text>
                    </View>
                </View>

            </View>
            </View>
    </TouchableOpacity></View>);

    let otherSitesIconComponent = ( <View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}>
        <TouchableOpacity onPress = {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyCamel)} ><Image source={require('../assets/camelLogo.gif')} style={styles.siteIconStyles}/></TouchableOpacity>
        <TouchableOpacity onPress = {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyBookFinder)} ><Image source={require('../assets/BookFinder.png')} style={styles.siteIconStyles}/></TouchableOpacity>
        <TouchableOpacity onPress = {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyKeepa)} ><Image source={require('../assets/keepaLogo.png')} style={styles.siteIconStyles}/></TouchableOpacity>
        <TouchableOpacity onPress = {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyBookScouter)} ><Image source={require('../assets/bookscounterLogo.gif')} style={styles.siteIconStyles}/></TouchableOpacity>
        <TouchableOpacity onPress = {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyEbay)} ><Image source={require('../assets/ebayLogo.gif')} style={styles.siteIconStyles}/></TouchableOpacity>
        <TouchableOpacity onPress = {this.openProductLink.bind(this,this.state.productCode,Constants.Company.KCompanyAmazon)} ><Image source={require('../assets/amazonLogo.png')} style={styles.siteIconStyles}/></TouchableOpacity>


    </View>);
    let scrollViewData = (
        <View style= {{flex:1,flexDirection:'row'}}>
            <View style= {{flex:1}}>
                {this.state.fbaOffersArray.map((value,index)=>{
                       //for showing only five offers
                     if(index<5)
                     {
                    return  (
                        <View style={styles.scrollingTableRow} key={index}>
                            <TouchableOpacity
                                style={{height:60}}
                                //onPress={this.expandCollapseWebView.bind(this,false,Constants.kOffersType.kFBAOffers, false)}
                                onPress={this.changeAmazonPriceToOffersPrice.bind(this,value.Price, index, "fba")}
                                activeOpacity={0.85}
                            >
                                <Text style={[styles.scrollingTableContent, {color:(this.state.selectedIndexOfOffer==index && this.state.selectedOffer=="fba")?'rgb(0,163,238)':'black'}]}>
                                    {/*this.state.displayProductCondition?<Text style={[styles.productConditionQuantity]}>(G) </Text>:null*/}
                                    {'$' +value.Price}
                                    {this.state.displayProductCondition?<Text style={styles.productConditionQuantity}> {(value.Condition)}</Text>:null}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                     }
                })}
            </View>
            {/*<View style= {{flex:1}}>
            {this.state.fbaOffersArray.map((value,index)=>{
                return  (
                    <View style={styles.scrollingTableRow} key={index}>
                        <TouchableOpacity
                            style={{height:60}}
                            onPress={this.expandCollapseWebView.bind(this,false,Constants.kOffersType.kFBAOffers, false)}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.scrollingTableContent, {color:'rgb(0,224,137)'}, {textDecorationLine:'underline'}]}>
                                {/!*this.state.displayProductCondition?<Text style={[styles.productConditionQuantity]}>(G) </Text>:null*!/}
                                {value}
                                {/!*this.state.displayProductQuantity?<Text style={styles.productConditionQuantity}> (3)</Text>:null*!/}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>*/}

      <View style= {{flex:1}}>
        {this.state.nonFbaUsedArray.map((value,index)=>{
            console.log("nonFbaUsedArray" +this.state.nonFbaUsedArray)
             //for showing only five offers
            if(index<5)
            {
          return  (
              <View style={styles.scrollingTableRow} key={index}>
                  <TouchableOpacity
                      style={{height:60}}
                      onPress={this.changeAmazonPriceToOffersPrice.bind(this,value.Price, index, "used")}
                      activeOpacity={0.85}
                  >
                <Text style={[styles.scrollingTableContent, {color:(this.state.selectedIndexOfOffer==index && this.state.selectedOffer=="used")?'rgb(0,163,238)':'black'}]}>
                    {/*this.state.displayProductCondition?<Text style={[styles.productConditionQuantity]}>(G) </Text>:null*/}
                   { '$' + value.Price}
                    {this.state.displayProductCondition?<Text style={styles.productConditionQuantity}> {(value.Condition)}</Text>:null}
                </Text>
                  </TouchableOpacity>
              </View>
          )
          }
        })}
      </View>
      <View style= {{flex:1}}>
        {this.state.nonFbaNewArray.map((value,index)=>{
            console.log("state array in mapping"+JSON.stringify(value))
            //for showing only five offers
               if(index<5)
            {
          return  (
              <View style={styles.scrollingTableRow} key={index}>
                  <TouchableOpacity
                      style={{height:60}}
                      onPress={this.changeAmazonPriceToOffersPrice.bind(this,value, index, "new")}
                      activeOpacity={0.85}
                  >
                <Text style={[styles.scrollingTableContent,{color:(this.state.selectedIndexOfOffer==index && this.state.selectedOffer=="new")?'rgb(0,163,238)':'black'}]}>
                    {/*this.state.displayProductCondition?<Text style={[styles.productConditionQuantity]}>(A) </Text>:null*/}
                    {`$` + value}
                    {/*this.state.displayProductQuantity?<Text style={styles.productConditionQuantity}></Text>:null*/}
                </Text>
                  </TouchableOpacity>
              </View>
          )
            }
        })}
      </View>
         {/*<View style= {{flex:1}}>
                        <View style={styles.scrollingTableRow} >
                            <Text style={styles.scrollingTableContent}>
                                <Text style={{fontSize:9 , opacity:(this.state.displayProductCondition?1:0)}}> </Text>
                            </Text>
                        </View>
            </View>
*/}
    </View>);

    let averagePriceComponent = (<View style={styles.averagePriceRowMainView}>
            {/*fba avaerage price and label removed*/}
          <View style={styles.averagePriceRow}><Text style={styles.averagePriceRowContent}>  <Text style={[styles.averagePriceRowContent,{fontSize:Utility.getFontSize()*0.3}]}></Text></Text></View>
          <View style={styles.averagePriceRow}><Text style={styles.averagePriceRowContent}>{this.state.nonFbaUsedAvg?''+this.state.nonFbaUsedAvg+'(AVG)':null}</Text></View>
          <View style={styles.averagePriceRow}><Text style={styles.averagePriceRowContent}>{this.state.nonFbaNewAvg?''+this.state.nonFbaNewAvg+'(AVG)':null}</Text></View>
        </View>);

    let webViewComponent = (
        <Animated.View style= {{width:screenWidth,borderTopColor:"black",borderTopWidth:1,height:this.state.heightOfFBaOffersPage, transform:[{translateY:this.state.positionYOfFBAOffersPage}]}}>

            <View style={{backgroundColor:'rgb(36,46,58)', height:0.5}}/>
            <WebView
                automaticallyAdjustContentInsets={false}
                source={this.state.productOffersPageURL}
                scalesPageToFit={true}
                onLoad={()=>this.setState({webViewModal:false})}
                domStorageEnabled={true}

            />

            <View style={{flex:1, flexDirection:'row',height:40, width:70, marginTop:this.state.showFBAFullScreen? 44: 49 ,backgroundColor:'rgb(205,205,205)', marginLeft:Utility.getFontSize()==50?screenWidth-70:screenWidth-70, position:'absolute', borderRadius:10}}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.minimizeExpandIconStyles}
                onPress={this.expandCollapseWebView.bind(this,this.state.showFBAFullScreen?false:true,null,false,false)}
            >
                {this.state.showFBAFullScreen? <Icon_min name='window-minimize' size={Utility.getFontSize()==50?30:20} color='black'/>
                    :<Icon_min name='window-maximize' size={Utility.getFontSize()==50?30:20} color='black'/> }
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.closeIconStyles}
                onPress={()=>this.closeWebView()}
            >
                <Icon_min name='window-close' size={Utility.getFontSize()==50?30:20} color='black' backgroundColor='red'/>
            </TouchableOpacity>
                </View>

            <Modal
                visible={this.state.webViewModal}
                transparent={true}
                style={{justifyContent:"center"}}
            >
                <TouchableOpacity
                    style={{flex:1,paddingTop:screenHeight*0.6}}
                    activeOpacity={1}
                    onPress={() => this.setState({webViewModal:false})}
                >

                    <ActivityIndicator color="rgb(0,0,0)" />

                </TouchableOpacity>

            </Modal>
        </Animated.View>
    );
    let fbaOffersComponent = (<View style= {[{flex:10},{borderColor:Constants.ZenBlue1},{padding:10},{paddingBottom:-10}]}>
    <View style={[ ZenUIStyles.FramedBoxStyle,{height:screenHeight*0.33}]}>

        <View style={{height:40,flexDirection:'row'}}>

          <TouchableOpacity  onPress={()=>{
                                   //if(this.state.nonFbaUsedArray.length > 0){
                                      if(this.state.productUsedOffers==null )
                                      {
                                          alert('Please do a live search to get ISBN');
                                          return
                                      }
                                       this.expandCollapseWebView(false,Constants.kOffersType.kUsedOffers)
                                   //}
                              }} style={styles.amazonOfferLinksConatiner}><Text style={ZenUIStyles.SubheaderTextStyle}>{this.state.productUsedOffers} Used</Text></TouchableOpacity>
          <TouchableOpacity
                onPress={()=>{
                                // if(this.state.fbaOffersArray.length > 0){
                                        if(this.state.productTitle==null )
                                        {
                                            alert('Please do a live search to get ISBN');
                                            return
                                        }
                                     this.expandCollapseWebView(false,Constants.kOffersType.kFBAOffers)
                                // }
                             }}
                style={styles.amazonOfferLinksConatiner}
            >
                <Text style={ZenUIStyles.SubheaderTextStyle}>{this.state.productFBAOffers} FBA </Text>
         </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{
                                   //if(this.state.nonFbaNewArray.length > 0){
                                          if(this.state.productNewOffers==null )
                                          {
                                              alert('Please do a live search to get ISBN');
                                              return
                                          }
                                       this.expandCollapseWebView(false,Constants.kOffersType.kNewOffers)
                                   //}
                              }} style={styles.amazonOfferLinksConatiner}><Text style={ZenUIStyles.SubheaderTextStyle}>{this.state.productNewOffers} New</Text></TouchableOpacity>


            {/*<TouchableOpacity style={styles.tradeValueStyle}><Text style={styles.amazonOfferLinks}>TRADE IN</Text></TouchableOpacity>*/}

        </View>
        <ScrollView onScroll={()=>this.setState({bluetoothMode:false})}>
            {scrollViewData}

        </ScrollView>
        <View style={{height:30}}>
            {averagePriceComponent}
        </View>
      </View>

    </View>);

    let mainView = (
        <View style={styles.mainViewContainer}>
            <View style={{alignItems:'center'}}>
                <View style={[{flexDirection:'row'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>

                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                    this.setShowSideMenuState();
                                    //this.setState({bluetoothMode:false},()=>{this.refs.bluetoothMode.blur()});
                                }
                            }
                        >
                            <Icon name='menu' size={20} color='darkorchid' style={{fontSize:20}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

          {this.state.showSideMenu?<SideMenu navigator = {this.props.navigator}  setShowSideMenuState={this.setShowSideMenuState.bind(this)} />:null}

          {buyRejectBar}
          {productDescriptionComponent}
          {fbaOffersComponent}

          {this.state.productTitle?otherSitesIconComponent:<View></View>}
          {navigationBar}


          <View style={[{alignItems:'center'},{height:35},{padding:1}]}>
          </View>
        </View>
    );

      let barCodeComponent = null;
      if(this.state.openCamera){
          barCodeComponent = <BarCodeScanner mainScreenRef ={this} cameraVisible = {true}/>
      }else{
          barCodeComponent = <BarCodeScanner mainScreenRef ={this} cameraVisible = {false}/>
      }

    return(
            <View style={{flex:1}}>
                {mainView}
                {webViewComponent}
                {barCodeComponent}
           </View>
    )
  }

  //Remove the response listners
    componentWillUnmount(){
      //alert('unmount')
  //  AWSResponse.getInstance().removeReceiver(this);
      DatabaseServerResponse.getInstance().removeReceiver(this);
      LocalStorageSettingsResponse.getInstance().removeReceiver(this);
      ElasticSearchResponse.getInstance().removeReceiver(this)
      AWSResponse.getInstance().removeReceiver(this);
  }

   searchProduct(productCode) {
      //this.refs.bluetoothMode.focus()
      //this.setState({bluetoothMode:false});
      //console.log("**********searchFunction" + productCode)
      /*if(Constants.IsTrialPeriodValid == false){
          alert("Trial period expired")
          return;
      }*/
      //console.log("****123number of csnas" + LocalStorageSettingsApi.numberOfScansInTrial)

       productObject= new Product();

      if (!productCode && !this.state.bluetoothMode) {
          alert('Please enter ISBN or UPC code')
          return;
      }

      /*if(productCode.length!=10 && productCode.length!=13 && !this.state.bluetoothMode) {
          alert('Please enter a valid ISBN OR UPC code')
          return;
      }
         if(((Constants.IsTrialPeriodValid == false) || (LocalStorageSettingsApi.numberOfScansInTrial > 99)) && (Constants.isSubscriptionTaken==false)){
          if(Constants.IsTrialPeriodValid == false){
              alert("Trial period has expired")
          }else if(LocalStorageSettingsApi.numberOfScansInTrial > 99){
              alert("Number of free scans exceeded")
          }
          return
      }*/
      Keyboard.dismiss();
      this.setState({webViewModal:true, selectedOffer:"used"});
      if((LocalStorageSettingsApi.OperatingMode != JSON.stringify(Constants.SearchMode.kDataBase))) {
          if (NetworkConnectivity.getInstance().internetAvailable == false) {
              alert("No Internet Connection")
              this.setState({webViewModal: false});
              return;
          }
      }


      productCodeType = Constants.ProductCodeType.KTypeISBN
      if (productCode.length == 12) {
          productCodeType = Constants.ProductCodeType.KTypeUPC
      }


     if(LocalStorageSettingsApi.OperatingMode == JSON.stringify(Constants.SearchMode.kDataBase)) {
          DatabaseLocalApi.getInstance().searchProductById(productCode)
      }
      else if (LocalStorageSettingsApi.OperatingMode == JSON.stringify(Constants.SearchMode.kElasticSearch)) {
          //  ElasticSearch.fetchProduct(productCode)
         AWSApi.fetchProduct(this.state.codeEnteredByUser,productCodeType);

      }

      else{
          alert('Mode not available ' + LocalStorageSettingsApi.OperatingMode)
      }

  }


    //AWS Response delegate method
    async awsResponseSucessCallBack(response){

        if( !( (response.hasOwnProperty('ItemLookupResponse')) && (response['ItemLookupResponse'].hasOwnProperty('Items')) && (response['ItemLookupResponse']['Items'].hasOwnProperty('Item')) ) ){
            this.calculateAverageRank(this.state.codeEnteredByUser)
            return
        }

        //if( typeof response.Errors )
        /*if( !( ( 'Errors' in response["ItemLookupResponse"]) || ('Error' in response["ItemLookupResponse"]) ) ){
            alert("hello")
            var itemArray = response["ItemLookupResponse"]["Items"]["Item"];
            let NewAmazonPrice = itemArray["ItemAttributes"]["ListPrice"]?itemArray["ItemAttributes"]["ListPrice"]["FormattedPrice"]:null
            let NewSalesRank = itemArray["SalesRank"]?itemArray["SalesRank"]:null
            let image =  itemArray["SmallImage"]?itemArray["SmallImage"]["URL"]:null
            let tradeInValue = itemArray["OfferSummary"]["LowestUsedPrice"]["FormattedPrice"]?itemArray["OfferSummary"]["LowestUsedPrice"]["FormattedPrice"]:null
            productObject.amazonPrice=NewAmazonPrice;
            productObject.salesRank=NewSalesRank;
            productObject.image=image;

            productObject.tradeIn = tradeInValue


            this.calculateAverageRank(this.state.codeEnteredByUser)
            //this.updateStateOnSuccess(productObject)
            //return
        }
        else{
            alert("bye")
            this.updateStateOnSuccess(productObject)
            //return
        }*/
       //let productObject = new Product();
       //productObject.upadateProductDataOnResponse(response);
        //alert(JSON.stringify(response))
        var itemArray = response["ItemLookupResponse"]["Items"]["Item"];
        var catArray = response["ItemLookupResponse"]["Items"]


        if(itemArray.constructor.name != 'Array') {

            let NewAmazonPrice = itemArray["ItemAttributes"] ? itemArray["ItemAttributes"]["ListPrice"] ? itemArray["ItemAttributes"]["ListPrice"]["FormattedPrice"] : null : null
            let NewSalesRank = itemArray["SalesRank"] ? itemArray["SalesRank"] : null
            let image = itemArray["SmallImage"] ? itemArray["SmallImage"]["URL"] : null
            let tradeInValue = itemArray["ItemAttributes"] ? itemArray["ItemAttributes"]["TradeInValue"] ? itemArray["ItemAttributes"]["TradeInValue"]["FormattedPrice"]: ' ' : ' '
            let category = catArray["Request"] ? catArray["Request"]["ItemLookupRequest"] ? catArray["Request"]["ItemLookupRequest"]["SearchIndex"] : null : null
            let title = itemArray["ItemAttributes"]?itemArray["ItemAttributes"]["Title"]:null
            let TotalNew=itemArray["OfferSummary"]?itemArray["OfferSummary"]["TotalNew"]:null
            let TotalUsed=itemArray["OfferSummary"]?itemArray["OfferSummary"]["TotalUsed"]:null
            let LowestNewPrice=itemArray["OfferSummary"]?itemArray["OfferSummary"]?itemArray["OfferSummary"]["LowestNewPrice"]?itemArray["OfferSummary"]["LowestNewPrice"]["FormattedPrice"]:null:null:null
            let LowestUsedPrice=itemArray["OfferSummary"]?itemArray["OfferSummary"]["LowestUsedPrice"]?itemArray["OfferSummary"]["LowestUsedPrice"]["FormattedPrice"]:null:null
            let AllOffersUrl = itemArray["ItemLinks"]["ItemLink"][(itemArray["ItemLinks"]["ItemLink"].length - 1)]["URL"]
            let FBAUrl = itemArray["ItemLinks"]["ItemLink"][(itemArray["ItemLinks"]["ItemLink"].length - 1)]["URL"] + "/ref=olp_f_primeEligible?ie=UTF8&f_primeEligible=true&force-full-site=1";
            let UsedUrl = itemArray["ItemLinks"]["ItemLink"][(itemArray["ItemLinks"]["ItemLink"].length - 1)]["URL"] + "/ref=olp_tab_new?ie=UTF8&condition=used"
            let NewUrl = itemArray["ItemLinks"]["ItemLink"][(itemArray["ItemLinks"]["ItemLink"].length - 1)]["URL"] + "/ref=olp_tab_used?ie=UTF8&condition=new"
            asin=itemArray["ASIN"]?itemArray["ASIN"]:null
            //let productCode = catArray["ItemLookupRequest"] ? catArray["ItemLookupRequest"]["ItemId"] ? catArray["ItemLookupRequest"]["ItemId"] : null : null
            console.log("****FBAUrl " + FBAUrl)
            if (NewAmazonPrice != null) {
                let ParsedNewAmazonPrice = NewAmazonPrice.slice(1)
                if (ParsedNewAmazonPrice > 1000) {
                    ParsedNewAmazonPrice = parseInt(NewAmazonPrice)
                    NewAmazonPrice = '$' + ParsedNewAmazonPrice
                }
            }
            asin=asin.toString()
            console.log("///////////////////asin" +typeof(asin)+ asin+asin.length)
            let prefixZeroString=""
            if(asin.length<10)
            {
                for(i=10;i>asin.length;i--)
                {
                    prefixZeroString+="0"
                }
                console.log("prefixZeroString" +prefixZeroString)
                asin=prefixZeroString+asin
            }

            //await MWSApi.fetchProduct(asin, "New","GetLowestOfferListingsForASIN").then(()=> MWSApi.fetchProduct(asin, "Used", "GetLowestOfferListingsForASIN"))
            //Removing await for time effiency -incresed by 5 sec :)

             MWSApi.fetchProduct(asin, "New","GetLowestOfferListingsForASIN").then(()=> MWSApi.fetchProduct(asin, "Used", "GetLowestOfferListingsForASIN"))

            await MWSApi.fetchProduct(asin, "New", "GetLowestPricedOffersForASIN")

            productObject.compareSalesRank = NewSalesRank;

            if(NewSalesRank != null ){
                NewSalesRank = NewSalesRank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }


            productObject.amazonPrice = NewAmazonPrice;
            productObject.numberOfNewOffers=TotalNew;
            productObject.numberOfUsedOffers=TotalUsed;
            productObject.salesRank = NewSalesRank;
            productObject.image = image;
            productObject.category = category;
            productObject.tradeIn = tradeInValue;
            productObject.title = title;
            productObject.FBAUrl = FBAUrl;
            productObject.UsedUrl = UsedUrl;
            productObject.NewUrl = NewUrl;
            productObject.AllOffersUrl = AllOffersUrl
            productObject.lowestNewPrice = LowestNewPrice
            productObject.lowestUsedPrice = LowestUsedPrice
            alert('LowestNewPrice1='+LowestNewPrice);

        }else {
            let len=itemArray.length
            console.log("length" +len)

            let NewAmazonPrice = itemArray[len-1]["ItemAttributes"] ? itemArray[len-1]["ItemAttributes"]["ListPrice"] ? itemArray[len-1]["ItemAttributes"]["ListPrice"]["FormattedPrice"]: null: null
            let NewSalesRank = itemArray[len-1]["SalesRank"] ? itemArray[len-1]["SalesRank"] : null
            let image = itemArray[len-1]["SmallImage"] ? itemArray[len-1]["SmallImage"]["URL"] : null
            let tradeInValue = itemArray[len-1]["ItemAttributes"] ? itemArray[len-1]["ItemAttributes"]["TradeInValue"] ? itemArray[len-1]["ItemAttributes"]["TradeInValue"]["FormattedPrice"] : ' ' : ' '
            let category = catArray["Request"] ? catArray["Request"]["ItemLookupRequest"] ? catArray["Request"]["ItemLookupRequest"]["SearchIndex"] : null : null
            let title = itemArray[len-1]["ItemAttributes"]?itemArray[len-1]["ItemAttributes"]["Title"]:null
            let TotalNew=itemArray[len-1]?itemArray[len-1]["OfferSummary"]?itemArray[len-1]["OfferSummary"]["TotalNew"]:null:null
            let TotalUsed=itemArray[len-1]?itemArray[len-1]["OfferSummary"]?itemArray[len-1]["OfferSummary"]["TotalUsed"]:null:null
            let LowestNewPrice=itemArray[len-1]?itemArray[len-1]["OfferSummary"]?itemArray[len-1]["OfferSummary"]["LowestNewPrice"]?itemArray[len-1]["OfferSummary"]["LowestNewPrice"]["FormattedPrice"]:null:null:null
            let LowestUsedPrice=itemArray[len-1]?itemArray[len-1]["OfferSummary"]?itemArray[len-1]["OfferSummary"]["LowestUsedPrice"]?itemArray[len-1]["OfferSummary"]["LowestUsedPrice"]["FormattedPrice"]:null:null:null
            let AllOffersUrl = itemArray[len-1]["ItemLinks"]["ItemLink"][(itemArray[len-1]["ItemLinks"]["ItemLink"].length - 1)]["URL"]
            let FBAUrl = itemArray[len-1]["ItemLinks"]["ItemLink"][(itemArray[len-1]["ItemLinks"]["ItemLink"].length - 1)]["URL"] + "/ref=olp_f_primeEligible?ie=UTF8&f_primeEligible=true&force-full-site=1";
            let UsedUrl = itemArray[len-1]["ItemLinks"]["ItemLink"][(itemArray[len-1]["ItemLinks"]["ItemLink"].length - 1)]["URL"] + "/ref=olp_tab_new?ie=UTF8&condition=used"
            let NewUrl = itemArray[len-1]["ItemLinks"]["ItemLink"][(itemArray[len-1]["ItemLinks"]["ItemLink"].length - 1)]["URL"] + "/ref=olp_tab_used?ie=UTF8&condition=new"
            asin=itemArray[len-1]["ASIN"]?itemArray[len-1]["ASIN"]:null
            //let productCode = catArray["ItemLookupRequest"] ? catArray["ItemLookupRequest"]["ItemId"] ? catArray["ItemLookupRequest"]["ItemId"] : null : null

            if (NewAmazonPrice != null) {
                let ParsedNewAmazonPrice = NewAmazonPrice.slice(1)
                if (ParsedNewAmazonPrice > 1000) {
                    ParsedNewAmazonPrice = parseInt(NewAmazonPrice)
                    NewAmazonPrice = '$' + ParsedNewAmazonPrice
                }
            }
            asin=asin.toString()
            console.log("///////////////////asin" +typeof(asin)+ asin+asin.length)
            let prefixZeroString=""
            if(asin.length<10)
            {
                for(i=10;i>asin.length;i--)
                {
                    prefixZeroString+="0"
                }
                console.log("prefixZeroString" +prefixZeroString)
                asin=prefixZeroString+asin
            }
            console.log("asin**" +asin)


            //await MWSApi.fetchProduct(asin, "New","GetLowestOfferListingsForASIN").then(()=> MWSApi.fetchProduct(asin, "Used", "GetLowestOfferListingsForASIN"))
            //Removing await for time effiency -incresed by 5 sec :)

             MWSApi.fetchProduct(asin, "New", "GetLowestOfferListingsForASIN").then(()=> MWSApi.fetchProduct(this.state.codeEnteredByUser, "Used", "GetLowestOfferListingsForASIN"))
            await MWSApi.fetchProduct(asin, "New", "GetLowestPricedOffersForASIN")

            productObject.compareSalesRank = NewSalesRank;

            if(NewSalesRank != null ){
                NewSalesRank = NewSalesRank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }

            productObject.salesRank = NewSalesRank;
            productObject.image = image;
            productObject.category = category;
            productObject.tradeIn = tradeInValue;
            productObject.title = title;
            productObject.numberOfNewOffers=TotalNew;
            productObject.numberOfUsedOffers=TotalUsed;
            //productObject.nonFBANewOffersArray=[LowestNewPrice];
            //productObject.nonFBAUsedOffersArray=[LowestUsedPrice];
            productObject.amazonPrice = NewAmazonPrice;
            productObject.FBAUrl = FBAUrl;
            productObject.UsedUrl = UsedUrl;
            productObject.NewUrl = NewUrl;
            productObject.AllOffersUrl = AllOffersUrl
            productObject.lowestNewPrice = (itemArray[len-1]?itemArray[len-1]["OfferSummary"]?itemArray[len-1]["OfferSummary"]["LowestNewPrice"]?((itemArray[len-1]["OfferSummary"]["LowestNewPrice"]["Amount"])/100):null:null:null)
            productObject.lowestUsedPrice = (itemArray[len-1]?itemArray[len-1]["OfferSummary"]?itemArray[len-1]["OfferSummary"]["LowestUsedPrice"]?((itemArray[len-1]["OfferSummary"]["LowestUsedPrice"]["Amount"])/100):null:null:null)
           //alert('LowestNewPrice2='+productObject.lowestNewPrice);
            //productObject.productCode = productCode
        }
        LocalStorageSettingsApi.setTotalScansDoneInTrial(JSON.stringify((LocalStorageSettingsApi.numberOfScansInTrial)+1)).then(() => {
            this.calculateAverageRank(asin);
            if(asinMissing) {
                ElasticSearch.fetchProduct(asin);
                asinMissing=false
            }
        })

        //console.log("****123passed")
        //LocalStorageSettingsApi.numberOfScansInTrial +=1;

        //productObject.averageRank = productObject.calculateAmazonRank(this.state.codeEnteredByUser)
        //alert(productObject.averageRank)
       //productObject={...productObject,amazonPrice:NewAmazonPrice,salesRank:NewSalesRank}
           //console.log("***********awsResponseSucessCallBack")
       //this.updateStateOnSuccess(productObject)

    }

    mwsResponseSucessCallBack(response, ItemCondition){
        console.log("mwsResponseSucessCallBack" +JSON.stringify(response))
        var PriceArray=[]
        var FBAOffers=[]
        var UsedPricedArray=[]
        let FBAOffersPrice
        //response.GetLowestOfferListingsForASINResponse.GetLowestOfferListingsForASINResult.Product.LowestOfferListings.LowestOfferListing.Price.ListingPrice.Amount))
        let ListingArray=response["GetLowestOfferListingsForASINResponse"]["GetLowestOfferListingsForASINResult"]["Product"]
        if(JSON.stringify(response["GetLowestOfferListingsForASINResponse"]["GetLowestOfferListingsForASINResult"]).substring(0,5)!='ERROR' && ListingArray!=undefined )
        {
        let ProductArray=ListingArray["LowestOfferListings"];

        if(ProductArray != ""){
            console.log("Product array is not null")

            var OffersArray=ProductArray["LowestOfferListing"]

            if(OffersArray.constructor.name == 'Array'){
                console.log("array rsponse")

                OffersArray.forEach(function (element) {

                    if (element["Qualifiers"]["FulfillmentChannel"] == 'Amazon') {

                        FBAOffersPrice= (element["Price"]["ListingPrice"]["Amount"])

                        let Subcondition=null

                        if(element["Qualifiers"]["ItemSubcondition"]=='Good'){
                            Subcondition = '(G)'
                        }

                        if(element["Qualifiers"]["ItemSubcondition"]== 'VeryGood'){
                            Subcondition = '(VG)'
                        }
                        if (element["Qualifiers"]["ItemSubcondition"]== 'Acceptable'){
                            Subcondition = '(A)'
                        }

                        FBAOffers.push({Price :FBAOffersPrice, Condition: Subcondition})
                        productObject.fbaOffersArray=FBAOffers


                    }


                        if (element["Qualifiers"]["ItemCondition"] == 'Used') {
                            let Subcondition=null
                            let ItemSubcondition= element["Qualifiers"]["ItemSubcondition"]
                            let Itemprice=element["Price"]["ListingPrice"]["Amount"]

                            if(ItemSubcondition == 'Good'){
                                Subcondition = '(G)'
                            }
                            if(ItemSubcondition== 'VeryGood'){
                                Subcondition = '(VG)'
                            }
                            if (ItemSubcondition== 'Acceptable'){
                                Subcondition = '(A)'
                            }
                            UsedPricedArray.push({Price :Itemprice, Condition: Subcondition})

                            UsedPricedArray.sort(function (a, b) {
                                return a.Price- b.Price
                            });
                            productObject.nonFBAUsedOffersArray=UsedPricedArray
                           // productObject.productCondition=UsedPricedArray.Condition
                            console.log("**ItemSubcondition**" +Subcondition)
                        }
                        if (element["Qualifiers"]["ItemCondition"] == 'New') {
                            PriceArray.push(element["Price"]["ListingPrice"]["Amount"])
                            PriceArray.sort(function (a, b) {
                                return a - b
                            });
                            productObject.nonFBANewOffersArray=PriceArray
                        }


                })
            }

            else {
                console.log("object response")
                if (OffersArray["Qualifiers"]["FulfillmentChannel"] == 'Amazon') {
                    console.log("amazon product ")
                    FBAOffersPrice=OffersArray["Price"]["ListingPrice"]["Amount"]
                    let Subcondition=null

                    if(element["Qualifiers"]["ItemSubcondition"]=='Good'){
                        Subcondition = '(G)'
                    }

                    if(element["Qualifiers"]["ItemSubcondition"]== 'VeryGood'){
                        Subcondition = '(VG)'
                    }
                    if (element["Qualifiers"]["ItemSubcondition"]== 'Acceptable'){
                        Subcondition = '(A)'
                    }

                    FBAOffers.push({Price :FBAOffersPrice, Condition: Subcondition})
                    productObject.fbaOffersArray=FBAOffers

                }

                    console.log("item is " +OffersArray["Price"]["ListingPrice"]["Amount"])
                    if (OffersArray["Qualifiers"]["ItemCondition"] == 'Used') {
                        let Subcondition=null
                        let ItemSubcondition= OffersArray["Qualifiers"]["ItemSubcondition"]
                        let Itemprice=OffersArray["Price"]["ListingPrice"]["Amount"]

                        if(ItemSubcondition == 'Good'){
                            Subcondition = '(G)'
                        }
                        if(ItemSubcondition== 'VeryGood'){
                            Subcondition = '(VG)'
                        }
                        if (ItemSubcondition== 'Acceptable'){
                            Subcondition = '(A)'
                        }

                        UsedPricedArray.push({Price :Itemprice, Condition: Subcondition})

                        UsedPricedArray.sort(function (a, b) {
                            return a.Price- b.Price
                        });
                        productObject.nonFBAUsedOffersArray=UsedPricedArray
                    }

                    if (OffersArray["Qualifiers"]["ItemCondition"] == 'New') {
                        console.log("new offer ")
                        PriceArray.push(OffersArray["Price"]["ListingPrice"]["Amount"])
                        PriceArray.sort(function (a, b) {
                            return a - b
                        });
                        productObject.nonFBANewOffersArray=PriceArray
                    }

            }

        }}
    }


    mwsOffersResponseSucessCallBack(response) {
        console.log("______response" +JSON.stringify(response))
        var TotalFBAOffers=0
        let ListingArray=response["GetLowestPricedOffersForASINResponse"]["GetLowestPricedOffersForASINResult"]
        if(true){

                let OffersArray=ListingArray[0]["Summary"]

                let NumberOfOffers=OffersArray[0]["NumberOfOffers"][0]["OfferCount"]

                NumberOfOffers.forEach(function (element){
                    if (element["$"]["fulfillmentChannel"] == 'Amazon') {
                        console.log("**if")
                        TotalFBAOffers= TotalFBAOffers + parseInt(element["_"])
                        productObject.numberOfFBAOffers=TotalFBAOffers
                    }
                    })
                }
       }

    missingASIN(asin){
        console.log("*********xyzmissingASIN" + asin)
        fetch('http://34.210.169.97/prices/missing', {
            method: 'POST',
            body: JSON.stringify({
                asin: asin
            })
        }).then((res)=>{
            res=JSON.parse(res["_bodyInit"])
            console.log("*********xyzRePoNsEEE:" + JSON.stringify(res))
        }).catch((err)=>{
            console.log("*********xyzErrOR:" + JSON.stringify(err))
        })
    }

     calculateAverageRank(isbn){

         console.log("*********xyzavgRank1")
        fetch('http://35.167.19.151/history/average/?asins=' + isbn )
            .then((response) => {
                console.log("*********xyz:" + JSON.stringify(response))
                response=JSON.parse(response["_bodyText"])
                //alert(JSON.stringify(response))
                 console.log("*********all:" + JSON.stringify(response))
                if(JSON.stringify(response[isbn])!=null){
                //productObject.averageRank = (JSON.stringify(response[isbn]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                productObject.averageRank = JSON.stringify(response[isbn]);//
                alert('calculateAverageRank ()averageRank:'+JSON.stringify(response[isbn]));
                }
                else{
                    productObject.averageRank='-'
                }
            }).then(()=>this.averagePrice(isbn)).then(()=>{this.updateStateOnSuccess(productObject)}).catch((error)=>{
               // alert(JSON.stringify(error))
              this.averagePrice(isbn).then(()=>{this.updateStateOnSuccess(productObject)})
            })

    }

    async averagePrice(asin){
         // removed await ahead of fetch for time optimization  ;) works or not -- no idea!!

         fetch('http://34.210.169.97/prices/amazon/average?asins=' + asin )
            .then((response) => {
                console.log("*********xyzavgPrice1")
                response=JSON.parse(response["_bodyText"])
                res=JSON.stringify(response[asin])
                console.log("response of average price is " +res)
                if(res!="null")
                {
                    res=res/100
                    productObject.fbaAvg="$" +res
                }
                else
                {
                    productObject.fbaAvg= "NA"
                }
            })
         fetch('http://34.210.169.97/prices/new/average?asins=' + asin )
            .then((response) => {
                console.log("*********xyzavgPrice2")
                response=JSON.parse(response["_bodyText"])
                res=JSON.stringify(response[asin])
                console.log("response of average price is " +res)
                if(res!="null")
                {
                    res=res/100
                    productObject.nonFbaNewAvg="$" +res
                }
                else
                {
                    productObject.nonFbaNewAvg="NA"
                }
            })
        await fetch('http://34.210.169.97/prices/used/average?asins=' + asin )
            .then((response) => {
                console.log("*********xyzavgPrice3")
                response=JSON.parse(response["_bodyText"])
                res=JSON.stringify(response[asin])
                console.log("response of average price is " +res)
                if(res!="null")
                {
                    res=res/100
                    productObject.nonFbaUsedAvg="$" +res
                }
                else
                {
                    productObject.nonFbaUsedAvg="NA"
                }
            })
        console.log("*********xyzavgPriceLast")
    }

  awsResponseFailureCallBack(errorCode){

      if(LocalStorageSettingsApi.OperatingMode == JSON.stringify(Constants.SearchMode.kDataBase) && NetworkConnectivity.getInstance().internetAvailable==false){
          alert("Not found")
      }
      if(LocalStorageSettingsApi.OperatingMode == JSON.stringify(Constants.SearchMode.kDataBase) && this.state.esResult) {
          //console.log("################################")
          this.calculateAverageRank(this.state.codeEnteredByUser)
      }
      else{
          this.updateStateOnElasticsearchFailure()
      }

  }
  
  // Data base server api delegates`
  databaseServerResponseSucessCallBack(reponse){
    alert('dataBaseServerResponseSucessCallBack');
  }

  databaseServerResponseFailureCallBack(errorCode){
    alert('dataBaseServerResponseFailureCallBack');
  }

   //Elastic search cluster delegates
    elasticSearchResponseSucessCallBack(response){
        //alert("es")
      //console.log("*********elasticSearchResponseSucessCallBack")
        //this.setState({esResult:false})
        //productObject = new Product();
        //productObject.updateProductDataOnResponseFromES(response);
        //AWSApi.fetchProduct(this.state.codeEnteredByUser,productCodeType);
       // MWSApi.fetchProduct(this.state.codeEnteredByUser, "New")
        //MWSApi.fetchProduct(this.state.codeEnteredByUser, "Used")
        //this.updateStateOnSuccess(productObject)
    }

    elasticSearchResponseFailureCallBack(errorCode){
        //asinMissing = true
        //if(asinMissing){
            console.log("*********xyzIfasinMissing")
            this.missingASIN(asin)
            //asinMissing = false
        //}
        //console.log("********es failure")
        //alert("elasticSearchResponseFailureCallBack")
        //this.updateStateOnElasticsearchFailure()
        //this.setState({esResult:false})
        //AWSApi.fetchProduct(this.state.codeEnteredByUser,productCodeType);
        //MWSApi.fetchProduct(this.state.codeEnteredByUser, "New")
       // MWSApi.fetchProduct(this.state.codeEnteredByUser, "Used")
    }

    databaseProductFetchedSuccessCallBack(response){
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        this.setState({esResult:true}, ()=>{
            productObject = new Product();
            productObject.updateProductDataOnLocalDataBaseResponse(response);
            if(NetworkConnectivity.getInstance().internetAvailable== false){
                this.updateStateOnSuccess(productObject)
            }
            else
            {   AWSApi.fetchProduct(this.state.codeEnteredByUser,productCodeType);
                //MWSApi.fetchProduct(this.state.codeEnteredByUser, "New")
               // MWSApi.fetchProduct(this.state.codeEnteredByUser, "Used")
            }
        })



        //this.updateStateOnSuccess(productObject)
    }

    databaseProductFetchedFailCallBack(response){

        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        this.setState({esResult:false})
        this.updateStateOnFailure(response)
    }

    updateStateOnElasticsearchFailure(){
        if(this.state.bluetoothMode) {
            this.refs.bluetoothMode.focus();
            this.refs.bluetoothMode.clear();
        }
        this.setState({
            headingText:kTextNotFound,
            productCode:null,
            styleForProductDescriptionView :{
                opacity:0,
                flex:40
            },
            fbaOffersArray:[],
            nonFbaUsedArray:[],
            nonFbaNewArray:[],
            productFBAOffers : null,
            productUsedOffers:null,
            productNewOffers :null,
            webViewModal:false
        })
        this.closeWebView()
    }

   updateStateOnFailure(){
      /*Alert.alert(
          'No Product Found',
          'Product not present in local database, Please try Live mode',
          [
              {
                  text:'Change Mode',
                  onPress:()=>{
                      this.setState({webViewModal:false})
                      this.props.navigator.push({name:'Operating Mode',prevScreen:'Back'})
                  }
              },
              {
                  text:'Cancel',
                  onPress:()=>{
                      this.setState({webViewModal:false});
                  }
              }

          ]
      )*/
    /*this.setState({
      headingText:kTextNotFound,
      productCode:null,
      styleForProductDescriptionView :{
         opacity:0,
          flex:7
      },
        fbaOffersArray:[],
        nonFbaUsedArray:[],
        nonFbaNewArray:[],
        productFBAOffers : null,
        productUsedOffers:null,
        productNewOffers :null,
        //webViewModal:false
    })*/
       asinMissing=true
      console.log('*********xyzDatabaseFailure')
      AWSApi.fetchProduct(this.state.codeEnteredByUser,productCodeType);
      MWSApi.fetchProduct(this.state.codeEnteredByUser, "New")
      MWSApi.fetchProduct(this.state.codeEnteredByUser, "Used")
      this.closeWebView()
  }

  updateStateOnSuccess(productObject){

      if(this.state.bluetoothMode) {
          this.refs.bluetoothMode.focus();
          this.refs.bluetoothMode.clear();
      }

      FBAXRayThreshold = this.state.FBAXRayThreshold;
      FBAXRayNewOrUsed = this.state.FBAXRayNewOrUsed;

console.log("*****************************callingupdateStateOnSuccess" )
      productObject.calculateTopRankPercentage((result)=>{
          //console.log("RESULT: " + result)
          this.setState({
              productCategory: productObject.category,
              productTitle: productObject.title,
              productFBAOffersPercent: productObject.calculateFBAPercentage(FBAXRayThreshold, FBAXRayNewOrUsed),
              productAmazonPrice: productObject.amazonPrice,
              productNetProfit: productObject.calculateNetProfit(),
              productBuyBox: productObject.calculateBuyBoxPrice(),
              productPricePercent: productObject.calculatePricePercent(),
              productSalesRank: productObject.salesRank,
              productAmazonRank: productObject.averageRank,
              productTopPercent: result,
              productFBAOffers: productObject.numberOfFBAOffers,
              productUsedOffers: productObject.numberOfUsedOffers,
              productNewOffers: productObject.numberOfNewOffers,
              productAmazonURL: productObject.productAmazonURL,
              productCode: this.state.codeEnteredByUser,
              productImage: productObject.image != null ? {uri: productObject.image} : null,//require('../assets/defaultProductImage.png'),
              fbaAvg: productObject.fbaAvg,
              nonFbaUsedAvg: productObject.nonFbaUsedAvg,
              nonFbaNewAvg: productObject.nonFbaUsedAvg,
              fbaOffersArray: productObject.fbaOffersArray,
              nonFbaUsedArray: productObject.nonFBAUsedOffersArray,
              nonFbaNewArray: productObject.nonFBANewOffersArray,
              styleForProductDescriptionView: {
                  opacity: 1,
                  flex: 40
              },
              FBAUrl:productObject.FBAUrl,
              NewUrl:productObject.NewUrl,
              UsedUrl:productObject.UsedUrl,
              AllOffersUrl:productObject.AllOffersUrl,
              productCondition:productObject.productCondition
          },()=>{
              if(this.state.productAmazonRank == "-" || this.state.productAmazonRank== null){
                  this.setState({headingText: (parseInt(this.state.productNetProfit)>parseInt(LocalStorageSettingsApi.netProfit))

                          //productObject.calculateBaseProfit>=BuyTriggers.baseProfitValue
                          //productObject.calculateXRAYPercentage>=BuyTriggers.xRayPercentageValue
                          //this.state.productAmazonPrice.substring(1)) > LocalStorageSettingsApi.costOfBook
                          ? 'Buy' : 'Reject'},()=>{this.setState({buyRejectColor:(this.state.headingText=='Buy') ? Constants.ZenGreen : 'rgb(255,50,50)'})
                      }
                  )
              }
              else{
        this.setState({headingText: (parseInt(this.state.productNetProfit.substring)>parseInt(LocalStorageSettingsApi.netProfit) &&
                          parseInt(this.state.productAmazonRank)<parseInt(LocalStorageSettingsApi.averageSalesRankValue))

                         //productObject.calculateBaseProfit>=BuyTriggers.baseProfitValue
                         //productObject.calculateXRAYPercentage>=BuyTriggers.xRayPercentageValue
                         //this.state.productAmazonPrice.substring(1)) > LocalStorageSettingsApi.costOfBook
                         ? 'Buy' : 'Reject'},()=>{
                this.setState({buyRejectColor:(this.state.headingText=='Buy') ? Constants.ZenGreen : 'rgb(255,50,50)'})
        }
                       )}
          });
      });
      this.setState({webViewModal:false, esResult:false})
      if(this.state.showFBAOffersAutomatically){
          this.expandCollapseWebView(false,Constants.kOffersType.kFBAOffers)
      }
      if(this.state.showAllOffers){
          this.expandCollapseWebView(false,Constants.kOffersType.kAllOffers)
      }
  }

  openProductLink(productCode , company){
      if(!(LocalStorageSettingsApi.OperatingMode == JSON.stringify(Constants.SearchMode.kDataBase))) {
          if (NetworkConnectivity.getInstance().internetAvailable == false) {
              alert("No Internet Connection")
              return
          }
      }

    //var url = null;
    if(productCode == null){
       alert('Please do a live search to get ISBN');
      return
    }

      /*if( company === Constants.Company.KCompanyEbay){
          let url = 'http://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313.TR0.TRC0.H0.X'+productCode+'.TRS0&_nkw='+productCode+'&_sacat=0'
          return(Linking.openURL(url))
      }*/
    /*switch(company){
      case Constants.Company.KCompanyAmazon:{

        url = 'https://www.amazon.com/dp/'+productCode+'/ref=olp_product_details?_encoding=UTF8&me='

        url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords='+productCode

        //url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords='+productCode
          url = "https://www.amazon.com/dp/" + productCode + "/ref=olp_product_details?_encoding=UTF8&me="


      }
            break;
      case Constants.Company.KCompanyEbay :{
        url = 'http://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313.TR0.TRC0.H0.X'+productCode+'.TRS0&_nkw='+productCode+'&_sacat=0'

      }
            break;
      case Constants.Company.KCompanyCamel :{
        url = 'https://camelcamelcamel.com/End-Watch-Novel-Hodges-Trilogy/product/'+productCode
      }
            break;
      case  Constants.Company.KCompanyBookScouter :{
        url = 'https://bookscouter.com/prices.php?isbn='+productCode+'&searchbutton=Sell'
      }
            break;
      case Constants.Company.KCompanyBookFinder : {
        url =  'http://www.bookfinder.com/search/?author=&title=&lang=en&isbn='+productCode+'&new=1&used=1&ebooks=1&destination=gb&currency=GBP&mode=basic&st=sr&ac=qr'

      }
            break;

      case Constants.Company.KCompanyKeepa : {
        url = 'https://keepa.com/#!product/1-'+ productCode
      }

    }*/

      //this.setState({webViewModal:true})
      this.expandCollapseWebView( false , company ,true,true)
  }
   //return(Linking.openURL(url))


    barCodeRecievedCallBack(barcode){
        console.log("****************barcode" + barcode)
     // this.showCamera(false)
        this.setState({codeEnteredByUser:barcode})
        this.searchProduct(barcode);

    }

    async localStorageSettingsResponseSuccessCallback(result,key){
        switch (key){
            case Constants.kKeyForFBAOffersPageAutomatically:{
                this.setState({showFBAOffersAutomatically:result})
                break;
            }
            case Constants.kKeyForFBAXRayThreshold:{
                this.setState({FBAXRayThreshold:result})
                break;
            }
            case Constants.kKeyForFBAXRayNewOrUsed:{
                this.setState({FBAXRayNewOrUsed:result})
                break;
            }

            case Constants.kKeyForAllAmazonOffersPage:{
                this.setState({showAllOffers:result})
                break;
            }
            case Constants.kKeyForDisplayCondition:{
                this.setState({displayProductCondition:result})
                break;
            }
            case Constants.kKeyForDisplayQuantity:{

                this.setState({displayProductQuantity:result})
                break;
            }
            case Constants.kKeyForDisplayTradeValue:{
                this.setState({displayTradeValue:result})
                break;
            }
            case Constants.kKeyForEnableTriggers:{
                break;
            }
            case Constants.kKeyForRestricted:{
                break;
            }
            case Constants.kKeyForLandedPrice:{
                break;
            }
            default:
                break
        }
    }

    showCamera(value){
        this.setState({openCamera:value})

        this.props.navigator.push({name:'AnyLineScanner',prevScreen:'Back'})
    }

    showPayment(){
        debugger;
        this.setState({payment:true})
        this.props.navigator.push({name:'Payments',prevScreen:'Back'})
    }

}


const styles = StyleSheet.create({
  mainViewContainer:{
    //flex:1
      backgroundColor:'white',
    width:screenWidth,
    height:screenHeight,
  },
  navBar:{
      //paddingTop:(Platform.OS=='ios')?12:null,
      width:screenWidth,
      height:70,
      flexDirection:'row',
      //backgroundColor:Constants.ZenBlue1,//'rgb(0,163,238)',
      alignItems:'center'
      //borderColor:Constants.ZenBlue1,
      //borderWidth:1
  },

  navBarTxtInput:{
    height:40,
    backgroundColor:'white',
    borderRadius:5,
    borderWidth:2,
    borderColor:Constants.ZenBlue1
  },
  buyReject:{
    flex:1.3,
    backgroundColor:Constants.ZenGreen,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  BRcontent:{
    fontWeight:'700',
    color:'white',
    fontSize:20,
  },
  touchableImage:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    padding:5
  },
  image:{
    flex:1,
    resizeMode:'contain',
    width:70,
    height:70,
  },
  siteIconStyles:{
    width:22,
    height:22,
  },
  minimizeExpandIconStyles:{
      flex:1,
    //width:30,
    //position:'absolute',
    //marginLeft:Utility.getFontSize()==50?screenWidth-70:screenWidth-30,
    //justifyContent:'center',
    //alignItems:'center',
     // width:20,
      borderRadius:10,

      backgroundColor:'rgb(205,205,205)',
      padding:5
      //marginLeft:Utility.getFontSize()==50?screenWidth-70:screenWidth-60

  },
  closeIconStyles:{
      flex:1,
   // position:'absolute',
    //marginLeft:Utility.getFontSize()==50?screenWidth-70:screenWidth-80,
      //marginTop:75,
      //justifyContent:'center',
      //alignItems:'center',
     // marginLeft:35,
      //width:30,
      backgroundColor:'rgb(205,205,205)',
      borderRadius:10,
      padding:5

  },
  itemInfo:{
    paddingLeft:5,
    flex:6,
    justifyContent:'space-around'
  },
  itemInfoCategory:{
    color:'white',//'skyblue',
    fontWeight:'700',
    fontSize:Utility.getFontSize()*0.7
  },
  itemInfoTitle:{
    fontWeight:'500',
    fontSize:Utility.getFontSize()*0.6
  },
  percentFBA:{
    flex:1,
    backgroundColor:'rgb(68,146,225)',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
  fontColorsTop:{
    color:'black',//'rgb(68,146,225)'
    fontWeight:'bold'
  },
  fontColorsBottom:{
      color:Constants.ZenBlue1,//'rgb(93,93,93)',//'rgb(68,146,225)'
      fontWeight:'bold'
    },
  productPriceProfit:{
    backgroundColor:'rgb(241,241,241)',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:'rgb(194,194,194)'
  },
  productRankings:{
    backgroundColor:'rgb(68,146,225)',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:'rgb(194,194,194)'
  },
  dataField:{
      //backgroundColor:'rgb(68,146,225)',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      //borderRadius:5,
      //borderWidth:1,
      borderLeftColor: Constants.ZenBlue1,
      borderLeftWidth: 1
      //borderLeftSize:
      //borderColor:'rgb(194,194,194)'
     // borderColor:'rgb(68,146,225)'
 },
 dataFieldWithoutBorder:{
       //backgroundColor:'rgb(68,146,225)',
       flex:1,
       justifyContent:'center',
       alignItems:'center'

  },
  amazonOfferLinksConatiner:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:Constants.ZenBlue1//'lightgray'
  },
  productSearchIndicators:{
    fontWeight:'400',
    //fontSize:13
    fontSize:Utility.getFontSize() == 23 ? 23 * 0.6 : 50 * 0.6
  },
  tradeValueStyle:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'lightgray'
  },
  amazonOfferLinks:{
    //fontWeight:'bold',
    fontSize:Utility.getFontSize()*0.6,
    //textDecorationLine:'underline',
    color:Constants.ZenBlue1
  },
  productRows:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f6f6f6'
  },
  scrollingTableRow:{
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
  scrollingTableContent:{
    fontWeight:'bold',
    fontSize:Utility.getFontSize() == 23 ? 23 *0.7 : 50 * 0.6,
      marginTop:10
  },
  productConditionQuantity:{
    fontWeight:'500',
    fontSize:Utility.getFontSize()*0.4,
  },
  averagePriceRow:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:Constants.ZenBlue1//'rgb(0,146,187)'
  },
  averagePriceRowContent:{
    //fontSize:Utility.getFontSize()*0.6,
    //  fontWeight:'bold',
    color:Constants.ZenBlue1
  },
  itemInfoContainer:{
    flex:10,
    flexDirection:'row',
    borderBottomColor: Constants.ZenBlue1,
    borderBottomWidth: 1
  },
  styleForProfitRow:{
    flex:4,
    flexDirection:'row'
  },
  styleForRankRow:{
    flex:4,
    flexDirection:'row'
  },
  averagePriceRowMainView:{
    flex:1.3,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  productConditionEnableStyle: {
    fontSize:9 ,
    opacity:1
  },
  productConditionDisableStyle:{
    fontSize:9 ,
    opacity:0
  },
  percentFBAInfo:{
    borderRadius:3,
    //justifyContent:'space-around',
    marginLeft:3,
    marginTop:3,
    backgroundColor:'white',
    color:'black',
    fontSize:Utility.getFontSize()==23?8:15,
    width:Utility.getFontSize()==23?50:138,
    height:Utility.getFontSize()==23?15:30,

  },
  circleFull:{
      width: 15,
      height: 15,
      borderRadius: 15/2,
      backgroundColor: 'darkgray'
  },
  circleEmpty:{
      width: 15,
      height: 15,
      borderRadius: 15/2,
      borderColor: 'darkgray',
      borderWidth:1
  },
  fontAwesomeStyles:{
      color:Constants.ZenBlue1,
      fontSize:Utility.getFontSize()
  },
});
