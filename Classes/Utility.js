/**
 * Created by chicmic on 28/02/17.
 */

import Constants from  './Constants';
export default class Utility{
    static ratio=Constants.screenHeight/Constants.screenWidth;
     static getFontSize(){
        if (Utility.ratio >= Constants.kMinimumiPadRatio && Utility.ratio < Constants.kMaximumiPadRatio){
            return 50; //iPadHD
        }
        else {
            return 23;
        }

    }
}
