/**
 * Created by nidhitandon on 12/07/17.
 */
import fastXmlParser from 'fast-xml-parser'
import CryptoJS from 'crypto-js'
import MWSResponse from './MWSResponse'
import Constants from '../Constants'

export default class MWSApi{

    static fetchProduct(productId, ItemCondition, Action){
        console.log("Action" +Action)
        console.log("productId" +productId)
        if(ItemCondition == 'New'){
            console.log('123456789 New fetch')
        }
        if(ItemCondition == 'Used'){
            console.log('123456789 Used fetch')
        }
        let parsedResponse = null

        return fetch(MWSApi.getAmazonItemInfo(productId, ItemCondition, Action), {method:'GET' , headers:{
            "x-amazon-user-agent": "AmazonJavascriptScratchpad/1.0 (Language=Javascript)",
            "Content-Type": "text/xml"
        } , Host:"mws.amazonservices.com"
        })
            .then((response) => {
                console.log("***********gurdial **MWS*****"+JSON.stringify(response))
                response  = response["_bodyInit"]

                //added for parsing multiple values in xml tag
                var parseString = require('react-native-xml2js').parseString;
                parseString(response, function (err, result) {

                    console.log("in the MWS API "+Action +JSON.stringify(result))
                    if( Action== 'GetLowestPricedOffersForASIN'){
                        MWSResponse.getInstance().responseSucessCallBack(result, ItemCondition, Action)
                    }


                });
                response = fastXmlParser.getTraversalObj(response);
                parsedResponse = fastXmlParser.convertToJson(response);

                console.log("******************pmTesting"+JSON.stringify(parsedResponse))
            })
            .then(() => {

                if(ItemCondition == 'New' && Action== 'GetLowestOfferListingsForASIN'){
                    console.log('123456789 New fetch resolved GetLowestOfferListingsForASIN')
                }
                if(ItemCondition == 'Used' && Action== 'GetLowestOfferListingsForASIN'){
                    console.log('123456789 Used fetch resolved GetLowestOfferListingsForASIN')
                }
                if(ItemCondition == 'New' && Action== 'GetLowestPricedOffersForASIN'){
                    console.log('123456789 New fetch resolved GetLowestPricedOffersForASIN')
                }

                console.log("in the MWS API "+Action +JSON.stringify(parsedResponse))
                if(Action !='GetLowestPricedOffersForASIN') {
                    MWSResponse.getInstance().responseSucessCallBack(parsedResponse, ItemCondition, Action)
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }


    static getAmazonItemInfo(productId, ItemCondition, Action) {

        if(Action == "GetLowestOfferListingsForASIN"){

            var param = [];
            param.push("AWSAccessKeyId=" + Constants.AWSAccessKeyId);
            param.push("Action=" + Action);
            param.push("SellerId=" + Constants.SellerId);
            param.push("SignatureVersion=2");
            param.push("SignatureMethod=HmacSHA256");
            param.push("Timestamp=" +encodeURIComponent(MWSApi.timestamp()));
            param.push("Version=2011-10-01");
            param.push("MarketplaceId=" + Constants.MarketplaceId);
            param.push("ItemCondition=" +ItemCondition);
            param.push("ASINList.ASIN.1=" +productId);

            param.sort();
            var paramString = param.join('&');

            var signingKey = "GET\n" +"mws.amazonservices.com\n" + "/Products/2011-10-01\n" + paramString;
            var signature = MWSApi.sha256(signingKey,"tfm6fFDJT/7YxVinYSV74E93+TmTSQbWkXsztYUv");
            signature = encodeURIComponent(signature);

            var amazonUrl =  "https://mws.amazonservices.com/Products/2011-10-01?" + paramString+"&Signature=" + signature ;
            return amazonUrl;
        }

        if(Action == 'GetLowestPricedOffersForASIN') {


            var param = [];
            param.push("AWSAccessKeyId=" + Constants.AWSAccessKeyId);
            param.push("Action=" + Action);
            param.push("SellerId=" + Constants.SellerId);
            param.push("SignatureVersion=2");
            param.push("SignatureMethod=HmacSHA256");
            param.push("Timestamp=" + encodeURIComponent(MWSApi.timestamp()));
            param.push("Version=2011-10-01");
            param.push("MarketplaceId=" + Constants.MarketplaceId);
            param.push("ItemCondition=" + ItemCondition);
            param.push("ASIN=" + productId);

            param.sort();
            var paramString = param.join('&');

            var signingKey = "GET\n" + "mws.amazonservices.com\n" + "/Products/2011-10-01\n" + paramString;
            var signature = MWSApi.sha256(signingKey, "tfm6fFDJT/7YxVinYSV74E93+TmTSQbWkXsztYUv");
            signature = encodeURIComponent(signature);

            var amazonUrl = "https://mws.amazonservices.com/Products/2011-10-01?" + paramString + "&Signature=" + signature;

            console.log("******* mws amazonUrl" + amazonUrl)

            return amazonUrl;
        }

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
}

