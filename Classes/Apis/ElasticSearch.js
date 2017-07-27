///**
// * Created by ChicMic on 07/03/17.
// */
//
//
//let _elasticSearch = null

import ElasticSearchResponse from './ElasticSearchResponse'
import RNFS from 'react-native-fs'
const base64 = require('base-64');
import DataBase from './DatabaseLocalApi'
import LocalStorageSettingsResponse from '../LocalStorageSettingsResponse'
import Constants from '../Constants'
import LocalStorageSettingsApi from '../LocalStorageSettingsApi'
import Download from '../download'

let remainingContentLength;
let percentage;
let contentLength;
let bytesWritten;
let downloadStartTime;
let totalBytesWritten;
let prevBytesWritten=0;
let prevTime;
let totalESsize ;
let speed;
let availableSpace;
//let scrollID;


export default class ElasticSearch{
    static downLoadPath;
    static downloadJobId = -1
    static scrollnumber = 0;
    static downLoadState = null
    static livingTimescrollId = '24h'
    //static downloadStartTime

    static testCall(){
        let parsedResponse = null
        fetch('http://127.0.0.1:9200/blog/user/dilbert?pretty=true')
            .then((response) => {
                response = response['_bodyInit']
                response = JSON.parse(response)
                ElasticSearchResponse.getInstance().responseSucessCallBack(response)
            })
    }

