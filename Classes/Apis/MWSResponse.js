/**
 * Created by nidhitandon on 12/07/17.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React , {Component} from 'react'

let _awsResponse = null

export default class MWSResponse {
    static getInstance(){
        if(_awsResponse == null)
            _awsResponse = new MWSResponse()

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

    responseSucessCallBack(response, ItemCondition, Action){
        console.log("__action__" +Action)
        debugger;
        console.log('REAPONSE:'+response);
        if(Action == "GetLowestPricedOffersForASIN"){
            for(i = 0 ; i < this.receivers.length ; i++){
                this.receivers[i].mwsOffersResponseSucessCallBack(response, ItemCondition)
            }
        }
        else
        {
            for (i = 0; i < this.receivers.length; i++) {
                this.receivers[i].mwsResponseSucessCallBack(response, ItemCondition)
            }
        }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].mwsResponseFailureCallBack(errorCode)
        }
    }
}