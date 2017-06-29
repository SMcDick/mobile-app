import { Image } from 'react-native'
import Product from '../Product'
import DatabaseServerResponse from './DatabaseServerResponse'
import Constants from '../Constants'
import CryptoJS from 'crypto-js'
import fastXmlParser from 'fast-xml-parser'

export default class DatabaseServerApi{

    static fetchProduct(api){
        let parsedResponse = null
        return  fetch(api)
            .then((response) => {
                DatabaseServerResponse.getInstance().responseSucessCallBack(response)

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
