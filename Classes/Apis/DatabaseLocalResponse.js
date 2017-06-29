
import ElasticSearch from './ElasticSearch'
import DataBase from './DatabaseLocalApi'
import Constants from '../Constants'

let _databaseLocalResponse = null
//let x=1;
export default class DatabaseLocalResponse {
    static getInstance() {
        if (_databaseLocalResponse == null)
            _databaseLocalResponse = new DatabaseLocalResponse()

        return _databaseLocalResponse;
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

    scrollWrittenSuccessCallBack(){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].scrollWrittenSuccessCallBack()
        }
    }


    responseSucessCallBack(response){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i]._databaseLocalResponseSucessCallBack(response)
        }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i]._databaseLocalResponseFailureCallBack(errorCode)
        }
    }

    dataPacketWrittenSuccessCallBack(){
        //console.log('data packet written success')
        DataBase.getInstance().isPacketWritingInProcess = false
        //if()
        /*if(ElasticSearch.scrollnumber >= 10){
           console.log('Downloaded and written data successfull')
            return
        }*/
        if(ElasticSearch.downLoadState == Constants.DownloadState.kRunning) {
            //console.log('Constants.DownloadState.kRunning')
            // if(x=1){
            //     ElasticSearch.getESDataSize(3)
            //     x++;
            // }
            //else {
                ElasticSearch.downloadWithScrollId()
            //}
             // download other packet with scroll id
        }
    }

    dataPacketWrittenFailureCallBack(){

    }

    databaseProductFetchedSuccessCallBack(response){
        //console.log("##RESPONSE:" + JSON.stringify(response))
        for(i = 0 ; i < this.receivers.length ; i++){
            try{
                //console.log("**this:" + JSON.stringify(this))
                this.receivers[i].databaseProductFetchedSuccessCallBack(response)
            }catch(error){
                //console.log("ERRORRRRRR::::" + error)
            }
            
        }
    }

    databaseProductFetchedFailCallBack(response){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].databaseProductFetchedFailCallBack(response)
        }
    }

    updateStateOnDatabaseFailureSearch(){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].updateStateOnFailure()
        }
    }
}
