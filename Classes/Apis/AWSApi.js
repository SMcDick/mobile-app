import { Image } from 'react-native'
import Product from '../Product'
import AWSResponse from './AWSResponse'
import Constants from '../Constants'
import CryptoJS from 'crypto-js'
import fastXmlParser from 'fast-xml-parser'

export default class ProductApi{


   static fetchProduct(productCode,productCodeType){

       let parsedResponse = null

       const parseString = require('react-native-xml2js').parseString;

        return  fetch(ProductApi.getAmazonItemInfo(productCode,productCodeType))
                      .then(response => response.text())
                      .then((response) => {
                          parseString(response, function (err, result) {
                              console.log(response);
                              console.log("HERE RINAT");
                              response = fastXmlParser.getTraversalObj(response);
                              parsedResponse = fastXmlParser.convertToJson(response);
                              if((!parsedResponse["ItemLookupResponse"]) || (!parsedResponse["ItemLookupResponse"]["Items"]) || (!parsedResponse["ItemLookupResponse"]["Items"]["Request"]) || (parsedResponse["ItemLookupResponse"]["Items"]["Request"]["Errors"])){
                                  AWSResponse.getInstance().responseFailureCallBack(Constants.AWSErrorCodes.kInvalidParameterValue)
                                  console.log("NOT WORKING");
                              }else{
                                  AWSResponse.getInstance().responseSucessCallBack(parsedResponse)
                                  console.log("MAYBE WORKING?00");
                              }
                          });
                      })
                      /*
              .then((response) => { //OLD CODE
                    response  = response["_bodyInit"]
                    response = fastXmlParser.getTraversalObj(response);
                    parsedResponse = fastXmlParser.convertToJson(response);
                })
                .then(() => {
           console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+JSON.stringify(parsedResponse))

                    if((!parsedResponse["ItemLookupResponse"]) || (!parsedResponse["ItemLookupResponse"]["Items"]) || (!parsedResponse["ItemLookupResponse"]["Items"]["Request"]) || (parsedResponse["ItemLookupResponse"]["Items"]["Request"]["Errors"])){

                            AWSResponse.getInstance().responseFailureCallBack(Constants.AWSErrorCodes.kInvalidParameterValue)
                    }else{
                        AWSResponse.getInstance().responseSucessCallBack(parsedResponse)
                    }
                })*/
                .catch((error) => {
                    console.error(error);
                });
        }

    getSignatureKey(Crypto, key, dateStamp, regionName, serviceName) {
        var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
        var kRegion = Crypto.HmacSHA256(regionName, kDate);
     var kService = Crypto.HmacSHA256(serviceName, kRegion);
        var kSigning = Crypto.HmacSHA256("aws4_request", kService);
        return kSigning;
    }

    static sha256(stringToSign, secretKey) {
        var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
        return hex.toString(CryptoJS.enc.Base64);
    }

    static timestamp() {
        var date = new Date();
        var y = date.getUTCFullYear().toString();
        var m = (date.getUTCMonth() + 1).toString();
        var d = date.getUTCDate().toString();
        var h = date.getUTCHours().toString();
        var min = date.getUTCMinutes().toString();
        var s = date.getUTCSeconds().toString();

        if(m.length < 2) { m = "0" + m; }
        if(d.length < 2) { d = "0" + d; }
        if(h.length < 2) { h = "0" + h; }
        if(min.length < 2) { min = "0" + min; }
        if(s.length < 2) { s = "0" + s}

        var date = y + "-" + m + "-" + d;
        var time = h + ":" + min + ":" + s;
        return date + "T" + time + ".000Z";
    }

    static getAmazonItemInfo(barcode,productCodeType) {

        var responseGroup = encodeURIComponent("Images,ItemAttributes,OfferFull,OfferListings,Offers,OfferSummary,SalesRank,VariationOffers,BrowseNodes")

        var parameters = [];
        parameters.push("AWSAccessKeyId=" + Constants.kAWSAccessKeyId);
        parameters.push("ItemId=" + barcode);
        parameters.push("Operation=ItemLookup");
        parameters.push("Service=AWSECommerceService");
        parameters.push("Timestamp=" + encodeURIComponent(ProductApi.timestamp()));
        parameters.push("AssociateTag=" + Constants.kAssociateTag);
        parameters.push("ResponseGroup="+ responseGroup);
        parameters.push("IdType="+productCodeType);
        parameters.push("SearchIndex=Books");

        parameters.sort();
        var paramString = parameters.join('&');

        var signingKey = "GET\n" + "webservices.amazon.com\n" + "/onca/xml\n" + paramString
        var signature = ProductApi.sha256(signingKey,Constants.kAWSSecretKey);
        signature = encodeURIComponent(signature);
        var amazonUrl =  "http://webservices.amazon.com/onca/xml?" + paramString + "&Signature=" + signature;
        //alert('amazonUrl: '+amazonUrl)
        return amazonUrl;


    }


}
