/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Constants from './Constants'
import React, { Component } from 'react';
import {AsyncStorage} from 'react-native'
import LocalStorageSettingsResponse from './LocalStorageSettingsResponse'
import ElasticSearch from './Apis/ElasticSearch'
import NewUserRegistrationResponse from './Apis/NewUserRegistrationResponse'
import LoginResponse from './Apis/LoginResponse'

export default class LocalStorageApi extends  Component {
    static showFBAAutomatically = null;
    static FBAXRayThreshold = null;
    static FBAXRayNewOrUsed = null
    static showAllOffers = null;
    static ShowLandedPriceWithShipping = null;
    static ShowAlertIfRestricted = null;
    static EnableTriggers = null;
    static DisplayTradeValueInColumn = null;
    static DisplayProductCondition = null;
    static DisplayProductQuantity = null;
    static BooksAndOtherMedia = null;
    static IsAmazonSellerLoggedIn = null
    static downloadState = null;
    static isdownloadComplete = null;
    static scrollId = null
    static OperatingMode = null
    static TotalProductsonES = null
    static totalWrittenBytes = null;
    static downloadStartTime = null;
    static customCostOfBook = '0';
    static costOfBook = null
    static customNetProfit = '0'
    static netProfit = null
    static xRayPercentageValue = null
    static baseProfitValue = null
    static averageSalesRankValue = null
    static isUserLoggined = null
    static isUserPaid = null
    static isTrialPeriod = null
    static numberOfScansInTrial = 0
    static accessToken = 'token_id'
    static userID = null;

    constructor() {
        super()

    }

    static async setShowFBAOffersPageAutomatically(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForFBAOffersPageAutomatically, value, ()=> {
                LocalStorageApi.getShowFBAOffersPageAutomatically()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getShowFBAOffersPageAutomatically() {
        await AsyncStorage.getItem(Constants.kKeyForFBAOffersPageAutomatically, (error, result)=> {
            if (result == null) {
                result = Constants.kFalse
            }

            if (result == Constants.kTrue) {
                result = true
            } else {
                result = false
            }
            LocalStorageApi.showFBAAutomatically = result;
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForFBAOffersPageAutomatically);

        })
    }

    static async setFBAXRayThreshold(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForFBAXRayThreshold, value, ()=> {
                LocalStorageApi.getFBAXRayThreshold()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getFBAXRayThreshold(){
        await AsyncStorage.getItem(Constants.kKeyForFBAXRayThreshold, (error, result)=> {
            if (result == null) {
                result = '25'
            }

            LocalStorageApi.FBAXRayThreshold = result;
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForFBAXRayThreshold);

        })
    }

    static async setFBAXRayNewOrUsed(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForFBAXRayNewOrUsed, value, ()=> {
                LocalStorageApi.getFBAXRayNewOrUsed()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getFBAXRayNewOrUsed(){
        await AsyncStorage.getItem(Constants.kKeyForFBAXRayNewOrUsed, (error, result)=> {
            if (result == null) {
                result = 'new'
            }

            LocalStorageApi.FBAXRayNewOrUsed = result;
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForFBAXRayNewOrUsed);

        })
    }

    static async setAllAmazonOffersPage(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForAllAmazonOffersPage, value, ()=> {
                LocalStorageApi.getAllAmazonOffersPage()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllAmazonOffersPage() {
        await AsyncStorage.getItem(Constants.kKeyForAllAmazonOffersPage, (error, result)=> {
            if (result == null) {
                result = Constants.kFalse
            }

            if (result == Constants.kTrue) {
                result = true
            } else {
                result = false
            }
            LocalStorageApi.showAllOffers = result;
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForAllAmazonOffersPage);

        })
    }

    static async setShowLandedPriceWithShipping(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForLandedPrice, value, ()=> {
                LocalStorageApi.getShowLandedPriceWithShipping()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getShowLandedPriceWithShipping() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForLandedPrice, (error, result)=> {
                if (result == null) {
                    result = Constants.kFalse
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.ShowLandedPriceWithShipping = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForLandedPrice);

            })

        } catch (error) {
            console.log(error)
        }

    }

    static async setShowAlertIfRestricted(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForRestricted, value, ()=> {
                LocalStorageApi.getShowAlertIfRestricted()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getShowAlertIfRestricted() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForRestricted, (error, result)=> {
                if (result == null) {
                    result = Constants.kFalse
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.ShowAlertIfRestricted = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForRestricted);

            })

        } catch (error) {
            console.log(error)
        }
    }

    static async setEnableTriggers(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForEnableTriggers, value, ()=> {
                LocalStorageApi.getEnableTriggers()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getEnableTriggers() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForEnableTriggers, (error, result)=> {
                if (result == null) {
                    result = Constants.kFalse
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.EnableTriggers = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForEnableTriggers);

            })
        } catch (error) {
            console.log(error)
        }
    }

    static async setDisplayTradeValueInColumn(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForDisplayTradeValue, value, ()=> {
                LocalStorageApi.getDisplayTradeValueInColumn()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getDisplayTradeValueInColumn() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForDisplayTradeValue, (error, result)=> {
                if (result == null) {
                    result = Constants.kFalse
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.DisplayTradeValueInColumn = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForDisplayTradeValue);

            })
        } catch (error) {
            console.log(error)
        }
    }

