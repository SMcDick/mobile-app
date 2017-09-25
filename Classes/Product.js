/**
 * Created by ChicMic on 14/02/17.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import fastXmlParser from 'fast-xml-parser'
var RankPercentageData = require('./RankPercentage.json');


export default class Product{
    constructor(){
        this.category = null;
        this.title = null;
        this.productCode = null;
        this.amazonPrice = null;
        this.salesRank = null;
        this.image = null;
        this.productAmazonURL = null;
        this.lowestNewPrice = null;
        this.lowestUsedPrice = null;
        this.nonFBAUsedOffersArray  = [];
        this.nonFBANewOffersArray = [];
        this.fbaOffersArray = [];
        this.numberOfUsedOffers = null;
        this.numberOfNewOffers = null;
        this.numberOfFBAOffers = null;
        this.tradeIn = null;
        this.averageRank = null;
        this.compareSalesRank=null;
        this.lowestNewPrice=null;
        this.lowestUsedPrice=null;
        this.FBAUrl = null;
        this.UsedUrl = null;
        this.NewUrl = null;
        this.AllOffersUrl = null;
        this.fbaAvg=null;
        this.nonFbaUsedAvg=null;
        this.nonFbaNewAvg=null;
        this.productCondition=null

    }
    upadateProductDataOnResponse(response){
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!upadateProductDataOnResponse")
        this.productAmazonURL = response["ItemLookupResponse"]["Items"]["Item"]["DetailPageURL"]

        var itemArray = response["ItemLookupResponse"]["Items"]["Item"];
        if(response["ItemLookupResponse"]["Items"]["Item"].length == undefined){
            itemArray = response["ItemLookupResponse"]["Items"]["Item"]
        }else{
            itemArray = response["ItemLookupResponse"]["Items"]["Item"][0];
        }
        this.productCode = itemArray["ItemAttributes"]?itemArray["ItemAttributes"]["ISBN"]:null
        this.category = itemArray["ItemAttributes"]?itemArray["ItemAttributes"]["ProductGroup"]:null
        this.title = itemArray["ItemAttributes"]?itemArray["ItemAttributes"]["Title"]:null
        this.amazonPrice = itemArray["ItemAttributes"]["ListPrice"]?itemArray["ItemAttributes"]["ListPrice"]["FormattedPrice"]:null
        this.salesRank = itemArray["SalesRank"]?itemArray["SalesRank"]: null
        this.lowestNewPrice = itemArray["OfferSummary"]?itemArray["OfferSummary"]?itemArray["OfferSummary"]["LowestNewPrice"]?itemArray["OfferSummary"]["LowestNewPrice"]["FormattedPrice"]:null:null:null;
        this.lowestUsedPrice = itemArray["OfferSummary"]?itemArray["OfferSummary"]["LowestUsedPrice"]?itemArray["OfferSummary"]["LowestUsedPrice"]["FormattedPrice"]:null:null;
        this.compareSalesRank=itemArray["SalesRank"]?itemArray["SalesRank"]: null
        this.image =  itemArray["SmallImage"]?itemArray["SmallImage"]["URL"]:null
        this.numberOfNewOffers  = itemArray["OfferSummary"]["TotalNew"];
        this.numberOfUsedOffers = itemArray["OfferSummary"]["TotalUsed"];
        this.numberOfFBAOffers  = null;
        this.tradeIn=response['trade_in_value']?response['trade_in_value']:'NA'
        this.lowestNewPrice=itemArray["OfferSummary"]["TotalNew"]?itemArray["OfferSummary"]["TotalNew"]["LowestNewPrice"]["FormattedPrice"]: null
        this.lowestUsedPrice=itemArray["OfferSummary"]["TotalUsed"]?itemArray["OfferSummary"]["TotalNew"]["LowestUsedPrice"]["FormattedPrice"]: null

        alert("Lowest new price:"+JSON.stringify(itemArray["OfferSummary"]["TotalNew"]));
        //this.nonFBAUsedOffersArray =[...this.nonFBAUsedOffersArray, this.lowestUsedPrice]
        //this.nonFBANewOffersArray =[...this.nonFBANewOffersArray, this.lowestNewPrice]

    }

    updateProductDataOnResponseFromES(response){
        alert('updateProductDataOnResponseFromES() response:'+response);
        this.productCode =  response['hits']['hits'][0]['_id']? response['hits']['hits'][0]['_id']:null;
        response = response['hits']['hits'][0]['_source']
        this.title = response['title']? response['title']:null
        this.amazonPrice = response['list_price']?'$'+ response['list_price']:  null
        this.salesRank = response['sales_rank']?response['sales_rank'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):'-'
        this.compareSalesRank=response['sales_rank']?response['sales_rank']: null
        this.numberOfNewOffers = response['new_count']?response['new_count']:null
        this.numberOfUsedOffers = response['used_count']?response['used_count']:null
        this.productAmazonURL = response['']?response['']:null
        this.image = response['']?response['']:null
        this.category = response['']? response['']: null;
        this.numberOfFBAOffers  = null;
        this.tradeIn=response['trade_in_value']?response['trade_in_value']:'NA'
    }


    updateProductDataOnLocalDataBaseResponse(response){
        alert('updateProductDataOnLocalDataBaseResponse() response:'+response);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. error")
        this.productCode =  response['_id']? response['_id']:null;
        this.title = response['title']? response['title']:null
        this.amazonPrice = response['list_price']?'$'+ response['list_price']: null
        this.salesRank = response['sales_rank']?response['sales_rank'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): null
        this.compareSalesRank=response['sales_rank']?response['sales_rank']: null
        this.numberOfNewOffers = response['new_count']?response['new_count']:null
        this.numberOfUsedOffers = response['used_count']?response['used_count']:null
        this.productAmazonURL = response['']?response['']:null
        this.image = response['']?response['']:null
        this.category = response['']? response['']: null;
        this.numberOfFBAOffers  = null;
        this.tradeIn=response['trade_in_value']?response['trade_in_value']:'NA'
    }


    GetFbaXRayUrl(FBAXRayThreshold){

        var SalesRank;
        //alert("in GetFbaXRayUrl() FBAXRayThreshold:"+FBAXRayThreshold)
        if(this.averageRank!=undefined)
        {
            SalesRank = this.averageRank;
            //alert("this.averageRank"+this.averageRank);
        }
        else
        {
            SalesRank = this.salesRank;
            alert("this.SalesRank"+this.SalesRank);
        }

        var fbaXRayUrl = 'http://server.nickgermaine.com:8080/single?threshold='+FBAXRayThreshold+'&fbmnewprice='+this.lowestNewPrice+'&fbmusedprice='+this.lowestUsedPrice+'&OfferCountNew='+this.numberOfNewOffers+'&OfferCountUsed='+this.numberOfUsedOffers+'&SalesRank='+SalesRank;

        alert('XRay url:'+fbaXRayUrl);
        return fbaXRayUrl;
    }

    calculateFBAPercentage(FBAXRayThreshold, FBAXRayNewOrUsed){

        let parsedResponse = null
        const parseString = require('react-native-xml2js').parseString;

        //var obj=null;

        fetch(this.GetFbaXRayUrl(FBAXRayThreshold))
        .then(response =>response.text())
        .then((response) => {
            //alert('response'+response);
            var obj = JSON.parse(response);
            //alert("response:"+response);
            //alert("calculateFBAPercentage RESPONSE:"+obj["results"]["new"]);
            if(FBAXRayNewOrUsed=='Used'){
               //alert('calculateFBAPercentage:used'+JSON.stringify(obj["results"]["used"]))
               return obj["results"]["used"]
            }
            else{
               //alert('calculateFBAPercentage:new'+JSON.stringify(obj["results"]["new"]))
               return obj["results"]["new"]
            }
        })
        .catch((error) => {
            console.error(error);
        });

            //return obj["results"]["new"];
        return ' ';

    }

    calculateNetProfit(value){
       console.log("<<value is>> " + value)
        if(value==null) {
            if(this.nonFBAUsedOffersArray[0] != null) {
                console.log("nonFBAUsedOffersArray-calculateNetProfit" + this.nonFBAUsedOffersArray[0].Price)
                var selectedFormattedValue = parseFloat(this.nonFBAUsedOffersArray[0].Price)

                return "$" + Math.round(( selectedFormattedValue - (( 0.15 * selectedFormattedValue) + 1.80) - 3 - 0.19) * 100) / 100

                //return Math.round(( 0- costPrice - ( 0.15 * 25 ) - 1.80 - 4 )*10) / 10
                // 25(cost to customer/selling price) , amazonPrice(buying price for seller) , selling on amazon fees{ 0.15*25(Referrral fee 15% of selling price , variable closing fee(fixed for media products , 1.80) } , amazon fullfilmet fees{ 3},shipping to amazon(1,can vary)
            }
       if(this.nonFBAUsedOffersArray[0] == null){
           return " "
       }
       }
            else{

            var formattedValue=parseFloat(value)

            return Math.round(( formattedValue  - (( 0.15 * formattedValue) + 1.80) - 3 - 0.19)*100)/100

            //3.99= shipping credits fixed for books in domestic stanadard shipping
            //0.19=ship to amazon fee (it should be variable i.e. manually entered by the user)
        }

    }

    calculateBuyBoxPrice(){
       return this.tradeIn
    }
    calculatePricePercent(){
        return (this.tradeIn?' ':null);
    }

    /*calculateAmazonRank(isbn){
        fetch('http://35.167.19.151/history/average/?asins=' + isbn )
            .then((response) => {
                response=JSON.parse(response["_bodyText"])
               return (JSON.stringify(response[isbn]))
                //response = response['_bodyInit']
                //response = JSON.parse(response)

            })
    }*/

    calculateTopRankPercentage(callback){
        let result = null;
        if(this.salesRank=='-' || this.salesRank==null) {
            result = "-"
            callback(result);
        }
        else{
          RankPercentageJSON=RankPercentageData.Category.Books
            RankPercentageJSON.map((element)=>{
                if (( parseInt(this.compareSalesRank) >= element.min) && (parseInt(this.compareSalesRank) <= element.max )) {
                    result = `${(element.toppercentage)}` + '%'
                    console.log("*******mapIF")
                }
            });
            if( result == null)
                result = "Bottom 50%"
            callback(result);
        }
    }

    calculate_FBAOffer_Average_BasedOnOfferSelected(){
        return " "
    }

    calculateBaseProfit(){
      return 10
    }

    calculateXRAYPercentage(){
      return 10
    }

    calculate_NONFBA_UsedOffer_Average_BasedOnOfferSelected(){
        return " "
    }

    calculate_NONFBA_NEWOffer_AVERAGE_BasedOnOfferSelected(){
        return " "
    }

}
