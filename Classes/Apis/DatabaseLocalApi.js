
import React , {Component} from 'react'
import {Alert} from 'react-native'

import SQLite from 'react-native-sqlite-storage'
//import jsonData from '../../test.json'
import DatabaseLocalResponse from './DatabaseLocalResponse'
import ElasticSearch from './ElasticSearch'
import Constants from '../Constants'

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "ProductData.sqlite";
//const database_version = "1.0";
//const database_displayname = "WordSearchDatabase Test Database";
//const database_size = 200000;
let db;
let productNumber
let productData = null

let _databaseLocalApi = null
export default class DatabaseLocalApi{

    static getInstance(){
        if(_databaseLocalApi == null) {
            _databaseLocalApi = new DatabaseLocalApi()
        }

        return _databaseLocalApi

        //DatabaseLocalApi.openDatabase();
    }

    constructor(){
        this.lastProductIDFromDataBase = null
        this.totalProductsInDataBase = null
        this.isPacketWritingInProcess = false
    }

    openDatabase(){
        var that = this;
        SQLite.echoTest().then(() => {

            // SQLite.openDatabase({name: 'my.db', location: 'Library'}, successcb, errorcb);
            // SQLite.openDatabase({name: 'my.db', location: 'Document'}, successcb, errorcb);
            SQLite.openDatabase({name:database_name,location: 'default'}).then((DB) => {
                db = DB;

                this.getCountOfTotalproductsInDataBase()
            }).catch((error) => {
                console.log(error);

            });
        }).catch(error => {
           // alert("error again" +JSON.stringify(error))
            //console.log('data base error ' + error)
        });
    }

    openDatabaseFromLocation(){
        SQLite.echoTest().then(() => {
            SQLite.openDatabase({name: database_name, createFromLocation: 1}).then((DB)=> {
                db = DB;
                //console.log('openDataBase successfull')

            }).catch((error)=> {
                alert('data base populated error' + error)

            })
        }).catch((error)=>{
            console.log(error);
            alert('database open fail' + error)
        })

        // SQLite.openDatabase({name : "ProductsDataBase", createFromLocation : 1}, okCallback,errorCallback); // from www in project folder
        //SQLite.openDatabase({name : "testDB", createFromLocation : "~data/mydbfile.sqlite"}, okCallback,errorCallback); // data in www
        //SQLite.openDatabase({name : "testDB", createFromLocation : "/data/mydbfile.sqlite"}, okCallback,errorCallback); // user defined
    }

    closeDatabase(){
        var that = this;
        if (db) {
            //console.log("Closing database ...");
            db.close().then((status) => {
                //console.log("Database closed");
            }).catch((error) => {
               //console.log('database closing error '+ error)
            });
        } else {
          //console.log('Data base was not opened')
        }
    }

    getProductDetails(){
        db.executeSql('SELECT * FROM Level_1' , [] , (results)=>{
            try {
                var len = results.rows.length, i;
                //alert(results.rows.item(0)['Status']);
            }catch(error){
                alert('error' + error)
            }
        })
    }

    updateProductDetails(){
        db.executeSql('UPDATE Level_1 SET Status = ? WHERE LogoNumber = ?' , [3,3] , (result)=>{
           alert('Rows Updated ' +   result.rowsAffected)
        })
    }

    deleteProduct(){
        db.executeSql('DELETE  FROM Level_1 WHERE LogoNumber = ?', [4] , (result)=>{
            alert('Rows Deleted ' +   result.rowsAffected)
        })
    }

    //insertProduct(){
    //    db.executeSql( 'INSERT INTO Level_1  VALUES(?, ?, ?, ?, ?, ?, ?, ?)', ['FSdsfFS' , 'SDFDSF' , 'SDFSF' , 'FSFSD' , 'DFDSFS' ,'DSFSF' ,323, 34] , (result)=>{
    //        alert('Row INSERTED ')
    //    } , (error)=>{
    //        alert('insert failed ' +  error.code)
    //    })
    //}

    getCountOfTotalproductsInDataBase(){
        db.executeSql('SELECT COUNT(_id) FROM ProductData' , [] , (result)=>{
            try {
                let count =  JSON.stringify( result.rows.item(0)['COUNT(_id)'])
                this.totalProductsInDataBase = count
                //console.log("total downloaded count === " + count);
                // if(count == 30000){
                //    ElasticSearch.cancelDownload();
                //    console.log("     " + count + "stop download");
                //    return
                // }
                ElasticSearch.downloadingProgress() // Gurdial
            }catch(error){
                alert('error' + error)
            }
        })
    }

    getLastProductFromDataBase(callBack){
        //this.getCountOfTotalproductsInDataBase((count)=>{
            db.executeSql('SELECT _id FROM ProductData limit ?,1' , [ this.totalProductsInDataBase-1] , (result)=>{
                try {
                    let lasttProductId =  JSON.stringify( result.rows.item(0)['_id'])
                    this.lastProductIDFromDataBase = lasttProductId
                    callBack(lasttProductId)
                }catch(error){
                    alert('error' + error)
                }
            })

      //  })
    }


