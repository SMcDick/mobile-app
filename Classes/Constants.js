
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import { Dimensions , Platform } from 'react-native';
 export default class Constants{
    static kTrue  ="true"
    static kFalse = "false"
     static kKeyIsFirstTimeLaunch = "keyForFirstTimeLaunch"
     static KkeyforIsUserLoggined="false"
     static KkeyforIsUserPaid="false"
    static kKeyForFBAOffersPageAutomatically =   "keyForFBAOffersPageAutomatically"
    static kKeyForFBAXRayThreshold = "KeyForFBAXRayThreshold"
    static kKeyForFBAXRayNewOrUsed = "KeyForFBAXRayNewOrUsed"
     static kKeyForAllAmazonOffersPage='kKeyForAllAmazonOffersPage'
    static kKeyForDisplayCondition = "keyForDisplayCondition"
    static kKeyForDisplayQuantity =  "keyForDisplayQuantity"
    static kKeyForLandedPrice =  "keyForLandedPrice"
    static kKeyForRestricted =  "KeyForRestricted"
    static kKeyForDisplayTradeValue =  "keyForDisplayTradeValue"
    static kKeyForEnableTriggers =  "keyForEnableTriggers"
    //static kKeyForBooksAndOtherMedia="keyForBooksAndOtherMedia"
    //static kKeyForNonMedia="keyForNonMedia"
    static kKeyForAmazonSellerLogin ="keyforAmazonLogin"
     static kKeydownloadState = "keyDownloadState"
     static kKeydownloadComplete = "keyDownloadComplete"
     static kKeyScrollid = "keyForScrollid"
     static kKeyOperatingMode = 'keyForOperatingMode'
     static kKeyTotalProductsOnES = 'kKeyTotalProductsOnES'

     static kKeyForCustomEnteredCostOfBook="keyForCustomCostOfBook'"
     static kKeyForCostOfBook="keyForCostOfBook"
     static kKeyForCustomNetProfit="kKeyForCustomNetProfit"
     static kKeyforNetProfit="kKeyforNetProfit"
     static kKeyforAverageSalesRank="kKeyforAverageSalesRank"
     static kKeyforBaseProfit="kKeyforBaseProfit"
     static kKeyforXrayPercentage="kKeyforXrayPercentage"
     static kKeyPrevBytesWritten = "KeyPrevBytesWritten"

     static kKeyForDownloadStartTime='KeyForDownloadStartTime'

     static kKeyForTrialPeriod="KeyForTrialPeriod"
     static IsTrialPeriodValid=true;
     static kKeyForScansInTrial="KeyForScansInTrial"

     static isSubscriptionTaken=false

     static kKeyForAccessToken = "AccessToken"
     static kKeyForUserID = "UserID"
     static kBluetoothModeOn="kBluetoothModeOn"

     static kMinimumiPadRatio= 1.33
     static kMaximumiPadRatio = 1.45
     static kMaximumiPhoneHDRatio=1.7
     static screenWidth = Dimensions.get('window').width;
     static screenHeight = Dimensions.get('window').height;


 //links for product on other stores eg.ebay
 static klinkEbay = 'http://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313.TR0.TRC0.H0.X1501129740.TRS0&_nkw=1501129740&_sacat=0'
 static kLinkCamel = 'https://camelcamelcamel.com/End-Watch-Novel-Hodges-Trilogy/product/1501129740'
 static kLinkBookFinder = 'http://www.bookfinder.com/search/?author=&title=&lang=en&isbn=1501129740&new=1&used=1&ebooks=1&destination=gb&currency=GBP&mode=basic&st=sr&ac=qr'
 static kLinkBookScouter = 'https://bookscouter.com/prices.php?isbn=1501129740&searchbutton=Sell'
 static kLinkKeepa = 'https://keepa.com/#!product/1-1501129740'
 static kLinkAmazon = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=1501129740'

 static Company = {
   KCompanyEbay : 1 ,
   KCompanyCamel : 2 ,
   KCompanyBookFinder : 3,
   KCompanyBookScouter : 4,
   KCompanyKeepa : 5,
   KCompanyAmazon : 6,
}

     static DownlaodingFailError = {
         KByUser : 0 ,
         KByError : 1,
         kByScrollID : 2,
     }



     static SearchMode = {
         kDataBase : 0 ,
         //kDataBaseAndES:1,
         //kAWS : 2,
         kElasticSearch : 1,
     }

    static ProductCodeType = {
        KTypeISBN : "ISBN" ,
        KTypeUPC :"UPC"
    }

    static AWSErrorCodes = {
        kInvalidParameterValue : "AWS.InvalidParameterValue"
    }

    static kOffersType = {
        kNewOffers:1,
        kUsedOffers:2,
        kFBAOffers:3,
        kAllOffers:4
    }

     static kScanType = {
         kBarCode:1,
         kOcr:2
     }

     static DownloadState = {
         kRunning : 0,
         kStopped : 1,
         //kCanceled : 2,
         //kPaused : 3,
         //kFailed : 4,
        // kCompleted : 5,
     };


    // DataBase server apis

   static  kAPIFetchProduct =  'FetchAPI'

    //Original AWS details
    static kAssociateTag = 'textdominatio-20'
    static kAWSSecretKey = "emnwg31r/68lHg6A2UzafdpdH1pBPZHxj/zTaPqJ"//"CWwRAdR0DMjhc053KTT5gWNv1cYMzSZmySs9zyiT"
    static kAWSAccessKeyId = "AKIAJ4QJBSZAB3JBVMEQ"//"AKIAILZSQFO5UTM4CCUQ"

     //original MWS details
     static AWSAccessKeyId = 'AKIAJWG5UCTUZM73TETA'
     static SellerId = "A2G12KZ1E4PCLA"
     static MarketplaceId = "ATVPDKIKX0DER"



    //Testing details
    //static kAWSSecretKey = "+nBXCi+WoLXZbyUqbaCA6y9xdbnH0xaDXvfFTQKn";
    //static kAWSAccessKeyId = "AKIAIG5FMPMDYWRW3Y6A";
    //static kAssociateTag = "gsingh-21";

     //Store link
     static storeLink =   Platform.OS === 'ios' ? 'https://itunes.apple.com/us/app/foggy-scratch-guess-the-logo/id1143414321?ls=1&mt=8' : 'https://play.google.com/store/apps/details?id=com.appsroyale.foggyscratch'

     //ui constants
     static ZenBlue1 = 'rgb(68,146,225)'
     //static ZenBlue1 = 'blue'
     static ZenGreen = 'rgb(2,203,1)'

}
