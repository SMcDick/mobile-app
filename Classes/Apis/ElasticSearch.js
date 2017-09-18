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
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs'


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

    /* zipArchive():
     * This is a test function to write a file, zip it, unzip it and read it. it also reads the directory of the file
    */
    static zipArchive(){

        var RNFS = require('react-native-fs');

        // create a path you want to write to
        const sourcePath = RNFS.DocumentDirectoryPath + '/test.json';  //one option to access DocumentDirectoryPath
        const targetPath = `${DocumentDirectoryPath}/testFile.zip`;       //another option to access DocumentDirectoryPath
        const unzipToPath = `${DocumentDirectoryPath}/testFolder`;

        // write the file
        RNFS.writeFile(sourcePath, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success) => {
            console.log('File written at'+sourcePath);

            //zip the file
            zip(sourcePath, targetPath)
            .then((path) => {
                console.log('zip completed at'+ path)

                //unzip the file
                unzip(targetPath, unzipToPath)
                .then((path) => {
                    console.log('unzip completed at'+ path)

                    //get a list of files and directories in unzipToPath
                    RNFS.readDir(unzipToPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                    .then((result) => {
                        console.log('Files in '+unzipToPath, result);

                        // stat the first file
                        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
                     })
                    .then((statResult) => {
                        if (statResult[0].isFile()) {
                            // if we have a file, read it
                            return RNFS.readFile(statResult[1], 'utf8'); //NOTE: This assumes that this is the first file in the unzipped folder. Another option to read the file is to send the actual path instead of statResult[1] as at the next readFile
                        }

                        return 'no file';
                    })
                    .then((contents) => {
                        // log the file contents
                        console.log('unzipped file content:'+contents);

                        // a second option to read the file
                        RNFS.readFile(unzipToPath+'/test.json', 'utf8')
                          .then((contents) => {
                            // log the file contents
                            console.log('File contents'+contents);
                          })
                     })
                })
            })
        })
        .catch((err) => {
            console.log(err.message);
        });

        /******************Deleting a File**********************
           RNFS.unlink(ElasticSearch.downLoadPath)
          .then(() => {
            alert('FILE DELETED');
          })
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch((err) => {
            alert(err.message);
          });*/
    }

    static DownloadZipFile()
    {
        let downloadUrl = 'http://ec2-34-213-116-128.us-west-2.compute.amazonaws.com/books/useful/binary'; //url to download from
        ElasticSearch.downLoadPath = RNFS.DocumentDirectoryPath + '/binary-data.zip';                     //path for the zip file
        const targetPath = `${DocumentDirectoryPath}/FbaScanner`;                                   //path to the folder to put the unzipped file
        const unzippedFilePath = targetPath+'/binary-data';                                           //path to the unzipped file

        console.log('Download path=' + ElasticSearch.downLoadPath);

        RNFS.downloadFile({fromUrl:downloadUrl,
             toFile:ElasticSearch.downLoadPath //,
             //headers:headers,
             //begin : ElasticSearch.downloadBeganCallBack,
             //progress : ElasticSearch.downloadProgressCallBack
             }).promise.then(res => {
               //DataBase.getInstance().deleteAllDataFromProductDataTableIfExist()
               //RNFS.readFile(ElasticSearch.downLoadPath).then((data)=>{
               //ElasticSearchResponse.getInstance().dataPacketDownloaded(data)
               console.log('in DownloadZipFile File was downloaded to'+ElasticSearch.downloadPath);

               console.log('starting unzip');
               unzip(ElasticSearch.downLoadPath, targetPath)
               .then((path) => {
                    console.log(`unzip completed at ${path}`);
                    console.log('starting reading zip file');

                    RNFS.read(unzippedFilePath, 64, 0, 'base64')
                   .then((contents) => {
                     // log the file contents
                     console.log("unzipped file contents"+JSON.stringify(contents));
                     console.log("unzipped file path:" +unzippedFilePath);
                   })
               })
            })
            .catch((error)=>{
                console.log('in startDownload downloadfile error'+ error)
              //  ElasticSearch.downloadFailed()
            });

    }

    static ReadBinaryFile()
        {
            let downloadUrl = 'http://ec2-34-213-116-128.us-west-2.compute.amazonaws.com/books/useful/binary'; //url to download from
            ElasticSearch.downLoadPath = RNFS.DocumentDirectoryPath + '/binary-data.zip';                     //path for the zip file
            const targetPath = `${DocumentDirectoryPath}/FbaScanner`;                                   //path to the folder to put the unzipped file
            const unzippedFilePath = targetPath+'/binary-data';                                           //path to the unzipped file

            var base64 = require('base-64');

            console.log('starting reading zip file');

            RNFS.read(unzippedFilePath, 64, 0, 'base64')
           .then((contents) => {
             // log the file contents
             console.log("unzipped file contents"+JSON.stringify(contents));
             console.log("unzipped file contents2"+contents);
             var decodedData = base64.decode(contents);
             //console.log("unzipped file contents3"+JSON.stringify(decodedData));
             console.log("unzipped file contents4"+decodedData);
             console.log("unzipped file path:" +unzippedFilePath);
           })
            .catch((error)=>{
                console.log('in startDownload downloadfile error'+ error)
              //  ElasticSearch.downloadFailed()
            });

        }
    // Downloading part for data

     static getESDataSize(option){
        debugger;
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
        debugger;
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
                        debugger;
                        console.log("***DEBUG***RESUME" + JSON.stringify(response))
                        let jsonResult = response[0];
                        let storeSize = jsonResult['store.size']
                        //  alert(JSON.stringify(response))
                        // storeSize = response['store.size']
                        storeSize = storeSize.replace(/[^0-9\.]+/g, "")
                        debugger;
                        console.log("***DEBUG***RESUME" + storeSize);
                        //return storeSize
                        contentLength = storeSize * 1024 * 1024 * 1024;  // Convert gb to bytes
                        debugger;
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
    debugger;
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
        debugger;
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
        debugger;
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
