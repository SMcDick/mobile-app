import React, { Component } from 'react';
import{
    NetInfo
} from 'react-native'

let networkConnectivity = null
export default class NetworkConnectivity extends Component{
    static getInstance(){
        if(networkConnectivity == null)
            networkConnectivity = new NetworkConnectivity()

        return networkConnectivity;
    }

    constructor(){
        super()
        this.receivers=[];
        this.internetAvailable = false
        this.checkConnectivity()
    }

    setReceiver(reciever){
        this.receivers.push(reciever);
    }

    removeReceiver(reciever){
        this.receivers.pop(reciever);
    }

    onInternetStatusChange(isConnected){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].onInternetStatusChange(isConnected)
        }
    }

    checkConnectivity(){
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => {this.internetAvailable = isConnected
            }
        );
    }

    _handleConnectivityChange = (isConnected) => {
       this.internetAvailable = isConnected
        this.onInternetStatusChange(isConnected)

    };

}