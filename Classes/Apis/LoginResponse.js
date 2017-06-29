
let _loginResponse = null
export default class LoginResponse
{
  static getInstance() {
        if (_loginResponse == null)
            _loginResponse = new LoginResponse()

        return _loginResponse;
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
            this.receivers[i].loginResponseSucessCallBack(response)
        }
    }

    responseFailureCallBack(errorCode){
        for(i = 0 ; i < this.receivers.length ; i++){
            this.receivers[i].loginResponseFailureCallBack(errorCode)
        }
    }
}