    insertProduct(productDataBlob , productNumber , productID){
        this.isPacketWritingInProcess = true
        let isbn = productDataBlob['isbn']
        let asin = productDataBlob['asin']
        let title = productDataBlob['title']
        let list_price = productDataBlob['list_price']
        let lowest_used_price = productDataBlob['lowest_used_price']
        let lowest_new_price = productDataBlob['lowest_new_price']
        let used_count = productDataBlob['used_count']
        let new_count = productDataBlob['new_count']
        let published_on = productDataBlob['published_on']
        let publisher = productDataBlob['publisher']
        let refreshed_at = productDataBlob['refreshed_at']
        let category_name = productDataBlob['category_name']
        let sales_rank = productDataBlob['sales_rank']
        let weight = productDataBlob['weight']
        let trade_in_value = productDataBlob['trade_in_value']
        let offer_price = productDataBlob['offer_price']
        let useful = productDataBlob['useful']

        //console.log("*****************Inserting into databse****************")
        db.executeSql( 'INSERT INTO ProductData  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [productNumber , productID,isbn , asin , title , list_price , lowest_used_price ,lowest_new_price ,used_count, new_count , published_on , publisher,refreshed_at , category_name , sales_rank , weight , trade_in_value , offer_price , useful] , (result)=>{
              //console.log('product inserted')
                this.getCountOfTotalproductsInDataBase()
                productNumber++
                this.getProductFromJson(productNumber)
            } ,(error)=>{
                 //console.log('product insertion failed '+ JSON.stringify(error))
            })
    }

    insertDataFromJsonFileToDataBase(data){
        productData = data
        this.getProductFromJson(1)

    }

    getProductFromJson(number){
        //console.log("DatabaseLocalResponse->getProductFromJson")
        productNumber = number
        if(productNumber > productData.length){
            DatabaseLocalResponse.getInstance().dataPacketWrittenSuccessCallBack();
            return
        }
        let product = productData[(productNumber-1)]
        let dataSource = product['_source']
        let productID =  product['_id']
        this.insertProduct(dataSource ,productNumber , productID )
    }

    deleteAllDataFromProductDataTableIfExist(){
        db.executeSql('DELETE  FROM ProductData', [] , (result)=>{
          //console.log('Products deleted')
            this.getCountOfTotalproductsInDataBase()
        })
    }


    compareWithDatabaseAndUpdate(newData){
        //alert( newData.constructor.name)
        newProduct = newData['hits']['hits']
        //alert(newProduct.constructor.name)
        //console.log(" compareWithDtabaseAndUpdate " + JSON.stringify(newProduct))
        newProductCount=newProduct.length
        console.log("lenght:::" + newProductCount)
        this.updateDatabase(newProduct,newProductCount)
    }

    updateDatabase(newProduct,newProductCount){
        //console.log('***************updateDatabase********************:')
        //object=newProduct[2];
        //console.log("*********Object:"+object._id)
        newProduct.map((object,index)=>{
            let productID=object['_id']
            let isbn=object['isbn']
            let asin = object['asin']
            let title = object['title']
            let list_price = object['list_price']
            let lowest_used_price = object['lowest_used_price']
            let lowest_new_price = object['lowest_new_price']
            let used_count = object['used_count']
            let new_count = object['new_count']
            let published_on = object['published_on']
            let publisher = object['publisher']
            let refreshed_at = object['refreshed_at']
            let category_name = object['category_name']
            let sales_rank = object['sales_rank']
            let weight = object['weight']
            let trade_in_value = object['trade_in_value']
            let offer_price = object['offer_price']
            let useful = object['useful']
            //console.log('*********inside the function  ')
            try{
            db.executeSql('SELECT * FROM ProductData WHERE _id=?',[productID],(results)=>{
            console.log('***********InsIde fiRSt QuerY******************** ')
            //console.log("Redulstaga:" + JSON.stringify(results.rows.item(0)))
                //identifiedRow = results.row.item(0)
               //idKey =
                console.log("lenghth:" + results.rows.length)
                if(results.rows.length!=0){
                    //console.log("*******inside if*****************")
                    let identifiedRow = results.rows.item(0)
                    let idKey = identifiedRow['_id']
                    //console.log("*******inside if*****************")

                        //console.log("in try update nhjm dfsjh")
                        db.executeSql('UPDATE ProductData SET productnumber=?,_id=?,asin=?,title=?,list_price=?,lowest_used_price=?,lowest_new_price=?,used_count=?,new_count=?,published_on=?,publisher=?,refreshed_at=?,category_name=?,sales_rank=?,weight=?,trade_in_value=?,offer_price=?,useful=? WHERE _id=?',[productNumber , productID,isbn , asin , title , list_price , lowest_used_price ,lowest_new_price ,used_count, new_count , published_on , publisher,refreshed_at , category_name , sales_rank , weight , trade_in_value , offer_price , useful , idKey],(results)=> {
                            console.log("************Updated row***********" + results)
                        })
                }
    /*            else{
            console.log("**************inside else************")
        db.executeSql( 'INSERT INTO ProductData  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [productNumber , productID,'1234' , asin , title , list_price , lowest_used_price ,lowest_new_price ,used_count, new_count , published_on , publisher,refreshed_at , category_name , sales_rank , weight , trade_in_value , offer_price , useful] , (result)=>{
              console.log('product inserted')
               productNumber++
               // this.getProductFromJson(productNumber)
            })
        }*/
                // try {
                //     console.log('******Query executed********')
                // }catch(error){
                //     console.log('*****QUery not exECUted*******')

                // }
                //console.log("**************RowS:"+results.rows.length)
            })}catch(error){
               console.log('error '+ error)
            }
        })
       // db.executeSql('SELECT * FROM ProductData ' , [] , (results)=>{
       //      try {
       //          console.log('*dateDatabas')
       //          //alert(results.rows.item(0)['Status']);
       //      }catch(error){
       //          console.log('*dateDatabas 1')
       //        //  alert('error' + error)
       //      }
       //  })

        // try{
        //        db.executeSql('SELECT * FROM ProductData WHERE _id=?',['B006X0T700'],(result)=>{
        //         console.log('successfully Updated')
        //        })
        // }
        // catch(error){
        //   console.log('error Updated failed' + error)
        // }
    }




    insertMultipleRowsInDataBase(data){
        if(data.length > 0) {
            let index = 0
            for (index = 0; index < 1; index++) {
                let product = data[(index )]
                let productID = product['_id']
                let productDataBlob = product['_source']
                let isbn = productDataBlob['isbn']
                let asin = productDataBlob['asin']
                let title = productDataBlob['title']
                let list_price = productDataBlob['list_price']
                let lowest_used_price = productDataBlob['lowest_used_price']
                let lowest_new_price = productDataBlob['lowest_new_price']
                let used_count = productDataBlob['used_count']
                let new_count = productDataBlob['new_count']
                let published_on = productDataBlob['published_on']
                let publisher = productDataBlob['publisher']
                let refreshed_at = productDataBlob['refreshed_at']
                let category_name = productDataBlob['category_name']
                let sales_rank = productDataBlob['sales_rank']
                let weight = productDataBlob['weight']
                let trade_in_value = productDataBlob['trade_in_value']
                let offer_price = productDataBlob['offer_price']
                let useful = productDataBlob['useful']

                string = this.createStringFromTemplate("({index},{productID},{isbn},{asin},{title},{list_price},{lowest_used_price},{lowest_new_price},{used_count},{new_count},{published_on},{publisher},{refreshed_at},{category_name},{sales_rank},{weight},{trade_in_value},{offer_price},{useful})" , {index:index, productID: productID , isbn : isbn , asin:asin ,title : title , list_price: list_price ,lowest_used_price:lowest_used_price ,lowest_new_price : lowest_new_price , used_count: used_count , new_count : new_count , published_on: published_on,publisher : publisher , refreshed_at : refreshed_at ,  category_name : category_name , sales_rank: sales_rank ,  weight:weight , trade_in_value:trade_in_value , offer_price:offer_price ,useful:useful})
                if(index == 1)
                    string =  string.replace('),' , ')')
                querry = querry+string
            }
        }

        //console.log('qyerry = '+ querry)
        db.executeSql(querry, [] , (result)=>{
                //console.log('all product inserted')
                this.getCountOfTotalproductsInDataBase()
            } , (error)=>{
                //console.log('product insertion failed '+ JSON.stringify(error))
            })
        }

    searchProductById(id){
        //console.log("*******id" + id)
        db.executeSql( 'SELECT * FROM ProductData where isbn = ? or asin = ?' , [id,id] , (results) => {
            try {
                //alert("try block")
                //alert('try block')
                //console.log("RESULTS:" + JSON.stringify(results.rows.item(0)))
                var len = results.rows.length;
                console.log("*******len" + len)
                if(len != 0) {
                    DatabaseLocalResponse.getInstance().databaseProductFetchedSuccessCallBack(results.rows.item(0))
                }
                else{

                    //alert("Product not found, Try in live mode")
                    DatabaseLocalResponse.getInstance().updateStateOnDatabaseFailureSearch()

                }

            }catch(error){
                DatabaseLocalResponse.getInstance().databaseProductFetchedFailCallBack(error)
            }
        })
    }


     createStringFromTemplate(template, variables) {
         return template.replace(new RegExp("\{([^\{]+)\}", "g"), function (_unused, varName) {
             return variables[varName];
         });
     }



    }