    static fetchProduct(productCode,productCodeType){
        let parsedResponse = null
        if(productCode.length!=10 && productCode.length!=13)
        {
            alert("Please enter a valid Product Code")
            ElasticSearchResponse.getInstance().removeIndicatorOnInvalidCode()
        }
        else{
        let url = ElasticSearch.getProductAPIForES(productCode)
        var headers = new Headers();
        headers.append("Authorization", "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673"));

        fetch(url , {
            headers: headers
        })
            .then((response) => {
                response = response['_bodyInit'];
                response = JSON.parse(response)
                console.log(response)
                //alert(JSON.stringify(response['hits']['total']))
                if(JSON.stringify(response['hits']['total']) != 0){
                    ElasticSearchResponse.getInstance().responseSucessCallBack(response)
                }else{
                    ElasticSearchResponse.getInstance().responseFailureCallBack(response)
                }
            })
          }
    }

    static getProductAPIForES(productCode){
       let url = 'https://f505e785.qb0x.com:31644/_search/?q='+productCode+'&pretty'
       //https://f505e785.qb0x.com:31607/_search/?q='+productCode+'&pretty'
       //'https://f505e785.qb0x.com:31607/items/Item/'+productCode+'?pretty'
        return url

    }


    // Downloading part for data

     static getESDataSize(option){
        let parsedResponse = null
        let url = 'https://f505e785.qb0x.com:31644/_cat/indices/items/?pretty=1&format=json'
        var headers = new Headers();
        headers.append("Authorization", "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673"));
        if(option===1)
        {
            fetch(url , {
                headers: headers
            })
                .then((response) => {
                    response = response['_bodyInit']
                    response = JSON.parse(response)
                    if(JSON.stringify(response['status']) ==='404'){
                        alert('Error')
                    }else{
                        let jsonResult = response[0];
                        let storeSize = jsonResult['store.size']
                        //  alert(JSON.stringify(response))
                        // storeSize = response['store.size']
                        storeSize = storeSize.replace(/[^0-9\.]+/g, "");
                        //return storeSize
                        contentLength =  storeSize * 1024 * 1024 * 1024;  // Convert gb to bytes
                        //alert("content length == " + contentLength)
                        //this.startDownload()
                    }
                    //ElasticSearch.resumeDownloadBeganCallBack(response)
                })//.then(()=>RNFS.getFSInfo(RNFS.DocumentDirectoryPath)).then((info)=>{
                .then(()=>{
                //RNFS.getFSInfo()).then((info)=>{
                    //availableSpace=info.freeSpace
                    //if(availableSpace>contentLength){
                        ElasticSearch.startDownload()
                    //}
                    //else {
                       // ElasticSearchResponse.getInstance().SpaceConstraintChangeState(1 , contentLength );
                        //ElasticSearchResponse.getInstance().SpaceConstraintChangeState(1 , contentLength - availableSpace);    //Pallindromic Name(SCCS) :)
                        //alert("storage space not available,free upto" + availableSpace + "MB space.")
                   // }
                })
        }else{
            console.log("***DEBUG***RESUME")
            fetch(url , {
                headers: headers,
            })
                .then((response) => {
                    response = response['_bodyInit']
                    response = JSON.parse(response)
                    if(JSON.stringify(response['status']) ==='404'){
                        alert('Error')
                    }else{
                        console.log("***DEBUG***RESUME" + JSON.stringify(response))
                        let jsonResult = response[0];
                        let storeSize = jsonResult['store.size']
                        //  alert(JSON.stringify(response))
                        // storeSize = response['store.size']
                        storeSize = storeSize.replace(/[^0-9\.]+/g, "")
                        console.log("***DEBUG***RESUME" + storeSize);
                        //return storeSize
                        contentLength = storeSize * 1024 * 1024 * 1024;  // Convert gb to bytes
                        console.log("***DEBUG***RESUME" + contentLength)
                        //alert("content length == " + contentLength)
                        //this.startDownload()
                    }
                    //ElasticSearch.resumeDownloadBeganCallBack(response)
                }).then(()=>{
                    //RNFS.getFSInfo(RNFS.DocumentDirectoryPath)).then((info)=>{
                    //console.log("***DEBUG***INFO" + JSON.stringify(info))
                    //availableSpace=info.freeSpace;
                    //path=RNFS.DocumentDirectoryPath + '/test.json'
                    //console.log("***DEBUG***PATH" + JSON.stringify(path))
                    //RNFS.stat(path).then((object)=>{
                        //console.log("***DEBUG***STATOBJEVY" + JSON.stringify(object))
                        //let existingFileSize=parseInt(object.size);
                        //if(availableSpace > (contentLength-existingFileSize)){  //!!!!!***CHeck maybe wrong way to calculate
                           // console.log("***DEBUG***AVAILABKLESPACE" + availableSpace)
                           // console.log("***DEBUG***NEEDEDSPACE" + (contentLength-existingFileSize))
                            //alert("avialable space in bytes:" + availableSpace)
                            ElasticSearch.resumeDownload()
                        //}
                        //else {
                            //console.log("***DEBUG***INFO" + JSON.stringify(info))
                            //ElasticSearchResponse.getInstance().SpaceConstraintChangeState(2 , contentLength );
                            //alert("storage space not available,free upto" + ((contentLength - availableSpace)/1000000) + "MB space.")
                            //ElasticSearchResponse.getInstance().SpaceConstraintChangeState(2 , contentLength - existingFileSize - availableSpace);    //Pallindromic Name(SCCS) :)
                        //}
                    //})
                })
        }
            //return contentLength;
    }

    static updateDatabase(time){
        let url = 'https://f505e785.qb0x.com:31644/items/Item/_search/?pretty=1&format=json&q=refreshed_at:["' + time.substring(0,11) + time.substring(12) + '"' + '+TO+' + '"now"]';
        //let url = 'https://f505e785.qb0x.com:31607/items/Item/_search/?q=refreshed_at:["2015-4-25T16:53:52.000"+TO+"now"]'
        var headers = new Headers();
        headers.append("Authorization", "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673"));
        fetch(url,{
            headers:headers
        }).then((response)=>{
            response = JSON.parse(response['_bodyInit'])
            //console.log(" updateDatabaseResponse " + JSON.stringify(JSON.parse(response['_bodyInit'])))
            //response=JSON.parse(response);
            //console.log("RESPONSE:" + response)
            DataBase.getInstance().compareWithDatabaseAndUpdate(response);
        })
    }

    static startDownload(){
    //alert("instartDownload")
    //prevTime=Date.now();
        ElasticSearch.scrollnumber = 0
        ElasticSearch.downLoadState = Constants.DownloadState.kStarted
        let headers = {
            'Content-Type' :"application/json",
            'Authorization' : "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673")
        }
        let downloadUrl = 'https://f505e785.qb0x.com:31644/items/_search?q=_exists_:refreshed_at&size=50&scroll='+ElasticSearch.livingTimescrollId
        ElasticSearch.downLoadPath = RNFS.DocumentDirectoryPath + '/test.json';
       // ElasticSearch.downLoadPath = '/data/user/com.barcodescanner/files' + '/test.json'
       // alert('downloadPath:'+ElasticSearch.downloadPath)
        console.log('Download path=' + ElasticSearch.downLoadPath);

        RNFS.downloadFile({fromUrl:downloadUrl,
             toFile:ElasticSearch.downLoadPath ,
             headers:headers, 
             begin : ElasticSearch.downloadBeganCallBack, 
             progress : ElasticSearch.downloadProgressCallBack
            }).promise.then(res => {
            DataBase.getInstance().deleteAllDataFromProductDataTableIfExist()
           RNFS.readFile(ElasticSearch.downLoadPath).then((data)=>{
                ElasticSearchResponse.getInstance().dataPacketDownloaded(data)
                //ElasticSearch.cancelDownload()
            })

        }).catch((error)=>{
            alert('in startDownload downloadfile error'+ error)
          //  ElasticSearch.downloadFailed()
        });
    }

    static downloadWithScrollId() {
        //prevTime=Date.now();
        //console.log("*****scrollNumber:*****"+ ElasticSearch.scrollnumber)
        console.log('Scroll id ' +LocalStorageSettingsApi.scrollId )
        let downloadUrl = "https://f505e785.qb0x.com:31644/_search/scroll?q=_exists_:refreshed_at&scroll=24h&scroll_id="+LocalStorageSettingsApi.scrollId
        ElasticSearch.downLoadPath = RNFS.DocumentDirectoryPath + '/test.json';

        let headers = {
            'Content-Type' :"application/json",
            'Authorization' : "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673")
        }

        RNFS.downloadFile({fromUrl:downloadUrl, 
            toFile:ElasticSearch.downLoadPath ,
            headers:headers, 
            begin : ElasticSearch.downloadScrollBeganCallBack, 
            progress : ElasticSearch.downloadProgressCallBack
        }).promise.then(res => {
            RNFS.readFile(ElasticSearch.downLoadPath).then((data)=>{
                ElasticSearch.scrollnumber++;
                ElasticSearchResponse.getInstance().dataPacketDownloaded(data)
            })

        }).catch((error)=>{
            alert(error)
            ElasticSearch.downloadFailed()
        });

    }

    static resumeDownload() {
        console.log("***DEBUG***RESUMEDOWNLOAD")
        //prevTime = Date.now();
        let totalProductInDataBase = DataBase.getInstance().totalProductsInDataBase
        ElasticSearch.downLoadState = Constants.DownloadState.kStarted
        ElasticSearch.scrollnumber = 0
        let headers = {
            'Content-Type' :"application/json",
            'Authorization' : "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673")
        }
         let downloadUrl = "https://f505e785.qb0x.com:31644/_search/scroll?q=_exists_:refreshed_at&scroll=24h&scroll_id="+LocalStorageSettingsApi.scrollId
         //let totalProductInDataBase = DataBase.getInstance().totalProductsInDataBase
         //   let downloadUrl = "https://de44fb0e33db9a27585f:1bbefa1673@f505e785.qb0x.com:31607/items/_search?size=1000&scroll=1m&pretty=1&from=" +totalProductInDataBase;

            //console.log('Resume Url == '+downloadUrl )
            ElasticSearch.downLoadPath = RNFS.DocumentDirectoryPath + '/test.json';
            console.log("***DEBUG***DOWNLAODPATH" + ElasticSearch.downLoadPath)


            RNFS.downloadFile({
                fromUrl: downloadUrl,
                toFile: ElasticSearch.downLoadPath,
                headers:headers,
                begin: ElasticSearch.resumeDownloadBeganCallBack,
                progress : ElasticSearch.downloadProgressCallBack
            }).promise.then(res => {
                RNFS.readFile(ElasticSearch.downLoadPath).then((data)=> {
                    ElasticSearchResponse.getInstance().dataPacketDownloaded(data)
                    //alert("Resume1")
                    //ElasticSearch.cancelDownload()
                })
            }).catch((error)=> {
                alert(error)
                ElasticSearch.downloadFailed()
            });
    }


   static cancelDownload(){
        RNFS.stopDownload(ElasticSearch.downloadJobId);
        ElasticSearchResponse.getInstance().downloadFailed(Constants.DownlaodingFailError.KByUser)

    }


    static downloadBeganCallBack = (response)=> {
        //totalESsize = ElasticSearch.getESDataSize();
        //ElasticSearchResponse.getInstance().ActivityIndicatorCallback();
        prevTime = Date.now()
        ElasticSearch.downloadJobId = response['jobId']
        ElasticSearch.downLoadState = Constants.DownloadState.kRunning
        ElasticSearch.downloadStartTime = Date.now();
        ElasticSearchResponse.getInstance().downLoadBegan()
    }

    static downloadScrollBeganCallBack = (response)=> {
        console.log("***DEBUG***DownLOaDScrOLl***")
        //ElasticSearchResponse.getInstance().ActivityIndicatorCallback();
        if(ElasticSearch.downLoadState == Constants.DownloadState.kStopped)
        return;


        prevTime = Date.now()
        //console.log('downloadScrollBeganCallBack ' +  response['jobId'])
        ElasticSearch.downloadJobId = response['jobId']
        ElasticSearch.downLoadState = Constants.DownloadState.kRunning
        ElasticSearchResponse.getInstance().downLoadBegan();
        //totalESsize = ElasticSearch.getESDataSize();
    }

    static resumeDownloadBeganCallBack = (response)=> {
        console.log('***DEBUG***RESUMEDOWNLOADBEGANCALLBACK')
        //totalESsize = ElasticSearch.getESDataSize();
        //alert("content length in resumeDownloadBeganCallBack == " + contentLength)
        //alert(JSON.stringify(response))
        //alert("bytesWritten" + response.bytesWritten)
        //alert('resumeDownloadBeganCallBack ' +  response['jobId'])
        //Download.changeModalState();
        //ElasticSearchResponse.getInstance().ActivityIndicatorCallback();
        ElasticSearch.downloadStartTime = Date.now();
        prevTime = Date.now();
        ElasticSearch.downloadJobId = response['jobId']
        ElasticSearch.downLoadState = Constants.DownloadState.kRunning
        ElasticSearchResponse.getInstance().downLoadBegan();
        //totalESsize = ElasticSearch.getESDataSize();
    }

    static downloadProgressCallBack = (response)=>{
        console.log('***DEBUG***DOWNLOADPROGRESSCALLBACK')
        let currentTime=Date.now();
        let jobID = response['jobId'];

        totalBytesWritten = JSON.parse(LocalStorageSettingsApi.totalWrittenBytes) + response['bytesWritten'];
        bytesWritten = response.bytesWritten

        let speed = bytesWritten / (currentTime - prevTime)

        prevBytesWritten=totalBytesWritten;
        LocalStorageSettingsApi.setPrevBytesWritten(JSON.stringify(totalBytesWritten))
        prevTime=currentTime;
        ElasticSearchResponse.getInstance().downloadProgressCallBack(speed,contentLength,totalBytesWritten);
    }

   static downloadingProgress(){
       //console.log("*******percentage in downloadingProgress***********"+percentage)
        ElasticSearchResponse.getInstance().downloadForProgessBarCallback();
    }

    static downloadFailed(){
        ElasticSearchResponse.getInstance().downloadFailed(Constants.DownlaodingFailError.KByError)
    }

    static clearCurrentScrollId(scrollid){
        let parsedResponse = null
        let url = "https://f505e785.qb0x.com:31644/_search/scroll/"+scrollid+"?pretty"
        var headers = new Headers();
        headers.append("Authorization", "Basic " + base64.encode("de44fb0e33db9a27585f:1bbefa1673"));
        fetch(url , {
            headers: headers
        })
            .then((response) => {
                //console.log('Scroll id cleared')
            })
    }
}
