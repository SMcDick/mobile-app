let _localStorageSettingsResponse = null
export default class LocalStorageSettingsResponse {
    static getInstance(){
        if(_localStorageSettingsResponse == null)
         {   _localStorageSettingsResponse = new LocalStorageSettingsResponse()
            //console.log("LocalStorage getinstance:hello")
         }
         //console.log(_localStorageSettingsResponse.constructor.name)
        return _localStorageSettingsResponse;
    }

    constructor(){
        this.receivers = [];
    }

    setReceiver(reciever){
        //console.log("calling screen::::::::::>"+reciever.constructor.name)
        this.receivers.push(reciever);
        //console.log("receivers length:"+ this.receivers.length)
    }

    removeReceiver(reciever){
        this.receivers.pop(reciever);
    }

    async localStorageSettingsResponseSuccessCallback(response,key){
       //alert("*******localStorageSettingsResponseSuccessCallback")
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].localStorageSettingsResponseSuccessCallback(response,key)
        }
    }

}