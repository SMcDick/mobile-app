
import LoginResponse from './LoginResponse'

export default class LoginApi {
    static testCall(emailValue, passwordValue) {
        var formData = new FormData()
        formData.append('email', emailValue)
        formData.append('password', passwordValue)
        fetch('http://zen-mobile-backend.herokuapp.com/sign-in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((response) => {
                response = response['_bodyInit']
                response = JSON.parse(response)
                //alert(JSON.stringify(response))
                 if((response['status'])=='success') {
                  LoginResponse.getInstance().responseSucessCallBack(response )
                }else{
                     LoginResponse.getInstance().responseFailureCallBack(response)
                }
            })
    }
}
