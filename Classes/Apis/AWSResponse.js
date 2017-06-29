/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React , {Component} from 'react'

let _awsResponse = null

export default class AWSResponse {
    static getInstance(){
        if(_awsResponse == null)
            _awsResponse = new AWSResponse()

        return _awsResponse;
    }

    constructor(){
        this.receivers = [];
    }

    setReceiver(reciever){
        this.receivers.push(reciever);
    }

    removeReceiver(reciever){
        this.receivers.pop(reciever);
    }

    responseSucessCallBack(response){
            for(i = 0 ; i < this.receivers.length ; i++){
                this.receivers[i].awsResponseSucessCallBack(response)
            }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].awsResponseFailureCallBack(errorCode)
        }
    }
}