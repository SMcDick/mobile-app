let _dataBaseServerResponse = null

export default class DatabaseServerResponse {
    static getInstance() {
        if (_dataBaseServerResponse == null)
            _dataBaseServerResponse = new DatabaseServerResponse()

        return _dataBaseServerResponse;
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
            this.receivers[i].databaseServerResponseSucessCallBack(response)
        }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].databaseServerResponseFailureCallBack(errorCode)
        }
    }

}