
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Camera from 'react-native-camera';
import BarcodeScanner from 'react-native-barcode-scanner-universal'
const screenHeight=Dimensions.get('window').height
const screenWidth=Dimensions.get('window').width
export default class BarcodeScannerClass extends Component {
    constructor(props){
        super(props)
        this.barcode = null;

    }

    barcodeReceived(e) {
        if(this.barcode == null){{
            this.props.mainScreenRef.barCodeRecievedCallBack(e.data)
        }

        }

    }
    render () {

        let scanArea = null
        let closeButton = (
            <TouchableOpacity  style = {{backgroundColor:'rgb(233,234,238)',alignSelf:'center',alignItems:'center',justifyContent:'center',top:50,borderRadius:5,width:100,height:50}} onPress = {()=>{
                this.props.mainScreenRef.showCamera(false)
            }}>
                <Text style={{color:'rgb(0,133,248)',fontSize:17}}>Close</Text>
            </TouchableOpacity>
        )
        //if (Platform.OS === 'ios') {
            scanArea = (
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                    {closeButton}
                </View>
            )
        //}



        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible= {this.props.cameraVisible}
                onRequestClose = {()=>{}}

            >
                <BarcodeScanner
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    style={styles.camera}>
                    {scanArea}
                </BarcodeScanner>
            </Modal>

        )
    }
}
const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    }
})
