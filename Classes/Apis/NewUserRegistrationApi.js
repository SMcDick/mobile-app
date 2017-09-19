

import NewUserRegistrationResponse from './NewUserRegistrationResponse'
export default class NewUSerRegistraionApi {
    static testCall(emailValue, passwordValue) {
        debugger;
        var formData = new FormData()
        formData.append('email', emailValue)
        formData.append('password', passwordValue)
        fetch('http://zen-mobile-backend.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((response) => {
                debugger;
                response = response['_bodyInit']
                response = JSON.parse(response)


                 if((response.hasOwnProperty('error')))
                {
                     NewUserRegistrationResponse.getInstance().responseFailureCallBack(JSON.stringify(response['error']))
                }else{
                     NewUserRegistrationResponse.getInstance().responseSucessCallBack(response)

                }
              
            })
    }



}
