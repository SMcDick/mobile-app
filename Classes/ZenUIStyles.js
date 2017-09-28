import Constants from './Constants'
import {    Platform,
            StyleSheet,
            Dimensions } from 'react-native';
import Utility from './Utility'

const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

export default StyleSheet.create({

    ZenLogoStyle:{
        width:250,
        height:30,
    },
    HeaderBarStyle:{
        height:70,
        backgroundColor:Constants.ZenBlue1,
        width:screenWidth,
        alignItems:'center',
        //flexDirection:'row'
    },
    HeaderBarTextStyle:{
        color:'white',//'skyblue',
        fontWeight:'700',
        fontSize:Utility.getFontSize()
    },
    backButtonStyle:{
        color:'white',
        fontSize:Utility.getFontSize()*0.7
    },
    SubheaderTextStyle:{
        color:Constants.ZenGreen,
        padding:10,
        fontSize:Utility.getFontSize()*0.7
    },
    SubheaderNoPaddingTextStyle:{
        color:Constants.ZenGreen,
        fontSize:Utility.getFontSize()*0.7
    },
    FramedBoxStyle:{
        borderWidth:1,
        borderColor:Constants.ZenGreen,
        borderRadius:10,padding:10,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    TextBoxStyle:{
        height:30,
        backgroundColor:Constants.DataFieldColor,
        width:150,
        //flex:1,
        alignItems:'center',
    },
    NumberBoxStyle:{
        height:30,
        backgroundColor:Constants.DataFieldColor,
        width:100,
        //flex:1,
        alignItems:'center',
    },
    horizontalCellStyle:{
        height:50,
        flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)',
        backgroundColor:'rgb(255,255,255)',
        alignItems:'center'
    },
    horizontalHeadercellstyles:{
        height:50,
        backgroundColor:'rgb(233,234,238)',
        borderBottomWidth:1,
        borderBottomColor:'rgb(219,219,224)'
    },
    rowNumberContainerStyle:{
        height:30,
        width:30,
        borderRadius:30/2,
        borderWidth:1,
        borderColor:Constants.ZenGreen,
        justifyContent:'center',
        alignItems:'center'
    }
});