    static async setDisplayProductCondition(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForDisplayCondition, value, ()=> {
                LocalStorageApi.getDisplayProductCondition()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getDisplayProductCondition() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForDisplayCondition, (error, result)=> {
                if (result == null) {
                    result = Constants.kTrue
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.DisplayProductCondition = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForDisplayCondition);

            })

        } catch (error) {
            console.log(error)
        }
    }

    static async setDisplayProductQuantity(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForDisplayQuantity, value, ()=> {
                LocalStorageApi.getDisplayProductQuantity()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getDisplayProductQuantity() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForDisplayQuantity, (error, result)=> {
                if (result == null) {
                    result = Constants.kTrue
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.DisplayProductQuantity = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForDisplayQuantity);

            })
        } catch (error) {
            console.log(error)
        }
    }

    static async setBooksAndOtherMediaOption(value) {
        try {
            AsyncStorage.setItem(Constants.kKeyForBooksAndOtherMedia, value, ()=> {
                LocalStorageApi.getBooksAndOtherMediaOption()
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async getBooksAndOtherMediaOption() {
        try {
            await AsyncStorage.getItem(Constants.kKeyForBooksAndOtherMedia, (error, result)=> {
                if (result == null) {
                    result = Constants.kTrue
                }
                if (result == Constants.kTrue) {
                    result = true
                } else {
                    result = false
                }
                LocalStorageApi.BooksAndOtherMedia = result;
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForBooksAndOtherMedia);

            })
        } catch (error) {
            console.log(error)
        }
    }


    static async setIsAppFirstTimeLaunch(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyIsFirstTimeLaunch, value, ()=> {
                //console.log('kKeyIsFirstTimeLaunch')
                // LocalStorageApi.getIsAppFirstTimeLaunch()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getIsAppFirstTimeLaunch() {
        await AsyncStorage.getItem(Constants.kKeyIsFirstTimeLaunch, (error, result)=> {
            if (result == null) {
                result = Constants.kTrue
            }

            if (result == Constants.kTrue) {
                result = true
            } else {
                result = false
            }
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyIsFirstTimeLaunch);

        })
    }

    static async setIsAmazonSellerLoggedIn(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForAmazonSellerLogin, value, ()=> {
                //console.log('kKeyForAmazonSellerLogin')
                LocalStorageApi.getIsAmazonSellerLoggedIn()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getIsAmazonSellerLoggedIn() {
        await AsyncStorage.getItem(Constants.kKeyForAmazonSellerLogin, (error, result)=> {

            if (result == Constants.kTrue) {
                result = true
            } else {
                result = false
            }

            //console.log('result == ' + result)

            LocalStorageApi.IsAmazonSellerLoggedIn = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForAmazonSellerLogin);

        })
    }


    static async setDownloadState(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeydownloadState, value, ()=> {
                //console.log('kKeyISDowbnloadCanceled')
                // LocalStorageApi.getIsAppFirstTimeLaunch()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getDownloadState() {
        await AsyncStorage.getItem(Constants.kKeydownloadState, (error, result)=> {
            if (result == null) {
                result = Constants.kFalse
            }

            if (result == Constants.kTrue) {
                result = true
            } else {
                result = false
            }
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeydownloadState);

        })
    }

    static async setDownloadComplete(bool) {
        try {
            await AsyncStorage.setItem(Constants.kKeydownloadComplete, bool, ()=> {
                //console.log('kKeyISDowbnloadCanceled')
                LocalStorageApi.isdownloadComplete = bool
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getDownloadComplete() {
        await AsyncStorage.getItem(Constants.kKeydownloadComplete, (error, result)=> {
            if (result == null) {
                result = Constants.kFalse
            }
            LocalStorageApi.isdownloadComplete = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeydownloadComplete);

        })
    }


    static async setScrollid(scrollId) {
        try {
            await AsyncStorage.setItem(Constants.kKeyScrollid, scrollId, ()=> {
                //console.log('setScrollid ==' + scrollId)
                LocalStorageApi.scrollId = scrollId
                LocalStorageApi.getScrollid()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getScrollid() {
        await AsyncStorage.getItem(Constants.kKeyScrollid, (error, result)=> {
            LocalStorageApi.scrollId = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyScrollid);
        })
    }


    static async setOpratingMode(mode) {
        try {
            await AsyncStorage.setItem(Constants.kKeyOperatingMode, mode, ()=> {
                //console.log('setOpratingMode ==' + mode)
                LocalStorageApi.OperatingMode = mode
                LocalStorageApi.getScrollid()
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getOpratingMode() {
        await AsyncStorage.getItem(Constants.kKeyOperatingMode, (error, result)=> {
            if (result == null) {
                result = Constants.SearchMode.kElasticSearch
            }
            LocalStorageApi.OperatingMode = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyOperatingMode);
        })
    }


    static async setTotalProductsOnES(totalProducts) {
        try {
            await AsyncStorage.setItem(Constants.kKeyTotalProductsOnES, totalProducts, ()=> {
                //console.log('setOpratingMode ==' + totalProducts)
                LocalStorageApi.TotalProductsonES = totalProducts
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getTotalProductsOnES() {
        await AsyncStorage.getItem(Constants.kKeyTotalProductsOnES, (error, result)=> {
            if (result == null) {
                result = 0.0
            }
            LocalStorageApi.TotalProductsonES = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyTotalProductsOnES);
        })
    }


    static async setPrevBytesWritten(totalBytes) {
        try {
            await AsyncStorage.setItem(Constants.kKeyPrevBytesWritten, totalBytes, ()=> {
                //console.log('kKeyPrevBytesWritten ==' + totalBytes)
                LocalStorageApi.totalWrittenBytes = totalBytes
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getPrevBytesWritten() {
        await AsyncStorage.getItem(Constants.kKeyPrevBytesWritten, (error, result)=> {
            if (result == null) {
                result = 0.0
            }

            //console.log('getPrevBytesWritten ==' + result)
            LocalStorageApi.totalWrittenBytes = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyPrevBytesWritten);
        })
    }

    static async setDownloadStartTime(time) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForDownloadStartTime, time, ()=> {
                //console.log('kKeyPrevBytesWritten ==' + totalBytes)
                LocalStorageApi.downloadStartTime = time
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getDownloadStartTime() {
        await AsyncStorage.getItem(Constants.kKeyForDownloadStartTime, (error, result)=> {
            if (result == null) {
                result = 0.0
            }

            //console.log('getPrevBytesWritten ==' + result)
            LocalStorageApi.downloadStartTime = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForDownloadStartTime);
        }).then(()=> {
            if (LocalStorageApi.downloadStartTime == 0)
                return;
            else
                ElasticSearch.updateDatabase(LocalStorageApi.downloadStartTime)
        })

    }

    static async setCustomEnteredCostOfBook(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForCustomEnteredCostOfBook, value, ()=> {
                LocalStorageApi.customCostOfBook = value
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getCustomEnteredCostOfBook() {
        await AsyncStorage.getItem(Constants.kKeyForCustomEnteredCostOfBook, (error, result)=> {
            if (result == null) {
                LocalStorageApi.customCostOfBook = '0'
            }
            else {
                LocalStorageApi.customCostOfBook = result
            }
            //  LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result,Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setSelectedPickerCostOfBook(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForCostOfBook, value, ()=> {
                LocalStorageApi.costOfBook = value
                //alert(LocalStorageApi.costOfBook)
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getSelectedPickerCostOfBook() {
        await AsyncStorage.getItem(Constants.kKeyForCostOfBook, (error, result)=> {
            if (result == null) {
                LocalStorageApi.costOfBook = '0'
            }
            else {
                LocalStorageApi.costOfBook = result
            }

            //  LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result,Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setCustomEnteredNetProfit(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForCustomNetProfit, value, ()=> {
                LocalStorageApi.customNetProfit = value

            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getCustomEnteredNetProfit() {

        await AsyncStorage.getItem(Constants.kKeyForCustomNetProfit, (error, result)=> {
            if (result == null) {
                LocalStorageApi.customNetProfit = '0'
            }
            else {
                LocalStorageApi.customNetProfit = result
            }
            //  LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result,Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setPickerSelectedNetProfit(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyforNetProfit, value, ()=> {
                LocalStorageApi.netProfit = value
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getPickerSelectedNetProfit() {
        await AsyncStorage.getItem(Constants.kKeyforNetProfit, (error, result)=> {
            if (result == null) {
                LocalStorageApi.netProfit = '0'
            }
            else {
                LocalStorageApi.netProfit = result
            }

            //  LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result,Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setPickerSelectedAverageSalesRank(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyforAverageSalesRank, value, ()=> {
                LocalStorageApi.averageSalesRankValue = value
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getPickerSelectedAverageSalesRank() {
        await AsyncStorage.getItem(Constants.kKeyforAverageSalesRank, (error, result)=> {
            if (result == null) {
                LocalStorageApi.averageSalesRankValue = '0'
            }
            else {
                LocalStorageApi.averageSalesRankValue = result
            }

            //  LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result,Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setSelectedPickerValueForBaseProfit(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyforBaseProfit, value, ()=> {
                LocalStorageApi.baseProfitValue = value
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getSelectedPickerValueForBaseProfit() {
        await AsyncStorage.getItem(Constants.kKeyforBaseProfit, (error, result)=> {
            if (result == null) {
                LocalStorageApi.baseProfitValue = '0'
            }
            else {
                LocalStorageApi.baseProfitValue = result
            }


            //  LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result,Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setSelectedPickerValueForXrayPercentage(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyforXrayPercentage, value, ()=> {
                LocalStorageApi.xRayPercentageValue = value
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getSelectedPickerValueForXrayPercentage() {
        await AsyncStorage.getItem(Constants.kKeyforXrayPercentage, (error, result)=> {
            if (result == null) {
                LocalStorageApi.xRayPercentageValue = '0'
            }
            else {
                LocalStorageApi.xRayPercentageValue = result
            }

            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.kKeyForCustomEnteredCostOfBook);
        })
    }

    static async setIsUserLoggined(value) {
        try {
            await AsyncStorage.setItem(Constants.KkeyforIsUserLoggined, value, ()=> {
                LocalStorageApi.isUserLoggined = value
                //console.log("*********************" +Constants.KkeyforIsUserLoggined)
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getIsUserLoggined() {
        //console.log("****************************LocalStorage")
        await AsyncStorage.getItem(Constants.KkeyforIsUserLoggined, (error, result)=> {
            if (result == null) {
                LocalStorageApi.isUserLoggined = "false"
                //console.log("****************************Local Storage" + Constants.KkeyforIsUserLoggined)
            }
            else {
                LocalStorageApi.isUserLoggined = result
                //console.log("****************************Local Storage " + Constants.KkeyforIsUserLoggined)
            }
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.KkeyforIsUserLoggined);
        })
    }

    static async setIsUserPaid(value) {
            try {
                await AsyncStorage.setItem(Constants.KkeyforIsUserPaid, value, ()=> {
                    LocalStorageApi.isUserPaid = value
                    //console.log("*********************" +Constants.KkeyforPaidd)
                })
            } catch (error) {
                console.log(error)
            }
        }

        static async getIsUserPaid() {
            //console.log("****************************LocalStorage")
            await AsyncStorage.getItem(Constants.KkeyforIsUserPaid, (error, result)=> {
                if (result == null) {
                    LocalStorageApi.isUserPaid = "false"
                    console.log("****************************Local Storage" + Constants.KkeyforIsUserPaid)
                }
                else {
                    LocalStorageApi.isUserPaid = result
                    console.log("****************************Local Storage " + Constants.KkeyforIsUserPaid)
                }
                LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result, Constants.KkeyforIsUserPaid);
            })
        }


    static async setIsTrialPeriod(value) {
        try {
            await AsyncStorage.setItem(Constants.kKeyForTrialPeriod , value , () => {
                LocalStorageApi.isTrialPeriod = value
            })
        }catch(error) {
            console.log(error)
        }
    }

    static async getIsTrialPeriod() {
        await AsyncStorage.getItem(Constants.kKeyForTrialPeriod , (error , result) =>{
            LocalStorageApi.isTrialPeriod = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result , Constants.kKeyForTrialPeriod);
        })
    }

    static async setTotalScansDoneInTrial(value) {
        try{
            await AsyncStorage.setItem(Constants.kKeyForScansInTrial , value , () => {
                LocalStorageApi.getTotalScansDoneInTrial();
            })
        }catch(error){
            console.log(error)
        }
    }

    static async getTotalScansDoneInTrial() {
        await AsyncStorage.getItem(Constants.kKeyForScansInTrial , ( error , result ) => {
            //console.log("****123"+result)
            //console.log("****123"+LocalStorageApi.numberOfScansInTrial)
            if(result == null){
                LocalStorageApi.numberOfScansInTrial = 0
            }else{
                LocalStorageApi.numberOfScansInTrial=parseInt(result)
            }
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result , Constants.kKeyForScansInTrial);

        })
    }

    static async setAccessToken(value){
        try{
            await AsyncStorage.setItem(Constants.kKeyForAccessToken , value , () => {
                LocalStorageApi.getAccessToken();
            })
        }catch(error){
            console.log(error)
        }
    }

    static async getAccessToken() {
        await AsyncStorage.getItem(Constants.kKeyForAccessToken , ( error , result ) => {
            LocalStorageApi.accessToken = result
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result , Constants.kKeyForAccessToken);
        })
    }

    static async setUserID(value){
        try{
            await AsyncStorage.setItem(Constants.kKeyForUserID , value , () => {
                LocalStorageApi.getUserID();
            })
        }catch(error){
            console.log(error);
        }
    }

    static async getUserID() {
        await AsyncStorage.getItem(Constants.kKeyForUserID , ( error , result ) => {
            LocalStorageApi.userID = result;
            LocalStorageSettingsResponse.getInstance().localStorageSettingsResponseSuccessCallback(result , Constants.kKeyForUserID);
        })
    }

}
