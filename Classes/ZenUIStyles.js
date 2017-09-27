import Constants from './Constants'
import { StyleSheet, Dimensions } from 'react-native';
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
    SubheaderTextStyle:{
        color:Constants.ZenGreen,
        padding:10,
        fontSize:Utility.getFontSize()*0.7
    },

});