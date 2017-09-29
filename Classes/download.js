/**
 * Created by chicmic on 22/02/17.
 */
var transferSpeed=0;
let percentage;
let contentLength;
let bytesWritten;
let downloadStartTime;
//let scrollnumber = 1
//let ESdataSize;
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Switch,
    ProgressViewIOS,
    TouchableHighlight,
    ProgressBarAndroid,
    Platform,
    Modal,
    ActivityIndicator,
    InteractionManager,
    Alert
} from 'react-native';

const screenWidth=Dimensions.get('window').width
import RNFS from 'react-native-fs'
import NavigationBar from './scenesNavBar'
import Utility from  './Utility'
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import Constants from './Constants'
import LocalStorageSettingsApi from './LocalStorageSettingsApi'
import DataBase from './Apis/DatabaseLocalApi'
import NetworkConnectivity from './NetworkConnectivity'

const base64 = require('base-64');
import DatabaseLocalResponse from './Apis/DatabaseLocalResponse'
import ElasticSearch from './Apis/ElasticSearch'
import ElasticSearchResponse from './Apis/ElasticSearchResponse'
import DatabaseLocalApi from './Apis/DatabaseLocalApi'
import ZenUIStyles from './ZenUIStyles'
import FontAwesome, { Icons } from 'react-native-fontawesome'

let x= 0;

export default class Download extends Component{
    static propTypes = {
        getConnectionDetails:React.PropTypes.func,
    };
    static defaultProps = {
        isConnected:''
    };
    constructor(props){
        //let activityCount=0;
        super(props);
        DatabaseLocalResponse.getInstance().setReceiver(this)
        ElasticSearchResponse.getInstance().setReceiver(this)
        LocalStorageSettingsResponse.getInstance().setReceiver(this);
        NetworkConnectivity.getInstance().setReceiver(this)

        this.downloadJobId = -1;
        this.downloadStartTime = 0.0;
        this.downLoadPath = null;

        this.downloadButton = null
        if(ElasticSearch.downLoadState === Constants.DownloadState.kRunning){
            this.downloadButton = 'Pause'
        }else{
              //if(DataBase.getInstance().totalProductsInDataBase > 0){
              //    this.downloadButton = 'Resume'
               //}else {
                  this.downloadButton = 'Start'
              //}
        }

        //let percen = DataBase.getInstance().totalProductsInDataBase/LocalStorageSettingsApi.TotalProductsonES
        //alert(LocalStorageSettingsApi.TotalProductsonES)

        this.state = {
            //switchDisabledState:false,
            downloadPercentage : 0.0,
            speed:0,
            remainingTime:'',
            //booksAndOtherMedia:LocalStorageSettingsApi.BooksAndOtherMedia,
            downloadButtonText : this.downloadButton,
            disConnected:null,
            isConnected:this.props.isConnected,
            showModal:false,
            spaceNeeded:false
        }
    }
    /*onValueChangeCallback(result,key){
        switch(key){
            case Constants.kKeyForBooksAndOtherMedia:{
                LocalStorageSettingsApi.setBooksAndOtherMediaOption(result)
                break;
            }
        }
    }*/

    /*localStorageSettingsResponseSuccessCallback(result,key){
        switch(key){
            case Constants.kKeyForBooksAndOtherMedia:{
                this.setState({booksAndOtherMedia:result})
                break;
            }
        }
    }*/

    changeModalState(){
        this.setState({showModal:true})
        //this.activityCount++
    }

   // onPressCancel(){
     //   this.setState({
       //     showModal:false,
        //})
        //DataBase.getInstance().openDatabase();
   // }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'rgb(233,234,238)'}}>
                {this.state.showModal ? <Modal
                    animationType={"none"}
                    transparent={true}
                    //visible={this.state.showModal}
                >
                    <View
                        style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(100,100,100,0.5)'}}
                    >
                        <ActivityIndicator
                            size={'large'} 
                            color="rgb(0,149,242)"
                            //style={{color:'red'}}
                            //color={{color:'red'}}
                            //color={{'rgb(50,50,50')}}
                        />
                        <Text 
                            style={{textDecorationLine:'underline',fontWeight:'300',fontSize:18}} 
                            onPress={() => {
                                 if(DataBase.getInstance().totalProductsInDataBase > 0){
                                       this.downloadButton = 'Resume'
                                 }else {    
                                 this.downloadButton = 'Start'
                                 }
                                this.setState({showModal:false, downloadButtonText:this.downloadButton})
                                }
                            }
                        >
                            cancel
                        </Text>
                    </View>
                </Modal> : null }

