/**
 * Created by ChicMic on 10/03/17.
 */
import DataBase from './DatabaseLocalApi'
import ElasticSearch from './ElasticSearch'
import Constants from '../Constants'
import LocalStorageSettingsApi from '../LocalStorageSettingsApi'

let _elasticSearchResponse = null

export default class ElasticSearchResponse {
    static getInstance() {
        if (_elasticSearchResponse == null)
            _elasticSearchResponse = new ElasticSearchResponse()

        return _elasticSearchResponse;
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
            this.receivers[i].elasticSearchResponseSucessCallBack(response)
        }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].elasticSearchResponseFailureCallBack(errorCode)
        }
    }

    // ActivityIndicatorCallback(){
    //     for(i = 0;i<this.receivers.length;i++){
    //         this.receivers[i].changeModalState();
    //     }
    // }

    //Download CallBacks
    downLoadBegan(){
        console.log("***DEBUG***DOWNLOADBEGAN")
        for(i = 0 ; i < this.receivers.length ; i++){
            try{
                this.receivers[i].downLoadBegan()
            }catch(error){

            }
        }
    }

    SpaceConstraintChangeState(option , spaceNeeded){
        //console.log("SpaceConstraintChangeState")
        //alert("SpaceConstraintChangeState in ElasticSearchResponse")
        if(option==1){
            for(i=0;i<this.receivers.length;i++){
                try{
                    //this.setModalStateFalse();
                    //alert("hello")
                    this.receivers[i].changeButtonTextOnSpaceCheck(option , spaceNeeded / 1000000000)

                }catch(error){

                }
            }
        }else if(option==2){
            for(i=0;i<this.receivers.length;i++){
                try{
                    this.receivers[i].changeButtonTextOnSpaceCheck(option , spaceNeeded / 1000000000)
                }catch(error){

                }
            }
        }
    }

    downloadFailed(downlaodingFailError){
        ElasticSearch.downLoadState = Constants.DownloadState.kStopped
        for(i = 0 ; i < this.receivers.length ; i++){
            try{
                this.receivers[i].downloadFailed(downlaodingFailError)
            }catch(error){

            }
        }
    }

    downloadProgressCallBack(speed,totalESsize,totalBytesWritten){
        for(i = 0 ; i < this.receivers.length ; i++){
            try{
                this.receivers[i].refreshProgress(speed,totalESsize,totalBytesWritten)
            }catch(error){

            }

        }

    }

    downloadForProgessBarCallback(){
        for(i = 0 ; i < this.receivers.length ; i++){
            try{
                this.receivers[i].forProgressBar()
            }catch(error){

            }

        }
    }

    dataPacketDownloaded(dataPacket){
        let  data = JSON.parse(dataPacket)
        let scrollid =  data['_scroll_id']
        if(scrollid == null){
            DataBase.getInstance().deleteAllDataFromProductDataTableIfExist() // Gurdial Singh
            this.downloadFailed(Constants.DownlaodingFailError.kByScrollID)
            //alert(this.receivers[1].constructor.name)
            this.receivers[1].showDownloadFailAlert()  //if downloading fails
            return
        }
        if(scrollid === LocalStorageSettingsApi.scrollId){
            //console.log('Previous scroll id is same')
        }else {
            ElasticSearch.clearCurrentScrollId(LocalStorageSettingsApi.scrollId)
        }

        LocalStorageSettingsApi.setScrollid(scrollid)
        let dataSource = null
        try{
            LocalStorageSettingsApi.setTotalProductsOnES(JSON.stringify(data['hits']['total']))
            dataSource = data['hits']['hits']
            /*if(dataSource.length <= 0){
                ElasticSearch.downloadWithScrollId()
               //  alert('Downloading is Complete')
               // LocalStorageSettingsApi.setDownloadComplete(Constants.kTrue)
               //  this.downLoadCompleted()
                 return
            }*/
            DataBase.getInstance().insertDataFromJsonFileToDataBase(dataSource)
        }catch(error){
            //console.log('Invalid data')
            ElasticSearch.downloadWithScrollId()
        }
    }

    downLoadCompleted(){
        for(i = 0 ; i < this.receivers.length ; i++) {
            try {
                this.receivers[i].downLoadCompleted()
            } catch (error) {

            }
        }
    }

    removeIndicatorOnInvalidCode(){
        for(i = 0 ; i < this.receivers.length ; i++) {
            try {
                this.receivers[i].removeIndicatorOnInvalidCode()
            } catch (error) {

            }
        }
    }
}
