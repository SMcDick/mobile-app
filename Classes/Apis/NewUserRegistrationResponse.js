
let _registrationResponse = null
export default class NewUserRegistrationResponse {
  static getInstance() {
        if (_registrationResponse == null)
            _registrationResponse = new NewUserRegistrationResponse()

        return _registrationResponse;
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
            this.receivers[i].registerResponseSucessCallBack(response)
        }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].registerResponseFailureCallBack(errorCode)
        }
    }
}