                <View style={[{flexDirection:'row'},{justifyContent:'center'},{alignItems:'center'},{padding:5}]}>
                    <Image source={require('../assets/ZenSourcelogo.png')} style={ZenUIStyles.ZenLogoStyle}/>
                </View>

                <View style={[ZenUIStyles.HeaderBarStyle,{alignItems:'center', justifyContent:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:10}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            onPress={()=>{this.props.navigator.push({name:"MainScreen",prevScreen:"Download"})}}
                            activeOpacity={0.8}
                            style={styles.registerTouchableStyle}
                        >
                            <FontAwesome style={ZenUIStyles.backButtonStyle}>{Icons.chevronLeft}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={ZenUIStyles.HeaderBarTextStyle}>Download</Text>
                    </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.grayCellStyles}>
                        <Text style={ZenUIStyles.SubheaderNoPaddingTextStyle}>Last Update: There is no data file</Text>
                    </View>
                    <View style={[styles.cellStyles,{height:70}]}>
                        <View style={styles.cellInnerLeftViewStyles}>
                            <Text style={[ZenUIStyles.SubheaderNoPaddingTextStyle,{fontWeight:"400"}]}>Books, media & toys</Text>
                            <Text style={[ZenUIStyles.SubheaderNoPaddingTextStyle,{fontSize:13,fontStyle:'italic'}]}>Includes: CDs, cassettes, vinyl, VHS, DVDs, books, software, video games, and all media & toys.</Text>
                        </View>
                    </View>
                    <View style={styles.grayCellStyles}/>
                    <View style={styles.downloadCell}>
                        <View style={styles.progressStyles}>

                            {Platform.OS === 'ios'?<ProgressViewIOS progressTintColor='rgb(0,133,248)' progress={this.state.downloadPercentage} progressViewStyle={'default'}/>:<ProgressBarAndroid progressTintColor='rgb(0,133,248)' progress={this.state.downloadPercentage} indeterminate={false} styleAttr={'Horizontal'}/>}

                        </View>
                        <View style={styles.downloadInfoStyles}>
                            <Text style={ZenUIStyles.SubheaderNoPaddingTextStyle}>Time Remaining: {this.state.remainingTime} </Text>
                            <Text style={ZenUIStyles.SubheaderNoPaddingTextStyle}>Speed: {Math.round(this.state.speed)} kBps</Text>
                        </View>
                    </View>




                    <View style={{height:100, backgroundColor:'white'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-around',paddingTop:20,backgroundColor:'white'}}>
                            <View style={styles.downloadActionStyles}>
                                <TouchableOpacity
                                    style={ZenUIStyles.modalButtonsStyles}
                                    onPress = {()=>{

                                        if(NetworkConnectivity.getInstance().internetAvailable==false){
                                            alert("No Internet Connection")
                                            return
                                        }

                                        if(this.state.downloadButtonText === 'Pause'){
                                            //alert('Pause condition called')
                                            ElasticSearch.cancelDownload() // pause
                                        }else if(this.state.downloadButtonText === 'Resume') {
                                            //alert("free space in device:" + RNFS.getFSInfo().freeSpace)
                                            this.changeModalState()
                                            if(DataBase.getInstance().isPacketWritingInProcess == false){
                                                ElasticSearch.getESDataSize(2);
                                                    //ElasticSearch.resumeDownload()
                                            }else{
                                                //console.log("else condition of Resume")
                                                //alert('still writing...')
                                                ElasticSearch.downLoadState = Constants.DownloadState.kRunning
                                            }
                                            this.setState({downloadButtonText:'Pause'})
                                        }else if(this.state.downloadButtonText === 'Start'){
                                            this.changeModalState()
                                            let date=new Date();
                                            let ISOdate=date.toISOString();
                                            let  startTime=ISOdate.slice(0,-1)
                                            console.log('Start time ' + startTime + "======" + ISOdate);
                                            LocalStorageSettingsApi.setDownloadStartTime(startTime)
                                            //ElasticSearch.getESDataSize(1)
                                            //ElasticSearch.ReadBinaryFile();
                                            ElasticSearch.DownloadJsonZipFile();
                                            //ElasticSearch.EncodeJsonFile();
                                            this.setState({downloadButtonText:'Pause'})
                                        }
                                    }
                                    }
                                >

                                    <Text style={ZenUIStyles.modalButtonsTextStyles}>{this.state.downloadButtonText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    
                                    style={ZenUIStyles.modalButtonsStyles}
                                    onPress = {()=>{
                                        //this.props.navigator.pop()
                                        ElasticSearch.EncodeJsonFile();
                                        //this.setState({showModal:true})
                                    }}
                                >
                                    <Text style={ZenUIStyles.modalButtonsTextStyles}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

startDownloadPDF(){

        let downloadUrl = "http://math.bme.hu/~jtoth/Mma/Schaum's%20Outlines%20Mathematica%202nd%20Edition.pdf"
         let downLoadPath = RNFS.DocumentDirectoryPath + '/test.pdf';
       // alert('downloadPath:'+downLoadPath)
        RNFS.downloadFile({fromUrl:downloadUrl, toFile:downLoadPath , begin:(data)=>{
            alert('download downLoadBegan')

        } , progress:(data)=>{

        }}).promise.then(res => {
            alert('download completer')

            //RNFS.readFile(downLoadPath).then((data)=>{

          //  })

        }).catch((error)=>{
            alert('in startDownload downloadfile error'+ error)

        });
}

    showDownloadFailAlert(){
        Alert.alert(
            'Download Failed',
            ' Couldn\'t download database, Please download again ',
            [
                {
                    text:'Ok',
                    onPress: () => { this.setModalStateFalse() }
                }
            ]
        )
    }

     setModalStateFalse(){
         this.setState({showModal:false})
     }


    alertfunc(spaceNeeded){
        Alert.alert(
            'Storage alert',
            "Not enough storage space available,"  + Math.round(spaceNeeded * 100) / 100 + " GB of storage needed",
            [
                {
                    text :'OK' , onPress :()=>this.setModalStateFalse()
                }
            ]
        )
    }

     changeButtonTextOnSpaceCheck ( option , spaceNeeded ) {
         //this.setModalStateFalse(this.alertFunc)
         //console.log("changeButtonTextOnSpaceCheck")
         //console.log("changeButtonTextOnSpaceCheck on enter" + this.state.showModal)
         //alert("hello")
         if(option == 1){
             this.setState({downloadButtonText:"Start" },() => this.alertfunc(spaceNeeded))
             //InteractionManager.runAfterInteractions(() => {alert("Not enough storage available,"  + spaceNeeded + " GB of extra storage needed" )})
         }
         else if(option == 2){
             this.setState({downloadButtonText:"Resume" },() => this.alertfunc(spaceNeeded))
             //InteractionManager.runAfterInteractions(() => {alert("Not enough storage available,"  + spaceNeeded + " GB of extra storage needed" )})
         }
         //this.setState({showModal:false})
         //alert("storage space not available,free upto" )
         //console.log("changeButtonTextOnSpaceCheck on leave" + this.state.showModal)
     }

    downLoadBegan(){
        //console.log("***DEBUG***DOWNLOADFILEBEGAN")
      this.setState({downloadButtonText : 'Pause'})
      //this.setState({showModal:false})
    }

    downloadFailed(downlaodingFailError) {
        console.log('*****@*$*#*#*#*&*(@#E)(*&**#@W)DOWNLOADING Failed')
        if(Constants.DownlaodingFailError.kByScrollID === downlaodingFailError){
            this.setState({downloadButtonText: 'Start'})
            LocalStorageSettingsApi.setPrevBytesWritten(JSON.stringify(0))
            return
        }
        this.setState({downloadButtonText: 'Resume'})
        Alert.alert('Database Download',
            'Couldn\'t download the database',
            [
                {
                    text:'OK',
                    onPress:()=>this.setState({showModal:false})
                }
            ]
        )
    }



    //NetworkConnectivity Delegates

    onInternetStatusChange(isConnect){
        if(Constants.DownloadState.kRunning)
        alert("No Internet Connection")
    }


    refreshProgress(speed,totalESsize,totalBytesWritten){
        // if(this.state.showModal==true){
        //     this.setState({showModal:false})
        // }
        console.log("@@@@@123speed:"+speed+" totalESsize:"+totalESsize+" totalBytesWritten:"+totalBytesWritten)
        this.setState({showModal:false})
        let remainingData = parseFloat(totalESsize) - parseFloat(LocalStorageSettingsApi.totalWrittenBytes);
        remainingData = remainingData/1024 // in KB
        let remainingTime = remainingData / (speed);
        let hours = Math.round(parseInt(remainingTime) / 3600);
        let minutes = Math.round(parseInt(remainingTime) % 3600) / 60;
        minutes = Math.round(minutes);
        this.setState({speed:speed , remainingTime: hours + "h " + minutes + "m"})

    }

    forProgressBar(){
        let totalDownloaded = parseFloat(DataBase.getInstance().totalProductsInDataBase);
        let total = parseFloat(LocalStorageSettingsApi.TotalProductsonES);
        let percen =  totalDownloaded/total;
        console.log('Download progress == '+(percen));
        this.setState({downloadPercentage:percen })
    }

    dataPacketDownloaded(dataPacket){

    }

    downLoadCompleted(){
        this.setState({downloadPercentage:1,speed:''})
    }

    popScene(){
        this.props.navigator.pop()
    }
    //componentDidMount(){
    //    alert("modal state: " + this.state.showModal)
    //}

     /*componentDidMount(){
         InteractionManager.runAfterInteractions(()=>{
         //alert("hello")
             alert("modal state: " + this.state.showModal)
             //alert("hello")
             //this.setState({showModal:true})
         }
     )
         //ElasticSearch.getESDataSize()
     }*/

    componentWillUnmount(){
        //alert("modal state:" + this.state.showModal)
        LocalStorageSettingsResponse.getInstance().removeReceiver(this)
        DatabaseLocalResponse.getInstance().removeReceiver(this)
        ElasticSearchResponse.getInstance().removeReceiver(this)
        NetworkConnectivity.getInstance().removeReceiver(this)

    }
}
const styles=StyleSheet.create({
    grayCellStyles:{
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)'
    },
    headingGrayCellStyles:{
        height:50,
        paddingTop:20,
        marginLeft:8,
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)'
    },
    grayCellHeadingTextStyle:{
        fontWeight:'500',
        color:'rgb(136,136,141)',
        fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
    },
    cellStyles:{
        height:50,
        flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)',
        backgroundColor:'rgb(255,255,255)'
    },
    cellInnerLeftViewStyles:{
        flex:2,
        justifyContent:'center',
        paddingLeft:screenWidth/30
    },
    downloadCell:{
        height:150,
        backgroundColor:'rgb(255,255,255)',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)'
    },
    progressStyles:{
        flex:2,
        justifyContent:'center',
        paddingLeft:screenWidth/17,
        paddingRight:screenWidth/17
    },
    downloadInfoStyles:{
        flex:3,
        justifyContent:'center',
        paddingLeft:screenWidth/17
    },
    downloadActionStyles:{
        flex:4,
        flexDirection:'row',
        paddingTop:10,
        paddingLeft:screenWidth/20,
        paddingBottom:10,
        paddingRight:screenWidth/20
    },
    downloadActionTouchableStyles:{
        flex:1,
        backgroundColor:'rgb(233,234,238)',
        marginRight:screenWidth/50,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    cellTextStyles:{
        fontWeight:'300',
        color:'rgb(60,60,60)',
        fontSize:Utility.getFontSize()===50?50*0.4:23*0.6
    },
    switchStyles:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});
