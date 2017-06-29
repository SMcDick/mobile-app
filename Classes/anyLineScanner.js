/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    PermissionsAndroid,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';



import AnylineOCR from 'anyline-ocr-react-native-module';
import config from '../config';
import configBarcode from '../configBarCode'
import Constants from './Constants'

let anyLine = null
export default class Anyline extends Component {

    static getInstance() {
        if (anyLine == null)
            anyLine = new Anyline()

        return anyLine;
    }

    constructor() {
        super();
        this.receivers = [];
        this.scanType = null
    }

    setReceiver(reciever) {
        this.receivers.push(reciever);
    }

    removeReceiver(reciever) {
        this.receivers.pop(reciever);
    }

    onResult = (dataString) => {
        const data = JSON.parse(dataString);
        if (this.scanType === Constants.kScanType.kOcr) {
            //console.log('Scan successfull ' + dataString)
            let isbnNumber = data['text']
            let number = isbnNumber.replace('ISBN', '')
            number = number.replace(/[^0-9\.]+/g, "");
            console.log("*****************NUMBer" + number)
            for (i = 0; i < this.receivers.length; i++) {
                this.receivers[i].barCodeRecievedCallBack(number)
            }
        } else {
            const data = JSON.parse(dataString);
            let isbnNumber = data['value']
            for (i = 0; i < this.receivers.length; i++) {
                this.receivers[i].barCodeRecievedCallBack(isbnNumber)

            }

        }

    };

    onError = (error) => {
        alert(error);
    };


    openOCRScanner = () => {
        this.scanType = Constants.kScanType.kOcr
        AnylineOCR.setupScanViewWithConfigJson(
            JSON.stringify(config),
            "ANYLINE_OCR",
            this.onResult.bind(this),
            this.onError.bind(this)
        );
    };

    openBarCodeScanner = () => {
        this.scanType = Constants.kScanType.kBarCode
        AnylineOCR.setupScanViewWithConfigJson(
            JSON.stringify(configBarcode),
            'BARCODE',
            this.onResult.bind(this),
            this.onError.bind(this)
        );
    };


    requestCameraPermission = async() => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission allowed');
                this.openOCR();
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    hasCameraPermission = async() => {
        try {
            const result = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA);
            return result;
        } catch (err) {
            console.warn(err);
        }
    };

    checkCameraPermissionAndOpen = () => {
        this.hasCameraPermission().then((hasCameraPermission) => {
            console.log('hasCameraPermission result is ' + hasCameraPermission);
            if (hasCameraPermission) {
                console.log('Opening OCR directly');
                this.openOCR();
            } else {
                this.requestCameraPermission();
            }
        });
    };
}



